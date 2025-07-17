<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-10">
      
      <!-- Left Image Column -->
      <div class="flex justify-center items-center">
        <div class="text-center">
          <img src="/insta-app.png" alt="InstaApp Logo" class="w-40 md:w-56 mx-auto mb-4" />
          <!-- <h1 class="text-3xl md:text-5xl font-bold text-gray-800">Insta App</h1> -->
        </div>
      </div>

      <!-- Right Form Column -->
      <div class="bg-white rounded-xl shadow-md p-8">
        <form @submit.prevent="login">
          <div class="space-y-4">
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            <button
              type="submit"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition duration-200"
            >
              Masuk
            </button>
            <p v-if="errorMsg" class="text-red-400 text-sm text-center mt-2">
              {{ errorMsg }}
            </p>
          </div>
        </form>

        <div class="mt-6 text-center text-sm text-gray-500">
          Belum punya akun?
          <router-link to="/register" class="text-blue-500 hover:underline">Daftar</router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = useAuthStore()

const errors = ref({})
const errorMsg = ref('')

async function login() {
    errorMsg.value = ''
    errors.value = {}
  
    const result = await auth.login(email.value, password.value)
    
    if (result.status != 200) {
        errorMsg.value = result.response?.data?.message
        errors.value = result.response?.data?.errors || {}
    } else {
       router.push('/feed')
    }
}
</script>

<style scoped>
.font-logo {
  font-family: 'Billabong', cursive; /* optional Instagram-like font */
}
</style>
