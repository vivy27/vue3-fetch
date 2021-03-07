import { ref, reactive, onMounted } from "vue";

export default function useFetch({
    url,
    method,
    query,
    body,
    headers,
    referrer,
    referrerPolicy,
    mode,
    credentials,
    cache,
    redirect,
    integrity,
    keepAlive,
    signal,
    stub
}) {
    const isLoading = ref(false);
    const isSuccess = ref(false);
    const isError = ref(false);
    const response = reactive({
        data: null,
        error: null,
    });

    const endpoint = (query) => {
        const qs = new URLSearchParams(query).toString();
        return qs ? `${url}?${qs}` : url;
    };

    const fetchOptions = {
        method,
        ...(body && { body }),
        ...(headers && { headers }),
        ...(referrer && { referrer }),
        ...(referrerPolicy && { referrerPolicy }),
        ...(mode && { mode }),
        ...(credentials && { credentials }),
        ...(cache && { cache }),
        ...(redirect && { redirect }),
        ...(integrity && { integrity }),
        ...(keepAlive && { keepAlive }),
        ...(signal && { signal }),
    };

    const execute = async ({ query, body } = {}) => {
        isSuccess.value = null;
        isError.value = null;

        isLoading.value = true;

        const options = {
            ...fetchOptions,
            ...(body && { body: JSON.stringify(body) }),
        }

        try {
            response.data = stub || await fetch(endpoint(query), options).then(res => res.json());
            isSuccess.value = true;
            isError.value = false;
        }
        catch (e) {
            response.error = e.message;
            isSuccess.value = false;
            isError.value = true;
        }
        finally {
            isLoading.value = false;
        }
    }

    onMounted(() => {
        if (method === 'get') {
            execute({ query, body });
        }
    });

    return {
        isLoading,
        isSuccess,
        isError,
        response,
        execute
    }
}