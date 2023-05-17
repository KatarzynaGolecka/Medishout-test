import BasePage from '../BasePage';

export default class LoginPage extends BasePage {
    static checkIfLoginButtonIsDisplayed() {
        cy.isVisible('.px-4');
    }

    static enterEmail(email) {
        cy.get('[data-cy="email-input"]', {timeout: 10000}, {
                force: true
            })
            .clear()
            .type(email, {force: true});
    }

    static enterPassword(password) {
        cy.get('[data-cy="password-input"]', {
                force: true
            })
            .clear()
            .type(password);
    }

    static login(email, password) {
        cy.log(`${email} logs in`);
        cy.intercept('/v1/token').as('getToken');
        this.enterEmail(email);
        this.enterPassword(password);
        cy.get('.px-4').click();
        cy.wait('@getToken');
    }

    static clickOnRegisterButton() {
        this.clickButton('Register Now!');
    }

    static clickOnForgotPasswordLink() {
        cy.get('a[href*="forgot-password"]').click();
    }

    static checkIfWelcomeAlertIsDisplayed() {
        cy.log('Checking if alert for users without avaiable sites is displayed');
        cy.get('.alert-heading').should('contain', 'Welcome');
        cy.get('.m-5').should('be.visible').and('contain', 'Your account is active, but you don\'t have access to any site. Please contact MediShout team:');
        cy.get('.m-5').should('contain', 'support@medishout.co.uk');
        cy.get('.m-5').should('contain', 'You can also').and('contain', 'and try to use a different account.');
        cy.contains('.mb-1', 'Sign out').should('not.be.disabled');
    }

    static checkIfSiteSelectionIsDisplayed() {
        cy.log('Checking if site selection for users who don\'t follow channels with forms is displayed');
        cy.get('[data-test=card]').should('contain', 'Select one or more organizations')
            .and('contain', 'Set organizations and continue to MediShout');
        cy.contains('.btn', 'Sign out').should('be.visible');
    }

    static checkIfSiteSelectionIsNotDisplayed() {
        cy.log('Checking if site selection for users who don\'t follow channels with forms is not displayed');
        cy.get('[data-test=card]').should('not.exist');
    }

    static checkIfSiteIsNotAvailable(siteName) {
        cy.log(`Checking if after logging in, ${siteName} site is not available in Select site dropdown`);
        cy.get('.css-1hwfws3').click().type(siteName);
        cy.get('.css-1g9elxf-menu').should('contain', 'No options').and('not.contain', siteName);
    }

    static checkIfSiteIsAvailable(siteName) {
        cy.log(`Checking if after logging in, ${siteName} site is available in Select site dropdown`);
        cy.get('.css-1hwfws3').click().type(siteName);
        cy.get('.css-1g9elxf-menu').should('not.contain', 'No options');
    }

    static checkIfSelectMainSiteRequestIsDisplayed() {
        cy.log('Checking if the Select Main Site request is displayed for users who hasn\'t selected main site');
        cy.get('.ml-5 > .svg-inline--fa > path').should('be.visible').click();
        cy.get('[data-cy="my-details"]').click({
            force: true
        });
        cy.get('[data-cy="my-account"]').click();
        cy.get('.css-1hwfws3').should('contain', 'Choose site...');
    }

    static checkIfSelectMainSiteRequestIsNotDisplayed() {
       cy.log('Checking if the Select Main Site request is not displayed for users who selected main site');
       cy.get('.my-2 > .sc-gsnTZi').should('not.exist');
       cy.get('[data-cy="my-details"]').click({
           force: true
       });
       cy.get('[data-cy="my-account"]').click();
       cy.get('.css-1hwfws3')
           .should('contain', 'Cypress Site 4')
           .and('not.contain', 'Choose site...');
    }
}