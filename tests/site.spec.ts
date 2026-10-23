import { expect, test, type Page } from '@playwright/test';

const DIRECTIONS =
  'https://www.google.com/maps/dir/?api=1&destination=Restaurante+Montanhas+de+Minas%2C+Ita%C3%BAna+-+Minas+Gerais%2C+Brazil';
const WHATSAPP_MESSAGE = 'Olá! Conheci o Restaurante Montanhas de Minas pelo site e gostaria de obter mais informações.';

async function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await page.route(/google\.com/, (route) => route.abort());
  return errors;
}

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('página inicial completa, com SEO e sem erros nem rolagem horizontal', async ({ page }) => {
  const errors = await trackErrors(page);
  await page.goto('/');
  await expect(page).toHaveTitle('Restaurante Montanhas de Minas | Culinária Mineira em Itaúna');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    'Conheça o Restaurante Montanhas de Minas, em Itaúna, MG. Descubra sabores da culinária mineira e brasileira, conheça nosso ambiente e planeje sua visita.',
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveText('Sabores de Minas, momentos para recordar.');

  for (const id of ['inicio', 'nossa-historia', 'cardapio', 'ambiente', 'avaliacoes', 'momentos', 'horarios', 'localizacao', 'contato']) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);

  const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).map((s) => JSON.parse(s));
  const restaurant = schemas.find((s) => s['@type'] === 'Restaurant');
  expect(restaurant).toBeTruthy();
  expect(restaurant.telephone).toBe('+5537998561626');
  expect(restaurant.address.addressLocality).toBe('Itaúna');
  expect(restaurant.openingHoursSpecification).toHaveLength(4);
  expect(JSON.stringify(restaurant)).not.toMatch(/aggregateRating|geo|postalCode/);

  const missingAlt = await page.locator('img:not([alt])').count();
  expect(missingAlt).toBe(0);
  expect(errors).toEqual([]);
});

test('links de rota, WhatsApp e telefone', async ({ page }) => {
  await page.goto('/');
  const routes = page.locator(`a[href="${DIRECTIONS}"]`);
  expect(await routes.count()).toBeGreaterThanOrEqual(4);
  for (const link of await routes.all()) await expect(link).toHaveAttribute('target', '_blank');

  const whatsapp = page.locator('#contato').getByRole('link', { name: /Conversar no WhatsApp/ });
  const url = new URL((await whatsapp.getAttribute('href'))!);
  expect(url.origin + url.pathname).toBe('https://wa.me/5537998561626');
  expect(url.searchParams.get('text')).toBe(WHATSAPP_MESSAGE);

  await expect(page.locator('#contato a[href="tel:+5537998561626"]')).toContainText('(37) 99856-1626');

  const menu = page.locator('#cardapio').getByRole('link', { name: /Consultar cardápio completo/ });
  await expect(menu).toHaveAttribute('href', /^https:\/\/wa\.me\/5537998561626\?text=/);

  await expect(page.getByRole('link', { name: /Ver avaliações no Google/ })).toHaveAttribute('href', /google\.com\/maps/);
});

test('conteúdo sem informações inventadas', async ({ page }) => {
  await page.goto('/');
  const body = page.locator('main');
  await expect(body).not.toContainText('R$');
  await expect(body).not.toContainText(/self-service/i);
  await expect(body).not.toContainText(/área infantil/i);
  await expect(page.locator('#avaliacoes blockquote')).toHaveCount(0);
  await expect(page.locator('#momentos [data-events]')).toHaveCount(0);
  await expect(page.locator('#momentos')).toContainText('quando confirmados pelo restaurante');
  await expect(page.locator('#avaliacoes')).toContainText('4,6');
  await expect(page.locator('.menu-card')).toHaveCount(5);
  await expect(page.locator('.photo-placeholder__file')).toHaveCount(0);
});

