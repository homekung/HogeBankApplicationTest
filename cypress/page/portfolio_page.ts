export class PortfolioPage{

    private portfolioPage_url = Cypress.env('url') + '/portfolio'
    private portfolioPage_depositLink = 'h2 > :nth-child(1)';
    private portfolioPage_withdrawLink = 'h2 > :nth-child(2)';
    private portfolioPage_logOutButton = 'button';
    private portfolioPage_balanceAmount = ':nth-child(2) > :nth-child(2) > :nth-child(1) > :nth-child(2)';
    private portfolioPage_userName = 'th';
    private portfolioPage_transactionHistoryStart = ':nth-child(2) > .t > tbody > :nth-child(';
    private portfolioPage_transactionHistoryEnd = ') > :nth-child(2)';
    

    navigate(){
        cy.visit(this.portfolioPage_url);
    }

    clickDepositMenu(){
        cy.get(this.portfolioPage_depositLink).click();
    }

    clickWithDrawMenu(){
        cy.get(this.portfolioPage_withdrawLink).click();
    }

    clickLogOut(){
        cy.get(this.portfolioPage_logOutButton).click();
    }

    verifyTotalBalance(expectedAmount: string){
        cy.get(this.portfolioPage_balanceAmount)
            .should('contain', expectedAmount);
    }
    
    verifyUsername(expectedUserName: string){
        cy.get(this.portfolioPage_userName)
            .should('contain', expectedUserName);
    }

    verifyTransaction(row: string, expectedAmount: string){
        const key = this.portfolioPage_transactionHistoryStart + row + this.portfolioPage_transactionHistoryEnd;
        cy.get(key)
            .should('contain', expectedAmount);
    }
}