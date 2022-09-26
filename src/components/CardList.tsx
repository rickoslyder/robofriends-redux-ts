import * as React from 'react';
import { IRobot } from '../containers/App';
import Card from './Card';

interface ICardListProps {
  robots: Array<IRobot>
}

const CardList = ({ robots }: ICardListProps): JSX.Element => {
  return (
    <div>
      {
        robots.map((user: IRobot, i: number) => {
          return (
            <Card
              key={i}
              id={robots[i].id}
              name={robots[i].name}
              email={robots[i].email}
              />
          );
        })
      }
    </div>
  );
}

export default CardList;