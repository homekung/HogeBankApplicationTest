import { LoginPage } from "../page/login_page";
import { PortfolioPage } from "../page/portfolio_page";
import { SignUpPage } from "../page/signup_page"

describe('sign up test suite', () => {
  
    const loginPage = new LoginPage();
    const signUpPage = new SignUpPage();
    const portfolioPage = new PortfolioPage();

    beforeEach(() => {
        loginPage.navigate();
        loginPage.clickSingUp();
    })

    it('Verify Warning message - User name cannot be blank', function(){
        signUpPage.enterPassword('Test12345');
        signUpPage.clickSingUp();

        // assert
        signUpPage.verifyWarningMessage('User name cannot be blank');
    })

    it('Verify Warning message - Username cannot contain whitespaces', function(){
        signUpPage.enterUserName('test user');
        signUpPage.enterPassword('Test12345');
        signUpPage.clickSingUp();

        // assert
        signUpPage.verifyWarningMessage('User name cannot contain whitespaces');
    })

    it('Verify Warning message - Password cannot be less than 8 characters test (length 7)', function(){
        signUpPage.enterUserName('testUser');
        signUpPage.enterPassword('Test123');
        signUpPage.clickSingUp();

        // assert
        signUpPage.verifyWarningMessage('Password cannot be less than 8 characters');
    })

    it('Verify sign up new user successfully with password length at 8', function(){
        const testName = 'testName$' + Cypress._.random(0, 1e6);
        signUpPage.enterUserName(testName);
        signUpPage.enterPassword('Test1234');
        signUpPage.clickSingUp();

        // assert
        cy.wait(1000);
        portfolioPage.verifyUsername(testName);
        portfolioPage.clickLogOut();
    })

    it('Verify sign up new user successfully with password length at 9', function(){
        const testName = 'testName$' + Cypress._.random(0, 1e6);
        signUpPage.enterUserName(testName);
        signUpPage.enterPassword('Test12345');
        signUpPage.clickSingUp();

        // assert
        cy.wait(1000);
        portfolioPage.verifyUsername(testName);
        portfolioPage.clickLogOut();
    })

    it('Verify sign up new user successfully with password length at 31', function(){
        const testName = 'testName$' + Cypress._.random(0, 1e6);
        signUpPage.enterUserName(testName);
        signUpPage.enterPassword('Test123456789012345678901234567');
        signUpPage.clickSingUp();

        // assert
        cy.wait(1000);
        portfolioPage.verifyUsername(testName);
        portfolioPage.clickLogOut();
    })

    it('Verify sign up new user successfully with password length at 32', function(){
        const testName = 'testName$' + Cypress._.random(0, 1e6);
        signUpPage.enterUserName(testName);
        signUpPage.enterPassword('Test1234567890123456789012345678');
        signUpPage.clickSingUp();

        // assert
        cy.wait(1000);
        portfolioPage.verifyUsername(testName);
        portfolioPage.clickLogOut();
    })

    it('Verify Warning message - Password cannot be larger than 32 characters test (length 33)', function(){
        signUpPage.enterUserName('testUser');
        signUpPage.enterPassword('Test12345678901234567890123456789');
        signUpPage.clickSingUp();

        // assert
        signUpPage.verifyWarningMessage('Password cannot be longer than 32 characters');
    })

    it('Verify Warning message - Password must contain numbers', function(){
        signUpPage.enterUserName('testUser');
        signUpPage.enterPassword('ABTestTest');
        signUpPage.clickSingUp();
        
        // assert
        signUpPage.verifyWarningMessage('Password must contain numbers');
    })

    it('Verify Warning message - Password must contain uppercase letters', function(){
        signUpPage.enterUserName('testUser');
        signUpPage.enterPassword('abtesttest12');
        signUpPage.clickSingUp();

        // assert
        signUpPage.verifyWarningMessage('Password must contain uppercase letters');
    })

    it('Verify Warning message is changed correctly after second try', function(){
        signUpPage.enterUserName('testUser');
        signUpPage.enterPassword('abtesttest12');
        signUpPage.clickSingUp();
        signUpPage.verifyWarningMessage('Password must contain uppercase letters');
        signUpPage.clearUserName();
        signUpPage.enterUserName('testUser');
        signUpPage.clearPassword();
        signUpPage.enterPassword('ABTestTest');
        signUpPage.clickSingUp();

        // assert
        signUpPage.verifyWarningMessage('Password must contain numbers');
    })

    it('Verify Warning message - username is already exist', function(){
        const testName = 'testName$' + Cypress._.random(0, 1e6);
        signUpPage.enterUserName(testName);
        signUpPage.enterPassword('Test123450000');
        signUpPage.clickSingUp();
        portfolioPage.verifyUsername(testName);
        portfolioPage.clickLogOut();
        signUpPage.enterUserName(testName);
        signUpPage.enterPassword('Test123450000');
        signUpPage.clickSingUp();

        // assert
        signUpPage.verifyWarningMessage('username is already exist');
    })


    afterEach(() => {
        cy.reload();
    })

})