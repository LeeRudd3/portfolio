import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Profile from '../../Components/Profile';
import {BrowserRouter, MemoryRouter} from 'react-router-dom';
import '@testing-library/jest-dom';

// Mocking the API module
jest.mock('../../Components/App/API/API', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    getUserByEmail: jest.fn(() => Promise.resolve({
      _id: 'mockUserId',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
    })),
  })),
}));

describe('Profile component', () => {
  it('renders profile information correctly', async () => {
    // Mocking token
    const mockToken = { email: 'test@example.com' };

    render(<Profile showProfile={true} token={mockToken} />, {wrapper: BrowserRouter});

    // Wait for data to be loaded
    await screen.findByTestId('email');

    expect(screen.getByTestId('titleemail').textContent).toEqual('Username');
    expect(screen.getByTestId('email').textContent).toEqual('test@example.com');
    expect(screen.getByTestId('firstName').textContent).toEqual('John');
    expect(screen.getByTestId('lastName').textContent).toEqual('Doe');
  });

  it('does not render when showProfile is set to false', async () => {
    // Mocking token
    const mockToken = { email: 'test@example.com' };

    render(<Profile showProfile={false} token={mockToken} />, {wrapper: BrowserRouter});

    // Wait for the API call to resolve since we are not waiting for an element to show
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    
    //We are expecting to not find email
    expect(screen.queryByTestId('email')).not.toBeInTheDocument();
    
  });

  it('opens and closes Edit User popup', async () => {
    const mockToken = { email: 'test@example.com' };

    render(<Profile showProfile={true} token={mockToken} />, {wrapper: BrowserRouter});

    // Wait for data to be loaded
    await screen.findByTestId('email');
    
    fireEvent.click(screen.getByText('Edit User Info'));

    expect(screen.queryByTestId('editBtn')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('cancelBtn'));

    expect(screen.queryByTestId('editBtn')).not.toBeInTheDocument();
  });

  it('opens and closes Delete User popup', async () => {
    const mockToken = { email: 'test@example.com' };

    render(<Profile showProfile={true} token={mockToken} />, {wrapper: BrowserRouter});

    // Wait for data to be loaded
    await screen.findByTestId('email');
    
    fireEvent.click(screen.getByText('Delete Your User'));

    expect(screen.queryByTestId('deleteBtn')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('cancelBtn'));

    expect(screen.queryByTestId('deleteBtn')).not.toBeInTheDocument();
  });

  it('opens and closes chane password popup', async () => {
    const mockToken = { email: 'test@example.com' };

    render(<Profile showProfile={true} token={mockToken} />, {wrapper: BrowserRouter});

    // Wait for data to be loaded
    await screen.findByTestId('email');
    
    fireEvent.click(screen.getByText('Change Password'));

    expect(screen.queryByTestId('changeBtn')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('cancelBtn'));

    expect(screen.queryByTestId('changeBtn')).not.toBeInTheDocument();
  });

  // Similarly, you can write tests for Change Password and Delete User popups
});
