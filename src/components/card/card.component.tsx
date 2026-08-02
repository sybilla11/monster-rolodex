import { Monster } from '../../models/monster';

import './card.styles.css';

export interface CardProps {
  monster: Monster;
}

export const Card = ({ monster }: CardProps) => {
  return (
    <div className='card-container'>
      <img
        className='card-image'
        alt={monster.name}
        src={`https://robohash.org/${monster.id}?set=set2&size=180x180`}
      />
      <h2>{monster.name}</h2>
      <p>{monster.email}</p>
    </div>
  );
};
