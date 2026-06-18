import { describe, it, expect } from 'vitest';
import { defineComponent } from 'vue';
import { mount, flushPromises } from '@vue/test-utils';
import useFetch from './useFetch';

// Opt-in smoke test: hits real endpoints over the network instead of mocking
// `fetch`, to prove the hook works against an actual server's response shape.
// Skipped by default (flaky/slow for CI) unless RUN_SMOKE_TESTS=1.
// Run with: npm run test:smoke
const runSmoke = process.env.RUN_SMOKE_TESTS ? describe : describe.skip;

function withSetup(options) {
  let result;
  const Comp = defineComponent({
    setup() {
      result = useFetch(options);
      return () => null;
    },
  });
  mount(Comp);
  return result;
}

// flushPromises only drains the microtask queue, which isn't enough for a
// real network round trip, so poll until the hook reports it's done.
async function waitUntilSettled(isLoading, timeoutMs = 10000) {
  const start = Date.now();
  while (isLoading.value) {
    if (Date.now() - start > timeoutMs) {
      throw new Error('Timed out waiting for the real fetch to settle');
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  await flushPromises();
}

runSmoke('useFetch (smoke test against real endpoints)', () => {
  it('fetches real data from a live API', async () => {
    const { isLoading, isSuccess, isError, response } = withSetup({
      url: 'https://jsonplaceholder.typicode.com/users',
    });

    await waitUntilSettled(isLoading);

    expect(isLoading.value).toBe(false);
    expect(isError.value).toBe(false);
    expect(isSuccess.value).toBe(true);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
    expect(response.data[0]).toHaveProperty('email');
  }, 10000);

  it('sets isError when a real fetch fails (unresolvable host)', async () => {
    const { isLoading, isError, isSuccess, response } = withSetup({
      url: 'https://this-domain-does-not-exist.invalid/users',
    });

    await waitUntilSettled(isLoading);

    expect(isSuccess.value).toBe(false);
    expect(isError.value).toBe(true);
    expect(response.error).toBeTruthy();
  }, 10000);
});
