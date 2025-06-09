# 📝 BlogNest – Fullstack Blogging Platform

BlogNest is a **minimalist, modern, and fully functional blogging platform** built with the latest web technologies. It includes powerful features like a rich text editor, authentication, user dashboard, AI integration, and more.

---

## 🧰 Tech Stack

| Layer            | Technology                           |
| ---------------- | ------------------------------------ |
| Frontend         | **Next.js (App Router)** + **React** |
| Styling          | **Material UI**                      |
| State Management | **Redux Toolkit**                    |
| Text Editor      | **TipTap Editor** (with Markdown)    |
| Database         | **PostgreSQL** (via Docker/Render)   |
| ORM              | **Prisma**                           |
| Authentication   | **NextAuth.js** (Google Provider)    |
| AI Integration   | **OpenAI API** (title/summary help)  |
| Hosting          | **Vercel** (monorepo deployment)     |

---

## ✨ Features

### ✍️ Blog Editor

- Built using **TipTap**
- Create/edit blog posts
- **Autosave** support (WIP)
- Markdown-friendly output
- **AI assistant** to suggest title/summary

### 📰 Public Feed

- Homepage with published posts
- Responsive cards + infinite scroll
- Light/Dark theme support

### 🔐 Authentication

- Google login via **NextAuth**
- Auth-protected routes (`/editor`, `/dashboard`)
- Drafts are private to the author

### 📊 Dashboard

- View and manage **drafts** and **published** posts
- Edit/Delete posts
- Upgrade to premium (UI ready, Stripe WIP)

### 🖼️ Themes

- Light & dark modes
- Persisted via `localStorage`

### 💡 Monetization Demo

- Users on **Free Plan** see ads (mocked)
- Premium users have ad-free experience
- Stored as `plan` field in `User` table

---

## 🗂️ Project Structure

```bash
/app
  /api            # API routes (Next.js Route Handlers)
  /dashboard      # Authenticated user dashboard
  /editor         # New & edit blog posts
  /blog           # Public view of individual posts
  /components     # Shared UI components
  /lib            # Prisma, auth, helpers
  /styles         # Theme config
```

---

## 🐳 Local Development (Docker + PostgreSQL)

1. **Clone the repo**

```bash
git clone https://github.com/yourusername/blognest.git
cd blognest
```

2. **Run PostgreSQL using Docker**

```bash
docker-compose up -d
```

3. **Set up environment variables**

Create `.env` file:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/blognest"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
OPENAI_API_KEY=your-openai-key
```

4. **Install & migrate**

```bash
npm install
npx prisma generate
npx prisma migrate dev
```

5. **Run the app**

```bash
npm run dev
```
