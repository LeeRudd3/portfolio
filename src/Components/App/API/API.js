const config = require('../../../env.config');

const url = config.api.address;

class API {   

    constructor() {
        
    }
    
    add(number1, number2) {
        return number1 + number2;
    }

    async search(searchTerm) {
        let findings = "does this change";
        try {
            await fetch(`${url}/venues/search/${searchTerm}`)
            .then((res) => res.json())
            .then((jsonData) => {
                findings = jsonData;
            });
            
        } catch (error) {
            console.error(`Error in searching for ${searchTerm}`, error);
        }

        return findings;
    }

    async getVenues(limit) {
        let venues;
        try {
            await fetch(`${url}/venues`)
                .then((res) => res.json())
                .then((jsonData) => {
                venues = jsonData;
            });
        } catch (error) {
            console.log(`Error getting venues`, error);
        }
        console.log(`Venues retrieved is ${typeof venues}`);
        return venues;
    }

    async getAllVenues() {
        let venues;
        try {
            await fetch(`${url}/getvenues/all`)
                .then((res) => res.json())
                .then((jsonData) => {
                    venues = jsonData;
            });
        } catch (error) {
            console.log(`Error getting venues`, error);
        }
        return venues;
    }

    async edit(venueID, jsonData) {
        let update;
        try {
            await fetch(`${url}/venues/${venueID}`, {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json', // Specify the content type as JSON
                }, 
                body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
            
                })
                .then((res) => res.json())
                .then((venue) => {
                    update = venue.message;
            });
        } catch (error) {
            console.error(`Error in editing for ${venueID}`, error);
        }

        return update;
    }

    async delete(data) {
        let returnJSON;
        try {
            let jsonData = {
                ids: data
            }

            returnJSON = await fetch(`${url}/venues`, {  

            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json', // Specify the content type as JSON
            }, 
            body: JSON.stringify(jsonData) // body data type must match "Content-Type" header

            }).json;

        } catch (error) {
            console.error('Error in deleting venue', error);
        }

        return returnJSON;
    }

    async deleteVenueByName(name) {
        let returnJSON;
        try {
            
            returnJSON = await fetch(`${url}/venue/name/${name}`, {  

            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json', // Specify the content type as JSON
            } // body data type must match "Content-Type" header

            }).json;

        } catch (error) {
            console.error('Error in deleting venue', error);
        }

        return returnJSON;
    }

    async deleteVenueByListofNames(names) {
        for (let i = 0; i < names.length; i++) {
            await this.deleteVenueByName(names[i]);
        }
    }

    async getUserByEmail(email, token) {
        return fetch(`${url}/users/byemail/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.token}`
            }
          })
          .then((res) => res.json())
            .then((user) => {
                return user;
            });
    }
    
    async login(credentials) {
        return fetch(`${url}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(response => {
            if (response.ok) {
                return response.json(); 
            }
            else {
                console.log(`${config.api.address}`);
                throw new Error(`Invalid Username or Password`);
            }
            })
    }

    async editBasicUserRemove(token, id, jsonData) {
        return fetch(`${url}/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.token}`
            },
            body: JSON.stringify(jsonData)
        });
    }
    
    async authUser(credentials) {
        return fetch(`${url}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(response => {
            if (response.ok) {
                return response.json(); 
            }
            else {
                throw new Error(`Invalid Username or Password`);
            }
            })
    }

    async createUser(credentials) {
        return fetch(`${url}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(data => data.json())
    }

    async editBasicUser(token, id, jsonData) {
        return fetch(`${url}/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.token}`
            },
            body: JSON.stringify(jsonData)
        });
    }

    async deleteUser(token, id) {
        return fetch(`${url}/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.token}`
            }
        });
    }

    async deleteUserByEmail(token, email) {
        return fetch(`${url}/users/email/${email}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.token}`
            }
        });
    }
    
    async create(jsonData) {
        let id;
        
        try {
            await fetch(`${url}/venues`, { 
        
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