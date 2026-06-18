import { describe, it, expect, vi, beforeEach } from 'vitest';
import { defineComponent } from 'vue';
import { mount, flushPromises } from '@vue/test-utils';
import useFetch from './useFetch';

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

beforeEach(() => {
  global.fetch = vi.fn();
});

describe('useFetch', () => {
  it('auto-executes a GET request on mount', async () => {
    global.fetch.mockResolvedValue({ json: () => Promise.resolve({ users: ['Ada'] }) });

    const { isLoading, isSuccess, response } = withSetup({ url: 'https://example.com/users' });
    await flushPromises();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(isLoading.value).toBe(false);
    expect(isSuccess.value).toBe(true);
    expect(response.data).toEqual({ users: ['Ada'] });
  });

  it('does not auto-execute non-GET methods on mount', async () => {
    const { execute } = withSetup({ url: 'https://example.com/users', method: 'post' });
    await flushPromises();

    expect(global.fetch).not.toHaveBeenCalled();
    expect(typeof execute).toBe('function');
  });

  it('updates state when execute() is called manually', async () => {
    global.fetch.mockResolvedValue({ json: () => Promise.resolve({ id: 1 }) });

    const { isSuccess, response, execute } = withSetup({ url: 'https://example.com/users', method: 'post' });
    await flushPromises();

    await execute({ body: { name: 'Ada' } });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [, options] = global.fetch.mock.calls[0];
    expect(options.body).toBe(JSON.stringify({ name: 'Ada' }));
    expect(isSuccess.value).toBe(true);
    expect(response.data).toEqual({ id: 1 });
  });

  it('short-circuits the network call when a stub is provided', async () => {
    const { isSuccess, response } = withSetup({
      url: 'https://example.com/users',
      stub: { users: ['stubbed'] },
    });
    await flushPromises();

    expect(global.fetch).not.toHaveBeenCalled();
    expect(isSuccess.value).toBe(true);
    expect(response.data).toEqual({ users: ['stubbed'] });
  });

  it('sets isError and response.error when the request fails', async () => {
    global.fetch.mockRejectedValue(new Error('network down'));

    const { isError, isSuccess, response } = withSetup({ url: 'https://example.com/users' });
    await flushPromises();

    expect(isError.value).toBe(true);
    expect(isSuccess.value).toBe(false);
    expect(response.error).toBe('network down');
  });
});
