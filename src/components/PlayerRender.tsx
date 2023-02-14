import React, { FC, useState, useEffect, useContext } from 'react';
import style from './PlayerRender.module.scss';
import useGetChampion from '../hooks/useGetChampion';
import questionMarkImage from '../assets/images/question_mark.svg';
import { PlayerChampion } from '../store/context';
import useChampionDisplay, { Champion } from '../hooks/useChampionDisplay';
import { BtnContext } from '../store/context';

interface Props {
  playerName: string | string[];
  playerChampion: PlayerChampion;
  currentPlayerIndex: number;
  index: number;
}

const PlayerRender: FC<Props> = ({ playerChampion, playerName, currentPlayerIndex, index }) => {
  const [reroll, setReroll] = useState<PlayerChampion>();
  const [rerollCounter, setRerollCounter] = useState(2);
  const [renderedImage, setRenderedImage] = useState(questionMarkImage);
  const { buttonClickCounter } = useContext(BtnContext);
  const [a, seta] = useState<Champion | null>(null);
  const [startInterval, setStartInterval] = useState(false);

  const { role, champion } = playerChampion;
  const { championImage_url, championName } = champion;
  const { roleImg, roleName } = role;

  const rerollChampionName = reroll?.champion.championName;
  const rerollChampionImage = reroll?.champion.championImage_url;
  const championText = !rerollChampionName ? championName : rerollChampionName;
  const championImage = !rerollChampionImage ? championImage_url : rerollChampionImage;

  const rerollButtonStyle = rerollCounter
    ? style.reroll_button__active
    : style.reroll_button__disabled;
  useEffect(() => {
    setRenderedImage(championImage);
  }, [championImage]);

  const randomChampion = useChampionDisplay(roleName, startInterval);
  console.log(randomChampion);
  console.log(startInterval);

  if (buttonClickCounter === 3) {
    setStartInterval(true);
  }

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

      {<p>Champion:{a ? a.championName : championText}</p>}

      <button className={rerollButtonStyle} onClick={rerollHandler}>
        <span className={style.hover_text}>You have {rerollCounter} rerolls left </span>
      </button>
    </div>
  );
};

export default PlayerRender;
