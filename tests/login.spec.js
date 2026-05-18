const { test, expect } = require("@playwright/test");

test.describe("Smart Login System", () => {

  test.beforeEach(async ({ page }) => {
    // Clear localStorage before every test
    await page.goto("http://127.0.0.1:3000");

    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  // =========================
  // Signup Test
  // =========================

  test("User signup successfully", async ({ page }) => {

    // Open signup page
    await page.goto("http://127.0.0.1:3000/signup.html");

    // Enter signup details
    await page.fill("#signupName", "Rajesh");

    await page.fill("#signupEmail", "rajesh@gmail.com");

    await page.fill("#signupPassword", "123456");

    // Click signup button
    await page.click("#signupBtn");

    // Validate localStorage
    const users = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem("users"));
    });

    expect(users[0].email).toBe("rajesh@gmail.com");
  });

  // =========================
  // Login Test
  // =========================

  test("User login successfully", async ({ page }) => {

    // Add mock user to localStorage
    await page.goto("http://127.0.0.1:8080/index.html");

    await page.evaluate(() => {
      const users = [
        {
          name: "Rajesh",
          email: "rajesh@gmail.com",
          password: "123456",
        },
      ];

      localStorage.setItem("users", JSON.stringify(users));
    });

    // Enter login credentials
    await page.fill("#loginEmail", "rajesh@gmail.com");

    await page.fill("#loginPassword", "123456");

    // Click login button
    await page.click("#loginBtn");

    // Verify redirect
    await page.waitForURL(/home.html/, {
      timeout: 10000,
    });

    await expect(page).toHaveURL(/home.html/);
  });

  // =========================
  // Invalid Login Test
  // =========================

  test("Invalid login attempt", async ({ page }) => {

    // Open login page
    await page.goto("http://127.0.0.1:8080/index.html");

    // Enter invalid credentials
    await page.fill("#loginEmail", "wrong@gmail.com");

    await page.fill("#loginPassword", "wrongpassword");

    // Click login
    await page.click("#loginBtn");

    // Verify error message
    await expect(page.locator("body")).toContainText(
      "Incorrect email or password"
    );
  });

});
