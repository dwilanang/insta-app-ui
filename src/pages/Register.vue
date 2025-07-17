<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50">
    <div class="w-full max-w-md bg-white p-8 rounded shadow">
      <!-- Logo dan Judul -->
      <div class="text-center mb-6">
        <img src="/logo.png" alt="Logo" class="w-20 mx-auto mb-2" />
      </div>
      <h2 class="text-2xl font-bold mb-6 text-center">Daftar Akun</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Nama</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full border px-3 py-2 rounded"
          />
          <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name[0] }}</p>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full border px-3 py-2 rounded"
          />
          <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email[0] }}</p>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Password</label>
          <input
            v-model="form.password"
            type="password"
            class="w-full border px-3 py-2 rounded"
          />
          <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password[0] }}</p>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Daftar
        </button>
      </form>
      <p class="mt-4 text-center text-sm">
        Sudah punya akun?
        <router-link to="/login" class="text-blue-500 hover:underline">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const router = useRouter()
const auth = useAuthStore()

const form = ref({
  name: '',
  email: '',
  password: ''
})

const errors = ref({})

const register = async () => {

    errors.value = {}

    try {

        const resultRegister = await axios.post('/api/v1/register', form.value)
    
        if(resultRegister.data.status){
            const resultLogin = await auth.login(form.value.email, form.value.password)
    
            if (resultLogin.data.status) {
                router.push('/feed')
            } 
        }
    } catch (error) {
        if (error.response?.data?.errors) {
        errors.value = error.response.data.errors
        }
    }
}
</script>
