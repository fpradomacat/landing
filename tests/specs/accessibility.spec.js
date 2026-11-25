// Accesibilidad automática con axe (contraste, etiquetas, estructura…), criterios WCAG 2.1 AA.
const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;
const { openPage, scrollThrough } = require("./helpers");

test("sin problemas de accesibilidad WCAG 2.1 AA", async ({ page }) => {
  await openPage(page);
  // Mostrar todo el contenido animado antes de analizar (si no, axe lo ve transparente)
  await scrollThrough(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    // La flecha de "bajar" es decorativa y se desvanece a propósito
    .exclude(".scroll-cue")
    .analyze();

  const summary = results.violations.map((v) => ({
    regla: v.id,
    impacto: v.impact,
    ejemplos: v.nodes.slice(0, 3).map((n) => n.target.join(" ")),
  }));
  expect(summary).toEqual([]);
});
