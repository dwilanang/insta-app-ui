<template>
  <nav class="bg-white text-zinc-900 border-b border-zinc-200 px-6 py-3 flex justify-between items-center shadow-sm">
    <!-- Logo -->
    <RouterLink to="/feed" class="text-2xl font-bold tracking-tight text-zinc-900 hover:text-blue-600">
      <img src="/logo.png" alt="Logo" class="h-8 w-auto" />
    </RouterLink>

    <!-- Menu -->
    <div class="flex items-center gap-6 text-sm font-medium">
      <RouterLink to="/feed" class="hover:text-blue-600 transition">Feed</RouterLink>
      <RouterLink to="/profile" class="hover:text-blue-600 transition">Profile</RouterLink>
      <button @click="logout" class="text-red-500 hover:text-red-600 transition">Logout</button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const router = useRouter()
const auth = useAuthStore()

function logout() {
  auth.logout()
  router.push('/login')
}
</script>
