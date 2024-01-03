import API from '../../../../src/Components/App/API/API';
const config = require('../../../../src/env.config');

describe('Create Listings', () => {
    const testUser = {
        firstName: "test",
        lastName: "user",
        email: "CypressTest@mytest.com",
        password: "MyCypressTest"
    };
    
    const testData = {
        name: "Cypress Test",
        summary: "Cypress Test Summary",
        type: "Band",
        address1: "101 main st",
        address2: "suite 101",
        city: "Portland",
        state: "OR"
    };

    const TestDataOnlyName = {
        name: "Cypress Name Only Test",
        summary: "",
        type: "",
        address1: "",
        address2: "",
        city: "",
        state: ""
    };

    const TestDataNoName = {
        name: 'TestDataNoName',
        summary: 'Cypress Test',
        bedrooms: '2',
        bathrooms: '3'
    };

    function setListingData(data) {
        if(data.name != ''){
            cy.get(`[name='venueName']`).type(data["name"]).should('have.value', data["name"]);
        }
        if(data.summary != ''){
            cy.get(`[name='venueSummary']`).type(data["summary"]).should('have.value', data["summary"]);
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
    }

    function createNewListing(data) {
        cy.get('[data-testid="createVenue"]').should('be.visible').click();

        cy.get(`[name='Create']`).should('be.visible');

        setListingData(data);

        cy.get(`[name='addBtn']`).click();
    }

    before(async () => {
        const api = new API();
        //await api.deleteVenueByName(testData.name);
        await api.deleteVenueByListofNames([testData.name, TestDataOnlyName.name]);

        // Here we get token 
        const token = await api.login({
            email: config.cypress.admin,
            password: btoa(config.cypress.password)
        });

        // Now we make sure we have a valid user to log in with
        // First we remove the user so we can start in a known state
        // If user doesn't exist, we just move on
        await api.deleteUserByEmail(token, testUser.email);

        // Now we create the user 
        const createUser = {
            firstName: testUser.firstName,
            lastName: testUser.lastName,
            email: testUser.email,
            password: btoa(testUser.password)
        }
        api.createUser(createUser);
    
    })

    it('Creates Listing', () => {

        cy.visit('http://localhost:3000/Dashboard');

        cy.get(`[data-testid="email"]`).should('be.visible').type(testUser.email).should('have.value', testUser.email);
        cy.get(`[data-testid="password"]`).should('be.visible').type(testUser.password).should('have.value', testUser.password);

        cy.get(`[data-testid="loginBtn"]`).should('be.visible').click();

        cy.contains('h1', "Music Venues", { timeout: 10000 }).should('exist');

        createNewListing(testData);

        cy.contains('p', testData.name).should('exist');
    });

    it('Creates Listing with only name', () => {

        cy.visit('http://localhost:3000/Dashboard');

        cy.get(`[data-testid="email"]`).type(testUser.email).should('have.value', testUser.email);
        cy.get(`[data-testid="password"]`).type(testUser.password).should('have.value', testUser.password);

        cy.get(`[data-testid="loginBtn"]`).click();

        createNewListing(TestDataOnlyName);

        cy.contains('p', TestDataOnlyName.name).should('exist');
        cy.get('table tr:first-child td:first-child')
            .invoke('text')
            .should('be.empty');
    });

  })
