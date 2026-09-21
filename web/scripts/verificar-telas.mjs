import { chromium } from 'playwright';

const base = 'http://localhost:5180';
const out = new URL('../../.impeccable/review/', import.meta.url).pathname;
const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const browser = await chromium.launch({ executablePath: CHROME });
const erros = [];

const larguras = [320, 768, 1024, 1440];
const rotas = [
  { rota: '/', nome: 'home' },
  { rota: '/atividades', nome: 'atividades' },
  { rota: '/atividades/windows-11', nome: 'curso' },
];

for (const { rota, nome } of rotas) {
  for (const largura of larguras) {
    const page = await browser.newPage({ viewport: { width: largura, height: 900 } });
    page.on('console', (m) => m.type() === 'error' && erros.push(`${nome}@${largura}: ${m.text()}`));
    page.on('pageerror', (e) => erros.push(`${nome}@${largura}: ${e}`));
    await page.goto(base + rota, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);

    // rolagem horizontal é bug
    const rolaLateral = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    if (rolaLateral) console.log(`ROLAGEM LATERAL em ${nome} @ ${largura}px`);

    if (largura === 1440 || largura === 320) {
      await page.screenshot({ path: `${out}${nome}-${largura}.png`, fullPage: true });
    }
    await page.close();
  }
}

// foco por teclado na home
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(base + '/', { waitUntil: 'networkidle' });
const ordem = [];
for (let i = 0; i < 9; i++) {
  await page.keyboard.press('Tab');
  ordem.push(
    await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return '(nenhum)';
      const anel = getComputedStyle(el).outlineStyle;
      return `${el.tagName.toLowerCase()}:${(el.textContent || el.getAttribute('aria-label') || el.getAttribute('placeholder') || '').trim().slice(0, 26)} [outline:${anel}]`;
    }),
  );
}
console.log('ordem de tabulação:');
ordem.forEach((o, i) => console.log(`  ${i + 1}. ${o}`));
await page.close();

console.log(erros.length ? `ERROS: ${erros.join(' | ')}` : 'sem erros de console');
await browser.close();
