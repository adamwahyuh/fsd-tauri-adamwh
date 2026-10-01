<script setup lang="ts">
import { ref } from 'vue';
import { useSettingsStore } from '../stores/settings';
import { setApiBaseUrl } from '../axios';

const settings = useSettingsStore();

const apiUrl = ref(settings.apiUrl);

const saveApiUrl = () => {
    const url = apiUrl.value.trim();

    if (!url) {
        alert('API URL tidak boleh kosong');
        return;
    }

    settings.setApiUrl(url);

    setApiBaseUrl(url);

    alert('API URL berhasil disimpan');
};

const resetApiUrl = () => {
    settings.resetApiUrl();

    apiUrl.value = settings.apiUrl;

    setApiBaseUrl(settings.defaultApiUrl);

    alert('API URL berhasil direset ke default');
};
</script>

<template>
    <div class="max-w-2xl">
        <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-900">
                Setting
            </h1>

            <p class="mt-1 text-sm text-gray-500">
                Atur alamat API yang digunakan oleh aplikasi.
            </p>
        </div>

        <div class="bg-white border border-gray-200 rounded-xl p-6">

            <label
                for="api-url"
                class="block text-sm font-medium text-gray-700 mb-2"
            >
                Base API URL
            </label>

            <input
                id="api-url"
                v-model="apiUrl"
                type="url"
                placeholder="https://example.com/api"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg
                       outline-none focus:ring-2 focus:ring-gray-900
                       focus:border-transparent"
            />

            <p class="mt-2 text-xs text-gray-500">
                Contoh:
                https://fsd.test.intitek.id/api
            </p>

            <div class="flex gap-3 mt-6">

                <button
                    @click="saveApiUrl"
                    class="px-5 py-2.5 bg-gray-900 text-white
                           text-sm font-medium rounded-lg
                           hover:bg-gray-800 transition"
                >
                    Simpan
                </button>

                <button
                    @click="resetApiUrl"
                    class="px-5 py-2.5 border border-gray-300
                           text-gray-700 text-sm font-medium
                           rounded-lg hover:bg-gray-100 transition"
                >
                    Reset Default
                </button>

            </div>
        </div>
    </div>
</template>