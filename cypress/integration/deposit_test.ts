import { LoginPage } from "../page/login_page";
import { PortfolioPage } from "../page/portfolio_page";
import { SignUpPage } from "../page/signup_page"
import { DepositPage } from "../page/deposit_page";

describe('deposit test suite', () => {
  
    const loginPage = new LoginPage();
    const signUpPage = new SignUpPage();
    const portfolioPage = new PortfolioPage();
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

    it('Verify Deposit fee amount = 30%', function(){
        
        portfolioPage.clickDepositMenu();
        depositPage.inputDepositAmount('100');
        // assert
        depositPage.verifyTotalDepositAfterFee('70');

        depositPage.clearDepositAmount();
        depositPage.inputDepositAmount('100.00');
        // assert
        depositPage.verifyTotalDepositAfterFee('70');

        depositPage.clearDepositAmount();
        depositPage.inputDepositAmount('100.30');
        // assert
        depositPage.verifyTotalDepositAfterFee('70.21');
    })

    it('Verify transaction deposit complete and balance update within 10 second', function(){
        
        portfolioPage.clickDepositMenu();
        depositPage.inputDepositAmount('100');
        depositPage.verifyTotalDepositAfterFee('70');
        depositPage.clickDeposit();
        portfolioPage.verifyTotalBalance('10000');
        cy.wait(10000)
        portfolioPage.verifyTotalBalance('10070');
    })

    it('Verify transaction withdraw complete with comma and dot in amount and balance update within 10 second', function(){
        
        portfolioPage.clickDepositMenu();
        depositPage.inputDepositAmount('1,000.00');
        depositPage.clickDeposit();
        portfolioPage.verifyTotalBalance('10000');
        cy.wait(10000)
        portfolioPage.verifyTotalBalance('9000');
    })

    it('Verify warning message when input text as deposit amount', function(){
        
        portfolioPage.clickDepositMenu();
        depositPage.inputDepositAmount('tttt');
        depositPage.clickDeposit();

        // assert
        depositPage.verifyWarningMessage('Failed to deposit.')
    })

    it('Verify warning message when input negative amount as deposit amount', function(){
        
        portfolioPage.clickDepositMenu();
        depositPage.inputDepositAmount('-500');
        depositPage.clickDeposit();

        // assert
        depositPage.verifyWarningMessage('Failed to deposit.')
    })

    it('Verify warning message when input zero amount as deposit amount', function(){
        
        portfolioPage.clickDepositMenu();
        depositPage.inputDepositAmount('0');
        depositPage.clickDeposit();

        // assert
        depositPage.verifyWarningMessage('Failed to deposit.')
    })

    it('Verify warning message when input empty as deposit amount', function(){
        
        portfolioPage.clickDepositMenu();
        depositPage.clickDeposit();

        // assert
        depositPage.verifyWarningMessage('Failed to deposit.')
    })

    it('Verify user is able to deposit again before balance is updated', function(){
        
        portfolioPage.clickDepositMenu();
        depositPage.inputDepositAmount('5000');
        depositPage.clickDeposit();
        portfolioPage.verifyTotalBalance('10000');
        portfolioPage.clickDepositMenu();
        depositPage.inputDepositAmount('5000');
        depositPage.clickDeposit();
        cy.wait(10000)

        // assert
        portfolioPage.verifyTotalBalance('17000');
    })

    it('Verify warning message should be clear after back to portfolio and deposit again.', function(){
        
        portfolioPage.clickDepositMenu();
        depositPage.inputDepositAmount('tttt');
        depositPage.clickDeposit();
        depositPage.verifyWarningMessage('Failed to deposit.')
        cy.go('back')
        portfolioPage.clickDepositMenu();

        // assert
        depositPage.verifyWarningMessage('')
    })

    afterEach(() => {
        cy.reload();
    })

})