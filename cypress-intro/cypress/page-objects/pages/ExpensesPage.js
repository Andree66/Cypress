import HomePage from "./HomePage";
import SignInForm from "../forms/SignInForm";

class ExpensesPage {

    get carAddExpenseButton() {
        return cy.get('.item-group .btn-primary');
    }

    get mileageField() {
        return cy.get('#addExpenseMileage');
    }

    get numberOfLitersField() {
        return cy.get('#addExpenseLiters');
    }

    get totalCostField() {
        return cy.get('#addExpenseTotalCost');
    }

    get submitAddExpenseButton() {
        return cy.get('.modal-footer .btn.btn-primary');
    }
   
    get addedCar() {
        return cy.get('#carSelectDropdown');
    }

    get carCost() {
        return cy.get('.table.expenses_table tbody tr td:nth-child(4)');
    }

    openPage() {
        cy.contains('a.sidebar_btn', 'Fuel expenses').click();
    }

    addExpenseForCreatedCar(miles, liters, cost) {
        this.carAddExpenseButton.click();
        this.mileageField.type(miles);      
        this.numberOfLitersField.type(liters);
        this. totalCostField.type(cost);
        this.submitAddExpenseButton.should('be.enabled');
        this.submitAddExpenseButton.click();

       // this.submitAddingCarButton.should('not.be.visible');
    }

    verifyAddedCarByName(carName) {
        this.addedCar.should('have.text', carName);

    }
    verifyAddedCarCost(cost) {
        this.carCost.should('contain.text', cost);

    }

}

export default new ExpensesPage();