import axios from 'axios';

const DEFAULT_API_URL = 'https://fsd.test.intitek.id/api';

const savedUrl = localStorage.getItem('api_url');

const apiClient = axios.create({
    baseURL: savedUrl || DEFAULT_API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const setApiBaseUrl = (url: string) => {
    apiClient.defaults.baseURL = url;
};

export default apiClient;