// Animaciones: que nunca dejen contenido escondido.
const { test, expect } = require("@playwright/test");
const { REVEAL, openPage, scrollThrough } = require("./helpers");

test("al recorrer la página, todo el contenido animado queda visible", async ({ page }) => {
  await openPage(page);
  await scrollThrough(page);
  const hidden = await page.evaluate((sel) =>
    [...document.querySelectorAll(sel)]
      .filter((el) => !el.classList.contains("is-visible") || getComputedStyle(el).opacity !== "1")
      .map((el) => el.className || el.tagName), REVEAL);
  expect(hidden).toEqual([]);
});

test("la flecha de 'bajar' aparece y se oculta al hacer scroll", async ({ page }) => {
  await openPage(page);
  const cue = page.locator(".scroll-cue");
  await expect.poll(() => cue.evaluate((el) => Number(getComputedStyle(el).opacity)), { timeout: 6000 })
    .toBeGreaterThan(0.5);
  await page.mouse.wheel(0, 300);
  await expect(cue).toHaveClass(/is-hidden/);
});

test.describe("con movimiento reducido", () => {
  test.use({ reducedMotion: "reduce" });

  test("todo se ve sin necesidad de hacer scroll", async ({ page }) => {
    await openPage(page);
    const hidden = await page.evaluate((sel) =>
      [...document.querySelectorAll(sel)].filter((el) => getComputedStyle(el).opacity !== "1").length, REVEAL);
    expect(hidden).toBe(0);
  });
});

test.describe("sin JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("el contenido y el menú se ven igual", async ({ page }) => {
    await page.goto("/");
    const hidden = await page.evaluate((sel) =>
      [...document.querySelectorAll(sel)].filter((el) => getComputedStyle(el).opacity !== "1").length, REVEAL)
      .catch(() => null);
    // Sin JS, evaluate no está disponible: comprobamos con locators
    if (hidden !== null) expect(hidden).toBe(0);
    await expect(page.locator(".about-text h2")).toBeVisible();
    await expect(page.locator('#site-nav a[href="#precios"]')).toBeVisible();
  });
});
