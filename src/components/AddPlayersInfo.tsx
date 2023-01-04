import React, { type FC, useState, useEffect } from 'react';
import { type Tplayers } from '../models/player';
import { getRandomChampionByRole } from './ChampionsRoles';
import style from './AddPlayersInfo.module.scss';

type Iprops = {
  playersNumber: number;
  onSetPlayers: React.Dispatch<React.SetStateAction<Tplayers>>;
  setPlayersNumber: React.Dispatch<React.SetStateAction<number>>;
};

const NameInput: FC<Iprops> = ({ playersNumber, onSetPlayers, setPlayersNumber }) => {
  const [playerInputs, setPlayerInputs] = useState<string[]>([]);

  useEffect(() => {
    const inputsList: string[] = [];
    for (let i = 0; i < playersNumber; i++) {
      inputsList.push(`Summoner ${i + 1}`);
    }
    console.log(inputsList);
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
    setPlayersNumber(playersNumber - 1);
    setPlayerInputs(newInputs);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const playerList = [];
    let lane = ['TOP', 'JUNGLE', 'MID', 'BOTTOM', 'SUPPORT'];

    for (let i = 0; i < playersNumber; i++) {
      const playerRole: string = lane[Math.floor(Math.random() * lane.length)];
      const randomChampionByRole = getRandomChampionByRole(playerRole);
      lane = lane.filter((usedRole) => usedRole !== playerRole);

      playerList.push({
        playerName: playerInputs[i],
        playerRole,
        playerChampion: randomChampionByRole,
      });
      console.log(playerList);
    }

    onSetPlayers(playerList);
    setPlayerInputs([]);
  };

  return (
    <form onSubmit={submitHandler}>
      {playerInputs.map((singleInput, index) => (
        <div className={style.container} key={index}>
          <img
            src='https://toppng.com/uploads/preview/3d-question-mark-png-115522430369o8mqpftoj.png'
            alt='none'
          />
          <input
            type='text'
            id='playersName'
            value={singleInput}
            onChange={(e) => {
              playerNameHandler(e, index);
            }}
          />
          <span></span>
          <p>Role: ???</p>
          <span className={style.championBox}>
            <p>Champion: ???</p>
          </span>
          <button
            className={style.remove__btn}
            onClick={(e) => {
              removeplayerNameHandler(index, e);
            }}
          />
        </div>
      ))}

      {playerInputs.length !== 0 && <button className={style.submit__btn}>Submit </button>}
    </form>
  );
};

export default NameInput;
