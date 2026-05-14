import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I open the signup page", () => {
  cy.clearLocalStorage();
  cy.visit("/signup.html");
});

When("I enter signup details", () => {
  cy.get("#signupName").type("Rajesh");
  cy.get("#signupEmail").type("rajesh@gmail.com");
  cy.get("#signupPassword").type("123456");
});

When("I click the signup button", () => {
  cy.get("#signupBtn").click();
});

Then("signup should be successful", () => {
  cy.window().then((win) => {
    const users = JSON.parse(win.localStorage.getItem("users"));

    expect(users[0].email).to.equal("rajesh@gmail.com");
  });
});

Given("I open the login page", () => {
  const users = [
    {
      name: "Rajesh",
      email: "rajesh@gmail.com",
      password: "123456",
    },
  ];

  cy.visit("/index.html", {
    onBeforeLoad(win) {
      win.localStorage.setItem("users", JSON.stringify(users));
    },
  });
});

When("I enter valid login credentials", () => {
  cy.get("#loginEmail").type("rajesh@gmail.com");
  cy.get("#loginPassword").type("123456");
});

When("I click the login button", () => {
  cy.get("#loginBtn").click();
});

Then("I should redirect to home page", () => {
  cy.url().should("include", "home.html");
});

When("I enter invalid login credentials", () => {
  cy.get("#loginEmail").type("wrong@gmail.com");
  cy.get("#loginPassword").type("wrongpassword");
});

Then("I should see login error message", () => {
  cy.contains("Incorrect email or password");
});
