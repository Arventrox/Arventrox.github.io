import React, { FC, useState, useEffect, useContext } from 'react';
import style from './PlayerRender.module.scss';
import useGetChampion from '../hooks/useGetChampion';
import { Champion, PlayerChampion } from '../store/context';
import { BtnContext } from '../store/context';
import ChampionName from './ui/Player/ChampionName';
import ChampionImage from './ui/Player/ChampionImage';
import questionMarkImage from '../assets/images/question_mark.svg';
import PlayerRole from './ui/Player/PlayerRole';

interface Props {
  playerName: string | string[];
  playerChampion: PlayerChampion;
  currentPlayerIndex: number;
  index: number;
}

const PlayerRender: FC<Props> = ({ playerChampion, playerName, currentPlayerIndex, index }) => {
  const [reroll, setReroll] = useState<Champion | undefined>(undefined);
  const [rerollCounter, setRerollCounter] = useState(2);
  const [isChampion, setIsChampion] = useState(false);
  const [isRole, setIsRole] = useState(false);
  const { setCurrentPlayersName, buttonClickCounter } = useContext(BtnContext);

  const { role, champion } = playerChampion;
  const { championImage_url, championName } = champion;
  const { roleImg, roleName } = role;

  const rerollButtonStyle = rerollCounter
    ? style.reroll_button__active
    : style.reroll_button__disabled;

  useEffect(() => {
    if (buttonClickCounter === 3 && currentPlayerIndex - 1 === index) {
      setIsRole(true);
    }
    if (buttonClickCounter === 4 && currentPlayerIndex - 1 === index) {
      setIsChampion(true);
    }
  }, [buttonClickCounter, currentPlayerIndex, index]);

  useEffect(() => {
    setCurrentPlayersName(playerName);
  }, [playerName, index]);

  const rerollHandler = () => {
    const randomChampion = useGetChampion('TOP');

    if (rerollCounter === 0) {
      return;
    }
    if (champion.championName !== randomChampion?.champion.championName) {
      setRerollCounter((counter) => counter - 1);
      setReroll(randomChampion?.champion);
    }
    console.log(reroll);
  };

  return (
    <div className={style.container}>
      <div className={style.img_container}>
        {isChampion ? (
          <ChampionImage reroll={reroll} championImage_url={championImage_url} role={roleName} />
        ) : (
          <img src={questionMarkImage} alt='champion image' loading='lazy' />
        )}
      </div>
      <p>Name: {playerName}</p>
      <span className={style.role_container}>
        {isRole && <PlayerRole roleImg={roleImg} roleName={roleName} />}
      </span>
      {isChampion && <ChampionName reroll={reroll} championName={championName} role={roleName} />}

      <button className={rerollButtonStyle} onClick={rerollHandler}>
        <span className={style.hover_text}>You have {rerollCounter} rerolls left </span>
      </button>
    </div>
  );
};

export default PlayerRender;