test('horários e indicador no fuso de Itaúna', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-10-22T20:30:00-03:00')); // quinta
  await page.goto('/');
  const hours = page.locator('#horarios');
  const rows = hours.locator('.hours__row');
  await expect(rows).toHaveCount(7);
  await expect(rows.nth(0)).toContainText('Segunda-feira');
  await expect(rows.nth(0)).toContainText('Fechado');
  await expect(rows.nth(3)).toContainText('17h às 0h');
  await expect(rows.nth(5)).toContainText('16h às 0h');
  await expect(rows.nth(6)).toContainText('8h às 18h');
  await expect(hours).toContainText('Os horários podem sofrer alterações em feriados e datas especiais.');
  await expect(hours.locator('.hours__row.is-today')).toContainText('Quinta-feira');
  await expect(hours.locator('[data-hours-status]')).toHaveText('Aberto agora · fecha às 0h (horário habitual)');
});

test('cabeçalho fica sólido ao rolar', async ({ page }) => {
  await page.goto('/');
  const header = page.locator('[data-header]');
  await expect(header).not.toHaveClass(/is-solid/);
  await page.evaluate(() => window.scrollTo(0, 600));
  await expect(header).toHaveClass(/is-solid/);
});

test('menu móvel abre, navega e fecha', async ({ page }, info) => {
  test.skip(info.project.name === 'desktop', 'menu compacto só em telas menores');
  await page.goto('/');
  const toggle = page.locator('[data-menu-toggle]');
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  const menu = page.locator('#menu-mobile');
  await expect(menu).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await toggle.click();
  await menu.getByRole('link', { name: 'Cardápio' }).click();
  await expect(menu).toBeHidden();
  await expect(page).toHaveURL(/#cardapio$/);
});

test('galeria amplia, navega e fecha', async ({ page }) => {
  await page.goto('/#ambiente');
  const items = page.locator('[data-lightbox-item="ambiente"]');
  await items.first().click();
  const dialog = page.locator('[data-lightbox]');
  await expect(dialog).toBeVisible();
  const total = await items.count();
  await expect(dialog.locator('[data-lb-counter]')).toHaveText(`1 / ${total}`);
  await expect(dialog.locator('[data-lb-caption]')).toHaveText('Fachada e área externa');
  await page.keyboard.press('ArrowRight');
  await expect(dialog.locator('[data-lb-counter]')).toHaveText(`2 / ${total}`);
  await dialog.getByRole('button', { name: 'Foto anterior' }).click();
  await expect(dialog.locator('[data-lb-counter]')).toHaveText(`1 / ${total}`);
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(items.first()).toBeFocused();
});

test('mapa só carrega sob demanda', async ({ page }) => {
  await trackErrors(page);
  await page.goto('/#localizacao');
  await expect(page.locator('#localizacao iframe')).toHaveCount(0);
  await page.getByRole('button', { name: 'Carregar mapa' }).click();
  await expect(page.locator('#localizacao iframe')).toHaveAttribute(
    'src',
    /google\.com\/maps\?q=Restaurante%20Montanhas%20de%20Minas/,
  );
});

test('barra de contato móvel aparece após a primeira dobra', async ({ page }, info) => {
  test.skip(info.project.name !== 'mobile', 'somente celular');
  await page.goto('/');
  const bar = page.locator('[data-mobile-cta]');
  await expect(bar).not.toHaveClass(/is-visible/);
  await page.locator('#cardapio').scrollIntoViewIfNeeded();
  await expect(bar).toHaveClass(/is-visible/);
});

test('rodapé com ano atual e página 404', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-year]')).toHaveText(String(new Date().getFullYear()));
  await expect(page.locator('.site-footer')).toContainText(
    'Restaurante Montanhas de Minas — sabor, tradição e acolhimento em Itaúna, MG.',
  );
  const res = await page.goto('/nao-existe');
  expect(res?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('não chega a lugar nenhum');
});
