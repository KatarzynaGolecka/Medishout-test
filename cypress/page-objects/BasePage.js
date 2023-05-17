export default class BasePage {
    static getButton(buttonName) {
        return cy.contains('.btn', buttonName);
    }

    static checkToastMessage(message) {
        cy.contains('.ct-toast', message, {
            timeout: 15000
        }).should('be.visible');
    }

    static checkIfHelpTextIsCorrect(helpText) {
        cy.get('.collapse.show').should('be.visible').and('contain', helpText);
    }

    static shouldUrlBe(subPath) {
        const url = Cypress.config('baseUrl') + subPath;
        cy.url()
            .should('equal', url);
    }

    static checkIfURLInclude(text) {
        cy.url().should('include', text);
    }

    static checkIfURLNotInclude(text) {
        cy.url().should('not.include', text);
    }

    static checkIfNoToastMessageIsShown() {
        cy.get('.ct-toast', {
            timeout: 2000
        }).should('not.exist');
    }

    static checkIfButtonIsActive(buttonName) {
        this.getButton(buttonName).should('be.visible').and('not.be.disabled');
    }

    static checkIfButtonIsDisabled(buttonName) {
        this.getButton(buttonName).should('be.visible').and('be.disabled');
    }

    static clickButton(buttonName) {
        this.getButton(buttonName).scrollIntoView().should('be.visible').click({force: true});
    }

    static checkIfButtonDoesntExist(buttonName) {
        this.getButton(buttonName).should('not.exist');
    }

    static closeDropdown() {
        cy.get('#root').realClick({force: true});
    }
}