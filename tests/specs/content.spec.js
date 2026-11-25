// Contenido: reglas del brief (sin promesas de salud ni títulos que no se tienen)
// e imágenes livianas y sin metadatos.
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { openPage } = require("./helpers");

const ROOT = path.resolve(__dirname, "..", "..");

// Palabras que no pueden aparecer en la web (ver README, "Criterios de contenido").
const FORBIDDEN = [
  /\bcura(r|s|n|ción)?\b/i,
  /\bsana(r|s|n|ción)?\b/i,
  /\btrata(miento)? (la|tu) ansiedad\b/i,
  /\bcertificad[oa]s?\b/i,
  /\bacreditad[oa]s?\b/i,
  /\bgarantiz/i,
  /\bresultados garantizados\b/i,
];

test("no hay afirmaciones prohibidas por el brief", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "El texto es el mismo en móvil");
  await openPage(page);
  const text = await page.evaluate(() => document.body.innerText);
  const head = await page.evaluate(() =>
    [...document.querySelectorAll('meta[name="description"], meta[property^="og:"], script[type="application/ld+json"]')]
      .map((e) => e.content || e.textContent).join("\n"));
  for (const re of FORBIDDEN) {
    expect(text, `texto visible contiene ${re}`).not.toMatch(re);
    expect(head, `metadatos contienen ${re}`).not.toMatch(re);
  }
});

test("el descargo y la pregunta '¿Esto es terapia?' están presentes", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "El texto es el mismo en móvil");
  await openPage(page);
  await expect(page.locator(".disclaimer")).toContainText("no sustituyen");
  await expect(page.locator(".faq summary", { hasText: "¿Esto es terapia?" })).toHaveCount(1);
  await expect(page.locator("#contraindicaciones")).toHaveCount(1);
});

test("las imágenes son livianas y no tienen metadatos EXIF", async ({}, info) => {
  test.skip(info.project.name !== "desktop", "Comprobación de archivos, basta una vez");
  const dir = path.join(ROOT, "assets");
  for (const f of fs.readdirSync(dir)) {
    const buf = fs.readFileSync(path.join(dir, f));
    expect(buf.length, `${f} pesa demasiado`).toBeLessThan(200 * 1024);
    if (/\.jpe?g$/i.test(f)) {
      expect(buf.includes(Buffer.from("Exif\0\0")), `${f} tiene EXIF (puede incluir ubicación)`).toBe(false);
    }
  }
});

test("todas las imágenes tienen texto alternativo", async ({ page }) => {
  await openPage(page);
  const missing = await page.evaluate(() =>
    [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).map((i) => i.src));
  expect(missing).toEqual([]);
});
