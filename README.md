# Tech Era 3.0

Tech Era 3.0 is a Vite + React + TypeScript event website with an animated terminal-style registration flow.

## Stack

- Vite
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn/ui

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
cp .env.example .env.local
```

3. Set required variable in `.env.local`:

```env
VITE_GOOGLE_SHEET_APPS_SCRIPT_URL=https://script.google.com/macros/s/your-script-id/exec
```

4. Run development server:

```bash
npm run dev
```

## Build

```bash
npm run build
```

Build output is generated in `dist/`.

## Deployment Notes

### Environment Variables

Set this in your hosting provider:

- `VITE_GOOGLE_SHEET_APPS_SCRIPT_URL`

Without this value, registration still completes locally in UI flow, but spreadsheet sync will fail.

### SPA Routing

This project uses `BrowserRouter`, so direct navigation to routes like `/team` needs fallback-to-`index.html`.

Configured in repo:

- `vercel.json` for Vercel rewrites
- `public/_redirects` for Netlify redirects

## Deploy Targets

### Vercel

1. Import repository in Vercel
2. Framework preset: `Vite`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add env variable: `VITE_GOOGLE_SHEET_APPS_SCRIPT_URL`
6. Deploy

### Netlify

1. Import repository in Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add env variable: `VITE_GOOGLE_SHEET_APPS_SCRIPT_URL`
5. Deploy (`public/_redirects` handles SPA routes)

### Any Static Host (S3/Cloudflare Pages/GitHub Pages)

- Upload `dist/` contents
- Configure fallback/rewrites so unknown routes serve `index.html`
- Configure `VITE_GOOGLE_SHEET_APPS_SCRIPT_URL` at build time

## Scripts

- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run test` - run tests
- `npm run lint` - lint code
