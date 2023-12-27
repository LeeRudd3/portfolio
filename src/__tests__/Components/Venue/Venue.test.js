import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Venue from '../../../Components/Venue/Venue';
import {BrowserRouter, MemoryRouter} from 'react-router-dom';
import '@testing-library/jest-dom';
import '@testing-library/dom';

const testData = [
    {
        _id: "12345",
        name: "The Three Little Pigs",
        summary: "This is actually three little huts.  One made of hay, one made of sticks, and one made of bricks.",
        address1: "Somewhere",
        address2: "undefined",
        city: "Somecity",
        state: "WA",
        type: "Field",
    },
    {
        _id: "123456",
        name: "Three Musketeers ",
        summary: "Athos – Comte de la Fère: he has never recovered from his marriage to Milady and seeks solace in wine. He becomes a father figure to d'Artagnan.\nPorthos – M. du Vallon: a dandy, fond of fashionable clothes and keen to make a fortune for himself. The least cerebral of the quartet, he compensates with his homeric strength of body and character.\nAramis – René d'Herblay, a handsome young man who wavers between his religious calling and his fondness for women and intrigue.\nD'Artagnan – Charles de Batz de Castelmore D'Artagnan: an impetuous, brave and clever young man seeking to become a musketeer in France.",
        address1: "123 Main St",
        address2: "",
        city: "Paris",
        state: "Fr",
        type: "Palace",
    },
    {
        _id: "13245",
        name: "Three Bears",
        summary: "Three Bears.  Mamma Bear, Pappa Bear, and Baby Bear.",
        address1: "234 Route 101",
        address2: "Mile Post 15",
        city: "Boulder",
        state: "CO",
        type: "Forest",
    }
];

// Mocking the API module
jest.mock('../../../Components/App/API/API', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    getAllVenues: jest.fn(() => Promise.resolve(
        testData
    )),
  })),
}));

describe('Venue component', () => {
  it('renders venue information correctly', async () => {
    // Mocking token
    const mockToken = { email: 'test@example.com' };

    render(<Venue showVenue={true} />, {wrapper: BrowserRouter});

    // Wait for data to be loaded
    await screen.findByTestId('createVenue');

    // Here we loop through the test data to make sure it is all displayed
    for (let i = 0; i < testData.length; i++) {
        expect(screen.getByTestId(`${testData[i]._id}name`).textContent).toEqual(testData[i].name);
        expect(screen.getByTestId(`${testData[i]._id}summary`).textContent).toEqual(testData[i].summary);
        expect(screen.getByTestId(`${testData[i]._id}type`).textContent).toEqual(testData[i].type);
        expect(screen.getByTestId(`${testData[i]._id}location`).textContent).toEqual(`${testData[i].city}, ${testData[i].state}`);
    }
  });

  it('does not render when showVenue is set to false', async () => {
    // Mocking token
    const mockToken = { email: 'test@example.com' };

    render(<Venue showVenue={false} />, {wrapper: BrowserRouter});

    // Wait for the API call to resolve since we are not waiting for an element to show
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    
    //We are expecting to not find email
    expect(screen.queryByTestId('createVenue')).not.toBeInTheDocument();
    
  });

  it('opens and closes Create Venue Popup', async () => {
    const mockToken = { email: 'test@example.com' };

    render(<Venue showVenue={true} />, {wrapper: BrowserRouter});

    // Wait for data to be loaded
    await screen.findByTestId('createVenue');
    
    fireEvent.click(screen.getByText('Create Venue'));

    expect(screen.queryByTestId('addBtn')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('closeBtn'));

    expect(screen.queryByTestId('addBtn')).not.toBeInTheDocument();
  });

  it('opens and closes Edit Venue Popup', async () => {
    const mockToken = { email: 'test@example.com' };

    render(<Venue showVenue={true} />, {wrapper: BrowserRouter});

    // Wait for data to be loaded
    await screen.findByTestId('createVenue');
    
    //fireEvent.click(screen.getByText(`${testData.name}`));
    fireEvent.click(screen.getByTestId(`${testData[0]._id}name`))

    expect(screen.queryByTestId('updateBtn')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('closeBtn'));

    expect(screen.queryByTestId('updateBtn')).not.toBeInTheDocument();
  });

  it('opens and closes Delete Venue Popup', async () => {
    const mockToken = { email: 'test@example.com' };

    render(<Venue showVenue={true} />, {wrapper: BrowserRouter});

    // Wait for data to be loaded
    await screen.findByTestId('createVenue');

    // Verify that the Delete button is not in document
    expect(screen.queryByText('Delete Venues')).not.toBeInTheDocument();

    // We click the checkbox to make the delete button visible
    fireEvent.click(screen.getByTestId(`${testData[0]._id}checkBox`));

    // Verify that the Delete button is now in document
    expect(screen.queryByText('Delete Venues')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText(`Delete Venues`));

    expect(screen.queryByTestId('confirmBtn')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('cancelBtn'));

    expect(screen.queryByTestId('confirmBtn')).not.toBeInTheDocument();
  });
});