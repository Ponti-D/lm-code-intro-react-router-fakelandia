import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders site name', () => {
  render(<App />);
  
  expect(screen.getByText(/Welcome to Fakelandia Justice Department/i)).toBeInTheDocument();
});
