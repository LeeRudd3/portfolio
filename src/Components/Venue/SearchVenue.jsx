import React, { useState, Component } from 'react';
import API from '../App/API/API';

export default function SearchVenue({ setTableData }) {
    
    const [searchValue, setSearchValue] = useState("");
    const [clearButtonVisible, setClearButtonVisible] = useState(false);

    const api = new API();

    const handleSearchChagne = (event) => {
        setSearchValue(event.target.value);
    }

    const searchVenue = async (searchTerm) => {
        setTableData(await api.search(searchTerm));
    }
    

    const handleAction = () => {
        setClearButtonVisible(true);
        searchVenue(searchValue);
    }

    const handleClear = async () => {
        setSearchValue("");
        setClearButtonVisible(false);
        setTableData(await api.getAllVenues());
    }

    return (
        <div>
            <p>Search <input
                type="text"
                className="textbox"
                value={searchValue}
                onChange={handleSearchChagne}
                placeholder=""
                data-testid="search"
            /><button onClick={handleAction} className="button" data-testid="searchbtn">Search</button>{clearButtonVisible && (
                <button className="button" onClick={handleClear} data-testid="clearbtn">Clear</button>
              )}</p>
            
        </div>
    );
};