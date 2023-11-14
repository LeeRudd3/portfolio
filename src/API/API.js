const config = require('../config.json');

class API {
    
    constructor() {
    }
    
    add(number1, number2) {
        return number1 + number2;
    }

    async search(searchTerm) {
        let findings = "does this change";
        try {
            await fetch(`/search?search=${searchTerm}`)
            .then((res) => res.json())
            .then((jsonData) => {
                findings = jsonData;
            });
            
        } catch (error) {
            console.error(`Error in searching for ${searchTerm}`, error);
        }

        return findings;
    }

    async getListings(limit) {
        let listings;
        try {
            await fetch(`/listings?limit=${limit}`)
                .then((res) => res.json())
                .then((jsonData) => {
                listings = jsonData;
            });
        } catch (error) {
            console.error(`Error getting listings`, error);
        }

        return listings;
    }

    async edit(listingID, jsonData) {
        let update;
        try {
            await fetch(`/listing?id=${listingID}`, {

                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json', // Specify the content type as JSON
                }, 
                body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
            
                })
                .then((res) => res.json())
                .then((listing) => {
                    update = listing.message;
            });
        } catch (error) {
            console.error(`Error in editing for ${listingID}`, error);
        }

        return update;
    }

    async delete(data) {
        let returnJSON;
        console.log(`data that is passed to api is ${data}`);
        try {
            let jsonData = {
                ids: data
            }

            returnJSON = await fetch(`/listings`, {  

            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json', // Specify the content type as JSON
            }, 
            body: JSON.stringify(jsonData) // body data type must match "Content-Type" header

            }).json;

        } catch (error) {
            console.error('Error in deleting listing', error);
        }

        return returnJSON;
    }

    async deleteViaName(data) {
        let returnJSON;
        try {
            let jsonData = {
                ids: data
            }

            returnJSON = await fetch(`/listings/name`, {  

            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json', // Specify the content type as JSON
            }, 
            body: JSON.stringify(jsonData) // body data type must match "Content-Type" header

            }).json;

        } catch (error) {
            console.error('Error in deleting listing', error);
        }

        return returnJSON;
    }

    async create(jsonData) {
        let id;
        
        try {
            await fetch(`/listing`, {  // Enter your IP address here
        
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', // Specify the content type as JSON
            }, 
            body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
        
            }).then((res) => res.json())
            .then((listing) => {
                id = listing.message;
            });
        } catch (error) {
            console.error('Error in creating listing', error);
        }

        return id;
    }
}

export default API;