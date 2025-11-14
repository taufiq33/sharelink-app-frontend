# 📅 Sharelink App - Frontend Development Timeline

**Start Date:** 21 Oktober 2025
**Working Hours:** 3-4 jam/hari (6 hari/minggu, 1 hari libur)
**Total Estimated Time:** ~8-10 minggu

---

## 🎯 Overview Timeline

| Phase       | Duration  | Description                      |
| ----------- | --------- | -------------------------------- |
| **Phase 1** | Week 1-2  | Setup & Learning Fundamentals    |
| **Phase 2** | Week 3-4  | Authentication & Core Features   |
| **Phase 3** | Week 5-6  | User Dashboard & Link Management |
| **Phase 4** | Week 7-8  | Admin Panel & Reports            |
| **Phase 5** | Week 9-10 | Polish, Testing & Deployment     |

---

## 📆 Detailed Weekly Breakdown

### **Week 1 (27 okt -2 Nov)** - Project Setup & Learning

#### Day 1-2: Project Initialization

- [x] Setup Vite + React project
- [x] Install dependencies (React Router v7, Tailwind, Axios, Redux Toolkit)
- [x] Setup Tailwind config
- [x] Install ShadCN UI CLI: `npx shadcn@latest init`
- [x] Setup folder structure sesuai brief
- [x] Setup ESLint & Prettier
- [x] Git init & first commit

**Resources:**

```bash
npm create vite@latest sharelink-app-frontend -- --template react
cd sharelink-app-frontend
npm install
npm install -D tailwindcss @tailwindcss/vite
npm install react-router-dom@7 axios redux @reduxjs/toolkit react-redux
npx shadcn@latest init
```

#### Day 3-4: Learn ShadCN UI Basics

- [x] Baca dokumentasi ShadCN UI (1 jam)
- [x] Install komponen dasar:
  ```bash
  npx shadcn@latest add button
  npx shadcn@latest add input
  npx shadcn@latest add card
  npx shadcn@latest add dialog
  npx shadcn@latest add label
  ```
- [x] Bikin playground page untuk testing komponen
- [x] Eksplorasi styling dengan Tailwind classes
- [x] Test dark mode toggle

#### Day 5-6: Learn React Hook Form + Zod

- [x] Baca dokumentasi RHF (1 jam)
- [x] Install RHF + Zod:
  ```bash
  npm install react-hook-form zod @hookform/resolvers
  ```
- [x] Bikin sample form sederhana (login form mockup)
- [x] Testing validasi dengan Zod schema
- [x] Integrate dengan ShadCN Input component

**Deliverable Week 1:** Project structure ready, basic understanding RHF + ShadCN

---

### **Week 2 (3 nov - 9 Nov)** - Core Setup & Layout

#### Day 1-2: Axios Setup & Auth Logic

- [x] Setup axios instance di `lib/axios.js`
- [x] Implement interceptor untuk auto-refresh token
- [x] Bikin auth utility functions:
  - `saveToken()`, `getToken()`, `removeToken()`
  - `saveRefreshToken()`, `getRefreshToken()`
- [x] Test API connection ke backend

#### Day 3-4: Redux Store Setup

- [x] Setup Redux store di `store/index.js`
- [x] Bikin auth slice (`features/auth/slices/authSlice.js`)
  - Actions: login, logout, refreshToken, setUser
  - State: user, accessToken, isAuthenticated, loading
- [x] Install Redux DevTools
- [x] Test Redux flow dengan dummy data

#### Day 5-6: Layout Components

- [x] Bikin `DashboardLayout.jsx` (Sidebar + Header)
- [x] Bikin `PublicLayout.jsx` (Navbar + Footer)
- [x] Install ShadCN components:
  ```bash
  npx shadcn@latest add avatar
  npx shadcn@latest add dropdown-menu
  npx shadcn@latest add separator
  ```
- [x] Implement theme toggle (dark mode)
- [x] Setup React Router dengan layout

**Deliverable Week 2:** Axios configured, Redux working, Layout components ready

---

### **Week 3 (10-16 Nov)** - Authentication Flow

#### Day 1-2: Login Page

- [x] Bikin `LoginPage.jsx`
- [x] Bikin Zod schema untuk login (`lib/formSchema/loginSchema.js`)
- [x] Implement login form dengan RHF
- [x] Connect ke Redux action (dispatch login)
- [x] Handle error & success state
- [x] Redirect ke dashboard setelah login

#### Day 3-4: Register Page

- [x] Bikin `RegisterPage.jsx`
- [x] Bikin Zod schema untuk register
- [x] Implement register form dengan RHF
- [x] Validasi password confirmation
- [x] Connect ke API endpoint
- [x] Display Notifikasi sukses register

#### Day 5-6: Protected Routes & Auth Guard

