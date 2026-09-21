import { chromium } from 'playwright';

const base = 'http://localhost:5180';
const out = new URL('../../.impeccable/review/', import.meta.url).pathname;
const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const erros = [];
page.on('console', (m) => m.type() === 'error' && erros.push(m.text()));
page.on('pageerror', (e) => erros.push(String(e)));

const log = (...a) => console.log(...a);
const txt = async (sel) => (await page.locator(sel).textContent()).replace(/\s+/g, ' ').trim();

async function entrarNasProvas() {
  await page.goto(`${base}/provas`, { waitUntil: 'networkidle' });
  await page.getByLabel('Senha').fill('microlins');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.waitForTimeout(300);
}

// ================= múltipla escolha =================
await entrarNasProvas();
await page.screenshot({ path: `${out}provas-com-conteudo.png`, fullPage: true });

await page.getByRole('link', { name: /fazer prova/i }).first().click();
await page.waitForTimeout(400);
log('título:', await page.locator('h1').first().textContent());

log('navbar escondida durante a prova:', !(await page.locator('nav[aria-label="Principal"]').isVisible().catch(() => false)));

const finalizar = page.getByRole('button', { name: /finalizar/i });
log('finalizar desabilitado antes de responder:', await finalizar.isDisabled());

const grupos = page.locator('fieldset');
await grupos.nth(0).getByRole('radio').nth(0).check();   // certa
await grupos.nth(1).getByRole('radio').nth(1).check();   // certa
await grupos.nth(2).getByRole('radio').nth(0).check();   // errada
log('contador:', await txt('header span'));
await page.screenshot({ path: `${out}quiz-respondendo.png`, fullPage: true });

// tentar sair no meio, agora por navegação de verdade dentro do app
await page.goBack();
await page.waitForTimeout(500);
const dialogo = page.getByRole('alertdialog');
const bloqueou = await dialogo.isVisible().catch(() => false);
log('BLOQUEOU a saída no meio da prova:', bloqueou);

if (bloqueou) {
  await page.screenshot({ path: `${out}quiz-saida-bloqueada.png` });
  await dialogo.getByRole('button', { name: /continuar/i }).click();
  await page.waitForTimeout(400);
  log('continuou na prova:', await finalizar.isVisible());
} else {
  log('  >>> saiu para:', page.url());
}

if (await finalizar.isVisible().catch(() => false)) {
  await finalizar.click();
  await page.waitForTimeout(400);
  log('nota (2 de 3 => 6,7):', await txt('[role="status"]'));
  log('navbar volta após finalizar:', await page.locator('nav[aria-label="Principal"]').isVisible());
  await page.screenshot({ path: `${out}quiz-corrigida.png`, fullPage: true });
}

// ================= descritiva =================
await entrarNasProvas();
await page.getByRole('link', { name: /fazer prova/i }).nth(1).click();
await page.waitForTimeout(400);

const areas = page.locator('textarea');
await areas.nth(0).fill('Estilo de parágrafo guarda a formatação para reaplicar no documento inteiro.');
await areas.nth(1).fill('Aplicar os estilos de título e depois Referências > Sumário > Sumário automático.');
await page.screenshot({ path: `${out}quiz-descritiva.png`, fullPage: true });

await page.getByRole('button', { name: /^enviar/i }).click();
await page.waitForTimeout(400);
log('após envio, pendente:', await txt('[role="status"]'));

await page.getByLabel('Nota').fill('8,5');
await page.waitForTimeout(300);
log('após lançar 8,5:', await txt('[role="status"]'));
await page.screenshot({ path: `${out}quiz-descritiva-corrigida.png`, fullPage: true });

await page.reload({ waitUntil: 'networkidle' });
await page.waitForTimeout(500);
log('recarregou e não deixa refazer:', (await page.locator('textarea').count()) === 0);

log(erros.length ? `ERROS DE CONSOLE: ${erros.join(' | ')}` : 'sem erros de console');
await browser.close();
