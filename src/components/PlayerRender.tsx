import React, { FC, useState, useEffect } from 'react';
import style from './PlayerRender.module.scss';
import useGetChampion from '../hooks/useGetChampion';
import questionMarkImage from '../assets/images/question_mark.svg';
import { PlayerChampion } from '../store/context';

interface Props {
  playerName: string | string[];
  playerChampion: PlayerChampion;
  currentPlayerIndex: number;
}

const PlayerRender: FC<Props> = ({ playerChampion, playerName }) => {
  const [reroll, setReroll] = useState<PlayerChampion>();
  const [rerollCounter, setRerollCounter] = useState(2);
  const [renderedImage, setRenderedImage] = useState(questionMarkImage);

  const { role, champion } = playerChampion;
  const { championImage_url, championName } = champion;
  const { roleImg, roleName } = role;

  const championText = reroll?.champion.championName ? reroll.champion.championName : championName;
  const championImage = !reroll?.champion.championImage_url
    ? championImage_url
    : reroll.champion.championImage_url;

  const rerollButtonStyle = rerollCounter
    ? style.reroll_button__active
    : style.reroll_button__disabled;

  useEffect(() => {
    setRenderedImage(championImage);
  }, [championImage]);

  const rerollHandler = () => {
    if (rerollCounter === 0) {
      return;
    }
    const randomChampion = useGetChampion(roleName);

    setRerollCounter((counter) => counter - 1);
    setReroll(randomChampion);
  };

  return (
    <div className={style.container}>
      <div className={style.img_container}>
        <img src={renderedImage} alt='champion image' loading='lazy' />
      </div>
      <p>Name: {playerName}</p>
      <span className={style.role_container}>
        <img src={roleImg}></img>
        <p>Role: {roleName}</p>
      </span>
      <p>Champion: {championText}</p>
      <button className={rerollButtonStyle} onClick={rerollHandler}>
        <span className={style.hover_text}>You have {rerollCounter} rerolls left </span>
      </button>
    </div>
  );
};

export default PlayerRender;
