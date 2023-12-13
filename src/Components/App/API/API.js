class API {
    
    constructor() {
    }
    
    add(number1, number2) {
        return number1 + number2;
    }

    async search(searchTerm) {
        let findings = "does this change";
        try {
            await fetch(`/venues/search/${searchTerm}`)
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
            await fetch(`/venues`)
                .then((res) => res.json())
                .then((jsonData) => {
                listings = jsonData;
            });
        } catch (error) {
            console.log(`Error getting listings`, error);
        }
        console.log(`Listings retrieved is ${typeof listings}`);
        return listings;
    }

    async getAllVenues() {
        let venues;
        try {
            await fetch(`/getvenues/all`)
                .then((res) => res.json())
                .then((jsonData) => {
                    venues = jsonData;
            });
        } catch (error) {
            console.log(`Error getting venues`, error);
        }
        console.log(`venues retrieved is ${typeof venues}`);
        return venues;
    }

    async edit(listingID, jsonData) {
        let update;
        try {
            await fetch(`/venues/${listingID}`, {
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
        try {
            let jsonData = {
                ids: data
            }

            returnJSON = await fetch(`/venues`, {  

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

    async getUserByEmail(email, token) {
        let returnJSON;
        try{
            console.log(`email ${email} and token ${token}`);
            /*returnJSON = await fetch(`/users/byemail/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
                }).then((res) => res.json());*/
        }
        catch(error) {
            console.log('Error in deleting listing', error);
            returnJSON = null;
        }
        return returnJSON;
    }
    
    async create(jsonData) {
        let id;
        
        try {
            await fetch(`/venues`, { 
        
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            }, 
            body: JSON.stringify(jsonData) 
        
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