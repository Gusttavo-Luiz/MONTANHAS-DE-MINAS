/**
 * Marcações técnicas para quem edita o site (nomes dos arquivos de fotos).
 * Só em `npm run dev` — nunca na versão mostrada ao cliente.
 */
export const devHints = import.meta.env.DEV;

/** Demonstração estática (GitHub Pages): a página não é indexada. */
export const demoMode = import.meta.env.PUBLIC_DEMO_MODE === 'true';
