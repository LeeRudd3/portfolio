import React, { useState, useEffect } from 'react';
import EditListingPopup from "./EditListingPopup";
import CreateNewVenue from './CreateNewVenue';
import DeleteListingPopup from './DeleteListingPopup';
import SearchVenue from './SearchVenue';
import ReactPaginate from 'react-paginate';
import './Venue.css';

async function getVenues() {
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
    return venues;
}

const Venue = ({ showVenue }) => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showCreateListing, setShowCreateListing] = React.useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10);

  useEffect(() => {
    async function getData() {
      const res = await getVenues();
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
    setData(await getVenues());

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
      <div>
        <SearchVenue setTableData={setTableData} /> 
      </div>
      <table id='listingtable' style={{ width: 1000 }}>
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
        <button className="button" id="createBtn" onClick={() => setShowCreateListing(true)}>Create Venue</button>
        <CreateNewVenue onClose={handleClosePopup} showCreateListing={showCreateListing} updateTableData={updateTableData}/>
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