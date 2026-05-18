const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",

  timeout: 30000,

  use: {
    baseURL: "http://127.0.0.1:8080",
    headless: true,

    screenshot: "only-on-failure",

    video: "retain-on-failure",

    trace: "retain-on-failure",
  },

  reporter: [
    ["list"],
    ["html"],
    ["allure-playwright"]
  ],

  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:8080",
    reuseExistingServer: true,
    timeout: 120000,
  },
});
