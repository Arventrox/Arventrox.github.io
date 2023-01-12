import React, { type FC, useState, useEffect } from 'react';
import { type Tplayers } from '../types/player.type';
import { getRandomChampionByRole } from '../data/ChampionsRoles';
import style from './AddPlayersInfo.module.scss';
import FooterButton from './ui/button/FooterButton';
import questionMark from '../assets/images/questionmark.png';

type Iprops = {
  playersNumber: number;
  setPlayers: React.Dispatch<React.SetStateAction<Tplayers>>;
  setPlayersNumber: React.Dispatch<React.SetStateAction<number>>;
};

const NameInput: FC<Iprops> = ({ playersNumber, setPlayers, setPlayersNumber }) => {
  const [playerInputs, setPlayerInputs] = useState<string[]>([]);

  useEffect(() => {
    const inputsList: string[] = [];

    for (let i = 0; i < playersNumber; i++) {
      inputsList.push(`Summoner ${i + 1}`);
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
    }

    setPlayers(playerList);
    setPlayerInputs([]);
  };

  return (
    <form>
      <div className={style.form_container}>
        {playerInputs.map((singleInput, index) => (
          <div className={style.form_input__container} key={index}>
            <img src={questionMark} alt='none' />
            <input
              type='text'
              id='playersName'
              value={singleInput}
              onChange={(e) => {
                playerNameHandler(e, index);
              }}
            />
            <p>Role: ???</p>
            <span className={style.championBox}>
              <p>Champion: ???</p>
            </span>
            <button
              className={style.remove__btn}
              onClick={(e) => {
                removeplayerNameHandler(index, e);
              }}
            >
              <span className={style.hover_text}>Remove this player</span>
            </button>
          </div>
        ))}
      </div>
      <div className={style.footerBtn_container}>
        {playerInputs.length !== 0 && <FooterButton onClick={submitHandler}>Submit</FooterButton>}
      </div>
    </form>
  );
};

export default NameInput;
