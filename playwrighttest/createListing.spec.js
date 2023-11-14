import API from '../src/API/API.js';

const { test, expect } = require('@playwright/test');

test.describe('Create Listing', () => {
    const testData = {
        name: "Playwright Test",
        summary: "Playwright Test Summary",
        bedrooms: 2,
        bathrooms: 2
    };

    test.beforeEach(() => {
        
    
    });

    test('has title', async ({ page }) => {
                
        await page.goto('http://localhost:3000/');

        await expect(page).toHaveTitle(/Music Listings/);

        await page.getByRole('button', { name: 'Create Listing' }).click();

        await expect(page.getByRole('button', {name: 'Add Listing'})).toBeVisible();

        await page.locator(`input[name="listingName"]`).fill(`${testData.name}`);
        await page.locator(`input[name="listingSummary"]`).fill(`${testData.summary}`);
        await page.locator(`input[name="listingBedrooms"]`).fill(`${testData.listingBedrooms}`);
        //await page.locator(`input[name="listingBathrooms"]`).fill(`${testData.listingBathrooms}`);

        await page.getByRole('button', { name: 'Add Listing' }).click();
    });
});