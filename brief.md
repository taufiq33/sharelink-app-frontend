# 💼 Project Brief — Sharelink App (Frontend)

## 🧠 Konsep Utama

**Sharelink App** adalah aplikasi web yang memungkinkan pengguna membuat profil publik berisi kumpulan tautan pribadi — mirip dengan Linktree, tetapi dengan sistem login, tracking klik, notifikasi, dan dashboard untuk user maupun admin.

Backend sudah selesai (Express + PostgreSQL). Frontend akan dibuat menggunakan **React + Tailwind + ShadCN UI + React Hook Form + Zod + Redux Toolkit**.

---

## ⚙️ Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| Core | React + Vite |
| UI | TailwindCSS + ShadCN UI |
| Form | React Hook Form + Zod |
| State | Redux Toolkit (custom creator) |
| API | Axios instance + interceptor (auth refresh) |
| Routing | React Router v7 |
| Auth | Access & Refresh token |
| Extra | PWA-ready (opsional tahap lanjut) |

---

## 📋 Fitur Utama

### 🔐 1. Authentication & Session

- Register, login, logout
- Auto-refresh token (via Axios interceptor)
- Multi-session support (lihat device aktif)
- Hapus sesi lain dari halaman Active Sessions

### 🧑‍💼 2. User Dashboard

- Lihat daftar link
- Tambah, edit, hapus, dan toggle aktif/nonaktif link
- Reorder link dengan drag & drop
- Lihat statistik klik per link
- Lihat notifikasi sistem
- Edit profil & password
- Ganti password
- Preview public profile

### 🌐 3. Public Profile Page

- Route: `/u/:username`
- Menampilkan semua link aktif milik user
- Klik link → trigger tracking `/public/tracklink`
- Tampilan clean, minimal, mobile-first
- Guest dapat melaporkan user/link (anonymous report)

### 🔔 4. Notifications

- Lihat semua notifikasi (`GET /notifications`)
- Tandai sebagai dibaca
- Klik redirect ke `redirectURL`
- Polling notifikasi baru setiap ±30 detik

### 🧑‍⚖️ 5. Admin Dashboard

- **User Management:** Lihat, blokir user
- **Link Management:** Hapus link spam
- **Report Management:**
  - Lihat daftar semua laporan dari user/guest
  - Filter berdasarkan status: waiting, done, rejected
  - Update status laporan
  - Ambil tindakan: kirim peringatan, hapus link, ban user
- **Notification Management:** Broadcast notifikasi
- **Dashboard Statistik:**
  - Total user, link, report, klik
  - Top Reported User & Link

### 📊 6. Report System

- User login atau guest dapat melaporkan:
  - Link (spam, scam, konten tidak pantas)
  - User (penyalahgunaan, konten ofensif)
- Form report berisi:
  - Tipe (user/link)
  - Target ID (linkId/userId)
  - Alasan (text)
- Guest reporter: `userReporter = null`

---

## 🧭 Routing Structure

| Role | Path | Description |
|------|------|-------------|
| **Public** | `/` | Landing page |
| | `/u/:username` | Profil publik user (daftar link) |
| | `/report` | Form pelaporan user/link (guest allowed) |
| **Auth** | `/login` | Form login |
| | `/register` | Form register |
| **User** | `/dashboard` | Dashboard utama user |
| | `/dashboard/links` | Manajemen link (CRUD + reorder) |
| | `/dashboard/notifications` | Lihat notifikasi dari admin |
| | `/dashboard/sessions` | Manajemen Device/session |
| | `/dashboard/settings` | Setting profile & password |
| **Admin** | `/admin` | Dashboard utama admin |
| | `/admin/reports` | Daftar laporan |
| | `/admin/users` | Manajemen user |
| | `/admin/links` | Manajemen link |
| | `/admin/notifications` | Manajemen notifikasi |

---

## 🎨 Design Direction

### Style Umum

- Gunakan **ShadCN UI** untuk komponen inti (Button, Input, Card, Table, Dialog, Tabs, Avatar)
- Gunakan **TailwindCSS** untuk layout, spacing, responsive, dan warna
- Sediakan **dark mode toggle** berbasis class (`dark:`)
- Style keseluruhan: **elegan, clean, dan modern dashboard feel**

### 🌤️ Light Mode

