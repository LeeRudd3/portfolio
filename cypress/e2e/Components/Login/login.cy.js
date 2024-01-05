import API from '../../../../src/Components/App/API/API';

describe('Login', () => {

    const testData = {
        firstName: "test",
        lastName: "user",
        email: "CypressTest@mytest.com",
        password: "MyCypressTest"
    };

    before(async () => {
        
        const api = new API(Cypress.env('api'));
        
        // Here we get token 
        // NEED TO PUT CREDITIALS INTO CONFIG BEFORE CHECK IN!!!!!!!!
        const token = await api.login({
            //email: config.cypress.admin,
            //password: btoa(config.cypress.password)
            email: `${Cypress.env('adminUsername')}`,
            password: btoa(`${Cypress.env('adminPassword')}`)
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