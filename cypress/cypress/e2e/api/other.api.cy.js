/// <reference types="cypress" />

describe("other api", () => {
  context("GET degrees", () => {
    it("degrees list", () => {
      cy.request("GET", `${Cypress.env("prod")}/degrees`).then((res) => {
        const data = res.body.data;
        expect(res.status).eq(200);
        expect(data.length).eq(9);
      });
    });
  });

  context("GET countries", () => {
    it("countries list", () => {
      cy.request("GET", `${Cypress.env("prod")}/countries`).then((res) => {
        const data = res.body.data;
        expect(res.status).eq(200);
        expect(data.length).eq(230);
      });
    });
  });
});
