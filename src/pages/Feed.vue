<template>
  <div class="max-w-xl mx-auto py-8 space-y-6">
    <PostForm @posted="onPosted" />
    <h1 class="text-2xl font-bold text-gray-800">Feed</h1>

    <div v-for="post in posts" :key="post.id" class="bg-white rounded-lg shadow p-4">
      <div class="flex justify-between items-center">
        <div>
          
        </div>

        <div
          class="relative"
          v-if="post.user_id === auth.user.id"
          :ref="el => setMenuRef(el, post.id)"
        >
          <svg
            @click.stop="toggleMenu(post.id)"
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 3.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 6.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
            />
          </svg>

          <!-- Menu dropdown -->
          <div
            v-if="post.showMenu"
            class="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50"
          >
            <button
              @click="deletePost(post.id)"
              class="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
            >
              Hapus Postingan
            </button>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3 mb-2">
        <img :src="post.profile_image_url" class="w-10 h-10 rounded-full object-cover" />
        <div>
          <p class="font-semibold">{{ post.user.name }}</p>
          <p class="text-xs">{{ formatDate(post.created_at) }}</p>
        </div>
      </div>
      <img v-if="post.image" :src="post.image_url" class="max-h-96 w-full object-contain rounded-lg" />
      <div class="p-4">
        <p class="text-gray-800 mb-3">{{ post.caption }}</p>
        <div class="flex items-center space-x-6">
          <button @click="likePost(post.id)" class="flex items-center space-x-1" :class="post.is_liked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'">
            <svg xmlns="http://www.w3.org/2000/svg" :fill="post.is_liked ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.122-4.5-4.75-4.5-1.84 0-3.417 1.07-4.25 2.625A5.001 5.001 0 0 0 3 8.25c0 5.25 9 11.25 9 11.25s9-6 9-11.25z" />
            </svg>
            <span v-if="post.likes_count">({{ post.likes_count }})</span>
          </button>

          <button @click="toggleComments(post.id)" class="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l.88-2.64a9.02 9.02 0 0 1 3.61-4.33A9 9 0 0 1 21.75 12c0 4.97-4.03 9-9 9a8.985 8.985 0 0 1-5.207-1.684l-4.293.977a.75.75 0 0 1-.91-.91l.977-4.293A8.985 8.985 0 0 1 2.25 12z" />
            </svg>
            <span v-if="post.comments_count">
              ({{ post.comments_count }})
            </span>
            <span v-else>
                <span v-if="post.comments?.length">
                  ({{ post.comments?.length }})
                </span>
            </span>
          </button>
        </div>
        
        <div v-if="post.showComments" class="mt-4 space-y-2">
          <!-- List komentar -->
          <div v-if="post.comments?.length" v-for="comment in post.comments" :key="comment.id" class="text-sm text-gray-700 border-b pb-1">
                <!-- Box komentar -->
                <div class="flex justify-between items-center">
                    <p class="text-sm"><strong>{{ comment.user.name }}:</strong> {{ comment.body }}</p>
                    
                    <div
                      class="relative"
                      v-if="comment.user_id === auth.user.id"
                      :ref="el => setCommentMenuRef(el, comment.id)"
                    >
                         <!-- Titik 3 hanya jika user adalah pemilik komentar -->
                          <svg
                            @click.stop="comment.showMenu = !comment.showMenu"
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-700"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M10 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 3.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 6.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
                            />
                          </svg>

                          <!-- Menu dropdown hapus komentar -->
                          <div
                            v-if="comment.showMenu"
                            class="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50"
                          >
                            <button
                              @click="deleteComment(post.id, comment.id)"
                              class="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-100"
                            >
                              Hapus Komentar
                            </button>
                          </div>
                          <!-- /Menu dropdown hapus komentar -->
                    </div>
                </div>
                <!-- /List komentar -->
          </div>
          <!-- /List komentar -->
          <div v-else class="text-sm text-gray-400">Belum ada komentar</div>
          
          <!-- Form komentar -->
          <form @submit.prevent="submitComment(post.id)" class="space-y-2">
            <textarea
              v-model="post.newComment"
              rows="2"
              placeholder="Tulis komentar..."
              class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />

            <div class="text-right">
              <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-1.5 px-4 rounded-lg">
                Kirim
              </button>
            </div>
          </form>
          <!-- /Form komentar -->

        </div>
      </div>
    </div>
    <div v-if="isLoading" class="text-center py-6 text-gray-400 text-sm">
      Memuat postingan...
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/id'
import { useAuthStore } from '../store/auth'

const auth = useAuthStore()

import PostForm from '../components/PostForm.vue'

dayjs.extend(relativeTime)
dayjs.locale('id')

const router = useRouter()

const posts = ref([])
const currentPage = ref(1)
const isLoading = ref(false)
const hasMore = ref(true)
const menuRefs = ref({})
const commentMenuRefs = ref({})

