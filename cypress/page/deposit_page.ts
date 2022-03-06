export class DepositPage{

    private depositPage_amountTextBox = 'input';
    private depositPage_depositButton = 'button';
    private depositPage_depositAfterFee = 'div.center > :nth-child(8)';
    private depositPage_depositMessage = '[color="red"]';

    inputDepositAmount(amount: string){
        cy.get(this.depositPage_amountTextBox).type(amount);
    }

    clearDepositAmount(){
        cy.get(this.depositPage_amountTextBox).clear();
    }

    clickDeposit(){
        cy.get(this.depositPage_depositButton).click();
    }

    verifyTotalDepositAfterFee(expectedAmount: string){
        cy.get(this.depositPage_depositAfterFee)
            .should('contain', expectedAmount);
    }

    verifyWarningMessage(expectedMessage: string){
        cy.get(this.depositPage_depositMessage)
            .should('contain', expectedMessage);
    }

    VerifyWarningMessageNotShow(expectedMessage: string){
        cy.get(this.depositPage_depositMessage)
            .should('not.contain', expectedMessage);
    }
}