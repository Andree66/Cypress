/// <reference types="cypress" />


describe('Check registration', () => {
    beforeEach(() => {

        cy.visit('/');
        cy.get('.header_signin').click();
        cy.get('.modal-title').should('have.text', 'Log in');
        cy.contains('button', 'Registration').click();
        cy.get('.modal-title').should('have.text', 'Registration');

    })
    describe('Check field Name', () => {

        it('Check empty field', () => {

            cy.get('#signupName').focus();
            cy.get('#signupName').blur();
            cy.get('.invalid-feedback').should('have.text', 'Name required');
            cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');


        })
        it('Check wrong data:Input with invalid characters (numbers)', () => {
 
            cy.get('#signupName').type('123');
            cy.get('#signupName').blur();
            cy.get('.invalid-feedback').should('have.text', 'Name is invalid');
            cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');

        })
        it('Check wrong length: less than 2 characters', () => {

            cy.get('#signupName').type('a');
            cy.get('#signupName').blur();
            cy.get('.invalid-feedback').should('have.text', 'Name has to be from 2 to 20 characters long');
            cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');

        })
        it('Check wrong length: more than 20 characters', () => {

            cy.get('#signupName').type('qwertyuiopasdfghjklzxc');
            cy.get('#signupName').blur();
            cy.get('.invalid-feedback').should('have.text', 'Name has to be from 2 to 20 characters long');
            cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');

        });
    });    
    describe('Check field Last name', () => {

        it('Check empty field', () => {

            cy.get('#signupLastName').focus();
            cy.get('#signupLastName').blur();
            cy.get('.invalid-feedback').should('have.text', 'Last name required');
            cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');


        })
        it('Check wrong data:Input with invalid characters (numbers)', () => {
 
            cy.get('#signupLastName').type('123');
            cy.get('#signupLastName').blur();
            cy.get('.invalid-feedback').should('have.text', 'Last name is invalid');
            cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');

        })
        it('Check wrong length: less than 2 characters', () => {

            cy.get('#signupLastName').type('a');
            cy.get('#signupLastName').blur();
            cy.get('.invalid-feedback').should('have.text', 'Last name has to be from 2 to 20 characters long');
            cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');

        })
        it('Check wrong length: more than 20 characters', () => {

            cy.get('#signupLastName').type('qwertyuiopasdfghjklzxc');
            cy.get('#signupLastName').blur();
            cy.get('.invalid-feedback').should('have.text', 'Last name has to be from 2 to 20 characters long');
            cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');

        });    
        
    });
    describe('Check Email field', () => {

        it('Check empty field', () => {

            cy.get('#signupEmail').focus();
            cy.get('#signupEmail').blur();
            cy.get('.invalid-feedback').should('have.text', 'Email required');
            cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)');


        })
        it('Check wrong data: without @+domain part ', () => {
 
            cy.get('#signupEmail').type('123qwer');
            cy.get('#signupEmail').blur();
            cy.get('.invalid-feedback').should('have.text', 'Email is incorrect');
            cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)');        
        

        });    
        
    });
    describe('Check Password field', () => {

        it('Check empty field', () => {

            cy.get('#signupPassword').focus();
            cy.get('#signupPassword').blur();
            cy.get('.invalid-feedback').should('have.text', 'Password required');
            cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');


        });
        it('Check wrong data:only 3 digits', () => {
 
            cy.get('#signupPassword').type('123');
            cy.get('#signupPassword').blur();
            cy.get('.invalid-feedback').should('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
              

        });
    });
    
    
    describe('Check Re-enter Password field', () => {

        it('Check empty field', () => {

            cy.get('#signupRepeatPassword').focus();
            cy.get('#signupRepeatPassword').blur();
            cy.get('.invalid-feedback').should('have.text', 'Re-enter password required');
            cy.get('#signupRepeatPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');


        })
        it('Check wrong data: short password', () => {
 
            cy.get('#signupRepeatPassword').type('123Qazwsx');
            cy.get('#signupRepeatPassword').blur();
            cy.get('.invalid-feedback').should('have.text', 'Passwords do not match');
            cy.get('#signupRepeatPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
                          

        });        

    });             
    describe('Check registration and Register button', () => {

        it('Check Successful registration', () => {

            cy.get('#signupName').type('Name');
            cy.get('#signupLastName').type('Lastname');
            cy.get('#signupEmail').type('123qwer@qwerty23.qwe');
            cy.get('#signupPassword').type('123Qazwsx');
            cy.get('#signupRepeatPassword').type('123Qazwsx');
            cy.contains('button', 'Register').click();
            cy.get('h1').should('have.text', 'Garage');           

        });

        it('Check the Register button is disabled if data incorrect ', () => {
 
            cy.get('#signupName').type('Name');
            cy.get('#signupLastName').type('Lastname');
            cy.get('#signupEmail').type('123qwer@qwerty3.qwe');
            cy.get('#signupPassword').type('123Qazwsx');
            cy.get('#signupRepeatPassword').type('123');
            cy.contains('button', 'Register').should('be.disabled');                         

        });        

    });   
  
});
