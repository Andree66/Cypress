/// <reference types="cypress" />


describe('login form tests', () => {
    beforeEach(() => {

      cy.visit('/')
    })
  
    it('Success login with credentials', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="title"]').should('have.text', 'Products');
        cy.contains('Products').should('be.visible');
        cy.url().should('equal', 'https://www.saucedemo.com/inventory.html')
        

    });

    it('Login with incorrect credentials', () => {
        cy.get('[data-test="username"]').type('qwerty');
        cy.get('[data-test="password"]').type('qwerty');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service');

    });

    it('Login with locked user credentials', () => {
        cy.get('[data-test="username"]').type('locked_out_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Sorry, this user has been locked out.');


    });

    it('Login without userName', () => {        
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username is required');


    });

    it('Login without password', () => {
        cy.get('[data-test="username"]').type('locked_out_user');     
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Password is required');

    });
  

  })
  