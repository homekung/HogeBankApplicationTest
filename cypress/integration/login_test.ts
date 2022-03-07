import { LoginPage } from "../page/login_page";
import { PortfolioPage } from "../page/portfolio_page";
import { SignUpPage } from "../page/signup_page"

describe('log in test suite', () => {
  
    const loginPage = new LoginPage();
    const signUpPage = new SignUpPage();
    const portfolioPage = new PortfolioPage();

    beforeEach(() => {
        loginPage.navigate();
    })

    it('Verify user is able to log in successfully', function(){
        const testName = 'testName$' + Cypress._.random(0, 1e6);
        const password = 'Test12345';
        
        loginPage.clickSingUp();
        signUpPage.enterUserName(testName);
        signUpPage.enterPassword(password);
        signUpPage.clickSingUp();
        
        cy.wait(1000);
        portfolioPage.clickLogOut();
        loginPage.navigate();
        loginPage.enterUserName(testName);
        loginPage.enterPassword(password);
        loginPage.clickLogin();

        // assert
        portfolioPage.verifyUsername(testName);
    })

    it('Verify warning message - user not found', function(){
        const testName = 'testName$' + Cypress._.random(0, 1e6);
        const password = 'Test12345';
        
        loginPage.enterUserName(testName);
        loginPage.enterPassword(password);
        loginPage.clickLogin();

        // assert
        loginPage.verifyWarningMessage('User not found');
    })

    it('Verify warning message when enter wrong password (starting with correct password)', function(){
        const testName = 'testName$' + Cypress._.random(0, 1e6);
        const password = 'Test12345';
        
        loginPage.clickSingUp();
        signUpPage.enterUserName(testName);
        signUpPage.enterPassword(password);
        signUpPage.clickSingUp();
        cy.wait(1000);
        portfolioPage.clickLogOut();
        loginPage.navigate();
        loginPage.enterUserName(testName);
        loginPage.enterPassword(password + 'x');
        loginPage.clickLogin();

        // assert
        loginPage.verifyWarningMessage('Incorrect Password');
    })

    it('Verify warning message when enter wrong password', function(){
        const testName = 'testName$' + Cypress._.random(0, 1e6);
        const password = 'Test12345';
        
        loginPage.clickSingUp();
        signUpPage.enterUserName(testName);
        signUpPage.enterPassword(password);
        signUpPage.clickSingUp();
        cy.wait(1000);
        portfolioPage.clickLogOut();
        loginPage.navigate();
        loginPage.enterUserName(testName);
        loginPage.enterPassword('test1234');
        loginPage.clickLogin();

        // assert
        loginPage.verifyWarningMessage('Incorrect Password');
    })

    afterEach(() => {
        cy.reload();
    })

})