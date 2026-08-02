import { render, screen } from '@testing-library/react';
import { CardList } from './card-list.component';
import { Monster } from '../../models/monster';

const monsters: Monster[] = [
  { id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz' },
  { id: 2, name: 'Ervin Howell', email: 'Shanna@melissa.tv' },
];

test('renders a card for each monster', () => {
  render(<CardList monsters={monsters} />);
  expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
  expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
});

test('renders no cards when the monster list is empty', () => {
  render(<CardList monsters={[]} />);
  expect(screen.queryByRole('img')).not.toBeInTheDocument();
});
