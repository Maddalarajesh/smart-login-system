const { isValidEmail, isNewEmail } = require("../js/utils");

describe("Utility Function Tests", () => {
  test("should validate correct email", () => {
    expect(isValidEmail("rajesh@gmail.com")).toBe(true);
  });

  test("should reject invalid email", () => {
    expect(isValidEmail("rajeshgmail")).toBe(false);
  });

  test("should return false for duplicate email", () => {
    const users = [
      {
        email: "rajesh@gmail.com",
      },
    ];

    expect(isNewEmail(users, "rajesh@gmail.com")).toBe(false);
  });

  test("should return true for new email", () => {
    const users = [
      {
        email: "test@gmail.com",
      },
    ];

    expect(isNewEmail(users, "new@gmail.com")).toBe(true);
  });
});
