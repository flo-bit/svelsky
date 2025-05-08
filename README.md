# Editable Website

Work in progress! Preview only.

https://flo-bit.dev/svelsky/

Statically built svelte website using your bluesky pds as a backend with a wysiwyg editor.

## Why?

- Statically built websites are fast and super cheap to host (often free on github 
pages, cloudflare, etc).

- But they are usually hard to edit (for non-technical users), either you edit 
the code directly or you have to use (and usually pay for) a CMS of some kind.

- This repo aims to combine the best of both worlds: cheap, fast and easy to edit 
(content editing only, design is static/only changeable by editing code).

## Development

```bash
pnpm install
pnpm run dev
```

## Deployment with github pages

1. fork the repo and enable github pages in the repo settings (Settings -> Pages -> Source -> Github Actions)

2. change the handle to your bluesky handle in `.github/workflows/deploy.yml` line 32:

```bash
PUBLIC_HANDLE: 'your-bluesky-handle'
```

3. change the base path to your repo name in `svelte.config.js` line 13:

```ts
base: process.env.NODE_ENV === 'development' ? '' : '/svelsky'
```

4. push to github and wait for it to deploy

5. edit the website by going to `https://<your-github-username>.github.io/<repo-name>/edit`, 
signing in with your bluesky account, editing the website and saving at the end.

6. rerun the workflow manually by selecting the last workflow in the github actions tab and 
clicking the `Re-run all jobs` button or wait for the scheduled workflow that runs every 6 hours.
