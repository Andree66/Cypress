/// <reference types="cypress" />
import SignInForm from "../../../page-objects/forms/SignInForm";
import HomePage from "../../../page-objects/pages/HomePage";
import GaragePage from "../../../page-objects/pages/GaragePage";




// // 

// describe('Garage with POM', () => {
//     beforeEach(() => {
//        GaragePage.openPageAsLoggedUser();
//     });

//     it('Add [BMW] [X5]', function () {
//         cy.intercept('POST', 'https://qauto.forstudy.space/api/cars').as('createCar');
//         GaragePage.addNewCarByBrandAndModel('BMW', 'X5');

//         cy.wait('@createCar').then((interception) => {
//             expect(interception.response.statusCode).to.eq(201);

//             const carId = interception.response.body.data.id; // ✅ Используем data.id
//             Cypress.env('carId', carId);  // ✅ Сохраняем ID в env
//         });

//         GaragePage.verifyLastAddedCarByName('BMW X5');
//     });
// });

// describe('Validate Created Car via API', () => {
//     before(() => {
//         cy.login();  // ✅ Логинимся перед тестами
//     });

//     it('should validate car exists in the list', function () {
//         const createdCarId = Cypress.env('carId'); // ✅ Получаем сохраненный carId
        
//         cy.request({
//             method: 'GET',
//             url: 'https://qauto.forstudy.space/api/cars',
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('access_token')}`
//             }
//         }).then((response) => {
//             expect(response.status).to.eq(200);
//             cy.log(response.body);

//             const carList = response.body.data;  // ✅ Используем response.body.data
//             expect(carList).to.be.an('array');

//             const carExists = carList.some(car => car.id === createdCarId);
//             expect(carExists).to.be.true;  // ✅ Проверяем, что машина есть в списке
//         });
//     });
// });

describe('Garage with POM', () => {
    before(() => {
        cy.loginAndSaveToken(); // Логинимся перед тестами
    });

    beforeEach(() => {
        cy.getCookies().should('have.length.greaterThan', 0); 
        GaragePage.openPageAsLoggedUser(); // Открываем страницу
    });

    it('Создание машины и сохранение ID', function () {
        cy.intercept('POST', '/api/cars').as('createCar');
        GaragePage.addNewCarByBrandAndModel('BMW', 'X5'); // Добавляем машину

        cy.wait('@createCar').then((interception) => {
            expect(interception.response.statusCode).to.eq(201);
            const carId = interception.response.body.data.id;
            expect(carId).to.exist;
            Cypress.env('carId', carId);
        });

        GaragePage.verifyLastAddedCarByName('BMW X5'); 
    });

    it('Проверка, что созданная машина есть в списке', function () {
        const createdCarId = Cypress.env('carId');
        expect(createdCarId).to.exist;

        cy.request({
            method: 'GET',
            url: 'https://qauto.forstudy.space/api/cars',
            headers: {
                Cookie: `sid=${Cypress.env('access_token')}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            const carList = response.body.data;
            expect(carList).to.be.an('array');
            const carExists = carList.some(car => car.id === createdCarId);
            expect(carExists).to.be.true;
        });
    });

    it('Создание расхода через API', function () {
        const createdCarId = Cypress.env('carId');
        expect(createdCarId).to.exist;

        cy.createExpense(createdCarId).then((expense) => {
            expect(expense).to.have.property('id');
        });
    });

    it('Проверка UI - машина отображается с расходом', function () {
        GaragePage.findCarByName('BMW X5').click();
        GaragePage.verifyExpenseExists('Test Expense', 1000);
    });
});
