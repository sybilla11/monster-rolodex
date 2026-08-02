import { render, screen } from '@testing-library/react';
import { Card } from './card.component';
import { Monster } from '../../models/monster';

const monster: Monster = { id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz' };

test('renders the monster name and email', () => {
  render(<Card monster={monster} />);
  expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
  expect(screen.getByText('Sincere@april.biz')).toBeInTheDocument();
});

test('renders an image with the monster name as alt text and a well-formed src', () => {
  render(<Card monster={monster} />);
  const img = screen.getByRole('img');
  expect(img).toHaveAttribute('alt', 'Leanne Graham');
  expect(img).toHaveAttribute('src', 'https://robohash.org/1?set=set2&size=180x180');
});
