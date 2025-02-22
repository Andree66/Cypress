/// <reference types="cypress" />
import SignInForm from "../../../page-objects/forms/SignInForm";
import HomePage from "../../../page-objects/pages/HomePage";
import GaragePage from "../../../page-objects/pages/GaragePage";
import ExpensesPage from "../../../page-objects/pages/ExpensesPage";



describe('Add car and expense', () => {

    beforeEach(() => {
       GaragePage.openPageAsLoggedUser();
    })

    it('Add car [BMW] [X5]', () => {
        GaragePage.addNewCarByBrandAndModel('BMW', 'X5')
        
    });

    it('Add Expense for created car', () => {
        ExpensesPage.openPage();
        ExpensesPage.verifyAddedCarByName('BMW X5');
        ExpensesPage.addExpenseForCreatedCar('101','10','200' );
        ExpensesPage.verifyAddedCarCost('200');
        
    });



})
