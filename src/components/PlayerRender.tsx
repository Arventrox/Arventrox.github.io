import React, { FC, Dispatch, SetStateAction, useState, FormEvent, useEffect } from 'react';
import style from './PlayerRender.module.scss';
import { getRandomChampionByRole } from './Role';
import { Champions } from './Champion';
import questionMarkImage from '../assets/images/question_mark.svg';
import { NORMAL } from './LeagueRandomized';

interface Props {
  playerName: string | string[];
  playerRole: string;
  playerChampion: { role: { championName: string; championImage_url: string }; roleImg: string };
  setCurrentPlayerIndex: Dispatch<SetStateAction<number>>;
  currentPlayerIndex: number;
  chosen: string;
}

const PlayerRender: FC<Props> = ({
  playerChampion,
  playerName,
  playerRole,
  setCurrentPlayerIndex,
  currentPlayerIndex,
  chosen,
}) => {
  const [reroll, setReroll] = useState({
    role: {
      championName: '',
      championImage_url: '',
    },
    roleImg: '',
  });
  const [rerollCounter, setRerollCounter] = useState(2);
  const [isRoleButtonClicked, setIsRoleButtonClicked] = useState(false);
  const [isChampionButtonClicked, setIsChampionButtonClicked] = useState(false);
  const [renderedImage, setRenderedImage] = useState(questionMarkImage);
  const [roleLoader, setRoleLoader] = useState({ name: '', image: '' });
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const { role, roleImg } = playerChampion;
  const { championImage_url, championName } = role;

  const championImage = !reroll.role.championImage_url
    ? championImage_url
    : reroll.role.championImage_url;

  const renderedImageClass = isChampionButtonClicked ? style.champion_image : '';

  const { topChampion, jungleChampion, midChampion, bottomChampion, supportChampion } = Champions();
  const topRoleLoader = { name: 'TOP', image: topChampion.roleImg };
  const jungleRoleLoader = { name: 'JUNGLE', image: jungleChampion.roleImg };
  const middleRoleLoader = { name: 'MIDDLE', image: midChampion.roleImg };
  const bottomRoleLoader = { name: 'BOTTOM', image: bottomChampion.roleImg };
  const supportRoleLoader = { name: 'SUPPORT', image: supportChampion.roleImg };
  const roles = [jungleRoleLoader, middleRoleLoader, bottomRoleLoader, supportRoleLoader];

  useEffect(() => {
    if (intervalId === null) {
      return;
    }
    return () => clearInterval(intervalId);
  }, [intervalId]);

  useEffect(() => {
    if (isChampionButtonClicked) {
      setRenderedImage(championImage);
    }
  }, [isChampionButtonClicked, championImage]);

  const roleButtonHandler = () => {
    setIsRoleButtonClicked(true);
    setRoleLoader(topRoleLoader);

    const id = setInterval(() => {
      const randomLane = roles[Math.floor(Math.random() * roles.length)];
      const randomLaneIndex = roles.indexOf(randomLane);
      setRoleLoader(randomLane);
      if (randomLaneIndex !== -1) {
        roles.splice(randomLaneIndex, 1);
      }
    }, 500);

    setIntervalId(id);

    setTimeout(() => {
      clearInterval(id);
      setIntervalId(null);
    }, 2000);
  };

  const championButtonHandler = () => {
    setIsChampionButtonClicked(true);
    setCurrentPlayerIndex(currentPlayerIndex + 1);
  };

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
          src={renderedImage}
          className={renderedImageClass}
          alt='champion image'
          loading='lazy'
        />
      </div>
      <p>Name: {playerName}</p>

      {!isRoleButtonClicked ? (
        <button onClick={roleButtonHandler}>Roll Role</button>
      ) : !intervalId ? (
        chosen === NORMAL && (
          <span className={style.role_container}>
            <img src={roleImg}></img>
            <p>Role: {playerRole}</p>
          </span>
        )
      ) : (
        chosen === NORMAL && (
          <span className={style.role_container}>
            <img src={roleLoader.image}></img>
            <p> {roleLoader.name}</p>
          </span>
        )
      )}

      {isRoleButtonClicked && !isChampionButtonClicked ? (
        <button onClick={championButtonHandler}>Roll champion</button>
      ) : (
        ''
      )}

      {isChampionButtonClicked ? (
        <p>Champion: {reroll.role.championName ? reroll.role.championName : championName}</p>
      ) : (
        ''
      )}

      {isChampionButtonClicked && (
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

export default PlayerRender;
