import React, { FC } from 'react';
import { Tplayers } from '../models/player';
import style from './SelectNumberOfPlayers.module.scss';

type Tprops = {
  playersNumber: number;
  setPlayersNumber: React.Dispatch<React.SetStateAction<number>>;
  setPlayers: React.Dispatch<React.SetStateAction<Tplayers>>;
};

const SelectNumberOfPlayers: FC<Tprops> = ({ playersNumber, setPlayersNumber, setPlayers }) => {
  const options: number[] = [];

  for (let i = 1; i <= 5; i++) {
    options.push(i);
  }

  const chosenNumberPlayers = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setPlayersNumber(+event.target.value);
    setPlayers([]);
  };

  return (
    <>
      <span className={style.container}>
        <label>Chose a number of players</label>
        <select value={playersNumber} onChange={chosenNumberPlayers} id='numberOfPlayers'>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </span>
    </>
  );
};

export default SelectNumberOfPlayers;
