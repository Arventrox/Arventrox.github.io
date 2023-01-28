import React, { FC, useState } from 'react';
import { Tplayers } from '../types/player.type';
import style from './PlayerSelect.module.scss';

interface Props {
  setPlayersNumber: React.Dispatch<React.SetStateAction<number>>;
  setPlayers: React.Dispatch<React.SetStateAction<Tplayers>>;
}

const SelectNumberOfPlayers: FC<Props> = ({ setPlayersNumber, setPlayers }) => {
  const [activeButton, setActiveButton] = useState(1);
  const options = [];

  for (let i = 1; i <= 5; i++) {
    options.push(
      <button
        key={i}
        value={i}
        className={i === activeButton ? style.button_clicked : ''}
        onClick={(e: React.FormEvent) => {
          setPlayersNumber(+(e.target as HTMLInputElement).value);
          setActiveButton(i);
          setPlayers([]);
        }}
      >
        {i}
      </button>,
    );
  }

  return (
    <div className={style.container}>
      <p>Select the number of players</p>
      <div>{options}</div>
    </div>
  );
};

export default SelectNumberOfPlayers;
