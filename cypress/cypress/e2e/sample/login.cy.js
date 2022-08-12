/// <reference types="cypress" />

describe("Login page", () => {
  //test case at the root class2testCase.xlsx

  beforeEach(function () {
    cy.visit("/login");
  });

  it("login have 3 role, student (defult) teacher and manager", () => {
    cy.contains("Course Management Assistant");
    cy.get("#login_role label").should("have.length", 3).and("be.visible");
    cy.get("#login_role > :nth-child(1) [type=radio]")
      .should("have.value", "student")
      .and("be.checked");
    cy.get("#login_role > :nth-child(2) [type=radio]").should(
      "have.value",
      "teacher"
    );
    cy.get("#login_role > :nth-child(3) [type=radio]").should(
      "have.value",
      "manager"
    );
    cy.get("#login_email").should("be.visible");
    cy.get("#login_password").should("be.visible");
    cy.get("button[type=submit]").should("be.visible");
  });

  it("email format", () => {
    cy.get("input[type=email]").type("aaa");
    cy.contains("is not a valid email");
    cy.get("#login_email").clear();
    cy.contains("'email' is required");
  });

  it("password format", () => {
    cy.get("input[type=password]").type("aaa");
    cy.contains("must be between 4 and 16 characters");
    cy.get("#login_password").clear();
    cy.contains("'password' is required");
  });

  it("verify login with student", () => {
    cy.get("#login_role > :nth-child(1)").click();
    cy.get("#login_email").type("student@admin.com");
    cy.get("#login_password").type("111111");
    cy.get("[type=submit]").click();
    cy.url().should("contain", "dashboard");
  });

  it("verify login with teacher", () => {
    cy.get("#login_role > :nth-child(2)").click();
    cy.get("#login_email").type("teacher@admin.com");
    cy.get("#login_password").type("111111");
    cy.get("[type=submit]").click();
    cy.url().should("contain", "dashboard");
  });

  it("verify login with manager", () => {
    cy.get("#login_role > :nth-child(3)").click();
    cy.get("#login_email").type("manager@admin.com");
    cy.get("#login_password").type("111111");
    cy.get("[type=submit]").click();
    cy.url().should("contain", "dashboard");
  });

  it("sign up", () => {
    cy.get('a[href="/signup"]').click();
    cy.url().should("contain", "signup");
    cy.contains("Sign up your account");
  });
});
