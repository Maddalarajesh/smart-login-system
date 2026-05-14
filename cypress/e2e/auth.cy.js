describe("Smart Login System", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("should signup successfully", () => {
    cy.visit("/signup.html");

    cy.get("#signupName").type("Rajesh");
    cy.get("#signupEmail").type("rajesh@gmail.com");
    cy.get("#signupPassword").type("123456");

    cy.get("#signupBtn").click();

    cy.window().then((win) => {
      const users = JSON.parse(win.localStorage.getItem("users"));

      expect(users[0].email).to.equal("rajesh@gmail.com");
    });
  });

  it("should login successfully", () => {
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

    cy.get("#loginEmail").type("rajesh@gmail.com");
    cy.get("#loginPassword").type("123456");

    cy.get("#loginBtn").click();

    cy.url().should("include", "home.html");
  });

  it("should fail with invalid credentials", () => {
    cy.visit("/index.html");

    cy.get("#loginEmail").type("wrong@gmail.com");
    cy.get("#loginPassword").type("wrongpassword");

    cy.get("#loginBtn").click();

    cy.contains("Incorrect email or password");
  });
});
