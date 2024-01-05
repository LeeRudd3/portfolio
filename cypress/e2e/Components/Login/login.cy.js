import API from '../../../../src/Components/App/API/API';
const config = require('../../../../env.config');

describe('Login', () => {

    const testData = {
        firstName: "test",
        lastName: "user",
        email: "CypressTest@mytest.com",
        password: "MyCypressTest"
    };

    before(async () => {
        
        const api = new API(config.api);
        
        // Here we get token 
        // NEED TO PUT CREDITIALS INTO CONFIG BEFORE CHECK IN!!!!!!!!
        const token = await api.login({
            //email: config.cypress.admin,
            //password: btoa(config.cypress.password)
            email: `${config.cypress.username}`,
            password: btoa(`${config.cypress.password}`)
        });

        // Now we make sure we have a valid user to log in with
        // First we remove the user so we can start in a known state
        // If user doesn't exist, we just move on
        api.deleteUserByEmail(token, testData.email);

        // Now we create the user 
        const createData = {
            firstName: testData.firstName,
            lastName: testData.lastName,
            email: testData.email,
            password: btoa(testData.password)
        }
        await api.createUser(createData);
    
    })

    it('with valid user', () => {
        cy.visit('http://localhost:3000/dashboard');

        cy.get(`[data-testid="email"]`).should('exist');
        cy.get(`[data-testid="password"]`).should('exist');
        cy.get(`[data-testid="loginBtn"]`).should('exist');
        cy.get(`[data-testid="createBtn"]`).should('exist');

        cy.login(testData.email, testData.password);

        cy.contains('h2', 'Navigation').should('exist');

        // Check if the logout button exists
        cy.get('[data-testid="logoutBtn"]').should('exist').then(($button) => {
            // If the button exists, click it
            if ($button.length > 0) {
                cy.get('[data-testid="logoutBtn"]').click();
            }
        });
    });

    it('with invalid user', () => {
        cy.visit('http://localhost:3000/dashboard');

        cy.login("bob", testData.password);

        cy.contains('p', 'Error: Invalid Username or Password').should('exist');
    });

    it('with invalid password', () => {
        cy.visit('http://localhost:3000/dashboard');

        cy.login(testData.email, "ttt");

        cy.contains('p', 'Error: Invalid Username or Password').should('exist');
    });

});