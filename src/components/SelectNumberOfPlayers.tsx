import React, { FC } from 'react';

type Tprops = {
  playersNumber: string;
  setPlayersNumber: React.Dispatch<React.SetStateAction<string>>;
};

const SelectNumberOfPlayers: FC<Tprops> = ({ playersNumber, setPlayersNumber }) => {
  const options: number[] = [];

  for (let i = 1; i <= 5; i++) {
    options.push(i);
  }

  const chosenNumberPlayers = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setPlayersNumber(event.target.value);
  };

  return (
    <>
      <span>
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
