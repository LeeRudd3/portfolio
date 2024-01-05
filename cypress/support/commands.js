// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.addAll({
    login(email, pw) {
        cy.get(`[data-testid="email"]`).should('be.visible').type(email).should('have.value', email);
        cy.get(`[data-testid="password"]`).should('be.visible').type(pw).should('have.value', pw);

        cy.get(`[data-testid="loginBtn"]`).should('be.visible').click();
    },
    logout() {
        // Check if the logout button exists
        cy.get('[data-testid="logoutBtn"]').should('exist').then(($button) => {
            // If the button exists, click it
            if ($button.length > 0) {
                cy.get('[data-testid="logoutBtn"]').click();
            }
        });
    },
    setVenueData(data) {
        if(data.name != ''){
            cy.get(`[name='venueName']`).type(data.name).should('have.value', data.name);
        }
        if(data.summary != ''){
            cy.get(`[name='venueSummary']`).type(data.summary).should('have.value', data.summary);
        }
        if(data.type != '') {
            cy.get(`[name='venueType']`).type(data.type).should('have.value', data.type);
        }
        if(data.address1 != '') {
            cy.get(`[name='venueAddress1']`).type(data.address1).should('have.value', data.address1);
        }
        if(data.address2 != '') {
            cy.get(`[name='venueAddress2']`).type(data.address2).should('have.value', data.address2);
        }
        if(data.city != '') {
            cy.get(`[name='venueCity']`).type(data.city).should('have.value', data.city);
        }
        if(data.state != '') {
            cy.get(`[name='venueState']`).type(data.state).should('have.value', data.state);
        }
    },
    createNewVenue(data) {
        cy.get('[data-testid="createVenue"]').should('be.visible').click();

        cy.get(`[name='Create']`).should('be.visible');

        cy.setVenueData(data);

        cy.get(`[name='addBtn']`).click();
    }
  });