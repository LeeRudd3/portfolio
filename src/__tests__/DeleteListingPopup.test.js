import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom'

import DeleteListingPopup from '../DeleteListingPopup'; // Adjust the path to your component
import API from '../API/API.js'; // Adjust the path to your API file

describe('DeleteListingPopup', () => {
  it('should call DeleteListing and delete data on confirm button click', async () => {
    const mockData = ["6536a4c92d920aaebeb37bf4", "6536a4e02d920aaebeb37bf5"];

    // Mock the API.edit method
    API.prototype.delete = jest.fn().mockResolvedValue(true);

    const getTableData = jest.fn();
    const onClose = jest.fn();

    const { getByText, getByPlaceholderText, getByDisplayValue } = render(
      //<EditListingPopup data={mockData} getTableData={getTableData} onClose={onClose} />
      <DeleteListingPopup
            data={mockData}
            onClose={onClose}
            getTableData={getTableData}
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
    expect(getTableData).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});