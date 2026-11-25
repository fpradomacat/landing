// Enlaces: reserva, anclas internas y enlaces externos.
const { test, expect } = require("@playwright/test");
const { CALENDLY, openPage } = require("./helpers");

test("todos los botones de reserva llevan a Calendly en pestaña nueva", async ({ page }) => {
  await openPage(page);
  const links = await page.locator("[data-booking]").evaluateAll((els) =>
    els.map((a) => ({ href: a.href, target: a.target, rel: a.rel })));
  expect(links.length).toBeGreaterThanOrEqual(6);
  for (const l of links) {
    expect(l.href).toBe(CALENDLY);
    expect(l.target).toBe("_blank");
    expect(l.rel).toContain("noopener");
  }
});

test("las anclas internas apuntan a elementos que existen", async ({ page }) => {
  await openPage(page);
  const missing = await page.evaluate(() =>
    [...document.querySelectorAll('a[href^="#"]')]
      .map((a) => a.getAttribute("href"))
      .filter((h) => h.length > 1 && !document.querySelector(h)));
  expect(missing).toEqual([]);
});

test("los enlaces externos en pestaña nueva usan noopener", async ({ page }) => {
  await openPage(page);
  const bad = await page.evaluate(() =>
    [...document.querySelectorAll('a[target="_blank"]')]
      .filter((a) => !a.rel.includes("noopener"))
      .map((a) => a.href));
  expect(bad).toEqual([]);
});

test("enlaces a Neyen, YouTube y email presentes", async ({ page }) => {
  await openPage(page);
  await expect(page.locator('a[href="https://neyen.pradomacat.com"]').first()).toBeAttached();
  await expect(page.locator('a[href="https://www.youtube.com/@meditawork"]').first()).toBeAttached();
  await expect(page.locator('a[href^="mailto:"]').first()).toBeAttached();
});
