import axios from 'axios';

const savedUrl = localStorage.getItem('api_url') || 'https://fsd.test.intitek.id/api';

const apiClient = axios.create({
    baseURL: savedUrl, 
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

// Otomatis selipkan token (jika ada) setiap kali mengambil data
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;