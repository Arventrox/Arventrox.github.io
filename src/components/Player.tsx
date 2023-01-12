import React, { FC, useState, FormEvent, useEffect } from 'react';
import { getRandomChampionByRole } from '../data/ChampionsRoles';
import style from './Player.module.scss';
import LoadingSpinner from './ui/LoadingSpinner/LoadingSpinner';

type Tplayer = {
  playerName: string | string[];
  playerChampion: string;
  playerRole: string | string[];
};

const Player: FC<Tplayer> = ({ playerChampion, playerName, playerRole }) => {
  const [reroll, setReroll] = useState<string>();
  const [rerollCounter, setRerollCounter] = useState(2);
  const [isLoadingRole, setIsLoadingRole] = useState(true);
  const [isLoadingChampion, setIsLoadingChampion] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingRole(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!isLoadingRole) {
      setTimeout(() => {
        setIsLoadingChampion(false);
      }, 1000);
    }
  }, [isLoadingRole]);

  const rerollHandler = (event: FormEvent) => {
    event.preventDefault();
    const randomChampionByRole = getRandomChampionByRole(playerRole);

    if (rerollCounter === 0) {
      return;
    }

    setRerollCounter(rerollCounter - 1);
    setReroll(randomChampionByRole);
  };

  return (
    <div className={style.container}>
      <img
        src='https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg'
        alt='none'
      />
      <p>Name: {playerName}</p>
      {isLoadingRole ? <LoadingSpinner /> : <p>Role: {playerRole}</p>}
      {isLoadingChampion ? <LoadingSpinner /> : <p>Champion: {reroll ? reroll : playerChampion}</p>}
      {!isLoadingChampion && (
        <button className={style.reroll__button} onClick={rerollHandler}>
          <span className={style.hover_text}>You have {rerollCounter} rerrols left </span>
        </button>
      )}
    </div>
  );
};

export default Player;
