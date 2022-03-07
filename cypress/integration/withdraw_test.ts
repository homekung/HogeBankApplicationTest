import { LoginPage } from "../page/login_page";
import { PortfolioPage } from "../page/portfolio_page";
import { SignUpPage } from "../page/signup_page"
import { WithdrawPage } from "../page/withdraw_page";
import { DepositPage } from "../page/deposit_page";

describe('withdraw test suite', () => {
  
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

    it('Verify withdraw fee amount = 30%', function(){
        
        portfolioPage.clickWithDrawMenu();
        withdrawPage.inputWithdrawAmount('100');
        // assert
        withdrawPage.verifyTotalWithdrawAmount('130');

        withdrawPage.clearWithdrawAmount();
        withdrawPage.inputWithdrawAmount('100.00');
        // assert
        withdrawPage.verifyTotalWithdrawAmount('130');

        withdrawPage.clearWithdrawAmount();
        withdrawPage.inputWithdrawAmount('100.30');
        // assert
        withdrawPage.verifyTotalWithdrawAmount('130.39');
    })

    it('Verify transaction withdraw complete and balance update within 10 second', function(){
        
        portfolioPage.clickWithDrawMenu();
        withdrawPage.inputWithdrawAmount('100');
        withdrawPage.verifyTotalWithdrawAmount('130');
        withdrawPage.clickWithdraw();
        portfolioPage.verifyTotalBalance('10000');
        cy.wait(10000)
        portfolioPage.verifyTotalBalance('9870');
    })

    it('Verify transaction withdraw complete with comma in amount and balance update within 10 second', function(){
        
        portfolioPage.clickWithDrawMenu();
        withdrawPage.inputWithdrawAmount('1,000');
        withdrawPage.clickWithdraw();
        portfolioPage.verifyTotalBalance('10000');
        cy.wait(10000)
        portfolioPage.verifyTotalBalance('8700');
    })

    it('Verify transaction withdraw complete with dot in amount and balance update within 10 second', function(){
        
        portfolioPage.clickWithDrawMenu();
        withdrawPage.inputWithdrawAmount('1000.00');
        withdrawPage.clickWithdraw();
        portfolioPage.verifyTotalBalance('10000');
        cy.wait(10000)
        portfolioPage.verifyTotalBalance('8700');
    })

    it('Verify warning message when input character text as withdraw amount', function(){
        
        portfolioPage.clickWithDrawMenu();
        withdrawPage.inputWithdrawAmount('tttt');
        withdrawPage.clickWithdraw();

        // assert
        withdrawPage.verifyWarningMessage('Failed to withdraw.')
    })

    it('Verify warning message when input negative amount as withdraw amount', function(){
        
        portfolioPage.clickWithDrawMenu();
        withdrawPage.inputWithdrawAmount('-500');
        withdrawPage.clickWithdraw();

        // assert
        withdrawPage.verifyWarningMessage('Failed to withdraw.')
    })

    it('Verify warning message when input zero amount as withdraw amount', function(){
        
        portfolioPage.clickWithDrawMenu();
        withdrawPage.inputWithdrawAmount('0');
        withdrawPage.clickWithdraw();

        // assert
        withdrawPage.verifyWarningMessage('Failed to withdraw.')
    })

    it('Verify warning message when input nothing as withdraw amount', function(){
        
        portfolioPage.clickWithDrawMenu();
        withdrawPage.clickWithdraw();

        // assert
        withdrawPage.verifyWarningMessage('Failed to withdraw.')
    })

    it('Verify warning message when withdraw more than balance', function(){
        
        portfolioPage.clickWithDrawMenu();
        withdrawPage.inputWithdrawAmount('10001');
        withdrawPage.clickWithdraw();

        // assert
        withdrawPage.verifyWarningMessage('Failed to withdraw.')

        withdrawPage.clearWithdrawAmount();
        withdrawPage.inputWithdrawAmount('10000.1');
        withdrawPage.clickWithdraw();

        // assert
        withdrawPage.verifyWarningMessage('Failed to withdraw.')
    })

    it('Verify warning message when trying to withdraw before balance is updated (second withdraw is more than balance)', function(){
        
        portfolioPage.clickWithDrawMenu();
        withdrawPage.inputWithdrawAmount('5000');
        withdrawPage.clickWithdraw();
        portfolioPage.verifyTotalBalance('10000');
        portfolioPage.clickWithDrawMenu();
        withdrawPage.inputWithdrawAmount('5000');
        withdrawPage.clickWithdraw();

        // assert
        withdrawPage.verifyWarningMessage('Failed to withdraw.')
    })

    it('Verify user able to withdraw before balance is updated (second withdraw is less than balance)', function(){
        
        portfolioPage.clickWithDrawMenu();
        withdrawPage.inputWithdrawAmount('5000');
        withdrawPage.clickWithdraw();
        portfolioPage.verifyTotalBalance('10000');
        portfolioPage.clickWithDrawMenu();
        withdrawPage.inputWithdrawAmount('1000');
        withdrawPage.clickWithdraw();
        cy.wait(10000);

        // assert
        portfolioPage.verifyTotalBalance('2200');
    })

    it('Verify user is able to withdraw before balance is updated from deposit', function(){
        
        portfolioPage.clickDepositMenu();
        depositPage.inputDepositAmount('8000');
        depositPage.clickDeposit();
        portfolioPage.verifyTotalBalance('10000');
        portfolioPage.clickWithDrawMenu();
        cy.wait(1000);
        withdrawPage.inputWithdrawAmount('12000');
        withdrawPage.clickWithdraw();
        cy.wait(10000);

        // assert
        portfolioPage.verifyTotalBalance('0');
    })

    it('Verify warning message should be clear after back to portfolio and withdraw again.', function(){
        
        portfolioPage.clickWithDrawMenu();
        withdrawPage.inputWithdrawAmount('tttt');
        withdrawPage.clickWithdraw();
        withdrawPage.verifyWarningMessage('Failed to withdraw.')
        cy.go('back')
        portfolioPage.clickWithDrawMenu();

        // assert
        withdrawPage.VerifyWarningMessageNotShow('Failed to withdraw.')
    })

    afterEach(() => {
        cy.reload();
    })

})