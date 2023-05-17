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

    static clickButton(buttonName) {
        this.getButton(buttonName).scrollIntoView().should('be.visible').click({force: true});
    }
}