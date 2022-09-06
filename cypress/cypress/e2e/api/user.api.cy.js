/// <reference types="cypress" />
import { AES } from "crypto-js";

describe("user api", () => {
  context("POST login", () => {
    it("login with student", () => {
      const token = AES.encrypt("111111", "cms").toString();
      //cy.log(token);//U2FsdGVkX1/hFCguGTZea2N49CTQaQXQgJNRJe+MYwc=
      cy.request("POST", `${Cypress.env("prod")}/login`, {
        email: "student@admin.com",
        password: token,
        role: "student",
      }).then((res) => {
        const data = res.body.data;

        expect(data.token).exist; //.be.exist
        expect(data.role).eq("student");
        expect(typeof data.userId).eq("number");
      });
    });
  });

  /*
    context("POST logout", () => {
      it("manager logout", () => {
        const token = Cypress.env("managerToken");
        const authorization = `Bearer ${token}`;

        cy.request({
          method: "POST",
          url: `${Cypress.env("prod")}/logout`,
          headers: {authorization,},
        })
        .then((res) => {
          expect(res.statusText).eq('success');
        });
      });
    });
*/

  context("POST signup", () => {
    it("signup student", () => {
      cy.request("POST", `${Cypress.env("prod")}/signup`, {
        email: "aaa@admin.com",
        password: "111111", //
        role: "student", //
      }).then((res) => {
        const data = res.body.data;
        expect(data.email).be.exist;
        expect(data.role).eq("student");
      });
    });
  });

  context("GET profile", () => {
    it("manager get student profile", () => {
      const token = Cypress.env("managerToken");
      const authorization = `Bearer ${token}`;

      cy.request({
        method: "GET",
        url: `${Cypress.env("prod")}/profile?userId=2`,
        headers: { authorization },
      }).then((res) => {
        const data = res.body.data;
        expect(data.name).be.exist;
        expect(typeof data.age).eq("number");
        expect(typeof data.gender).eq("number");
      });
    });
  });
});
