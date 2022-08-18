/// <reference types="cypress" />

describe("course page", () => {
    beforeEach(function () {
      cy.login('manager@admin.com','manager');
    });
  
    it('edit courses', () =>{
      cy.get(':nth-child(4) > .ant-menu-submenu-title').click();
      cy.get('[title="Edit Course"]').click();

cy.wait(5000);
      cy.get('.ant-input-group > :nth-child(1) > .ant-select-selector', { timeout: 10000 }).click().then(() => {
        cy.get('.rc-virtual-list-holder-inner').contains('Name').click();
      })
      cy.get('#rc_select_3').click().type('aaa');
      cy.intercept('GET', 'http://cms.chtoma.com/api/courses?name=aaa&userId=3',{ fixture: 'manager.edit.json'}).as('edit');
cy.wait(5000);
      //cy.get('.rc-virtual-list-holder-inner').last().scrollTo('bottom');
      //cant do scroll
      //cy.get(':nth-child(4) > :nth-child(1) > .ant-select-dropdown').scrollTo('bottom').contains('c5e80093').click();
      //cy.get(':nth-child(4) > :nth-child(1) > .ant-select-dropdown').first().click();
      //the first 'b012dfba'
      //cant select

      cy.wait('@edit');
      cy.get('.rc-virtual-list-holder-inner').contains('c5e80093').click();
      
      cy.intercept('GET', 'http://cms.chtoma.com/api/courses/schedule?courseId=undefined&scheduleId=2146').as('editSchedule');
      cy.get('#rc-tabs-0-tab-chapter').click();
      cy.wait('@editSchedule').then((res)=>{
        const data = res.response.body.data;
        cy.get('[placeholder="Chapter Name"]').each(($value) => {
            expect(data).contain($value.val());
            expect(data);
            // each() loop
        })
      })
      
    

    });
});