- [x] Bikin `ProtectedRoute.jsx` component
- [x] Implement route protection logic
- [x] Handle redirect ke login jika belum auth
- [x] Test axios interceptor (auto-refresh token)
- [x] Bikin logout functionality
- [x] Handle token expiration

**Deliverable Week 3:** Login & Register working, Protected routes implemented

---

### **Week 4 (17-23 Nov)** - Public Profile & User Dashboard

#### Day 1-2: Public Profile Page (`/u/:username`)

- [x] Bikin `PublicProfilePage.jsx`
- [x] Fetch user data & links dari API
- [x] Display avatar, username, bio
- [x] Render list of active links
- [x] Implement click tracking
- [x] Mobile responsive design

#### Day 3-4: User Dashboard Home

- [x] Bikin `DashboardHomePage.jsx`
- [x] Fetch user statistics (total links, clicks)
- [x] Display stats cards (ShadCN Card)
- [x] Bikin recent links table (ShadCN Table)
- [x] Install:
  ```bash
  npx shadcn@latest add table
  npx shadcn@latest add badge
  ```

#### Day 5-6: User Profile & Settings

- [ ] Bikin `SettingsPage.jsx`
- [ ] Form edit profile (username, bio)
- [ ] Upload photo profile (image upload)
- [ ] Form change password
- [ ] Update profile API integration

**Deliverable Week 4:** Public profile live, User dashboard home & settings working

---

### **Week 5 (24-30 Nov)** - Link Management

#### Day 1-2: Links CRUD - Create & Read

- [ ] Bikin `LinksPage.jsx`
- [ ] Fetch & display all user links
- [ ] Add link dialog (ShadCN Dialog)
- [ ] Form validation untuk link
- [ ] Create link API integration
- [ ] Install:
  ```bash
  npx shadcn@latest add form
  npx shadcn@latest add switch
  ```

#### Day 3-4: Links CRUD - Update & Delete

- [ ] Edit link dialog
- [ ] Update link API integration
- [ ] Delete confirmation dialog
- [ ] Delete link API integration
- [ ] Toggle active/inactive link
- [ ] Show success/error toast
- [ ] Install:
  ```bash
  npx shadcn@latest add toast
  npx shadcn@latest add alert-dialog
  ```

#### Day 5-6: Drag & Drop Reorder

- [ ] Install react-beautiful-dnd atau @dnd-kit/core
- [ ] Implement drag & drop functionality
- [ ] Update order API integration
- [ ] Handle loading state saat reorder
- [ ] Add visual feedback (drag indicator)

**Deliverable Week 5:** Full CRUD links working, Reorder implemented

---

### **Week 6 (1 Des - 7 Des)** - Notifications & Sessions

#### Day 1-2: Notifications List

- [ ] Bikin `NotificationsPage.jsx`
- [ ] Fetch notifications dari API
- [ ] Display notification list
- [ ] Mark as read functionality
- [ ] Redirect to URL on click

#### Day 3-4: Notification Bell & Polling

- [ ] Bikin `NotificationBell.jsx` component
- [ ] Show unread badge count
- [ ] Implement polling (30 detik interval)
- [ ] Dropdown preview (latest 5 notifs)
- [ ] Install:
  ```bash
  npx shadcn@latest add popover
  ```

#### Day 5-6: Active Sessions Management

- [ ] Bikin `SessionsPage.jsx`
- [ ] Fetch active sessions dari API
- [ ] Display device info (useragent, location)
- [ ] Revoke session functionality
- [ ] Show current session indicator

**Deliverable Week 6:** Notifications working with polling, Sessions management done

---

### **Week 7 (8-14 Des)** - Admin Panel Structure

#### Day 1-2: Admin Layout & Navigation

- [ ] Bikin `AdminLayout.jsx`
- [ ] Admin sidebar dengan menu
- [ ] Admin dashboard home
- [ ] Stats cards (total users, links, reports)
- [ ] Install chart library (optional):
  ```bash
  npm install recharts
  ```

#### Day 3-4: User Management

- [ ] Bikin `AdminUsersPage.jsx`
- [ ] Fetch all users
- [ ] Users table dengan filter
- [ ] Block/unblock user action
- [ ] View user details dialog
- [ ] Install:
  ```bash
  npx shadcn@latest add tabs
  npx shadcn@latest add select
  ```

#### Day 5-6: Link Management (Admin)

- [ ] Bikin `AdminLinksPage.jsx`
- [ ] Fetch all links (all users)
- [ ] Filter by user/status
- [ ] Delete link functionality
- [ ] View link details

**Deliverable Week 7:** Admin panel structure ready, User & Link management done

---

### **Week 8 (15-21 Des)** - Report System

#### Day 1-2: Report Form (Public)

- [ ] Bikin `ReportPage.jsx`
- [ ] Form report user/link
- [ ] Zod schema validation
- [ ] Submit report (guest allowed)
- [ ] Success feedback

