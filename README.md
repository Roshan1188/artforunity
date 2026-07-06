# Art for Unity — Website

Marketing website for **Art for Unity**, an Indian art organization doing **Art Education** and **Art Dealing / Investment**.

Built with **React + Vite + TailwindCSS**. Design: gallery-style "Exaggerated Minimalism" (black + warm white + vermilion red accent, echoing the brand logo). Fonts: Space Grotesk (display) + Archivo (body) + JetBrains Mono (labels).

## Run locally

```bash
npm install
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build into /dist
npm run preview  # preview the production build
```

## Sections

- **Hero** — statement headline + animated logo video
- **Marquee** — scrolling brand keywords
- **About** — story, founder quote, key stats
- **What We Do** — the two categories (Art Education + Art Dealing)
- **Team** — Apoorva Subbanna, Seema Subbanna, Dhruv Saklani (hover for bio)
- **Contact** — enquiry form (opens email) + email / WhatsApp links
- **Footer**

## ⚠️ Before going live — update these placeholders

In `src/components/Contact.jsx`:
- `CONTACT_EMAIL` — replace `hello@artforunity.com` with the real email
- WhatsApp link — replace `https://wa.me/910000000000` with the real number (format: `91` + 10-digit number)

The contact form currently opens the visitor's email client (`mailto:`). To receive submissions
automatically instead, connect a form service (Formspree, Web3Forms) or a small backend.

## Assets

All images/video live in `src/assets/` (logo, logo video, about image, 3 team photos),
sourced from the client's shared content folder.
