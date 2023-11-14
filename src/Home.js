import React, { useState, Component } from 'react';
import './Home.css';
import EditListingPopup from "./EditListingPopup";
import CreateNewListing from './CreateNewListing';
import DeleteListingPopup from './DeleteListingPopup';
import SearchListing from './SearchListing';
import API from './API/API.js';

const Home = () => {
  const [data, setData] = React.useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showCreateListing, setShowCreateListing] = React.useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);
  
  React.useEffect(() => {
    getTableData();
  }, []);

  const getTableData = async() => {
    const api = new API();
    setData(await api.getListings(100));

    setDeleteButtonVisible(false);
  }

  const updateTableData = async newListing => {
    setData([...data, newListing]);
  };

  const setTableData = json => {
    setData(json);
  }

  const handleItemClick = (item) => {
    setSelectedItem(item);
  }

  const handleClosePopup = () => {
    setSelectedItem(null);
    setShowCreateListing(false);
  };

  const setItems = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selectedItem1) => selectedItem1 !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  }
  
  const handleItemsClick = (item) => {
    setItems(item);
    

    if(!deleteButtonVisible) {
      setDeleteButtonVisible(true);
    }

  };

  const handleItemsShowSelected = () => {
    setPopupVisible(true);
  };

  const handleItemsClosePopup = () => {
    setPopupVisible(false);
    setSelectedItems([]);
    setDeleteButtonVisible(false);
  };

  

  return (
    <div>
      <h1>Listings</h1>
      <SearchListing setTableData={setTableData} />
      <table id='listingtable'>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Summary</th>
            <th>Bedrooms</th>
            <th>Bathrooms</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id} id={item._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item._id)}
                  onChange={() => handleItemsClick(item._id)}
                />
              </td>
              <td onClick={() => handleItemClick(item)}>
                <p className="link-like" itemname={item.name}>{item.name}</p>
              </td>
              <td name='summary'>{item.summary}</td>
              <td name='bedrooms'>{item.bedrooms}</td>
              <td name='bathrooms'>{item.bathrooms}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedItem && (
        <EditListingPopup data={selectedItem} onClose={handleClosePopup} getTableData={getTableData} />
      )}

      <div>
        <button className="button" id="createBtn" onClick={() => setShowCreateListing(true)}>Create Listing</button>
        <CreateNewListing onClose={handleClosePopup} showCreateListing={showCreateListing} updateTableData={updateTableData}/>
        {deleteButtonVisible && (
          <button className="button" onClick={handleItemsShowSelected}>Delete Listings</button>
        )}
        
        {popupVisible && (
          <DeleteListingPopup
            data={selectedItems}
            onClose={handleItemsClosePopup}
            getTableData={getTableData}
          />
        )}
      </div>
    </div>
    
  );
}

export default Home;