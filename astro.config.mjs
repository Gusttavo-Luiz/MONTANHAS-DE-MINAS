// @ts-check
import { defineConfig } from 'astro/config';
import { site as restaurant } from './src/config/site.ts';

// DEPLOY_TARGET=pages gera a demonstração estática para o GitHub Pages.
const githubPages = process.env.DEPLOY_TARGET === 'pages';

export default defineConfig({
  // Domínio oficial definido em src/config/site.ts (vazio = sem URLs absolutas).
  site: githubPages ? 'https://gusttavo-luiz.github.io' : restaurant.url || undefined,
  base: githubPages ? '/MONTANHAS-DE-MINAS' : undefined,
  output: 'static',
  trailingSlash: 'ignore',
  // CSS embutido no HTML: evita requisições que bloqueiam a renderização.
  build: { format: 'directory', inlineStylesheets: 'always' },
  compressHTML: true,
  // Fontes sempre como arquivos (sem data: URI).
  vite: { build: { assetsInlineLimit: 0 } },
});
