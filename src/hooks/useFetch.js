import { ref, onMounted } from "vue";

export default function useFetch(url, options, stub = {}) {
    const isLoading = ref(false);
    const isSuccess = ref(false);
    const isError = ref(false);
    const data = ref(null);
    const error = ref(null);
    const stubExits = () => Object.keys(stub).length > 0;

    const execute = async () => {
        isLoading.value = true;

        try {
            data.value = stubExits() ? stub : await fetch(url, options).then(res => res.json());
            isSuccess.value = true;
            isError.value = false;
        }
        catch (e) {
            error.value = e;
            isSuccess.value = false;
            isError.value = true;
        }
        finally {
            isLoading.value = false;
        }
    }

    onMounted(() => {
        if (options.method === 'get') {
            execute();
        }
    });

    return {
        isLoading,
        isSuccess,
        isError,
        data,
        error,
        execute
    }
}