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

  const filteredMonsters = monsters.filter(monster =>
    monster.name.toLowerCase().includes(searchField.toLowerCase())
  );

  return (
    <div>
      <h1>Monster Rolodex</h1>
      <Searchbox placeholder='search Monster' changeHandle={changeHandler} />
      {isLoading && <p>Loading monsters...</p>}
      {error && <p>Something went wrong: {error}</p>}
      {!isLoading && !error && <CardList monsters={filteredMonsters} />}
    </div>
  );
}

export default App;
