import React, { useState, Component } from 'react';
import API from './API/API.js';

export default function SearchListing({ setTableData }) {
    
    const [searchValue, setSearchValue] = useState("");
    const [clearButtonVisible, setClearButtonVisible] = useState(false);

    const api = new API();

    const handleSearchChagne = (event) => {
        setSearchValue(event.target.value);
    }

    const searchListing = async (searchTerm) => {
        setTableData(await api.search(searchTerm));
    }
    

    const handleAction = () => {
        setClearButtonVisible(true);
        searchListing(searchValue);
    }

    const handleClear = async () => {
        setSearchValue("");
        setClearButtonVisible(false);
        setTableData(await api.getListings(100));
    }

    return (
        <div>
            <p>Search Listings <input
                type="text"
                className="textbox"
                value={searchValue}
                onChange={handleSearchChagne}
                placeholder=""
                data-testid="search"
            /><button onClick={handleAction} className="button">Search</button>{clearButtonVisible && (
                <button className="button" onClick={handleClear}>Clear</button>
              )}</p>
            
        </div>
    );
};