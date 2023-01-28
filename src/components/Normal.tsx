import React, { FC, useState, useEffect } from 'react';
import Player from './PlayerRender';
import style from './Normal.module.scss';
import PlayerForm from './PlayerForm';
import { Tplayers } from '../types/player.type';
import BackdropOutro from './ui/Backdrop/BackdropOutro';

interface Props {
  playerInputs: string[];
  setPlayerInputs: React.Dispatch<React.SetStateAction<string[]>>;
}

const Normal: FC<Props> = ({ playerInputs, setPlayerInputs }) => {
  const [playersNumber, setPlayersNumber] = useState(playerInputs.length);
  const [players, setPlayers] = useState<Tplayers>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, []);

  return (
    <>
      {isLoading ? (
        <BackdropOutro />
      ) : (
        !players[0] && (
          <PlayerForm
            setPlayers={setPlayers}
            playersNumber={playersNumber}
            setPlayersNumber={setPlayersNumber}
            playerInputs={playerInputs}
            setPlayerInputs={setPlayerInputs}
          />
        )
      )}

      <div className={style.players}>
        {players.map((_, index) => (
          <Player
            key={index}
            playerName={players[index].playerName}
            playerRole={players[index].playerRole}
            playerChampion={players[index].playerChampion}
          />
        ))}
      </div>
    </>
  );
};

export default Normal;
