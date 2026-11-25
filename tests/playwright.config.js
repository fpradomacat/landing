// @ts-check
const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./specs",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:4173",
    browserName: "chromium",
    trace: "retain-on-failure",
  },
  projects: [
    // Portátil con escalado de Windows al 125 % (el caso del corte en Precios)
    { name: "desktop", use: { viewport: { width: 1364, height: 757 } } },
    // Móvil típico
    { name: "mobile", use: { viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true } },
  ],
  webServer: {
    command: "node server.js",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
  },
});
