# Zaviar Durrani — Portfolio

A clean, minimal personal portfolio built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
npm run start
```

---

## Project Structure

```
/app
  layout.tsx          # Root layout (font, navbar, global styles)
  globals.css         # Tailwind base + global resets
  page.tsx            # Home page
  /work/page.tsx      # Work / experience page
  /projects/page.tsx  # Projects page
  /contact/page.tsx   # Contact page

/components
  Navbar.tsx          # Top navigation bar
  Container.tsx       # Centered max-width wrapper
  Section.tsx         # Framer Motion fade-in wrapper
  ExperienceItem.tsx  # Single work experience card
  ProjectItem.tsx     # Single project card

/data
  site.ts             # Name, bio, links — edit this first
  experience.ts       # Work experience entries
  projects.ts         # Project entries
```

---

## Customization

### Update personal info
Edit `/data/site.ts` — name, tagline, intro paragraphs, email, GitHub, LinkedIn.

### Add / edit work experience
Edit `/data/experience.ts` — add objects to the array following the `Experience` type.

### Add / edit projects
Edit `/data/projects.ts` — add objects to the array following the `Project` type.

### Change fonts
The project uses Geist Sans and Geist Mono (loaded via `next/font/google`).
To swap fonts, update `app/layout.tsx` and `tailwind.config.ts`.

### Remove animations
Animations are in `components/Section.tsx`. To disable, replace the `motion.section`
with a plain `<section>` tag and remove the `framer-motion` import.

---

## Tech Stack

- [Next.js 14](https://nextjs.org/) — App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) — subtle fade-in animations

---

## Deployment

Deploy instantly on [Vercel](https://vercel.com/):

```bash
npx vercel
```

Or connect your GitHub repo to Vercel for automatic deployments on push.
