// src/App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome heading', () => {
  render(<App />);
  const heading = screen.getByText(/missing middle student system/i);
  expect(heading).toBeInTheDocument();
});
