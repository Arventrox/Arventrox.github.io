import React, { FC, useState } from 'react';
import { getRandomChampionByRole } from './ChampionsRoles';
import style from './Player.module.css';

type Tplayer = {
  playerName: string | string[];
  playerChampion: string;
  playerRole: string | string[];
};

const Player: FC<Tplayer> = ({ playerChampion, playerName, playerRole }) => {
  const [reroll, setReroll] = useState<string>();

  const rerollHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const randomChampionByRole = getRandomChampionByRole(playerRole);
    setReroll(randomChampionByRole);
  };

  return (
    <div className={style.container}>
      <p>Name: {playerName}</p>
      <p>Role: {playerRole}</p>
      <span className={style.championBox}>
        <p>Champion: {reroll ? reroll : playerChampion}</p>
        <button onClick={rerollHandler}>Reroll</button>
      </span>
      <img
        src='https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg'
        alt='none'
      />
    </div>
  );
};

export default Player;
