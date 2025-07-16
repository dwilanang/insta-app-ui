<template>
  <div class="text-white flex justify-center items-center">
    <div class="flex w-full max-w-5xl h-[600px]">
      
      <!-- Left: Gambar -->
      <div class="hidden md:flex w-1/2 justify-center items-center">
        <!-- <img src="/mock-image.png" alt="Preview" class="object-contain h-full" /> -->
      </div>

      <!-- Right: Form -->
      <div class="w-full md:w-1/2 flex flex-col justify-center items-center px-4">
        <div class="w-full max-w-sm space-y-4">
            <h1 class="text-4xl font-logo text-center mb-6 text-black">InstaApp</h1>
            <input
                v-model="email"
                type="text"
                placeholder="Email"
                class="w-full text-black border px-3 py-2 rounded focus:outline-none"
            />
            <!-- <p v-if="errors.email" class="text-red-400 text-sm mt-1">
                {{ errors.email[0] }}
            </p> -->
            <input
                v-model="password"
                type="password"
                placeholder="Password"
                class="w-full text-black border px-3 py-2 rounded focus:outline-none"
            />
            <!-- <p v-if="errors.password" class="text-red-400 text-sm mt-1">
                {{ errors.password[0] }}
            </p> -->

            <button
                @click="login"
                class="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
            >
                Masuk
            </button>
            <p v-if="errorMsg" class="text-red-400 text-sm text-center mt-2">
                {{ errorMsg }}
            </p>

            <div class="flex items-center gap-2 justify-center text-sm text-zinc-400">
                <span class="w-1/4 h-px bg-zinc-700"></span>
            </div>
        </div>

        <div class="w-full max-w-sm mt-6 text-center text-sm">
          <p class="text-zinc-400">
            Belum punya akun?
            <span class="text-blue-500 cursor-pointer"><a href="/register">Daftar</a></span>
          </p>
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
   
    if (result.status) {
        router.push('/feed')
    } else {
        errorMsg.value = result.response.data.message
        errors.value = result.response.data.errors || {}
    }
}
</script>

<style scoped>
.font-logo {
  font-family: 'Billabong', cursive; /* optional Instagram-like font */
}
</style>
