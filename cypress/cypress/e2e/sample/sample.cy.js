/// <reference types="cypress" />

describe("class1 test", function () {
  it("fail test 10 + 15 => 15", function () {
    expect(10 + 15).to.equal(15);
  });
  it("pass test 10 + 15 => 25", function () {
    expect(10 + 15).to.equal(25);
  });
  it("some cy use", function () {
    cy.visit("https://www.google.com");

    cy.get(".SDkEP").click().type("cypress");

    cy.get(".gLFyf").should("have.value", "cypress");

    cy.get(".SDkEP").find("input");
  });
});
