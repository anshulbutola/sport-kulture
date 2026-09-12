# Sport Kulture — Stories That Inspire

A static website celebrating corporate cricket legends through immersive podcasts and a premium magazine.

## What's Changed (fix/netlify-seo-forms branch)

- **Netlify config**: Fixed `publish` path from absolute Windows path to `.`
- **Tailwind build**: Added `npm run build:css` with purged production CSS; removed CDN dependency
- **SEO / Open Graph / Twitter meta**: Added canonical, OG, Twitter card, JSON-LD schema, favicon, social-share image
- **Sitemap & robots.txt**: Added for search engine indexing
- **Netlify Forms**: Contact form now uses `data-netlify="true"` with honeypot and proper `name` attributes
- **On-site video embeds**: 3 playable HTML5 `<video>` elements with random selection per page load
- **Accessibility**: Skip link, `<main>` wrapper, `aria-expanded`/`aria-controls` on menu, visible focus styles, `alt` text, improved color contrast
- **Analytics**: Placement for GA/GTM/Plausible with instructions
- **Moved inline JS to `assets/site.js`**: Mobile menu, smooth scroll, form handling, video randomization
- **Markup tidied**: Removed `hidden md:hidden` duplicate classes, semantic headings, `cta-primary`/`cta-secondary` classes

## Running Locally

```bash
# Install dependencies and build CSS
npm install
npm run build:css

# Serve locally
npx serve .
# Open http://localhost:3000
```

## Deploying to Netlify

1. Connect this repo to Netlify
2. **Build settings**: `npm run build:css`
3. **Publish directory**: `.` (root)
4. Netlify Forms works automatically — no configuration needed
5. Enable email forwarding in Netlify UI under **Settings > Forms > Notifications**

## Videos

- Place 3 MP4 files at `assets/videos/video1.mp4`, `video2.mp4`, `video3.mp4`
- Optionally add poster images at `assets/videos/video1-poster.jpg`, etc.
- The site randomly picks 3 from `assets/videos/videos.json` on each page load
- **Important**: MP4 files are large. Use CDN (Cloudflare R2, S3) or Git LFS for production
- The "View All Episodes" button links to the YouTube channel

## Analytics

Uncomment the analytics snippet in `<head>` and replace `G-XXXXXXX` with your ID, or use Plausible.

## Changelog

- `.netlify/netlify.toml`: Fixed publish path, added headers, redirects
- `package.json`: Added build scripts, devDependencies
- `tailwind.config.js`, `postcss.config.js`, `src/input.css`: Tailwind build setup
- `index.html`: SEO meta tags, OG/Twitter, canonical, JSON-LD, favicon, contact form with Netlify Forms, `<main>` wrapper, skip link, `<video>` embeds
- `assets/site.js`: Mobile menu, smooth scroll, form AJAX, video randomization
- `sitemap.xml`, `robots.txt`: Search engine optimization
- `assets/favicon.ico`, `assets/social-share.jpg`: Branding assets
- `.gitignore`: Updated for build artifacts, videos, node_modules
