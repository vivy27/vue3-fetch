import { describe, it, expect, vi, beforeEach } from 'vitest';
import { nextTick } from 'vue';
import { mount, flushPromises } from '@vue/test-utils';
import Vue3Fetch from './Vue3Fetch.vue';

let resolveFetch;
let rejectFetch;

beforeEach(() => {
  global.fetch = vi.fn(
    () =>
      new Promise((resolve, reject) => {
        resolveFetch = resolve;
        rejectFetch = reject;
      })
  );
});

function resolveWith(data) {
  resolveFetch({ json: () => Promise.resolve(data) });
}

describe('Vue3Fetch - #default slot (original API)', () => {
  it('passes isLoading, then data, to a single #default slot', async () => {
    const wrapper = mount(Vue3Fetch, {
      props: { url: 'https://example.com/users' },
      slots: {
        default: ({ isLoading, data }) =>
          isLoading ? 'loading...' : `data:${JSON.stringify(data)}`,
      },
    });

    await nextTick();
    expect(wrapper.text()).toBe('loading...');

    resolveWith({ users: ['Ada'] });
    await flushPromises();

    expect(wrapper.text()).toBe('data:{"users":["Ada"]}');
  });

  it('still works with no named slots provided at all (pre-named-slot usage)', async () => {
    const wrapper = mount(Vue3Fetch, {
      props: { url: 'https://example.com/users' },
      slots: {
        default: ({ isLoading, isError, error }) => {
          if (isLoading) return 'loading...';
          if (isError) return `error:${error}`;
          return 'done';
        },
      },
    });

    await nextTick();
    expect(wrapper.text()).toBe('loading...');

    rejectFetch(new Error('boom'));
    await flushPromises();

    expect(wrapper.text()).toBe('error:boom');
  });
});

describe('Vue3Fetch - named slots', () => {
  it('renders #loading, then #data on success', async () => {
    const wrapper = mount(Vue3Fetch, {
      props: { url: 'https://example.com/users' },
      slots: {
        loading: 'LOADING',
        data: ({ data }) => `DATA:${JSON.stringify(data)}`,
        error: ({ error }) => `ERROR:${error}`,
      },
    });

    await nextTick();
    expect(wrapper.text()).toBe('LOADING');

    resolveWith({ users: ['Ada'] });
    await flushPromises();

    expect(wrapper.text()).toBe('DATA:{"users":["Ada"]}');
  });

  it('renders #error on failure', async () => {
    const wrapper = mount(Vue3Fetch, {
      props: { url: 'https://example.com/users' },
      slots: {
        loading: 'LOADING',
        data: ({ data }) => `DATA:${JSON.stringify(data)}`,
        error: ({ error }) => `ERROR:${error}`,
      },
    });

    rejectFetch(new Error('boom'));
    await flushPromises();

    expect(wrapper.text()).toBe('ERROR:boom');
  });

  it('falls back to #default for any named slot that is not provided', async () => {
    const wrapper = mount(Vue3Fetch, {
      props: { url: 'https://example.com/users' },
      slots: {
        // only #error is provided as a named slot; loading/data states
        // must fall back to #default
        error: ({ error }) => `ERROR:${error}`,
        default: ({ isLoading, data }) =>
          isLoading ? 'fallback-loading' : `fallback-data:${JSON.stringify(data)}`,
      },
    });

    await nextTick();
    expect(wrapper.text()).toBe('fallback-loading');

    resolveWith({ users: ['Ada'] });
    await flushPromises();

    expect(wrapper.text()).toBe('fallback-data:{"users":["Ada"]}');
  });

  it('uses the #error named slot even when #default is also provided', async () => {
    const wrapper = mount(Vue3Fetch, {
      props: { url: 'https://example.com/users' },
      slots: {
        error: ({ error }) => `named-error:${error}`,
        default: () => 'should-not-be-used-for-error-state',
      },
    });

    rejectFetch(new Error('boom'));
    await flushPromises();

    expect(wrapper.text()).toBe('named-error:boom');
  });
});

describe('Vue3Fetch - events and stub', () => {
  it('emits fetch-success with the response data', async () => {
    const wrapper = mount(Vue3Fetch, {
      props: { url: 'https://example.com/users' },
      slots: { default: () => '' },
    });

    resolveWith({ users: ['Ada'] });
    await flushPromises();

    expect(wrapper.emitted('fetch-success')).toEqual([[{ users: ['Ada'] }]]);
    expect(wrapper.emitted('fetch-error')).toBeUndefined();
  });

  it('emits fetch-error with the error message on failure', async () => {
    const wrapper = mount(Vue3Fetch, {
      props: { url: 'https://example.com/users' },
      slots: { default: () => '' },
    });

    rejectFetch(new Error('boom'));
    await flushPromises();

    expect(wrapper.emitted('fetch-error')).toEqual([['boom']]);
    expect(wrapper.emitted('fetch-success')).toBeUndefined();
  });

  it('uses the stub value instead of calling fetch, and marks the wrapper as stubbed', async () => {
    const wrapper = mount(Vue3Fetch, {
      props: { url: 'https://example.com/users', stub: { users: ['stubbed'] } },
      slots: {
        default: ({ data }) => JSON.stringify(data),
      },
    });

    await flushPromises();

    expect(global.fetch).not.toHaveBeenCalled();
    expect(wrapper.text()).toBe('{"users":["stubbed"]}');
    expect(wrapper.classes()).toContain('is-stubbed');
  });
});
