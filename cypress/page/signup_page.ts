export class SignUpPage{

    private signUpPage_userName = ':nth-child(1) > :nth-child(1) > div.center > :nth-child(1)';
    private signUpPage_password = '[type="password"]';
    private singUpPage_signUpButton = 'button';
    private singUpPage_messageSpan = 'span';

    enterUserName(username: string){
        cy.get(this.signUpPage_userName).type(username);
    }

    clearUserName(){
        cy.get(this.signUpPage_userName).clear();
    }

    enterPassword(password: string){
        cy.get(this.signUpPage_password).type(password);
    }

    clearPassword(){
        cy.get(this.signUpPage_password).clear();
    }

    clickSingUp(){
        cy.get(this.singUpPage_signUpButton).click();
    }

    verifyWarningMessage(expectedMessage: string){
        cy.get(this.singUpPage_messageSpan)
            .should('contain', expectedMessage);
    }
}