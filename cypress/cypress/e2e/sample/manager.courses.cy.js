/// <reference types="cypress" />

describe("header of homepage", () => {
  beforeEach(function () {
    cy.login('manager@admin.com','manager');
  });

  it('add courses', () =>{
    cy.get(':nth-child(4) > .ant-menu-submenu-title').click();
    cy.get('[title="Add Course"]').click();

    cy.get('#name',{ timeout:10000 }).type('aaa');
    cy.get('#teacherId').type('aa');
    cy.intercept('GET',cy.apiUrl()+'/teachers?query=aa').as('teacherId');
    cy.contains('Fanny Haag').click();
    
    cy.get('#type').click();
    cy.intercept('GET',cy.apiUrl()+'/courses/type').as('type')
    cy.get('.ant-select-item-option').contains('C').click();
    cy.get('.ant-select-item-option').contains('C++').click();
    cy.get('.ant-select-item-option').contains('C+').click();

    cy.get('#startTime').click();
    cy.get('.ant-picker-today-btn').click();
    const dayjs = require('dayjs');
    const timeNow = dayjs().format('YYYY-MM-DD');
    const timeTmr = dayjs().add(1,'day').format('YYYY-MM-DD');
    cy.get(`[title=${timeNow}]`).should('be.visible');
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
    cy.intercept('POST',cy.apiUrl()+'/courses').as('detail');
    /*
    cy.wait(10000);
    cy.wait('@detail',{ timeout: 10000 }).then((response) => {
        //check specal data?
    });
    */

    cy.get('#schedule').contains('Add Chapter').click().click().click();
    cy.get('[placeholder="Chapter Name"]').first().type('cn1');
    cy.get('[placeholder="Chapter content"]').first().type('cc1');
    cy.get('[placeholder="Chapter Name"]').eq(1).type('cn2');
    cy.get('[placeholder="Chapter content"]').eq(1).type('cc2');
    cy.get('[placeholder="Chapter Name"]').eq(2).type('cn3');
    cy.get('[placeholder="Chapter content"]').eq(2).type('cc3');
    cy.get(':nth-child(4) > .ant-col-2 > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content').click();
    cy.get('[placeholder="Chapter Name"]').eq(2).type('cn3');
    cy.get('[placeholder="Chapter content"]').eq(2).type('cc3');

    cy.get('#schedule').contains('Add Class Time').click().click().click().click().click().click()
    .should('be.disabled');
    cy.get('#schedule .ant-select-selector').first().click();
    cy.get('[title="Monday"]').click();
    cy.get('#schedule_classTime_0_time').click();
    cy.get('.ant-picker-panel').contains('Now').click();

    cy.get('#schedule .ant-select-selector').eq(2).click();
    //cy.get('[title="Monday"]').last().should('be.disabled');
    //ant-select-item-option-disabled
    cy.get('[title="Friday"]').last().click();
    cy.get('#schedule_classTime_1_time').click();
    cy.get('.ant-picker-time-panel-column').eq(3).contains('00').click();
    cy.get('.ant-picker-time-panel-column').eq(4).contains('00').click();
    cy.get('.ant-picker-time-panel-column').eq(5).contains('00').click();
    cy.get('.ant-picker-ok').last().click();

    cy.get(':nth-child(8) > .ant-col-2 > .ant-row > .ant-col > .ant-form-item-control-input').click();
    cy.get(':nth-child(7) > .ant-col-2 > .ant-row > .ant-col > .ant-form-item-control-input').click();
    cy.get(':nth-child(6) > .ant-col-2 > .ant-row > .ant-col > .ant-form-item-control-input').click();
    cy.get(':nth-child(5) > .ant-col-2 > .ant-row > .ant-col > .ant-form-item-control-input').click();
    cy.get(':nth-child(2) > :nth-child(4) > .ant-col-2 > .ant-row > .ant-col > .ant-form-item-control-input').click();
    cy.get('#schedule_classTime_1_weekday').click();
    cy.get('[title="Friday"]').last().click();

    cy.get('#schedule [type="submit"]').click();
    cy.intercept('PUT', cy.apiUrl+'/courses/schedule').as('schedule');
    /*
    cy.wait('@schedule',{ timeout: 10000}).then((res) => {
      //check spacal data
    })
    */
    cy.contains('Successfully Create Course!').should('be.visible');
  });
});
