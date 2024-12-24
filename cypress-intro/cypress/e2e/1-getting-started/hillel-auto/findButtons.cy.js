/// <reference types="cypress" />
//npx cypress open


describe('Find buttons and links', () => {
    beforeEach(() => {

        cy.visit('/')
    });

    //Пошук всіх кнопок з хідеру
    describe('Find all header buttons', () => {


        it('find Home button', () => {
            cy.get('.header_nav').children('a');
        });

        it('find About button', () => {
            cy.get('.header_nav').contains('Contacts').prev();
        });

        it('find Contacts button', () => {
            cy.get('.header_nav').contains('Contacts');
        });

        it('find Guest log in button', () => {
            cy.get('.header_right').contains('Guest log in');
        });

        it('find1 Sign in button', () => {
            cy.get('.header_signin').contains('Sign In');
        });

        it('find2 Sign in button', () => {
            cy.get('.header_right').contains('Sign In');
        });

        it('find3 Sign in button', () => {
            cy.get('.header_right').contains('Guest log in').siblings();
        });
    });

    //Пошук всіх посиланнь та кнопок з футеру
    describe('Find all footer links and buttons', () => {

        it('find Telegram button', () => {
            cy.get('.socials_icon').eq(1);
        });

        it('find Facebook button', () => {
            cy.get('.socials_icon').first();
        });

        it('find Youtube button', () => {
            cy.get('.socials_icon').eq(2);
        });

        it('find Instagram button', () => {
            cy.get('.socials_icon').eq(3);
        });

        it('find Linkedin button', () => {
            cy.get('.socials_icon').last();
        });

        it('find ithillel url', () => {
            cy.get('.contacts_link ').first();
        });

        it('find support url', () => {
            cy.get('.contacts_link ').last();
        });

        
    });



})
