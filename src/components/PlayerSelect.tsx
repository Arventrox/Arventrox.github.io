import React, { FC, useState } from 'react';
import style from './PlayerSelect.module.scss';

interface Props {
  setPlayersNumber: React.Dispatch<React.SetStateAction<number>>;
  playerInputs: string[];
}

const SelectNumberOfPlayers: FC<Props> = ({ setPlayersNumber, playerInputs }) => {
  const [activeButton, setActiveButton] = useState(playerInputs.length);
  const options = [];

  if (activeButton !== playerInputs.length) {
    setActiveButton(playerInputs.length);
  }

  const handleNumbersButton = (e: React.FormEvent, i: number) => {
    setPlayersNumber(+(e.target as HTMLInputElement).value);
    setActiveButton(i);
  };

  for (let i = 1; i <= 5; i++) {
    options.push(
      <button
        key={i}
        value={i}
        className={i === activeButton ? style.button_clicked : ''}
        onClick={(e) => handleNumbersButton(e, i)}
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
