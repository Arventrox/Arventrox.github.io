import React, { FC, useState, FormEvent, useEffect } from 'react';
import style from './PlayerRender.module.scss';
import { getRandomChampionByRole } from './Role';
import LoadingSpinner from './ui/LoadingSpinner/LoadingSpinner';

import top from '../assets/images/position-top.svg';
import jungle from '../assets/images/position-jungle.svg';
import middle from '../assets/images/position-middle.svg';
import bottom from '../assets/images/position-bottom.svg';
import support from '../assets/images/position-utility.svg';

interface Props {
  playerName: string | string[];
  playerRole: string;
  playerChampion: { championName: string; championImage_url: string };
}

const Player: FC<Props> = ({ playerChampion, playerName, playerRole }) => {
  const [reroll, setReroll] = useState({ championName: '', championImage_url: '' });
  const [rerollCounter, setRerollCounter] = useState(2);
  const [isLoadingRole, setIsLoadingRole] = useState(true);
  const [isLoadingChampion, setIsLoadingChampion] = useState(true);

  const { championName, championImage_url } = playerChampion;
  let roleImg;

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingRole(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (!isLoadingRole) {
      setTimeout(() => {
        setIsLoadingChampion(false);
      }, 500);
    }
  }, [isLoadingRole]);

  switch (playerRole) {
    case 'TOP':
      roleImg = top;
      break;
    case 'JUNGLE':
      roleImg = jungle;
      break;
    case 'MID':
      roleImg = middle;
      break;
    case 'BOTTOM':
      roleImg = bottom;
      break;
    case 'SUPPORT':
      roleImg = support;
      break;
    default:
      roleImg = support;
      break;
  }

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
      <div className={style.img_container}>
        <img
          className={!isLoadingChampion ? style.loaded : ''}
          src={reroll.championImage_url ? reroll.championImage_url : championImage_url}
          alt='champion image'
          loading='lazy'
        />
      </div>
      <p>Name: {playerName}</p>
      {isLoadingRole ? (
        <LoadingSpinner />
      ) : (
        <span className={style.role_container}>
          <img src={roleImg}></img>
          <p>Role: {playerRole}</p>
        </span>
      )}
      {isLoadingChampion ? (
        <LoadingSpinner />
      ) : (
        <p>Champion: {reroll.championName ? reroll.championName : championName}</p>
      )}
      {!isLoadingChampion && (
        <button
          className={rerollCounter ? style.reroll_button__active : style.reroll_button__disabled}
          onClick={rerollHandler}
        >
          <span className={style.hover_text}>You have {rerollCounter} rerolls left </span>
        </button>
      )}
    </div>
  );
};

export default Player;
