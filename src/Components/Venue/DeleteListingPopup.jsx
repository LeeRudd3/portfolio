import React from 'react';
import API from '../App/API/API';

function DeleteListingPopup({ data, onClose, getTableData }) {
  const api = new API();
  
  const handleAction = () => {
    deleteListing();
    
    // Close the pop-up
    onClose();
  
  };

  const deleteListing = async () => {
    try {
      api.delete(data);
      getTableData();
    } catch (error) {
      console.error('Error in deleting listing', error);
    }
  };
  
  return (
    <div className='popup'>
        <div className='popup-content'>
          <div className='model-header'>
            <h2 className='model-title'>Delete Listing?</h2>
          </div>
          <div className='model-body'>
            <div>
              <p>Items to delete:</p>
              <ul>
                {data.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className='model-footer'>
            <button onClick={handleAction} className="button">Confirm</button>
            <button className='button' onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
  );
}

export default DeleteListingPopup;