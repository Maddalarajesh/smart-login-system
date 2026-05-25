const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",

  timeout: 30000,

  retries: 0,

  reporter: [
    ["html"],
    ["line"],
    ["allure-playwright"],
  ],

  use: {
    baseURL: "http://127.0.0.1:8080",

    headless: true,

    screenshot: "only-on-failure",

    video: "retain-on-failure",

    trace: "retain-on-failure",
  },

  webServer: {
    command: "npx serve . -l 8080",
    url: "http://127.0.0.1:8080",
    timeout: 120000,
    reuseExistingServer: !process.env.CI,
  },

  outputDir: "test-results/",
});
