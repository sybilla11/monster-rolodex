import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Searchbox } from './search-box.component';

test('renders with the given placeholder', () => {
  render(<Searchbox placeholder="search Monster" changeHandle={() => {}} />);
  expect(screen.getByPlaceholderText('search Monster')).toBeInTheDocument();
});

test('calls changeHandle as the user types', async () => {
  const changeHandle = jest.fn();
  const user = userEvent.setup();
  render(<Searchbox placeholder="search Monster" changeHandle={changeHandle} />);

  await user.type(screen.getByPlaceholderText('search Monster'), 'lea');

  expect(changeHandle).toHaveBeenCalledTimes(3);
});
