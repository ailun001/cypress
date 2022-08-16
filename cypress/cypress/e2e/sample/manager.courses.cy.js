/// <reference types="cypress" />

describe("header of homepage", () => {
  beforeEach(function () {
    cy.visit("/login");
    cy.get("#login_role > :nth-child(3)").click();
    cy.get("#login_email").type("manager@admin.com");
    cy.get("#login_password").type("111111");
    cy.get("[type=submit]").click();
    cy.url().should("contain", "dashboard/manager");
    //login (import)
  });

  it('add courses', () =>{
    cy.get(':nth-child(4) > .ant-menu-submenu-title').click();
    cy.get('[title="Add Course"]').click();
    cy.intercept('GET','https://code.highcharts.com/mapdata/custom/world-palestine-highres.geo.json').as('toAdd');
    cy.wait('@toAdd');

    cy.get('#name').type('aaa');
    cy.get('#teacherId').type('aa');
    cy.intercept('GET','http://cms.chtoma.com/api/teachers?query=aa').as('teacherId');
    //cy.wait('@teacherId');
    cy.contains('Fanny Haag').click();
    
    //cy.get('#type').focus();
    cy.get('#type').click();
    cy.intercept('GET','http://cms.chtoma.com/api/courses/type').as('type')
    //cy.get('.rc-virtual-list-holder-inner').scrollTo('bottom');
    //cy.get('.ant-select-item-option').contains('aaa').click();
    //select? scrolldown? focus()?
    cy.get('.ant-select-item-option').contains('C').click();
    cy.get('.ant-select-item-option').contains('C++').click();
    cy.get('.ant-select-item-option').contains('C+').click();

    cy.get('#startTime').click();
    cy.get('.ant-picker-today-btn').click();
    const dayjs = require('dayjs');
    const timeNow = dayjs().format('YYYY-MM-DD');
    const timeTmr = dayjs().add(1,'day').format('YYYY-MM-DD');
    cy.get(`[title=${timeNow}]`).should('be.visible');
    //cy.get('.ant-picker-clear').focus();
    //cy.get('.ant-picker-clear > .anticon > svg').should('be.visible').click();
    //cy.get('.ant-picker-suffix').click();
    cy.get('#startTime').click();
    cy.get(`td[title=${timeTmr}]`).click();

    cy.get('#price').type(5000);
    cy.get('#maxStudents').type(10);
    cy.get('.ant-input-group > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input')
    .click().type(30);
    cy.get('.ant-input-group > .ant-select > .ant-select-selector > .ant-select-selection-item')
    .click().then(() => {
        cy.get('.ant-select-item-option-content').last().click();
    });
    cy.get('#detail').type('e2e abc example need have 100 word x xxxxx xxxxx xxxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx.103');

    cy.get('[type="submit"]').contains('Create').click();

    cy.intercept('POST','http://cms.chtoma.com/api/courses').as('detail');
})
});
