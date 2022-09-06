/// <reference types="cypress" />

describe("dashboard login with manager", () => {
    beforeEach(function () {
      cy.visit("/login");
      cy.get("#login_role > :nth-child(3)").click();
      cy.get("#login_email").type("manager@admin.com");
      cy.get("#login_password").type("111111");
      cy.get("[type=submit]").click();
      cy.url().should("contain", "dashboard/manager");

      /*
      cy.intercept("GET",'http://cms.chtoma.com/api/statistics/overview').as('overview');
      cy.intercept("GET",'http://cms.chtoma.com/api/statistics/student').as('student');
      cy.intercept("GET",'http://cms.chtoma.com/api/statistics/teacher').as('teacher');
      cy.intercept("GET",'http://cms.chtoma.com/api/statistics/course').as('course');
      cy.wait('@overview').its('response.statusCode').should('eq',304);
      cy.wait('@student').its('response.statusCode').should('eq',304);
      cy.wait('@teacher').its('response.statusCode').should('eq',304);
      cy.wait('@course').its('response.statusCode').should('eq',304);
      */
    });
  
    it("menu visual", () => {
        cy.get('.ant-menu').should('be.visible');
        cy.get('[role=menu] li').should('have.length',5);
      });

    it('menu sub visual', () =>{
        cy.get(':nth-child(2) > .ant-menu-submenu-title').click();
        cy.get(':nth-child(3) > .ant-menu-submenu-title').click();
        cy.get(':nth-child(4) > .ant-menu-submenu-title').click();
        cy.get('[role=menuitem]').should('have.length',10);
    })

    it('body visual', () =>{
        cy.get('.ant-breadcrumb').should('be.visible');
        cy.get('.ant-layout-content').should('be.visible');
        //cy.scrollTo('bottom');
        //cy.get('.ant-breadcrumb').should('not.be.visible');
    })

    it('Distribution', () => {
      cy.wait(5000);
      cy.get('.ant-card').eq(3).should('be.visible');
      cy.get('.ant-card').eq(3).percySnapshot('ant-card');
    });
  });