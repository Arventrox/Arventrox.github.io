import React, { type FC, useState, useEffect } from 'react';
import { type Tplayers } from '../../models/player';
import { getRandomChampionByRole } from './ChampionsRoles';

type Iprops = {
  playersNumber: string;
  onSetPlayers: React.Dispatch<React.SetStateAction<Tplayers>>;
};

const NameInput: FC<Iprops> = ({ playersNumber, onSetPlayers }) => {
  const [playerInputs, setPlayerInputs] = useState<string[]>([]);

  useEffect(() => {
    const inputsList = [];
    for (let i = 0; i < Number(playersNumber); i++) {
      inputsList.push('');
    }

    setPlayerInputs(inputsList);
  }, [playersNumber]);

  const playerNameHandler = (e: React.FormEvent, index: number) => {
    const { value } = e.target as HTMLInputElement;
    const newInputs = [...playerInputs];
    newInputs[index] = value;
    setPlayerInputs(newInputs);
  };

  const removeplayerNameHandler = (index: number, e: React.FormEvent) => {
    e.preventDefault();
    const newInputs = [...playerInputs];
    newInputs.splice(index, 1);

    setPlayerInputs(newInputs);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const playerList = [];
    let lane = ['TOP', 'JUNGLE', 'MID', 'BOTTOM', 'SUPPORT'];

    for (let i = 0; i < Number(playersNumber); i++) {
      if (playerInputs[i] === '') {
        const list = [...playerInputs];
        list[i] = 'Please Enter a Name';
        setPlayerInputs(list);
        return;
      }

      const playerRole: string = lane[Math.floor(Math.random() * lane.length)];

      const randomChampionByRole = getRandomChampionByRole(playerRole);

      lane = lane.filter((usedRole) => usedRole !== playerRole);

      playerList.push({
        playerName: playerInputs[i],
        playerRole,
        playerChampion: randomChampionByRole,
      });
    }

    onSetPlayers(playerList);
    setPlayerInputs([]);
  };

  return (
    <form onSubmit={submitHandler}>
      {playerInputs.map((singleInput, index) => (
        <div key={index}>
          <label htmlFor='playersName'>Enter Player {index + 1}: </label>
          <input
            type='text'
            id='playersName'
            value={singleInput}
            onChange={(e) => {
              playerNameHandler(e, index);
            }}
          />
          <span>
            <button
              onClick={(e) => {
                removeplayerNameHandler(index, e);
              }}
            >
              Remove Player
            </button>
          </span>
        </div>
      ))}

      {playerInputs.length !== 0 && <button>Submit Players</button>}
    </form>
  );
};

export default NameInput;
