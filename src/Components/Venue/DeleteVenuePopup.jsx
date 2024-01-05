import React from 'react';
import API from '../App/API/API';

function DeleteVenuePopup({ data, onClose, getTableData, setData }) {
  const api = new API(process.env.REACT_APP_API_URL);
  
  const handleAction = () => {
    deleteVenue();
    
    // Close the pop-up
    onClose();
  
  };

  const deleteVenue = async () => {
    try {
      console.log(`The Data is ${data}`);
      await api.delete(data);
      //getTableData();
      setData(await api.getAllVenues());

    } catch (error) {
      console.error('Error in deleting venue', error);
    }
  };
  
  return (
    <div className='popup'>
        <div className='popup-content'>
          <div className='model-header'>
            <h2 className='model-title'>Delete Venue?</h2>
          </div>
          <div className='model-body'>
            <div>
              <p>Venues to delete:</p>
              <ul>
                {data.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className='model-footer'>
            <button onClick={handleAction} className="button" data-testid="confirmBtn">Confirm</button>
            <button className='button' onClick={onClose} data-testid="cancelBtn">Cancel</button>
          </div>
        </div>
      </div>
  );
}

export default DeleteVenuePopup;