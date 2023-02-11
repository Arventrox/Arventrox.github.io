import React, { FC, useState, FormEvent, useEffect, useContext } from 'react';
import style from './PlayerRender.module.scss';
import { getRandomChampionByRole } from './Role';
import questionMarkImage from '../assets/images/question_mark.svg';
import { BtnContext } from '../store/context';
import { PlayerChampion } from '../store/context';

interface Props {
  playerName: string | string[];
  playerChampion: PlayerChampion;
  currentPlayerIndex: number;
  key: number;
}

const PlayerRender: FC<Props> = ({ playerChampion, playerName, currentPlayerIndex, key }) => {
  const [reroll, setReroll] = useState<PlayerChampion>();
  const [rerollCounter, setRerollCounter] = useState(2);
  const [renderedImage, setRenderedImage] = useState(questionMarkImage);
  const { roleLoader, intervalId, championLoader } = useContext(BtnContext);

  const { role, champion } = playerChampion;
  const { championImage_url, championName } = champion;
  const { roleImg, roleName } = role;

  const championImage = !reroll?.champion.championImage_url
    ? championImage_url
    : reroll.champion.championImage_url;

  const renderedImageClass = style.champion_image;

  // useEffect(() => {
  //   if (intervalId === null) {
  //     return;
  //   }
  //   return () => clearInterval(intervalId);
  // }, [intervalId]);

  useEffect(() => {
    setRenderedImage(championImage);
  }, [championImage]);

  const rerollHandler = (event: FormEvent) => {
    event.preventDefault();
    const randomChampionByRole = getRandomChampionByRole(playerChampion.role.roleName);

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
          src={renderedImage}
          className={renderedImageClass}
          alt='champion image'
          loading='lazy'
        />
      </div>
      <p>Name: {playerName}</p>

      {!intervalId ? (
        <span className={style.role_container}>
          <img src={roleImg}></img>
          <p>Role: {roleName}</p>
        </span>
      ) : (
        <span className={style.role_container}>
          <img src={roleLoader.roleImg}></img>
          <p> Role: {roleLoader.roleName}</p>
        </span>
      )}
      {!intervalId ? (
        <p>
          Champion: {reroll?.champion.championName ? reroll.champion.championName : championName}
        </p>
      ) : (
        <p>Champion: {championLoader.championName}</p>
      )}

      <button
        className={rerollCounter ? style.reroll_button__active : style.reroll_button__disabled}
        onClick={rerollHandler}
      >
        <span className={style.hover_text}>You have {rerollCounter} rerolls left </span>
      </button>
    </div>
  );
};

export default PlayerRender;
