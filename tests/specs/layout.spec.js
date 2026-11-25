// Maquetación: que nada se salga, se corte o se deforme.
const { test, expect } = require("@playwright/test");
const { openPage, jumpTo } = require("./helpers");

test("no hay scroll horizontal", async ({ page }) => {
  await openPage(page);
  const { scroll, width } = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    width: window.innerWidth,
  }));
  expect(scroll).toBeLessThanOrEqual(width);
});

test("el inicio ocupa justo la pantalla", async ({ page }) => {
  await openPage(page);
  const { bottom, vh } = await page.evaluate(() => ({
    bottom: document.querySelector(".hero").getBoundingClientRect().bottom,
    vh: window.innerHeight,
  }));
  expect(Math.abs(bottom - vh)).toBeLessThanOrEqual(2);
});

test("la foto mantiene la proporción 4:5", async ({ page }) => {
  await openPage(page);
  const img = page.locator(".about-photo img");
  await img.scrollIntoViewIfNeeded();
  const box = await img.boundingBox();
  expect(box.width).toBeGreaterThan(200);
  expect(box.height / box.width).toBeCloseTo(1.25, 1);
});

for (const id of ["sesion", "sobre-mi", "precios", "preguntas"]) {
  test(`el enlace #${id} deja el contenido justo bajo la cabecera`, async ({ page }) => {
    await openPage(page);
    await jumpTo(page, `#${id}`);
    const { first, header } = await page.evaluate((sid) => {
      const s = document.getElementById(sid);
      const el = s.querySelector(".about-photo, .eyebrow");
      return {
        first: el.getBoundingClientRect().top,
        header: document.querySelector(".site-header").getBoundingClientRect().bottom,
      };
    }, id);
    expect(first, "no debe quedar tapado por la cabecera").toBeGreaterThanOrEqual(header);
    expect(first - header, "no debe quedar un hueco grande").toBeLessThanOrEqual(80);
  });
}

test("al ir a Precios, las tarjetas se ven enteras (escritorio)", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "En móvil las tarjetas van en columna");
  await openPage(page);
  await jumpTo(page, "#precios");
  const { bottom, vh } = await page.evaluate(() => ({
    bottom: document.querySelector(".plans").getBoundingClientRect().bottom,
    vh: window.innerHeight,
  }));
  expect(bottom).toBeLessThanOrEqual(vh);
});

test("botón Reservar en la cabecera solo en móvil", async ({ page }, info) => {
  await openPage(page);
  const cta = page.locator(".header-cta");
  if (info.project.name === "mobile") await expect(cta).toBeVisible();
  else await expect(cta).toBeHidden();
});

test("el menú móvil abre y cierra", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile", "Solo en móvil");
  await openPage(page);
  const toggle = page.locator(".nav-toggle");
  await toggle.click();
  await expect(page.locator("#site-nav")).toBeVisible();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.locator('#site-nav a[href="#precios"]').click();
  await expect(page.locator("#site-nav")).toBeHidden();
});

test("los botones principales son fáciles de tocar", async ({ page }) => {
  await openPage(page);
  const small = await page.evaluate(() =>
    [...document.querySelectorAll(".btn:not(.btn-small)")]
      .filter((b) => b.offsetParent !== null)
      .map((b) => ({ text: b.textContent.trim(), h: b.getBoundingClientRect().height }))
      .filter((b) => b.h < 44));
  expect(small).toEqual([]);
});
