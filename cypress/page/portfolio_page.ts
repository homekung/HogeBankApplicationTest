export class PortfolioPage{

    private portfolioPage_url = Cypress.env('url') + '/portfolio'
    private portfolioPage_depositLink = 'h2 > :nth-child(1)';
    private portfolioPage_withdrawLink = 'h2 > :nth-child(2)';
    private portfolioPage_logOutButton = 'button';
    private portfolioPage_balanceAmount = ':nth-child(2) > :nth-child(2) > :nth-child(1) > :nth-child(2)';

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
        cy.get('th')
            .should('contain', expectedUserName);
    }
}