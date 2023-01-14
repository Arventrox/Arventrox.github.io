import React, { useState } from 'react';
import type { Tplayers } from '../types/player.type';
import Player from './PlayerRender';
import style from './Normal.module.scss';
import PlayerForm from './PlayerForm';

const Normal = () => {
  const [players, setPlayers] = useState<Tplayers>([]);
  const [playersNumber, setPlayersNumber] = useState(1);

  return (
    <>
      {!players[0] && (
        <PlayerForm
          setPlayers={setPlayers}
          playersNumber={playersNumber}
          setPlayersNumber={setPlayersNumber}
        />
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
