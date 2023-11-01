// src/DetailPage.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DeletePopup({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const deleteListing = async () => {
    try {
          
      fetch(`/listing?id=${id}`, {  // Enter your IP address here

      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json', // Specify the content type as JSON
      }
      })
      .then((res) => res.json());
    } catch (error) {
      console.error('Error in editing listing', error);
    }
  };

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleAction = () => {
    // Perform your action here using the inputValue
    //alert(`Action performed with input value: ${inputValue}`);
    deleteListing();
    
    // Close the pop-up
    closePopup();

    //refresh the page to show new item
    window.location.href = '/'
    //navigate('');
  };

  return (
    <div>
      <button onClick={openPopup}>Delete Listing</button>

      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Delete Listing</h2>
        <p>Delete Listing?</p>
            <button onClick={handleAction}>Delete</button>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

const Listing = () => {
  const { id } = useParams(); // Access the 'id' parameter from the URL

  const [listingID, setListingID] = React.useState('');
  const [listingName, setListingName] = React.useState('');
  const [listingSummary, setListingSummary] = React.useState('');
  const [listingBedroom, setListingBedroom] = React.useState('');
  const [listingBathroom, setListingBathroom] = React.useState('');
  const [listingError, setListingError] = React.useState('');
  const [showListing, setShowListing] = React.useState(false);

  React.useEffect(() => {
    searchListing();
  }, []);

  const handleNameEdit = (event) => {
    setListingName(event.target.value);
  };

  const handleSummaryEdit = (event) => {
    setListingSummary(event.target.value);
  };

  const handleBedroomEdit = (event) => {
    setListingBedroom(event.target.value);
  };

  const handleBathroomEdit = (event) => {
    setListingBathroom(event.target.value);
  };

  const searchListing = async () => {
    try {
      let jsonData = `{"_id":"${id}"}`;

      fetch(`/listing?search=${jsonData}`)
      .then((res) => res.json())
      .then((listing) => {
        if(listing.message != null){
          setListingID(listing.message["_id"]);
          setListingName(listing.message["name"]);
          setListingSummary(listing.message["summary"]);
          setListingBedroom(listing.message["bedrooms"]);
          setListingBathroom(listing.message["bathrooms"]);
          setListingError();
          setShowListing(true);
        }
        else {
          setListingError("Listing Not Found");
          setListingID();
          setListingName();
          setListingSummary();
          setListingBedroom();
          setListingBathroom();
          setShowListing(false);
        }
      });
    } catch (error) {
      console.error('Error fetching random text:', error);
    }
  }

  const editListing = async () => {
    try {
      let jsonData = {
        name: `${listingName}`,
        summary: `${listingSummary}`,
        bedrooms: `${listingBedroom}`,
        bathrooms: `${listingBathroom}`
      }
      
      fetch(`/listing?id=${listingID}`, {  // Enter your IP address here

      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json', // Specify the content type as JSON
      }, 
      body: JSON.stringify(jsonData) // body data type must match "Content-Type" header

      })
      .then((res) => res.json())
      .then((listing) => {
        if(listing.message === true) {
          setListingID();
          setListingName();
          setListingSummary();
          setListingBedroom();
          setListingBathroom();
          setShowListing(false);

          searchListing();
        }
      });

    } catch (error) {
      console.error('Error in editing listing', error);
    }
  };

  return (
    <div>
      <h2>Detail Page</h2>
      <p>ID received from the URL: {id}</p>
    
    {showListing && (
      <p>{`ID : ${listingID}`}</p>
    )}
    {showListing && (
      <p>Enter Listing Name <input
        type="text"
        class="textbox"
        value={listingName}
        onChange={handleNameEdit}
        placeholder={listingName}
      /></p>
    )}
    {showListing && (
      <p>Enter Listing Summary <input
        type="text"
        class="textbox"
        value={listingSummary}
        onChange={handleSummaryEdit}
        placeholder={listingSummary}
      /></p>
    )}
    {showListing && (
      <p>Enter Listing Bedrooms <input
        type="text"
        class="textbox"
        value={listingBedroom}
        onChange={handleBedroomEdit}
        placeholder={listingBedroom}
      /></p>
    )}
    {showListing && (
      <p>Enter Listing Bathrooms <input
        type="text"
        class="textbox"
        value={listingBathroom}
        onChange={handleBathroomEdit}
        placeholder={listingBathroom}
      /></p>
    )}

    <button onClick={editListing}> Edit Listing       
    </button>
    <DeletePopup id={id} />
    

    </div>
    
  );
}

export default Listing;
