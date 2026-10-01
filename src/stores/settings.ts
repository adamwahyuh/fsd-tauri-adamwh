import { defineStore } from 'pinia';
import { ref } from 'vue';

const DEFAULT_API_URL = 'https://fsd.test.intitek.id/api';

export const useSettingsStore = defineStore('settings', () => {
    const apiUrl = ref(
        localStorage.getItem('api_url') || DEFAULT_API_URL
    );

    const setApiUrl = (url: string) => {
        apiUrl.value = url;
        localStorage.setItem('api_url', url);
    };

    const resetApiUrl = () => {
        localStorage.removeItem('api_url');
        apiUrl.value = DEFAULT_API_URL;
    };

    return { apiUrl, setApiUrl, resetApiUrl, defaultApiUrl: DEFAULT_API_URL,
    };
});