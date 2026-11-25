// Carga básica: sin errores, sin recursos rotos.
const { test, expect } = require("@playwright/test");
const { openPage } = require("./helpers");

test("carga sin errores de consola ni recursos rotos", async ({ page }) => {
  const errors = [];
  const broken = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("response", (r) => {
    if (r.url().startsWith("http://localhost") && r.status() >= 400) broken.push(`${r.status()} ${r.url()}`);
  });

  await openPage(page);
  await page.waitForLoadState("networkidle");

  expect(errors, "errores de consola").toEqual([]);
  expect(broken, "recursos que no cargan").toEqual([]);
});

test("tiene un único h1 y las secciones principales", async ({ page }) => {
  await openPage(page);
  await expect(page.locator("h1")).toHaveCount(1);
  for (const id of ["sesion", "para-quien", "sobre-mi", "precios", "preguntas", "practica", "reservar"]) {
    await expect(page.locator(`#${id}`), `sección #${id}`).toHaveCount(1);
  }
});

test("archivos auxiliares publicados", async ({ request }) => {
  for (const path of ["/robots.txt", "/sitemap.xml", "/favicon.svg", "/assets/icon-192.png",
    "/assets/apple-touch-icon.png", "/assets/og-image.jpg", "/assets/fede.jpg", "/assets/fede.webp"]) {
    const res = await request.get(path);
    expect(res.status(), path).toBe(200);
  }
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Sitemap: https://federico.pradomacat.com/sitemap.xml");
  // robots.txt nunca debe bloquear el sitio: Google no podría leer el noindex
  expect(robots).not.toMatch(/Disallow:\s*\/\s*$/m);
});
