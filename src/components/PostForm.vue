<template>
  <form @submit.prevent="submitPost" class="bg-white border border-gray-200 p-4 rounded-lg shadow-sm space-y-3 transition-all duration-300 ease-in-out">
    <!-- Caption Textarea Only -->
    <div class="relative">
      <textarea
        ref="textareaRef"
        v-model="form.caption"
        placeholder="Apa yang kamu pikirkan?"
        class="w-full p-2 border border-gray-300 rounded resize-none focus:ring-2 focus:ring-blue-500"
        rows="2"
        @focus="isFocused = true"
        @blur="handleBlur"
      ></textarea>
      <p v-if="imageError" class="text-sm text-red-500">{{ imageError }}</p>
    </div>

    <!-- Extra Options (only if focused or has image) -->
    <transition name="fade">
      <div v-if="isFocused || preview" class="space-y-3 transition-all duration-300 ease-in-out">
        <!-- Preview -->
        <div v-if="preview">
          <img :src="preview" class="max-h-64 object-contain rounded border mb-2" />
        </div>

        <!-- Upload and Submit in Row -->
        <div class="flex justify-between items-center gap-4">
          <!-- File upload -->
          <input
            type="file"
            accept="image/*"
            @change="handleImageUpload"
            class="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading || (!form.caption && !form.image)"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {{ loading ? 'Posting...' : 'Post' }}
          </button>
        </div>
      </div>
    </transition>
  </form>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import axios from 'axios'

const form = ref({ caption: '', image: null })
const preview = ref(null)
const loading = ref(false)
const isFocused = ref(false)
const textareaRef = ref(null)
const imageError = ref('')

const emit = defineEmits(['posted'])

function handleBlur() {
  setTimeout(() => {
    if (!preview.value) {
      isFocused.value = false
    }
  }, 200)
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  imageError.value = ''

  if (!file) return
  
  // Cek ukuran file (misalnya maksimal 2MB)
  const maxSize = 2 * 1024 * 1024 // 2MB
  if (file.size > maxSize) {
    imageError.value = 'Ukuran gambar maksimal 2MB.'
    return
  }

  const img = new Image()
  img.onload = () => {
    // Validasi ukuran (contoh: minimal 300x300)
    if (img.width < 300 || img.height < 300) {
      imageError.value = 'Ukuran gambar minimal 300x300px.'
      return
    }

    // Lanjutkan set preview
    preview.value = URL.createObjectURL(file)
    form.value.image = file
  }
  img.src = URL.createObjectURL(file)
}

async function submitPost() {
  if (imageError.value) return

  loading.value = true
  try {
    const data = new FormData()
    data.append('caption', form.value.caption)
    if (form.value.image) {
      data.append('image', form.value.image)
    }

    await axios.post('/api/v1/posts', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    // Reset
    form.value.caption = ''
    form.value.image = null
    preview.value = null
    isFocused.value = false

    emit('posted', true)
  } catch (err) {
    console.error('Gagal posting:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
