/// <reference types="cypress" />

describe("student api", () => {
    context("POST student", () => {
        it("add student", () => {
          const token = Cypress.env("managerToken");
          const authorization = `Bearer ${token}`;
  
          cy.request({
            method: "POST",
            url: `${Cypress.env("prod")}/students`,
            headers: {authorization,},
            body: {
                name: "aaa",
                country: "country aaa",
                email: "eamilaaa@aaa.com",
                type: 0,
            },
          })
          .then((res) => {
            const data = res.body.data
            expect(data.id).exist;
            expect(data.name).to.eq("aaa");
          });
        });
      });

      context("GET student", () => {
        it("get student list", () => {
          const token = Cypress.env("managerToken");
          const authorization = `Bearer ${token}`;
  
          cy.request({
            method: "GET",
            url: `${Cypress.env("prod")}/students?page=1&limit=5`,
            headers: {authorization,},
          })
          .then((res) => {
            const data = res.body.data
            expect(res.statusText).eq('success');
            expect(data.page).eq(1);
          });
        });
      });

      context("PUT student", () => {
        it("edit student", () => {
          const token = Cypress.env("managerToken");
          const authorization = `Bearer ${token}`;
  
          cy.request({
            method: "PUT",
            url: `${Cypress.env("prod")}/students`,
            headers: {authorization,},
            body: {
                id: 1, //?????????????????????
                country: "A NZ",
            },
          })
          .then((res) => {
            const data = res.body.data
            expect(res.statusText).eq('success');
            expect(data.country).eq("A NZ");
          });
        });
      });

})