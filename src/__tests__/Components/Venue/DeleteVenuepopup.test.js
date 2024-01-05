import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom'

import DeleteVenuePopup from '../../../Components/Venue/DeleteVenuePopup.jsx'; // Adjust the path to your component
import API from '../../../Components/App/API/API.js'; // Adjust the path to your API file

describe('DeleteVenuePopup', () => {
  it('should call Deletevenue and delete data on confirm button click', async () => {
    const mockData = ["6536a4c92d920aaebeb37bf4", "6536a4e02d920aaebeb37bf5"];

    // Mock the API.edit method
    API.prototype.delete = jest.fn().mockResolvedValue(true);
    API.prototype.getAllVenues = jest.fn().mockResolvedValue();

    const getTableData = jest.fn();
    const onClose = jest.fn();
    const setData = jest.fn();

    const { getByText, getByPlaceholderText, getByDisplayValue } = render(
      //<EditListingPopup data={mockData} getTableData={getTableData} onClose={onClose} />
      <DeleteVenuePopup
            data={mockData}
            onClose={onClose}
            getTableData={getTableData}
            setData={setData}
          />
    );

    

    // Simulate clicking the Update button
    const deleteButton = getByText('Confirm');
    fireEvent.click(deleteButton);

    // Wait for the API call to resolve
    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.delete).toHaveBeenCalledWith(mockData);

    // Verify that the getTableData and onClose functions were called
    expect(setData).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});