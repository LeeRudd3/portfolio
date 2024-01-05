import API from '../../../../src/Components/App/API/API';
//const config = require('../../../../src/env.config');

describe('Deletes Venue', () => {
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

    const testDataOne = {
        name: "Cypress Test 1",
        summary: "Cypress Test Summary 1",
        type: "Band",
        address1: "101 main st",
        address2: "suite 101",
        city: "Portland",
        state: "OR"
    };

    const testDataTwo = {
        name: "Cypress Test 2",
        summary: "Cypress Test Summary 2",
        type: "Band",
        address1: "101 main st",
        address2: "suite 101",
        city: "Portland",
        state: "OR"
    };

    const testDataThree = {
        name: "Cypress Test 3",
        summary: "Cypress Test Summary 3",
        type: "Band",
        address1: "101 main st",
        address2: "suite 101",
        city: "Portland",
        state: "OR"
    };

    before(async () => {
        const api = new API(Cypress.env('api'));
        //await api.deleteVenueByName(testData.name);
        await api.deleteVenueByListofNames([testData.name, testDataOne.name, testDataTwo.name, testDataThree.name]);

        // Here we get token 
        const token = await api.login({
            //email: config.cypress.admin,
            //password: btoa(config.cypress.password)
            email: `${Cypress.env('adminUsername')}`,
            password: btoa(`${Cypress.env('adminPassword')}`)
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
        await api.createUser(createUser);

        // We use the API to create venues
        testData._id = await api.create(testData);
        testDataOne._id = await api.create(testDataOne);
        testDataTwo._id = await api.create(testDataTwo);
        testDataThree._id = await api.create(testDataThree);
    
    })

    it('Deletes a Listing', () => {

        cy.visit('http://localhost:3000/Dashboard');

        cy.login(testUser.email, testUser.password);

        cy.contains('h1', "Music Venues").should('exist');

        // Here verify that the Delete button is not showing
        cy.get(`[data-testid="deleteVenue"]`).should('not.exist');

        // Here we check the venue to delete
        cy.get(`[data-testid='${testData._id}checkBox']`).should('exist').check();

        // Verify popup is not up
        cy.contains('h2', "Delete Venue?").should('not.exist');

        // Verify delete button is now shown and click it
        cy.get(`[data-testid="deleteVenue"]`).should('exist').click();

        // Verify popup is shown
        cy.contains('h2', "Delete Venue?").should('exist');

        // Click Confirm to delete venue
        cy.get(`[data-testid="confirmBtn"]`).should('exist').click();

        // Verify venue is removed
        cy.get(`[data-testid='${testData._id}checkBox']`).should('not.exist'); 
        // Here verify that the Delete button is not showing
        cy.get(`[data-testid="deleteVenue"]`).should('not.exist'); 
        
        // Verify the other items remain
        cy.get(`[data-testid='${testDataOne._id}checkBox']`).should('exist'); 
        cy.get(`[data-testid='${testDataTwo._id}checkBox']`).should('exist'); 
        cy.get(`[data-testid='${testDataThree._id}checkBox']`).should('exist'); 
    });

    it('Deletes multiple Listing', () => {

        cy.visit('http://localhost:3000/Dashboard');

        cy.login(testUser.email, testUser.password);

        cy.contains('h1', "Music Venues").should('exist');

        // Here verify that the Delete button is not showing
        cy.get(`[data-testid="deleteVenue"]`).should('not.exist');

        // Here we check the venue to delete
        cy.get(`[data-testid='${testDataOne._id}checkBox']`).should('exist').check();
        cy.get(`[data-testid='${testDataTwo._id}checkBox']`).should('exist').check();
        cy.get(`[data-testid='${testDataThree._id}checkBox']`).should('exist').check();

        // Verify popup is not up
        cy.contains('h2', "Delete Venue?").should('not.exist');

        // Verify delete button is now shown and click it
        cy.get(`[data-testid="deleteVenue"]`).should('exist').click();

        // Verify popup is shown
        cy.contains('h2', "Delete Venue?").should('exist');

        // Click Confirm to delete venue
        cy.get(`[data-testid="confirmBtn"]`).should('exist').click();

        cy.contains('h2', "Delete Venue?").should('not.exist');

        // Verify venue is removed
        cy.get(`[data-testid='${testDataOne._id}checkBox']`).should('not.exist'); 
        cy.get(`[data-testid='${testDataTwo._id}checkBox']`).should('not.exist'); 
        cy.get(`[data-testid='${testDataThree._id}checkBox']`).should('not.exist'); 
        // Here verify that the Delete button is not showing
        cy.get(`[data-testid="deleteVenue"]`).should('not.exist');       
    });

  })
