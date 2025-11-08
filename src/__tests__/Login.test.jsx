// frontend/src/__tests__/Login.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../components/auth/Login';
import { AuthProvider } from '../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

test('renders login form', () => {
  render(
    <AuthProvider>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </AuthProvider>
  );
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
});
