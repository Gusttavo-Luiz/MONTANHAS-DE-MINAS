import { defineConfig, devices } from '@playwright/test';

/**
 * Testes de ponta a ponta sobre o build de produção (`npm test` faz o build
 * antes). Com Chromium já instalado no sistema, defina PW_CHROMIUM_PATH.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:4323',
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo',
    launchOptions: { executablePath: process.env.PW_CHROMIUM_PATH || undefined },
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1366, height: 860 } } },
    { name: 'tablet', use: { ...devices['Desktop Chrome'], viewport: { width: 820, height: 1180 }, hasTouch: true } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: 'npx astro preview --host 127.0.0.1 --port 4323 --ignore-lock',
    url: 'http://127.0.0.1:4323',
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
