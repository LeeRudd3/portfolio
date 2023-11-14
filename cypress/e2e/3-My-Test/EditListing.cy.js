import API from '../../../src/API/API.js';

describe('Edit Listings', () => {
    const api = new API();

    const testEditData = {
        name: "Cypress Original Data",
        summary: "Cypress Original Summary",
        bedrooms: 1,
        bathrooms: 1
    };

    const changeData = {
        name: "Cypress Changed Name",
        summary: "Cypress Changed Summary",
        bedrooms: 2,
        bathrooms: 2
    };

    async function initData() {
        await api.deleteViaName([testEditData.name,
            changeData.name
        ]);
        await api.create(testEditData);
    }
    
    beforeEach(async () => {
        await initData();
    })

    it('edits listing name', () => {
        cy.visit('http://localhost:3000/');

        cy.get(`[itemname="${testEditData.name}"]`).should('exist').click();
        cy.get(`[data-testid="editPopup"]`).should('exist');

        cy.get(`[name="listingName"]`).clear();
        cy.get(`[name="listingName"]`).should('exist').type(changeData.name).should('have.value', changeData.name);

        cy.get('#update').click();

        cy.get(`[itemname="${changeData.name}"]`).should('exist');


    });

    it('edits listing name to be blank', () => {
        cy.visit('http://localhost:3000/');

        cy.get(`[itemname="${testEditData.name}"]`).should('exist').click();
        cy.get(`[data-testid="editPopup"]`).should('exist');

        // Here we clear the text and click update and verify we get the validation
        cy.get(`[name="listingName"]`).clear();
        cy.get('#update').click();
        cy.get('.validationText').should('exist').should('have.text', `Name can't be empty`);

        cy.get(`[name="listingName"]`).should('exist').type(changeData.name).should('have.value', changeData.name);

        cy.get('#update').click();

        cy.get(`[itemname="${changeData.name}"]`).should('exist');
    });

    it('edits listing summary', () => {
        cy.visit('http://localhost:3000/');

        cy.get(`[itemname="${testEditData.name}"]`).should('exist').click();
        cy.get(`[data-testid="editPopup"]`).should('exist');

        let getID; 

        cy.get('#listingidtxt')
            .invoke('text')
            .then((value) => {
                getID = value;
                cy.get(`[name="listingSummary"]`).clear();
                cy.get(`[name="listingSummary"]`).should('exist').type(changeData.summary).should('have.value', changeData.summary);

                cy.get('#update').click();

                cy.get(`[id='${getID}'] [name="summary"]`).should('exist').should('have.value', changeData.summary);
        });
    });
});