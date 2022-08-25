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

Cypress.Commands.add("login", (email, role) => {
  const loginPath = "/login";
  cy.location("pathname").then((path) => {
    if (path !== loginPath) {
      cy.visit(loginPath);
    }
  });

  const log = Cypress.log({
    name: "login",
    displayName: "LOGIN",
    message: `${email}`,
  });

  cy.intercept("POST", `${Cypress.env("prod")}/login`, {
    data: {
      token: Cypress.env("managerToken"),
      role: "manager",
      userId: 3,
    },
    code: 201,
    msg: "success",
  }).as("login");

  const roleId = { student: 1, teacher: 2, manager: 3 };
  const index = roleId[role];
  cy.get(`#login_role > :nth-child(${index})`).click();
  cy.get("#login_email").type(email);
  cy.get("#login_password").type("111111");
  cy.get("[type=submit]").click();

  cy.wait("@login").then((res) => {
    const data = res.response.body.data;
    Cypress.env("token", data.token);
    log.set({
      consoleProps: () => {
        return {
          userId: data.userId,
          userRole: data.role,
          userToken: data.token,
        };
      },
    });
  });

  log.end();
});
