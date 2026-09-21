import { chromium } from 'playwright';

const base = 'http://localhost:5180';
const out = new URL('../../.impeccable/review/', import.meta.url).pathname;

const alvos = [
  { rota: '/', nome: 'desktop', w: 1440, h: 900 },
  { rota: '/', nome: 'mobile', w: 390, h: 844 },
  { rota: '/atividades', nome: 'atividades', w: 1440, h: 900 },
  { rota: '/ingles', nome: 'ingles', w: 1440, h: 900 },
  { rota: '/provas', nome: 'provas', w: 1440, h: 900 },
];

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
});

for (const alvo of alvos) {
  const page = await browser.newPage({ viewport: { width: alvo.w, height: alvo.h } });
  const erros = [];
  page.on('console', (m) => m.type() === 'error' && erros.push(m.text()));
  page.on('pageerror', (e) => erros.push(String(e)));
  await page.goto(base + alvo.rota, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${out}${alvo.nome}.png`, fullPage: true });
  if (erros.length) console.log(`[${alvo.nome}] ERROS:`, erros.join(' | '));
  await page.close();
}

// tema escuro da home
const dark = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  colorScheme: 'dark',
});
await dark.goto(base + '/', { waitUntil: 'networkidle' });
await dark.waitForTimeout(500);
await dark.screenshot({ path: `${out}desktop-escuro.png`, fullPage: true });
await dark.close();

await browser.close();
console.log('ok');
