import API from '../../../src/API/API.js';

describe('Search Listings', () => {
    const api = new API();

    const testSingleSearchData = {
        name: "Cypress Single Search Test xxyyzz112233",
        summary: "Cypress Test Summary",
        bedrooms: 2,
        bathrooms: 2
    };

    const testMultipleSearchData = {
        name: "Cypress Single Search Test aabbcc889900",
        summary: "Cypress Test Summary",
        bedrooms: 2,
        bathrooms: 2
    };

    const testMultipleSearchData2 = {
        name: "Cypress Single Search Test number2 aabbcc889900",
        summary: "Cypress Test Summary",
        bedrooms: 2,
        bathrooms: 2
    };

    const testNonExistingSearchData = {
        name: "Does Not Exist xxyyzz112233",
        summary: "Cypress Test Summary",
        bedrooms: 2,
        bathrooms: 2
    };

    let initTableRow;

    async function initData() {
        await api.deleteViaName([testSingleSearchData.name, 
            testNonExistingSearchData.name, 
            testMultipleSearchData.name,
            testMultipleSearchData2.name
        ]);
        await api.create(testSingleSearchData);
        await api.create(testMultipleSearchData);
        await api.create(testMultipleSearchData2);
    }
    
    before(() => {
        initData();

        cy.visit('http://localhost:3000/');
        
        cy.title().should('eq', 'Music Listings');

        cy.wait(500);

        cy.get("#listingtable")
            .find("tr")
            .then((row) => {
                //row.length will give you the row count
                cy.log(row.length);
                initTableRow = row.length;
        });

    })

    it('clear button visible after search', () => {
        cy.visit('http://localhost:3000/');
        // Here verify clear button isn't visible
        cy.get(`[data-testid='clearbtn']`).should('not.exist');
        
        cy.get(`[data-testid='search']`).type(testSingleSearchData.name).should('have.value', testSingleSearchData.name);
        cy.get(`[data-testid='clearbtn']`).should('not.exist');
        cy.get(`[data-testid='searchbtn']`).click();

        cy.get("#listingtable")
            .find('tr') 
            .should('have.length', 2);

        // Here the button should be visible
        cy.get(`[data-testid='clearbtn']`).should('exist');

        // Now we click the button
        cy.get(`[data-testid='clearbtn']`).click();
        cy.get(`[data-testid='clearbtn']`).should('not.exist');
        cy.get(`[data-testid='search']`).should('have.value', '');
    });
    
    it('Finds single listing', () => {
        cy.visit('http://localhost:3000/');
        cy.get(`[data-testid='search']`).type(testSingleSearchData.name).should('have.value', testSingleSearchData.name);
        cy.get(`[data-testid='searchbtn']`).click();

        cy.get("#listingtable")
            .find('tr') 
            .should('have.length', 2);
    });

    it('Finds mulitple listings', () => {
        cy.visit('http://localhost:3000/');
        cy.get(`[data-testid='search']`).type('aabbcc889900').should('have.value', 'aabbcc889900');
        cy.get(`[data-testid='searchbtn']`).click();

        cy.get("#listingtable")
            .find('tr') 
            .should('have.length', 3);
    });

    it('Finds no listing', () => {
        cy.visit('http://localhost:3000/');
        cy.get(`[data-testid='search']`).type(testNonExistingSearchData.name).should('have.value', testNonExistingSearchData.name);
        cy.get(`[data-testid='searchbtn']`).click();

        cy.get("#listingtable")
            .find('tr') 
            .should('have.length', 1);
    });

});