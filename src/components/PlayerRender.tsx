import React, { FC, useState, FormEvent, useEffect } from 'react';
import { getRandomChampionByRole } from './Role';
import style from './PlayerRender.module.scss';
import LoadingSpinner from './ui/LoadingSpinner/LoadingSpinner';

type Tplayer = {
  playerName: string | string[];
  playerRole: string;
  playerChampion: { championName: string; championImage_url: string };
};

const Player: FC<Tplayer> = ({ playerChampion, playerName, playerRole }) => {
  const [reroll, setReroll] = useState({ championName: '', championImage_url: '' });
  const [rerollCounter, setRerollCounter] = useState(2);
  const [isLoadingRole, setIsLoadingRole] = useState(true);
  const [isLoadingChampion, setIsLoadingChampion] = useState(true);
  const { championName, championImage_url } = playerChampion;

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

  // const imgss = !isLoadingChampion ? style.loaded : '';
  return (
    <div className={style.container}>
      <div className={style.img_container}>
        <img
          className={!isLoadingChampion ? style.loaded : ''}
          src={reroll.championImage_url ? reroll.championImage_url : championImage_url}
          alt='champion image'
          loading='lazy'
        />
      </div>
      <p>Name: {playerName}</p>
      {isLoadingRole ? <LoadingSpinner /> : <p>Role: {playerRole}</p>}
      {isLoadingChampion ? (
        <LoadingSpinner />
      ) : (
        <p>Champion: {reroll.championName ? reroll.championName : championName}</p>
      )}
      {!isLoadingChampion && (
        <button className={style.reroll__button} onClick={rerollHandler}>
          <span className={style.hover_text}>You have {rerollCounter} rerrols left </span>
        </button>
      )}
    </div>
  );
};

export default Player;
