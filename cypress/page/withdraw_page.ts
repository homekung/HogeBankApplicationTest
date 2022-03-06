export class WithdrawPage{

    private withdrawPage_amountTextBox = 'input';
    private withdrawPage_withdrawButton = 'button';
    private withdrawPage_withdrawAfterFee = 'div.center > :nth-child(8)';
    private withdrawPage_withdrawMessage = '[color="red"]';

    inputWithdrawAmount(amount: string){
        cy.get(this.withdrawPage_amountTextBox).type(amount);
    }

    clearWithdrawAmount(){
        cy.get(this.withdrawPage_amountTextBox).clear();
    }

    clickWithdraw(){
        cy.get(this.withdrawPage_withdrawButton).click();
    }

    verifyTotalWithdrawAmount(expectedAmount: string){
        cy.get(this.withdrawPage_withdrawAfterFee)
            .should('contain', expectedAmount);
    }

    verifyWarningMessage(expectedMessage: string){
        cy.get(this.withdrawPage_withdrawMessage)
            .should('contain', expectedMessage);
    }
}