import { Card } from '../card/card.component';
import { Monster } from '../../models/monster';
import './card-list.styles.css';

export interface CardListProps {
  monsters: Monster[];
}

export const CardList = ({ monsters }: CardListProps) => {
  return (
    <div className='card-list'>
      {monsters.map(monster => (
        <Card key={monster.id} monster={monster} />
      ))}
    </div>
  );
};
