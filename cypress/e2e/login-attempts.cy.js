/* eslint-disable prefer-arrow-callback */

import LoginPage from '../page-objects/pages/LoginPage';


describe('Failed login attempts. || login-attempts.spec.js', () => {
    beforeEach(function () {
        cy.visit('medishout-test-forest.web.app/');
    });

    it('Unverified user tries to log in', () => {
        const errorMessage = 'No active account found. Please activate your account with the link sent by email.';

        LoginPage.login(noActiveUser.email, noActiveUser.password);
        LoginPage.checkIfLoginButtonIsDisplayed();
        LoginPage.checkToastMessage(errorMessage);
    });

    it('Active user tries to log in with wrong password.', () => {
        const errorMessage = 'Username and password do not match.';

        LoginPage.login(staffUser.email, 'wrongPassword');
        LoginPage.checkIfLoginButtonIsDisplayed();
        LoginPage.checkToastMessage(errorMessage);
    });

    it('Not registered user tries to log in.', () => {
        const errorMessage = 'No account found for given email.';

        LoginPage.login('notRegistered@rmail.com', 'wrongPassword');
        LoginPage.checkIfLoginButtonIsDisplayed();
        LoginPage.checkToastMessage(errorMessage);
    });

    it('User enters a space in the password field.', () => {
        const helpText = 'This field is required.';
        LoginPage.enterEmail('email@email.com');
        LoginPage.enterPassword(' ');
        LoginPage.clickButton('Login');
        LoginPage.checkIfLoginButtonIsDisplayed();
        LoginPage.checkIfHelpTextIsCorrect(helpText);
    });
});