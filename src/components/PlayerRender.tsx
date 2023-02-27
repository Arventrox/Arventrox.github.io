import React, { FC, useState, useEffect, useContext } from 'react';
import { Context } from '../store/context';
import { Champion, PlayerChampion } from '../store/context';
import useGetChampion from '../hooks/useGetChampion';
import useWindowDimensions from '../hooks/useWindowDimensions';
import ChampionName from './ui/Player/ChampionName';
import ChampionImage from './ui/Player/ChampionImage';
import PlayerRole from './ui/Player/PlayerRole';
import style from './PlayerRender.module.scss';
import questionMarkImage from '../assets/images/question_mark.svg';

interface Props {
  playerName: string | string[];
  playerChampion: PlayerChampion;
  currentPlayerIndex: number;
  index: number;
}

const PlayerRender: FC<Props> = ({ playerChampion, playerName, currentPlayerIndex, index }) => {
  const [rerollChampion, setRerollChampion] = useState<Champion | undefined>(undefined);
  const [rerollCounter, setRerollCounter] = useState(2);
  const [isChampion, setIsChampion] = useState(false);
  const [isRole, setIsRole] = useState(false);
  const { setCurrentPlayersName, buttonClickCounter, setPlayers, players } = useContext(Context);
  const { width } = useWindowDimensions();
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
    if (rerollCounter === 0) {
      return;
    }
    const randomChampion = useGetChampion(roleName);
    const playerList = players;
    playerList[index].playerChampion = randomChampion;
    setPlayers(playerList);
    setRerollCounter((counter) => counter - 1);
    setRerollChampion(randomChampion?.champion);
  };

  return (
    <div className={style.container}>
      <div className={style.img_container}>
        {isChampion ? (
          <ChampionImage
            reroll={rerollChampion}
            championImage_url={championImage_url}
            role={roleName}
          />
        ) : (
          <img src={questionMarkImage} alt='champion image' loading='lazy' />
        )}
      </div>
      <span className={style.name_container}>
        <p>
          {width > 400 ? 'Name: ' : ''}
          {playerName}
        </p>
      </span>
      <span className={style.role_container}>
        {isRole && <PlayerRole roleImg={roleImg} roleName={roleName} />}
      </span>
      {isChampion && (
        <ChampionName reroll={rerollChampion} championName={championName} role={roleName} />
      )}

      {isChampion && (
        <button className={rerollButtonStyle} onClick={rerollHandler}>
          <span className={style.hover_text}>You have {rerollCounter} rerolls left </span>
        </button>
      )}
    </div>
  );
};

export default PlayerRender;