function onPosted(force = false) {
  fetchPosts(force)
}

const fetchPosts = async (force = false) => {
  if (!force && (isLoading.value || !hasMore.value)) return

  isLoading.value = true
  try {
    if (force) {
      currentPage.value = 1
      hasMore.value = true
    }

    const res = await axios.get('/api/v1/posts', {
      params: { page: currentPage.value, per_page: 4 }
    })

    const newPosts = res.data.items.map(post => ({
      ...post,
      showComments: false,
      showMenu: false,
      comments: [],
      newComment: ''
    }))

    if (newPosts.length < 4) {
      hasMore.value = false
    }

    if (currentPage.value === 1) {
      posts.value = [...newPosts]
    } else {
      posts.value.push(...newPosts)
    }

    currentPage.value++
  } catch (err) {
    if (err.status == 401) {
      router.push('/login')
    }
  } finally {
    isLoading.value = false
  }
}


const likePost = async (postId) => {
  try {
    await axios.post(`/api/v1/posts/${postId}/like`)
    console.log('Like berhasil')
   
    const post = posts.value.find(p => p.id === postId)
    if (post) {
      if (post.is_liked) {
        post.is_liked = false
        post.likes_count = (post.likes_count || 1) - 1
      } else {
        post.is_liked = true
        post.likes_count = (post.likes_count || 0) + 1
      }
    }
  } catch (error) {
    console.error('Gagal like:', error)
  }
}

const toggleComments = async (postId) => {
  const post = posts.value.find(p => p.id === postId)
  if (!post) return

  post.showComments = !post.showComments

  if (post.showComments) {
    if (!Array.isArray(post.comments)) post.comments = []

    if (post.comments.length === 0) {
      try {
        const res = await axios.get(`/api/v1/posts/${postId}/comments`)
        post.comments = res.data.data
      } catch (error) {
        console.error('Gagal mengambil komentar:', error)
      }
    }
  }
}

const submitComment = async (postId) => {
  const post = posts.value.find(p => p.id === postId)
  if (!post || !post.newComment.trim()) return

  try {
    await axios.post(`/api/v1/posts/${postId}/comments`, {
      body: post.newComment
    })
    post.newComment = ''

    // Fetch komentar terbaru setelah berhasil kirim
    const res = await axios.get(`/api/v1/posts/${postId}/comments`)
    post.comments = res.data.data
  } catch (error) {
    console.error('Gagal mengirim komentar:', error)
  }
}

const handleScroll = () => {
  const scrollY = window.scrollY
  const innerHeight = window.innerHeight
  const offsetHeight = document.documentElement.offsetHeight

  // Jika scroll sudah mendekati bawah (100px)
  if (scrollY + innerHeight + 100 >= offsetHeight) {
    fetchPosts()
  }
}

const toggleMenu = (postId) => {
  posts.value = posts.value.map(p =>
    p.id === postId ? { ...p, showMenu: !p.showMenu } : { ...p, showMenu: false }
  )
}

const deletePost = async (postId) => {
  try {
    await axios.delete(`/api/v1/posts/${postId}`)
    posts.value = posts.value.filter(p => p.id !== postId)
  } catch (error) {
    console.error('Gagal hapus postingan:', error)
  }
}

async function deleteComment(postId, commentId) {
  try {
    await axios.delete(`/api/v1/comments/${commentId}`)
    const post = posts.value.find(p => p.id === postId)
    if (post) {
      post.comments = post.comments.filter(c => c.id !== commentId)
    }
  } catch (err) {
    console.error('Gagal hapus komentar', err)
  }
}

function setMenuRef(el, postId) {
  if (el) {
    menuRefs.value[postId] = el
  }
}

function handleClickOutside(event) {
  for (const post of posts.value) {
    const menuEl = menuRefs.value[post.id]
    if (menuEl && !menuEl.contains(event.target)) {
      post.showMenu = false
    }
  }
}

function setCommentMenuRef(el, commentId) {
  if (el) {
    commentMenuRefs.value[commentId] = el
  }
}

function handleClickOutsideComment(event) {
  for (const [commentId, el] of Object.entries(commentMenuRefs.value)) {
    if (el && !el.contains(event.target)) {
  
      for (const post of posts.value) {
        const comment = post.comments.find(c => c.id == commentId)
        if (comment) comment.showMenu = false
      }
    }
  }
}

onMounted(() => {
  fetchPosts()
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('click', handleClickOutside)
  window.addEventListener('click', handleClickOutsideComment)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('click', handleClickOutsideComment)
})

const formatDate = (dateString) => {
  const timeAgo = dayjs(dateString).fromNow()
  const fullDate = dayjs(dateString).format('DD MMM YYYY')
  return `${timeAgo} • ${fullDate}`
}
</script>