| Elemen | Warna | Tailwind Class |
|--------|-------|----------------|
| Background utama | `#F9FAFB` | `bg-gray-50` |
| Card background | `#FFFFFF` | `bg-white` |
| Primary | `#2563EB` (blue-600) | `bg-blue-600` |
| Accent | `#1E3A8A` (blue-900) | `text-blue-900` |
| Text utama | `#111827` | `text-gray-900` |
| Text sekunder | `#6B7280` | `text-gray-500` |
| Border | `#E5E7EB` | `border-gray-200` |
| Hover button | `#1D4ED8` | `hover:bg-blue-700` |
| Radius | 1rem | `rounded-2xl` |
| Shadow | Soft | `shadow-sm` |

**Feel:** Ringan, bersih, white-space lega — vibe seperti dashboard Vercel/Supabase.

### 🌙 Dark Mode

| Elemen | Warna | Tailwind Class |
|--------|-------|----------------|
| Background utama | `#0F172A` | `dark:bg-slate-900` |
| Card background | `#1E293B` | `dark:bg-slate-800` |
| Primary | `#3B82F6` (blue-500) | `dark:bg-blue-500` |
| Accent | `#60A5FA` (blue-400) | `dark:text-blue-400` |
| Text utama | `#F9FAFB` | `dark:text-gray-100` |
| Text sekunder | `#9CA3AF` | `dark:text-gray-400` |
| Border | `#334155` | `dark:border-slate-700` |
| Hover button | `#2563EB` | `dark:hover:bg-blue-600` |

**Feel:** Tenang, lembut, modern — mirip tema Linear/Notion dark mode.

### 🌗 Mode Switching

- Gunakan **class-based toggle**
- Simpan preferensi di `localStorage`
- Auto-deteksi tema sistem dengan `window.matchMedia('(prefers-color-scheme: dark)').matches`
- ShadCN menyediakan komponen: `npx shadcn@latest add mode-toggle`

### ✨ Komponen Style (ShadCN + Tailwind)

| Komponen | Style |
|----------|-------|
| **Card** | `rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm` |
| **Button** | `bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg` |
| **Input** | `border-gray-300 dark:border-slate-700 focus:ring-blue-500` |
| **Sidebar** | `bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800` |
| **Table Header** | `bg-gray-100 dark:bg-slate-800 font-semibold` |
| **Avatar** | `ring-2 ring-blue-500 dark:ring-blue-400` |

---

## 🧩 Validasi Form (Zod + RHF)

Semua form divalidasi dengan **Zod schema**, diintegrasikan langsung ke React Hook Form melalui `zodResolver`.

```ts
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
```

---

## ✅ User Stories

### 👤 User / Guest

- Sebagai user, saya bisa membuat dan mengelola daftar link saya sendiri
- Sebagai user, saya bisa mengubah profil saya (username, bio, photo profile)
- Sebagai user, saya bisa melihat notifikasi yang dikirim oleh admin
- Sebagai user, saya bisa melihat statistik jumlah klik per link
- Sebagai user, saya ingin menghapus sesi aktif lain jika akun saya digunakan di perangkat lain
- Sebagai user/guest, saya bisa melaporkan link atau user lain dengan alasan tertentu
- Sebagai guest, saya bisa melaporkan tanpa login (anonymous report)

### 🧑‍💼 Admin

- Sebagai admin, saya bisa melihat daftar semua laporan dari user/guest
- Sebagai admin, saya bisa mengubah status laporan (waiting → done/rejected)
- Sebagai admin, saya bisa menghapus link yang dilaporkan
- Sebagai admin, saya bisa memberi peringatan (notif) ke user yang dilaporkan
- Sebagai admin, saya bisa memblokir user bila pelanggaran berat
- Sebagai admin, saya bisa melihat statistik pelaporan untuk setiap user dan link
- Sebagai admin, saya bisa melihat ringkasan data di dashboard (jumlah user, link, report)

---

## 🧱 Layout Direction

### 🧑‍💼 User Dashboard

- **Sidebar kiri:** Logo + menu (Dashboard, Links, Notifications, Sessions, Settings)
- **Main area:**
  - Card ringkas statistik (total klik, link aktif)
  - Table daftar link
  - Modal dialog untuk Add/Edit Link

### 🧑‍⚖️ Admin Dashboard

- **Sidebar navigasi:** Users, Links, Reports, Notifications
- **Header bar:** Avatar profil kanan atas
- **Main area:**
  - Table utama berisi data user/link/report
  - Filter & action button (Delete, Block, Warn)

