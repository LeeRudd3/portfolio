import API from '../../../../src/Components/App/API/API';
const config = require('../../../../env.config');

describe('Create Venues', () => {
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

    const api = new API(config.api);

    before(async () => {
        
        //await api.deleteVenueByName(testData.name);
        await api.deleteVenueByListofNames([testData.name, TestDataOnlyName.name]);

        // Here we get token 
        const token = await api.login({
            //email: config.cypress.admin,
            //password: btoa(config.cypress.password)
            email: `${config.cypress.username}`,
            password: btoa(`${config.cypress.password}`)
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
    
    })

    it('Creates a venue', () => {

        cy.visit('http://localhost:3000/Dashboard');

        cy.login(testUser.email, testUser.password);

        cy.contains('h1', "Music Venues").should('exist');

        cy.createNewVenue(testData);

        cy.contains('p', testData.name).should('exist');
    });

    it('Creates a venue with only a name', () => {

        cy.visit('http://localhost:3000/Dashboard');

        cy.login(testUser.email, testUser.password);

        cy.createNewVenue(TestDataOnlyName);

        cy.contains('p', TestDataOnlyName.name).should('exist');
        cy.get(`[data-testname='${TestDataOnlyName.name}']`)
            .invoke('text')
            .should('be.empty');
    });

  })
