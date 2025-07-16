<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    
    <Navbar v-if="auth.user" />

    <main class="p-4">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from './store/auth'
import Navbar from './components/Navbar.vue'

const auth = useAuthStore()
const router = useRouter()

function logout() {
  auth.logout()
  router.replace('/login')
}
</script>
