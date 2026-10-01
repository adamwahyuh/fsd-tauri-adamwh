
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const auth = useAuthStore();

const router = useRouter();
const route = useRoute();

const currentTime = ref('');

let timer: number;

const updateTime = () => {
    currentTime.value = new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
};

const handleLogout = async () => {
    await auth.logout();
    router.push('/login');
};

onMounted(async () => {
    if (!auth.user) {
        await auth.fetchUser();
    }

    updateTime();
    timer = window.setInterval(updateTime, 1000);
});

onUnmounted(() => {
    clearInterval(timer);
});
</script>

<template>
    <div class="min-h-screen bg-gray-100 flex">

        <!-- Sidebar -->
        <aside
            class="w-64 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 z-40"
        >
            <!-- Logo -->
            <div class="h-20 px-6 flex items-center border-b border-gray-200">
                <h1 class="text-xl font-bold text-gray-900">
                    Monitoring App
                </h1>
            </div>

            <!-- Navigation -->
            <nav class="flex-1 px-4 py-6 space-y-2">

                <!-- Home -->
                <RouterLink
                    :to="{ name: 'home' }"
                    class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition"
                    :class="
                        route.name === 'home'
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    "
                >
                    <span>Home</span>
                </RouterLink>

                <!-- Setting -->
                <RouterLink
                    :to="{ name: 'setting' }"
                    class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition"
                    :class="
                        route.name === 'setting'
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    "
                >
                    <span>Setting</span>
                </RouterLink>

                <!-- About -->
                <RouterLink
                    :to="{ name: 'about' }"
                    class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition"
                    :class="
                        route.name === 'about'
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    "
                >
                    <span>About</span>
                </RouterLink>

            </nav>

            <!-- User / Logout -->
            <div class="border-t border-gray-200 p-4">

                <div class="mb-4">
                    <p class="text-sm font-semibold text-gray-900 truncate">
                        {{ auth.user?.name }}
                    </p>

                    <p class="text-xs text-gray-500 mt-1">
                        {{ currentTime }}
                    </p>
                </div>

                <button
                    @click="handleLogout"
                    class="w-full px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition text-left"
                >
                    Logout
                </button>

            </div>
        </aside>

        <!-- Main Content -->
        <div class="flex-1 ml-64 min-h-screen">

            <!-- Topbar -->
            <header
                class="h-20 bg-white border-b border-gray-200
                       flex items-center px-8"
            >
                <div>
                    <p class="text-sm text-gray-500">
                        Welcome back,
                    </p>

                    <h2 class="font-semibold text-gray-900">
                        {{ auth.user?.name }}
                    </h2>
                </div>
            </header>

            <!-- Content -->
            <main class="max-w-7xl mx-auto px-8 py-8">
                <RouterView />
            </main>

        </div>
    </div>
</template>