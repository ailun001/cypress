/// <reference types="cypress" />

describe("Login page", () => {
  beforeEach(function () {
    cy.visit("/signup");
  });

  it("is sign up page", () => {
    cy.url().should("contain", "signup");
    cy.contains("Sign up your account");
  });

  it("sign up form", () => {
    cy.get("#signUp div > label[title]").should("have.length", 4);
    cy.get("#signUp_role label").should("have.length", 3);
  });

  it("email format", () => {
    cy.get("input[type=email]").click().type("aaa");
    cy.contains("is not a valid email");
    cy.get("#signUp_email").clear();
    cy.contains("'email' is required");
  });

  it("password format", () => {
    cy.get("#signUp_password").click().type("aaa");
    cy.contains("must be between 4 and 16 characters");
    cy.get("#signUp_password").clear();
    cy.contains("'password' is required");
  });

  it("confirm password format", () => {
    cy.get("#signUp_confirmPassword").click().type("aaaaaa");
    cy.contains("The two passwords that you entered do not match!");
    cy.get("#signUp_confirmPassword").clear();
    cy.contains("'confirmPassword' is required");
  });

  it("password invisable", () => {
    cy.get("#signUp_password").click().type("aaaa");
    cy.get("#signUp_password").should("have.attr", "type", "password");
    cy.get(
      ".ant-form-item-has-success > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input-affix-wrapper > .ant-input-suffix > .anticon > svg"
    ).click();
    cy.get("#signUp_password").should("have.attr", "type", "text");
    cy.get("#signUp_password").should("have.value", "aaaa");
  });

  it.only("submit form", () => {
    cy.get("#signUp_role > :nth-child(1)").click();
    cy.get("input[type=email]").click().type("student1@admin.com");
    cy.get("#signUp_password").click().type("111111");
    cy.get("#signUp_confirmPassword").click().type("111111");
    cy.get(".ant-btn").click();
    cy.url();
    //url
  });

  it("sign in", () => {
    cy.get(".ant-space > :nth-child(2) > a").click();
    cy.url().should("contain", "login");
  });
});
