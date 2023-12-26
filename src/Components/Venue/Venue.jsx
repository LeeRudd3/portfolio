import React, { useState, useEffect } from 'react';
import EditVenuePopup from "./EditVenuePopup";
import CreateNewVenue from './CreateNewVenue';
import DeleteListingPopup from './DeleteVenuePopup';
import SearchVenue from './SearchVenue';
import ReactPaginate from 'react-paginate';
import API from '../App/API/API';
import './Venue.css';

const Venue = ({ showVenue }) => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showCreateVenue, setShowCreateVenue] = React.useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10);

  const api = new API();

  useEffect(() => {
    async function getData() {
      const res = await api.getAllVenues();
      setData(res);
    }
    getData();
  }, []);

  if (!showVenue) {
    return null;
  }

  const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

	const paginate = ({ selected }) => {
		setCurrentPage(selected + 1);
	};

  const getTableData = async() => {
    setData(await api.getAllVenues());

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
    setShowCreateVenue(false);
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
      <div>
        <SearchVenue setTableData={setTableData} /> 
      </div>
      <table id='venuetable' style={{ width: 1500 }}>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Summary</th>
            <th>Type</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((item) => (
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
              <td name='Summary'>{item.summary}</td>
              <td name='Type'>{item.type}</td>
              <td name='Location'>{`${item.city}, ${item.state}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedItem && (
        <EditVenuePopup data={selectedItem} onClose={handleClosePopup} getTableData={getTableData} />
      )}

      <div style={{display: 'flex',  justifyContent:'right', alignItems:'right'}}>
        <ReactPaginate
              onPageChange={paginate}
              pageCount={Math.ceil(data.length / postsPerPage)}
              previousLabel={'Prev'}
              nextLabel={'Next'}
              containerClassName={'pagination'}
              pageLinkClassName={'page-number'}
              previousLinkClassName={'page-number'}
              nextLinkClassName={'page-number'}
              activeLinkClassName={'active'}
            />
      </div>

      <div>
        <button className="button" id="createBtn" onClick={() => setShowCreateVenue(true)}>Create Venue</button>
        <CreateNewVenue onClose={handleClosePopup} showCreateVenue={showCreateVenue} updateTableData={updateTableData}/>
        {deleteButtonVisible && (
          <button className="button" onClick={handleItemsShowSelected}>Delete Venues</button>
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

export default Venue;