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
}