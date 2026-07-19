# Controva LLC - Corporate Website

Welcome to the official source code for the **Controva LLC** enterprise corporate website. This project is a highly dynamic, performance-optimized Single Page Application (SPA) built for a premium B2B engineering and growth agency.

## 🚀 Tech Stack

- **Framework:** React 18 + Vite (TypeScript)
- **Styling:** Vanilla CSS + TailwindCSS (for utility layout)
- **Animations:** Framer Motion (premium stagger blur reveals, interactive spotlight effects, page transitions)
- **Database / Auth:** Supabase (OAuth integration for GitHub and Google)
- **Typography:** Space Grotesk (Display) & Inter (Body)
- **Routing:** React Router v6

## ✨ Key Features

- **Premium Hero Section:** Interactive network nodes canvas background, blur-reveal typography, and frosted glass performance cards.
- **Dynamic Case Studies:** A responsive grid showcasing high-ticket enterprise clients (e.g., DTX Realty, IQAAI, ImagineStudio).
- **Interactive Markdown Blog:** Fully dynamic blog system using `react-markdown` and `remark-gfm`. Includes 25+ pre-written, highly-optimized SEO articles.
- **Live Discussion Board:** Real-time comments section powered by Supabase. Users can authenticate instantly via GitHub or Google to leave comments.
- **Dark/Light Mode & Dynamic Themes:** Built-in theme switcher with 9 premium color palettes (including the custom "Controva" peach-to-purple gradient).
- **SEO & RSS:** Auto-generated `sitemap.xml`, `robots.txt`, and an active `rss.xml` feed for blog syndication.
- **Protected Admin Panel:** A gated `/admin` route for managing blog posts.

## 🛠 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/controva-netizen/Devrankpro.git
   cd Devrankpro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

## 🌐 Deployment (Hostinger / Apache)

This project is configured to be deployed on Apache servers (like Hostinger). 
It includes a `public/.htaccess` file that automatically rewrites traffic to `index.html`, ensuring that React Router handles all direct URLs (like `/blog/article-name`) without throwing 404 errors.

---
*Developed with 🩵 by the Controva Engineering Team.*