<template>
  <div class="max-w-xl mx-auto mt-10 bg-white text-zinc-900 p-6 rounded shadow">
    <h1 class="text-2xl font-bold mb-6">Edit Profile</h1>

    <!-- Foto Profil -->
    <div class="mb-6 text-center">
      <img
        :src="preview || defaultAvatar"
        alt="Avatar"
        class="w-24 h-24 rounded-full object-cover mx-auto mb-2 border"
      />
      <input type="file" @change="onFileChange" accept="image/*" class="block w-full text-sm text-zinc-600 mt-2" />
    </div>

    <!-- Form -->
    <form @submit.prevent="updateProfile">
      <div class="mb-4">
        <label class="block mb-1 font-medium">Name</label>
        <!-- <input v-model="form.name" class="w-full border border-zinc-300 rounded px-3 py-2" /> -->
        <p class="px-3 py-2 bg-zinc-100 border border-zinc-300 rounded">
          {{ form.name }}
        </p>
      </div>

      <div class="mb-4">
        <label class="block mb-1 font-medium">Email</label>
        <p class="px-3 py-2 bg-zinc-100 border border-zinc-300 rounded">
          {{ form.email }}
        </p>
      </div>
    
      <button type="submit" :disabled="!form.photo" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Simpan
      </button>
    </form>

    <p v-if="success" class="text-green-500 mt-4">Profile updated successfully!</p>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

import { useAuthStore } from '../store/auth'

const auth = useAuthStore()

var defaultAvatar = 'https://ui-avatars.com/api/?name=user&background=random'
const preview = ref(null)

const form = ref({
  name: '',
  email: '',
  photo: null
})

const message = ref('')
const success = ref(false)

onMounted(() => {
  form.value.name = auth.user?.name || ''
  form.value.email = auth.user?.email || ''
   console.log(auth.user?.profile_image)
  defaultAvatar = auth.user?.profile_image || (`https://ui-avatars.com/api/?name=${auth.user?.name || 'user'}&background=random`)
})

function onFileChange(event) {
  const file = event.target.files[0]
  if (file) {
    form.value.photo = file

    const reader = new FileReader()
    reader.onload = () => {
      preview.value = reader.result
    }
    reader.readAsDataURL(file)
  }
}

const updateProfile = async () => {
    message.value = ''
    success.value = false

    try {
        const formData = new FormData()
        // formData.append('name', form.value.name)

        if (form.value.photo) {
            formData.append('profile_image', form.value.photo)
        }

        const resp = await axios.post('/api/v1/profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        success.value = resp.data.status
        defaultAvatar = resp.data.data.photo_url
        message.value = resp.data.message
    } catch (error) {
        console.error('Update failed:', error)
    }
}
</script>