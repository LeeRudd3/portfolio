import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom'
import SearchVenue from '../../../Components/Venue/SearchVenue.jsx';
import API from '../../../Components/App/API/API.js';

describe('SearchVenue', () => {
  it('should call the API and update the table data on button click', async () => {
    const setTableData = jest.fn(); // Create a mock function

    // Mock the API.search method
    API.prototype.search = jest.fn().mockImplementation(async (searchTerm) => {
      // Return a resolved promise with your mocked JSON data
      return { data: 'mocked JSON data' };
    });

    API.prototype.getAllVenues = jest.fn().mockImplementation(async () => {
      // Return a resolved promise with your mocked JSON data
      return { data: 'mocked All JSON data' };
    });

    const { getByTestId, getByText } = render(
      <SearchVenue setTableData={setTableData} />
    );

    const searchInput = getByTestId('search');
    const searchButton = getByTestId('searchbtn');

    fireEvent.change(searchInput, { target: { value: 'example' } });
    fireEvent.click(searchButton);

    // Wait for the API call to resolve
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(API.prototype.search).toHaveBeenCalledWith('example');
    expect(setTableData).toHaveBeenCalledWith({ data: 'mocked JSON data' });
  });

  it('should clear the search input and hide the clear button on button click', async () => {
    const setTableData = jest.fn();

    // Mock the API.search method
    API.prototype.search = jest.fn().mockImplementation(async () => {
      // Return a resolved promise with your mocked JSON data
      return { data: 'mocked Clear JSON data' };
    });

    const { getByTestId, getByText } = render(
      <SearchVenue setTableData={setTableData} />
    );

    // Simulate typing a search term into the input field
    const searchInput = getByTestId('search');
    fireEvent.change(searchInput, { target: { value: 'example' } });

    // Simulate clicking the Search button
    const searchButton = getByTestId('searchbtn');
    fireEvent.click(searchButton);

    // Wait for the API call to resolve
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Verify that the clear button is displayed
    const clearButton = getByText('Clear');
    expect(clearButton).toBeInTheDocument();

    // Simulate clicking the Clear button
    fireEvent.click(clearButton);

    // Wait for the API call to resolve
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Verify that the search input is cleared
    const searchClearInput = getByTestId('search');
    expect(searchClearInput.value).toBe('');

    // Verify that the clear button is no longer displayed
    expect(clearButton).not.toBeVisible();

    // Verify that setTableData was called with the expected argument
    expect(setTableData).toHaveBeenCalledWith({ data: 'mocked Clear JSON data' });
  });
});