import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom'

import CreateNewListing from '../CreateNewListing'; // Adjust the path to your component
import API from '../API/API'; // Adjust the path to your API file

describe('CreateNewListing', () => {
  it('should call CreateNewListing and create a new listing on button click', async () => {
    const mockData = {
      name: 'Listing Name',
      summary: 'Listing Summary',
      bedrooms: '3',
      bathrooms: '2',
    };

    // Mock the API.edit method
    API.prototype.create = jest.fn().mockResolvedValue(true);

    const updateTableData = jest.fn();
    const showCreateListing = jest.fn();
    const onClose = jest.fn();

    const { getByText, getByPlaceholderText, getByDisplayValue } = render(
        <CreateNewListing onClose={onClose} showCreateListing={showCreateListing} updateTableData={updateTableData}/>
    );

    const nameInput = getByPlaceholderText('Enter name');
    const summaryTextarea = getByPlaceholderText('Enter summary');
    const bedroomsInput = getByPlaceholderText('Enter # of Bedrooms');
    const bathroomsInput = getByPlaceholderText('Enter # of Bathrooms');

    // Simulate editing the input fields
    fireEvent.change(nameInput, { target: { value: mockData['name'] } });
    fireEvent.change(summaryTextarea, { target: { value: mockData['summary'] } });
    fireEvent.change(bedroomsInput, { target: { value: mockData['bedrooms'] } });
    fireEvent.change(bathroomsInput, { target: { value: mockData['bathrooms'] } });

    // Simulate clicking the Update button
    const addButton = getByText('Add Listing');
    fireEvent.click(addButton);

    // Wait for the API call to resolve
    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Verify that the API.edit method was called with the expected data
    expect(API.prototype.create).toHaveBeenCalledWith(mockData);

    // Verify that the getTableData and onClose functions were called
    expect(updateTableData).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});