import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main navigation content', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /sobre mim/i });
  expect(heading).toBeInTheDocument();
});
