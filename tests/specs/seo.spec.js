// SEO: metadatos y datos estructurados coherentes con lo que muestra la página.
const { test, expect } = require("@playwright/test");
const { openPage } = require("./helpers");

const SITE = "https://pradomacat.com/";

test("título y descripción con longitud adecuada", async ({ page }) => {
  await openPage(page);
  const title = await page.title();
  const desc = await page.locator('meta[name="description"]').getAttribute("content");
  expect(title.length, `título: "${title}"`).toBeGreaterThanOrEqual(30);
  expect(title.length, `título: "${title}"`).toBeLessThanOrEqual(60);
  expect(desc.length, "descripción").toBeGreaterThanOrEqual(70);
  expect(desc.length, "descripción").toBeLessThanOrEqual(160);
});

test("canonical, robots y Open Graph completos", async ({ page }) => {
  await openPage(page);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", SITE);
  // La etiqueta robots debe existir (index o noindex es una decisión, no un error)
  await expect(page.locator('meta[name="robots"]')).toHaveCount(1);
  for (const prop of ["og:title", "og:description", "og:url", "og:image", "og:image:alt", "og:locale"]) {
    const v = await page.locator(`meta[property="${prop}"]`).getAttribute("content");
    expect(v, prop).toBeTruthy();
  }
  const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
  expect(ogImage.startsWith(SITE)).toBe(true);
  const res = await page.request.get(ogImage.replace(SITE, "/"));
  expect(res.status(), "og:image debe existir").toBe(200);
});

async function jsonLd(page) {
  const raw = await page.locator('script[type="application/ld+json"]').textContent();
  return JSON.parse(raw)["@graph"];
}

test("datos estructurados válidos", async ({ page }) => {
  await openPage(page);
  const graph = await jsonLd(page);
  const types = graph.map((n) => n["@type"]);
  expect(types).toEqual(expect.arrayContaining(["WebSite", "Person", "ProfessionalService", "FAQPage"]));
});

test("los precios de los datos estructurados coinciden con los de la página", async ({ page }) => {
  await openPage(page);
  const graph = await jsonLd(page);
  const service = graph.find((n) => n["@type"] === "ProfessionalService");
  const ldPrices = service.hasOfferCatalog.itemListElement
    .map((o) => Number(o.price)).filter((p) => p > 0).sort((a, b) => a - b);
  const pagePrices = (await page.locator(".price-amount").allTextContents())
    .map((t) => Number(t.replace(/[^\d]/g, ""))).sort((a, b) => a - b);
  expect(ldPrices).toEqual(pagePrices);
});

test("las preguntas frecuentes de los datos estructurados coinciden con la página", async ({ page }) => {
  await openPage(page);
  const graph = await jsonLd(page);
  const faq = graph.find((n) => n["@type"] === "FAQPage").mainEntity.map((q) => q.name);
  const onPage = (await page.locator(".faq summary").allTextContents()).map((t) => t.trim());
  expect(faq).toEqual(onPage);
});

test("el sitemap apunta a la URL canónica", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  expect(xml).toContain(`<loc>${SITE}</loc>`);
});
