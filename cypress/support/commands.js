Cypress.Commands.add('isVisible', (selector) => {
    cy.get(selector).should('be.visible');
});