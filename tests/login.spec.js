const { test, expect } = require("@playwright/test");

test.describe("Smart Login System", () => {

  test.beforeEach(async ({ page }) => {

    // Open application
    await page.goto("/");

    // Clear localStorage before every test
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  // =========================
  // Signup Test
  // =========================

  test("User signup successfully", async ({ page }) => {

    // Open signup page
    await page.goto("http://127.0.0.1:8080/signup.html");

    // Fill signup form
    await page.fill("#signupName", "Rajesh");

    await page.fill("#signupEmail", "rajesh@gmail.com");

    await page.fill("#signupPassword", "123456");

    // Click signup button
    await page.click("#signupBtn");

    // Validate user stored in localStorage
    const users = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem("users"));
    });

    await expect(users[0].email).toBe("rajesh@gmail.com");
  });

  // =========================
  // Login Test
  // =========================

  test("User login successfully", async ({ page }) => {

    // Open login page
    await page.goto("http://127.0.0.1:8080/index.html");

    // Add mock user BEFORE login
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

    // Reload page so application reads updated localStorage
    await page.reload();

    // Enter login credentials
    await page.fill("#loginEmail", "rajesh@gmail.com");

    await page.fill("#loginPassword", "123456");

    // Click login button
    await page.click("#loginBtn");

    // Wait for redirect
    await page.waitForURL("**/home.html", {
      timeout: 10000,
    });

    // Verify redirect success
    await expect(page).toHaveURL(/home\.html/);
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

    // Click login button
    await page.click("#loginBtn");

    // Verify error message
    await expect(page.locator("body")).toContainText(
      "Incorrect email or password"
    );
  });

});
