# ORBKEEPER React Site

A GitHub-ready React/Vite version of the ORBKEEPER fantasy doom metal website.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production files will be created in `dist/`.

## GitHub Pages

This project uses `base: "./"` in `vite.config.js`, so the built site works from a GitHub Pages subpath.

To deploy with the included script:

```bash
npm install
npm run deploy
```

You can also deploy the `dist/` folder with GitHub Actions or any static host.

## Vercel

This also works on Vercel.

Use these settings:

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

The included `vercel.json` rewrites routes back to `index.html`, which is useful if you later add client-side routes.
