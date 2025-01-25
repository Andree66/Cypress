/// <reference types="cypress" />

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    // turn off original log
    options.log = false
    // create our own log with masked message
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    })
  }

  return originalFn(element, text, options)
});

describe('Check login', () => {

    it('Check Successful login', () => {

        cy.visit('/');
        cy.get('.header_signin').click();
        cy.get('#signinEmail').type('123qwer@qwerty6.qwe');
        cy.get('#signinPassword').type('123Qazwsx', { sensitive: true });
        cy.contains('button', 'Login').click();            
        cy.get('h1').should('have.text', 'Garage');          

    });

});    