import React from 'react';
import './App.css';
import { CardList } from './components/card-list/card-list.component';
import { Searchbox } from './components/search-box/search-box.component';
import { Monster } from './models/monster';

const MONSTERS_API_URL = 'https://jsonplaceholder.typicode.com/users';

function App() {
  const [monsters, setMonsters] = React.useState<Monster[]>([]);
  const [searchField, setSearchField] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetch(MONSTERS_API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((users: Monster[]) => setMonsters(users))
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(e.target.value);
  };

  const filteredMonsters = React.useMemo(
    () =>
      monsters.filter(monster =>
        monster.name.toLowerCase().includes(searchField.toLowerCase())
      ),
    [monsters, searchField]
  );

  return (
    <main>
      <h1>Monster Rolodex</h1>
      <Searchbox placeholder='search Monster' changeHandle={changeHandler} />
      {isLoading && <p className='status-message'>Loading monsters...</p>}
      {error && (
        <p className='status-message status-message--error'>
          Something went wrong: {error}
        </p>
      )}
      {!isLoading && !error && filteredMonsters.length === 0 && (
        <p className='status-message'>No monsters match your search.</p>
      )}
      {!isLoading && !error && filteredMonsters.length > 0 && (
        <CardList monsters={filteredMonsters} />
      )}
    </main>
  );
}

export default App;
