import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { Monster } from './models/monster';

const monsters: Monster[] = [
  { id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz' },
  { id: 2, name: 'Ervin Howell', email: 'Shanna@melissa.tv' },
];

const mockFetchResponse = (body: object) =>
  ({ ok: true, json: async () => body } as Response);

const mockFetchFailure = (status: number) =>
  ({ ok: false, status } as Response);

beforeEach(() => {
  global.fetch = vi.fn();
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('renders monster rolodex heading', async () => {
  (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockFetchResponse([]));
  render(<App />);
  expect(screen.getByText(/monster rolodex/i)).toBeInTheDocument();
  await waitFor(() => expect(global.fetch).toHaveBeenCalled());
});

test('shows a loading state before monsters arrive', () => {
  (global.fetch as ReturnType<typeof vi.fn>).mockReturnValue(new Promise(() => {}));
  render(<App />);
  expect(screen.getByText(/loading monsters/i)).toBeInTheDocument();
});

test('renders monsters once the fetch resolves', async () => {
  (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockFetchResponse(monsters));
  render(<App />);
  await waitFor(() => expect(screen.getByText('Leanne Graham')).toBeInTheDocument());
  expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
});

test('filters monsters as the user types in the search box', async () => {
  (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockFetchResponse(monsters));
  const user = userEvent.setup();
  render(<App />);
  await waitFor(() => expect(screen.getByText('Leanne Graham')).toBeInTheDocument());

  await user.type(screen.getByPlaceholderText('search Monster'), 'ervin');

  expect(screen.queryByText('Leanne Graham')).not.toBeInTheDocument();
  expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
});

test('shows an empty-state message when no monster matches the search', async () => {
  (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockFetchResponse(monsters));
  const user = userEvent.setup();
  render(<App />);
  await waitFor(() => expect(screen.getByText('Leanne Graham')).toBeInTheDocument());

  await user.type(screen.getByPlaceholderText('search Monster'), 'zzz');

  expect(screen.getByText(/no monsters match your search/i)).toBeInTheDocument();
});

test('shows an error message when the fetch fails', async () => {
  (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockFetchFailure(500));
  render(<App />);
  await waitFor(() => expect(screen.getByText(/something went wrong/i)).toBeInTheDocument());
});
