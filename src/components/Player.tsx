import React, { FC, useState, FormEvent } from 'react';
import { getRandomChampionByRole } from '../data/ChampionsRoles';
import style from './Player.module.scss';

type Tplayer = {
  playerName: string | string[];
  playerChampion: string;
  playerRole: string | string[];
};

const Player: FC<Tplayer> = ({ playerChampion, playerName, playerRole }) => {
  const [reroll, setReroll] = useState<string>();

  const rerollHandler = (event: FormEvent) => {
    event.preventDefault();
    const randomChampionByRole = getRandomChampionByRole(playerRole);
    setReroll(randomChampionByRole);
  };

  return (
    <div className={style.container}>
      <img
        src='https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg'
        alt='none'
      />
      <p>Name: {playerName}</p>
      <p>Role: {playerRole}</p>
      <span className={style.championBox}>
        <p>Champion: {reroll ? reroll : playerChampion}</p>
      </span>
      <button className={style.reroll__button} onClick={rerollHandler} />
    </div>
  );
};

export default Player;