### 📱 Public Profile

- Avatar user di atas
- Nama & bio di tengah
- List tombol link vertikal (rounded-full, hover-scale)
- Tampilan mobile-friendly dan bersih

---

## 📂 File Structure

```
src/
├── assets/                # Gambar, icon statis, logo
│   ├── icons/
│   ├── images/
│   └── illustrations/
│
├── components/            # Reusable UI components
│   ├── ui/                # ShadCN components (card, button, input)
│   ├── layout/            # Navbar, Sidebar, Footer, DashboardLayout
│   ├── form/              # InputField, SelectField, RHFController
│   └── feedback/          # Alert, Toast, Spinner, Modal
│
├── features/              # Feature modules (Redux + UI + logic)
│   ├── auth/
│   │   ├── hooks/
│   │   ├── slices/
│   │   ├── pages/         # LoginPage, RegisterPage
│   │   └── components/    # LoginForm, RegisterForm
│   ├── links/
│   ├── notification/
│   ├── user/
│   └── admin/
│
├── hooks/                 # Custom global hooks (useTheme, useAuth)
│
├── lib/                   # Config & utilities
│   ├── axios.js
│   ├── auth.js
│   ├── formSchema/
│   └── utils/
│
├── pages/                 # Route-level components
│   ├── dashboard/
│   ├── admin/
│   ├── public/
│   └── auth/
│
├── router/                # React Router v7 setup
│   ├── index.jsx
│   └── ProtectedRoute.jsx
│
├── store/                 # Redux Toolkit setup
│   ├── index.js
│   ├── rootReducer.js
│   └── middlewares.js
│
├── styles/                # Tailwind + custom styles
│   ├── globals.css
│   └── theme.css
│
├── App.jsx
├── main.jsx
└── index.html
```

---

## 🧭 Wireframe (Text Layout)

### 🏠 Public Pages

#### Landing Page
```
[Navbar]
| Logo | Menu: Home | Features | Login/Register |

[Hero Section]
"Share links easily, beautifully"
[CTA: Get Started]

[Features Section]
[Card 1] [Card 2] [Card 3]

[Footer]
```

#### Public Profile (`/u/:username`)
```
[Avatar]
[Username]
[Bio]

[Link Button 1]
[Link Button 2]
[Link Button 3]

[Report Button]
```

### 👤 User Dashboard

#### Dashboard Home
```
[Sidebar] [Header with Notification Bell]

[Stats Cards]
Total Links | Total Clicks | Active Links

[Recent Links Table]
| Title | URL | Clicks | Status | Actions |
```

#### Links Page
```
[Sidebar] [Header]

[Add Link Button]

[Links Table - Drag & Drop]
| ☰ | Title | URL | Clicks | Active | Actions |
```

#### Notifications
```
[Sidebar] [Header]

[Notification List]
[Card] Title - Message - Time [Mark as Read]
[Card] Title - Message - Time [Mark as Read]
```

#### Sessions
```
[Sidebar] [Header]

[Active Sessions List]
[Card] Device - Browser - Location - Last Active [Revoke]
```

### 🧑‍⚖️ Admin Dashboard

#### Admin Home
```
[Sidebar] [Header]

[Summary Cards]
Total Users | Total Links | Pending Reports | Total Clicks

[Recent Activity Table]
```

#### Manage Reports
```
[Sidebar] [Header]

[Filter] Status: All | Waiting | Done | Rejected

[Reports Table]
| Type | Target | Reporter | Reason | Status | Actions |
```

---

## ⚙️ Integrasi Penting

- **Axios Interceptor:** Simpan di `lib/axios.js`, auto-refresh token & handle unauthorized
- **Persist Auth:** Gunakan `localStorage` untuk token
- **Theme Toggle:** Letakkan di layout utama, biar global
- **Form Validation:** Gabungkan RHF + Zod
- **Notification Hook:** Realtime update dengan polling (atau WebSocket di tahap lanjut)

---

## 💡 Bonus (Tahap 2)

- PWA Installable
- Skeleton loading / shimmer
- Infinite scroll notifikasi
- WebSocket untuk real-time notification

---

## 🎯 Goal Akhir

Frontend tampil profesional, interaktif, dan konsisten dengan backend yang sudah dibangun. User & admin sama-sama dapat experience yang clean, cepat, dan modern.
