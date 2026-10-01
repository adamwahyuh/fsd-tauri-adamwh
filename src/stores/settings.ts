import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSettingsStore = defineStore('settings', () => {
    const apiUrl = ref(localStorage.getItem('api_url') || 'https://fsd.test.intitek.id/api');

    const setApiUrl = (url: string) => {
        apiUrl.value = url;
        localStorage.setItem('api_url', url);
    };

    return { apiUrl, setApiUrl };
});