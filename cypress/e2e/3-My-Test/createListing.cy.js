import API from '../../../src/API/API.js';

describe('Create Listings', () => {
    const testData = {
        name: "Cypress Test",
        summary: "Cypress Test Summary",
        bedrooms: 2,
        bathrooms: 2
    };

    const TestDataOnlyName = {
        name: "Cypress Name Only Test",
        summary: '',
        bedrooms: '',
        bathrooms: ''
    };

    const TestDataNoName = {
        name: 'TestDataNoName',
        summary: 'Cypress Test',
        bedrooms: '2',
        bathrooms: '3'
    };

    function setListingData(data) {
        if(data.name != ''){
            cy.get(`[name='listingName']`).type(data["name"]).should('have.value', data["name"]);
        }
        if(data.summary != ''){
            cy.get(`[name='listingSummary']`).type(data["summary"]).should('have.value', data["summary"]);
        }
        if(data.bedrooms != '') {
            cy.get(`[name='listingBedrooms']`).type(data["bedrooms"]).should('have.value', data["bedrooms"]);
        }
        if(data.bathrooms != '') {
            cy.get(`[name='listingBathrooms']`).type(data["bathrooms"]).should('have.value', data["bathrooms"]);
        }
    }

    function createNewListing(data) {
        cy.get('#createBtn').should('be.visible').click();

        cy.get(`[name='Create']`).should('be.visible');

        setListingData(data);

        cy.get(`[name='addBtn']`).click();
    }

    before(() => {
        const api = new API();
        api.deleteViaName([testData.name, TestDataOnlyName.name, TestDataNoName.name]);
    
    })

    it('Creates Listing', () => {

        cy.visit('http://localhost:3000/');

        cy.title().should('eq', 'Music Listings');

        createNewListing(testData);

        cy.contains('p', testData.name).should('exist');
    });

    it('Creates Listing with only name', () => {

        cy.visit('http://localhost:3000/');

        cy.title().should('eq', 'Music Listings');

        createNewListing(TestDataOnlyName);

        cy.contains('p', testData.name).should('exist');
        cy.get('table tr:first-child td:first-child')
            .invoke('text')
            .should('be.empty');
    });

    it('Tries to create listing with no name', () => {
        let temp = {
            name: '',
            summary: 'Cypress Test',
            bedrooms: '2',
            bathrooms: '3'
        };
        cy.visit('http://localhost:3000/');

        cy.title().should('eq', 'Music Listings');

        createNewListing(temp);

        const validatorNoName = cy.get(".validationText");
        validatorNoName.should('exist');
        validatorNoName.invoke('text').should('eq', `Name can't be empty`)

        // Now we enter a name
        cy.get(`[name='listingName']`).type(TestDataNoName.name).should('have.value', TestDataNoName.name);

        // Now the validator should be gone
        cy.get(".validationText").should('not.exist');

        cy.get(`[name='addBtn']`).click();

        cy.contains('p', TestDataNoName.name).should('exist');
        cy.get('table tr:first-child td:first-child')
            .invoke('text')
            .should('be.empty');
    });

  })
