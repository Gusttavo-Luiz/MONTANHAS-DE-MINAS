/**
 * Gera favicons PNG e a imagem de compartilhamento (og-image.jpg) a partir
 * da marca provisória. Rode com `node scripts/generate-brand-assets.mjs`
 * sempre que a marca mudar (requer o Chromium do Playwright).
 */
import { chromium } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const font = (pkg, file) =>
  `data:font/woff2;base64,${readFileSync(fileURLToPath(new URL(`node_modules/@fontsource-variable/${pkg}/files/${file}`, root))).toString('base64')}`;

const fonts = `
  @font-face { font-family: Fraunces; src: url(${font('fraunces', 'fraunces-latin-opsz-normal.woff2')}); font-weight: 100 900; }
  @font-face { font-family: Fraunces; font-style: italic; src: url(${font('fraunces', 'fraunces-latin-opsz-italic.woff2')}); font-weight: 100 900; }
  @font-face { font-family: Figtree; src: url(${font('figtree', 'figtree-latin-wght-normal.woff2')}); font-weight: 300 900; }
`;

// Mesma paisagem da primeira dobra (versão simplificada).
const scene = `
<svg viewBox="0 0 1600 900" preserveAspectRatio="xMaxYMax slice">
  <defs>
    <linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#18261d"/><stop offset=".34" stop-color="#3a3a2b"/><stop offset=".58" stop-color="#8a5438"/><stop offset=".74" stop-color="#cf8a52"/><stop offset=".86" stop-color="#e7b874"/></linearGradient>
    <radialGradient id="g"><stop offset="0" stop-color="#f6d79a" stop-opacity=".75"/><stop offset=".3" stop-color="#eab46e" stop-opacity=".35"/><stop offset="1" stop-color="#c6763f" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1600" height="900" fill="url(#s)"/>
  <circle cx="1300" cy="560" r="330" fill="url(#g)"/><circle cx="1300" cy="560" r="58" fill="#f8dfa6"/>
  <path d="M0 590 80 560l70 18 96-70 76 34 70-44 104 62 76-26 116 40 92-78 80 48 70-14 108 56 98-66 90 46 82-28 100 50 88-34 114 44V900H0Z" fill="#8a5a43"/>
  <path d="M0 650c110-36 200-74 330-50s210 56 330 22 220-72 350-42 230 66 340 38 160-46 250-32v314H0Z" fill="#5b4a37"/>
  <path d="M0 716c150-42 290-60 430-32s250 42 390 6 270-50 410-18 250 34 370 10v218H0Z" fill="#34402f"/>
  <path d="M0 800c200-36 380-52 600-26s360 30 560 4 300-28 440-6v128H0Z" fill="#1f2c22"/>
  <path d="M0 850c260-24 520-30 800-18s540 10 800-8v76H0Z" fill="#142119"/>
</svg>`;

const og = `<!doctype html><html><head><style>${fonts}
  body{margin:0;width:1200px;height:630px;overflow:hidden;background:#142119;font-family:Figtree}
  svg{position:absolute;inset:0;width:100%;height:100%}
  .shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(20,33,25,.85),rgba(20,33,25,.45) 55%,transparent 80%)}
  .t{position:absolute;left:84px;top:140px;color:#fbf8f2}
  .e{font-size:18px;letter-spacing:.3em;text-transform:uppercase;color:#e0c993;font-weight:650}
  h1{font-family:Fraunces;font-weight:420;font-size:92px;line-height:1;margin:22px 0 0;letter-spacing:-.02em}
  h1 em{font-weight:360;color:#e0c993}
  p{font-size:25px;margin-top:28px;color:rgba(251,248,242,.85)}
</style></head><body>${scene}<div class="shade"></div>
<div class="t"><div class="e">Restaurante · Itaúna, MG</div><h1>Montanhas<br><em>de Minas</em></h1><p>Sabores de Minas, momentos para recordar.</p></div>
</body></html>`;

const icon = (size) => `<!doctype html><html><body style="margin:0">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}"><rect width="64" height="64" fill="#243b2d"/><circle cx="41" cy="22" r="5" fill="#c6a15b"/><path d="M10 48 25 25l8 10 7-8 14 21Z" fill="none" stroke="#e0c993" stroke-width="3" stroke-linejoin="round"/></svg></body></html>`;

const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || undefined });
const page = await browser.newPage();
const out = (name) => fileURLToPath(new URL(`public/${name}`, root));

await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(og);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: out('og-image.jpg'), type: 'jpeg', quality: 86 });

for (const [name, size] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(icon(size));
  await page.screenshot({ path: out(name), type: 'png' });
}

await browser.close();
console.log('Imagens da marca geradas em public/.');
