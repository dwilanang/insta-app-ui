# 📸 Insta App - Frontend

Ini adalah frontend dari aplikasi **Insta App**, sebuah platform media sosial sederhana di mana pengguna dapat mendaftar, login, membuat postingan (teks + gambar), memberi like, dan menulis komentar. Dibangun menggunakan **Vue 3 + Tailwind CSS**.

---

## ✨ Fitur Utama

- 🔐 **Login** – Autentikasi pengguna dengan cookie session (Laravel Sanctum support).
- 📝 **Register** – Mendaftar akun baru.
- 📷 **Buat Postingan** – Unggah teks dan gambar.
- 💬 **Komentar** – Komentari postingan pengguna lain.
- ❤️ **Like** – Like dan unlike postingan.

## 🚀 Teknologi yang Digunakan

- **Vue 3 Composition API**
- **Tailwind CSS**
- **Vite**
- **Axios**
- **Pinia**
- **Docker** (opsional untuk deployment)

## 📂 Struktur Proyek
```
src/
├── assets/         # Aset gambar/logo
├── components/     # Komponen UI (PostForm, PostItem, CommentList, dsb)
├── pages/          # Halaman utama (Login, Register, Feed)
├── router/         # Vue Router setup
├── services/       # Axios instance dan API helper
├── store/          # (Opsional) Pinia store
└── App.vue
```

⚙️ Konfigurasi API
Pastikan untuk mengatur URL API di file `src/main.js` sesuai dengan backend yang Anda gunakan.

```javascript
    axios.defaults.baseURL = 'http://localhost:8000'
```

## 📦 Instalasi Lokal (Tanpa Docker)

```bash
# 1. Clone repo
git clone https://github.com/username/insta-app-ui.git
cd insta-app-ui

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev
```

## 📦 Instalasi menggunakan Docker

```bash
# Install docker desktop
macos : https://docs.docker.com/desktop/setup/install/mac-install/
windows : https://docs.docker.com/desktop/setup/install/windows-install/

# 1. Build image
docker build -t insta-app-frontend .

# 2. Jalankan container
docker run -d -p 8000:80 insta-app-frontend
```