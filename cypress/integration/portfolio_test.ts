import { LoginPage } from "../page/login_page";
import { PortfolioPage } from "../page/portfolio_page";
import { SignUpPage } from "../page/signup_page"
import { WithdrawPage } from "../page/withdraw_page";
import { DepositPage } from "../page/deposit_page";

describe('portfolio test suite', () => {
  
    const loginPage = new LoginPage();
    const signUpPage = new SignUpPage();
    const portfolioPage = new PortfolioPage();
    const withdrawPage = new WithdrawPage();
    const depositPage = new DepositPage();

    var testName = '';
    var password = 'Test12345';

    beforeEach(() => {
        testName = 'testName$' + Cypress._.random(0, 1e6);
        loginPage.navigate();
        loginPage.clickSingUp();
        signUpPage.enterUserName(testName);
        signUpPage.enterPassword(password);
        signUpPage.clickSingUp();
    })

    it('Verify initial balance and transaction history', function(){
        
        // assert
        portfolioPage.verifyTotalBalance('10000');

        portfolioPage.clickDepositMenu();
        depositPage.inputDepositAmount('8000');
        depositPage.clickDeposit();
        cy.wait(1000);
        portfolioPage.clickWithDrawMenu();
        withdrawPage.inputWithdrawAmount('12000');
        withdrawPage.clickWithdraw();
        cy.wait(10000);

        // assert
        portfolioPage.verifyTotalBalance('0');
        portfolioPage.verifyTransaction('1', '-15600');
        portfolioPage.verifyTransaction('2', '5600');
    })

    afterEach(() => {
        cy.reload();
    })

})