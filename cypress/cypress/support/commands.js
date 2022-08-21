// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, role) => {
    cy.visit("/login");
    cy.intercept('POST','http://cms.chtoma.com/api/login').as('login');
    const roleId = { student:1, teacher:2 , manager: 3};
    const index = roleId[role]
    cy.get(`#login_role > :nth-child(${index})`).click();
    cy.get("#login_email").type(email);
    cy.get("#login_password").type('111111');
    cy.get("[type=submit]").click();
    cy.wait('@login');
})

