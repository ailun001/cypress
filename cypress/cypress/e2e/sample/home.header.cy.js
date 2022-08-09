/// <reference types="cypress" />

describe("header of homepage", () => {
  it("header have 5 link", () => {
    cy.visit("/");
    cy.get("#menu li a").should("have.length", 5);
  });
  it("links should visible", () => {
    cy.get("#menu li a").should("be.visible");
  });

  it("header switch page", () => {
    cy.get("#menu > :nth-child(1) > :nth-child(1) > a").click();
    cy.url().should('include', '/events');
    cy.contains(
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem"
    ).should("be.visible");
    cy.get("#logo").click();
    cy.contains(
      "Do you have some questions? Fill the form and get an answer!"
    ).should("be.visible");
    cy.get("#menu > :nth-child(1) > :nth-child(2) > a").click();
    cy.url().should('include', '/events');
    cy.get("#logo").click();
    cy.get("#menu > :nth-child(2) > :nth-child(1) > a").click();
    cy.url().should('include', '/gallery');
    cy.get("#logo").click();
    cy.get("#menu > :nth-child(2) > :nth-child(2) > a").click();
    cy.url().should('include', '/gallery');
    cy.get("#logo").click();
  });

  it("header on top", () => {
    cy.get("#header").should("be.visible");
    cy.get("#footer").scrollIntoView().should("be.visible");
    cy.get("#header").should("be.visible");
  });
});