#### Day 3-4: Admin Reports List

- [ ] Bikin `AdminReportsPage.jsx`
- [ ] Fetch all reports
- [ ] Filter by status (waiting/done/rejected)
- [ ] Display report details
- [ ] Update status functionality

#### Day 5-6: Admin Report Actions

- [ ] Send warning notification
- [ ] Delete reported link
- [ ] Ban reported user
- [ ] Mark report as done/rejected
- [ ] View reporter & target details

**Deliverable Week 8:** Full report system working (guest report + admin moderation)

---

### **Week 9 (22-28 Des)** - Polish & Refinement

#### Day 1-2: Error Handling & Loading States

- [ ] Implement global error boundary
- [ ] Add loading skeletons (ShadCN Skeleton)
- [ ] Handle network errors gracefully
- [ ] Add retry mechanism
- [ ] Install:
  ```bash
  npx shadcn@latest add skeleton
  ```

#### Day 3-4: Responsive Design Check

- [ ] Test semua pages di mobile
- [ ] Fix responsive issues
- [ ] Optimize layout untuk tablet
- [ ] Test dark mode di semua pages

#### Day 5-6: Performance Optimization

- [ ] Code splitting dengan React.lazy
- [ ] Optimize images (lazy load)
- [ ] Minimize bundle size
- [ ] Check Lighthouse score

**Deliverable Week 9:** App polished, responsive, optimized

---

### **Week 10 (29 des-4 jan 2026)** - Testing & Deployment

#### Day 1-2: User Testing

- [ ] Test full user flow (register → links → profile)
- [ ] Test admin flow (reports → actions)
- [ ] Fix bugs yang ditemukan
- [ ] Cross-browser testing

#### Day 3-4: Documentation

- [ ] Bikin README.md
- [ ] Setup instructions
- [ ] Environment variables documentation
- [ ] API integration guide

#### Day 5-6: Deployment

- [ ] Setup Vercel/Netlify
- [ ] Configure environment variables
- [ ] Test production build
- [ ] Deploy to production
- [ ] Final testing

**Deliverable Week 10:** App deployed & live! 🚀

---

## 🎯 Daily Workflow Template

### Daily 3-4 Hours Breakdown:

- **30 min:** Review kemarin, plan hari ini
- **2-3 jam:** Coding fokus (gunakan Pomodoro 25/5)
- **30 min:** Testing, commit, dokumentasi

### Weekly Rhythm:

- **Day 1-2:** Learn & setup
- **Day 3-4:** Implementation
- **Day 5-6:** Testing & refinement
- **Day 7:** Libur / catch up kalau ada yang tertinggal

---

## 📚 Learning Resources Priority

1. **Week 1-2:** Focus on ShadCN + RHF basics
2. **Week 3-4:** Master Redux Toolkit patterns
3. **Week 5-6:** Deep dive drag & drop
4. **Week 7-8:** Admin patterns & state management
5. **Week 9-10:** Performance & deployment best practices

---

## 🔥 Pro Tips

1. **Jangan stuck terlalu lama** - Max 30 menit per problem, terus cari solusi atau skip dulu
2. **Commit sering** - Minimal 2x sehari, biar progress traceable
3. **Test incremental** - Jangan tunggu semua selesai baru test
4. **Dokumentasi sambil jalan** - Tulis catatan untuk fitur yang baru dipelajari
5. **Copy example dulu** - Dari ShadCN docs, terus customize
6. **Use AI assistant** - Kalau stuck, tanya Claude/ChatGPT untuk specific problem

---

## ⚠️ Risk & Mitigation

| Risk                    | Mitigation                                             |
| ----------------------- | ------------------------------------------------------ |
| Stuck di RHF/Zod        | Start dari example simple, gradually tambah complexity |
| Redux pattern confusing | Follow official Redux Toolkit tutorial dulu            |
| Drag & drop sulit       | Use library dengan good docs (@dnd-kit recommended)    |
| API integration error   | Test di Postman dulu sebelum integrate                 |
| Burn out                | Strict 1 hari libur, jangan skip!                      |

---

## 🎊 Milestones & Celebration Points

- ✅ Week 2: "Setup selesai!" - Treat yourself
- ✅ Week 4: "Auth & Dashboard jalan!" - Small celebration
- ✅ Week 6: "Link CRUD complete!" - You're halfway!
- ✅ Week 8: "Admin panel done!" - Almost there!
- ✅ Week 10: "DEPLOYED!" - 🎉🎉🎉 BIG CELEBRATION!

---

## 📊 Progress Tracking

Gunakan checklist di atas, atau bikin Trello/Notion board dengan kolom:

- **Backlog**
- **In Progress**
- **Testing**
- **Done**

Setiap hari move tasks sesuai progress.

---

**Good luck! Gas terus, learning by doing is the best way! 💪🚀**
