/// <reference types="cypress" />
// import carBrands from '../../fixtures/brands.json'
// import carModels from '../../fixtures/models.json'


describe('Private Requests', () => {
    let globalSid;
    let createdCarId;

    before(() => {
        
        cy.request({
            method: 'POST',
            url: 'https://qauto.forstudy.space/api/auth/signin',
            body: {
                email: '123qwer@qwerty6.qwe',
                password: '123Qazwsx',
                remember: false
            }
        }).then((response) => {
            const cookie = response.headers['set-cookie'][0];
            const sid = cookie.split(';')[0].split('=')[1];
            globalSid = sid;
        });
    });

    describe('Adding cars', () => {
        it('Add a new Car (Audi TT) and get response [/api/cars]', () => {
            cy.request({
                method: 'POST',
                url: '/api/cars',
                headers: {
                    Cookie: `sid=${globalSid}`,
                },
                body: {
                    "carBrandId": 1, 
                    "carModelId": 1,
                    "mileage": 123
                }
            }).then((response) => {
                expect(response.status).to.eq(201);
                createdCarId = response.body.data.id;
                cy.log('Created Car ID:', createdCarId);
            });
        });
    });

    describe('Validate Car in List', () => {
        it('Check created car exists in list [/api/cars]', () => {
            cy.request({
                method: 'GET',
                url: '/api/cars',
                headers: {
                    Cookie: `sid=${globalSid}`,
                },
            }).then((response) => {
                expect(response.status).to.eq(200);
                const carExists = response.body.data.some(car => car.id === createdCarId);
                expect(carExists).to.be.true;
            });
        });
    });
    describe('Expense Creation', () => {
        it('Create expense for the car [/api/expenses]', () => {
            cy.request({
                method: 'POST',
                url: '/api/expenses',
                headers: {
                    Cookie: `sid=${globalSid}`,
                },
                body: {
                    "carId": createdCarId,
                    "reportedAt": "2025-02-21T00:00:00.000Z",
                    "mileage": 132,
                    "liters": 4,
                    "totalCost": 596,                                 

                    }
                
                }).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.data.carId).to.eq(createdCarId);
                    expect(response.body.data.mileage).to.eq(132);
                    expect(response.body.data.liters).to.eq(4);
                    expect(response.body.data.totalCost).to.eq(596);
                    
            });
        });
    });

});

describe('UI Validation of Fuel expense', () => {
    const mileage = '132';
    const litersUsed = '4L';
    const totalCost = '596.00 USD';

    beforeEach(() => {
        cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/');
        cy.get('.header_signin').click();
        cy.get('#signinEmail').type('123qwer@qwerty6.qwe');
        cy.get('#signinPassword').type('123Qazwsx', { sensitive: true });
        cy.contains('button', 'Login').click();            
        cy.get('h1').should('have.text', 'Garage');
        cy.contains('a.sidebar_btn', 'Fuel expenses').click();
        cy.get('#carSelectDropdown').should('contain.text', 'Audi TT');
    });

    it('Validate Mileage in UI', () => {
        cy.get('body > app-root > app-global-layout > div > div > div > app-panel-layout > div > div > div > div.col-lg-9.main-wrapper > div > app-fuel-expenses > div > div.panel-page_content > div > div.expenses_table-wrapper > table > tbody > tr > td:nth-child(2)')
          .should('have.text', mileage)
          .then(() => {
              console.log(`Mileage verified: ${mileage}`);
              cy.log(`Mileage verified: ${mileage}`);
          });
    });

    it('Validate Liters Used in UI', () => {
        cy.get('body > app-root > app-global-layout > div > div > div > app-panel-layout > div > div > div > div.col-lg-9.main-wrapper > div > app-fuel-expenses > div > div.panel-page_content > div > div.expenses_table-wrapper > table > tbody > tr > td:nth-child(3)')
          .should('have.text', litersUsed)
          .then(() => {
              console.log(`Liters Used verified: ${litersUsed}`);
              cy.log(`Liters Used verified: ${litersUsed}`);
          });
    });

    it('Validate Total Cost in UI', () => {
        cy.get('body > app-root > app-global-layout > div > div > div > app-panel-layout > div > div > div > div.col-lg-9.main-wrapper > div > app-fuel-expenses > div > div.panel-page_content > div > div.expenses_table-wrapper > table > tbody > tr > td:nth-child(4)')
          .should('have.text', totalCost)
          .then(() => {
              console.log(`Total Cost verified: ${totalCost}`);
              cy.log(`Total Cost verified: ${totalCost}`);
          });
    });
});    






