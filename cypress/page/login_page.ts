export class LoginPage{

    private loginPage_url = Cypress.env('url') + '/login'
    private loginPage_userName = ':nth-child(2) > .center > :nth-child(1)';
    private loginPage_password = '[type="password"]';
    private loginPage_singUpButton = '.center > :nth-child(7)';
    private loginPage_loginButton = '.center > :nth-child(8)';
    private loginPage_waringMessage = 'span';

    navigate(){
        cy.visit(this.loginPage_url);
    }

    enterUserName(username: string){
        cy.get(this.loginPage_userName).type(username);
    }

    clearUserName(){
        cy.get(this.loginPage_userName).clear();
    }

    enterPassword(password: string){
        cy.get(this.loginPage_password).type(password);
    }

    clearPassword(){
        cy.get(this.loginPage_password).clear();
    }

    clickLogin(){
        cy.get(this.loginPage_loginButton).click();
    }

    clickSingUp(){
        cy.get(this.loginPage_singUpButton).click();
    }

    verifyWarningMessage(expectedMessage: string){
        cy.get(this.loginPage_waringMessage)
            .should('contain', expectedMessage);
    }
}