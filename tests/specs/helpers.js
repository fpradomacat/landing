// Utilidades compartidas por los tests.

const CALENDLY = "https://calendly.com/pradomacat/exploratoria";
const REVEAL =
  ".section-head, .step, .checklist li, .about-photo, .about-text > *, .plan, .fine-print, .faq details, .cta-inner > *, .link-card";

/** Abre la página sin scroll suave (para medir posiciones al instante). */
async function openPage(page, path = "/") {
  await page.goto(path);
  await page.addStyleTag({ content: "html { scroll-behavior: auto !important; }" });
}

/** Recorre la página de arriba abajo para que se disparen todas las animaciones de aparición. */
async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.6);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, document.body.scrollHeight);
  });
  // Espera a que terminen las transiciones (1 s + retardo escalonado máx. 0,5 s)
  await page.waitForTimeout(1700);
}

/** Salta a un ancla como lo haría un clic en el menú. */
async function jumpTo(page, hash) {
  await page.evaluate((h) => { location.hash = h; }, hash);
  await page.waitForTimeout(250);
}

module.exports = { CALENDLY, REVEAL, openPage, scrollThrough, jumpTo };
