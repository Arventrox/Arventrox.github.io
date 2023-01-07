import React, { useState } from 'react';
import SelectNumberOfPlayers from './SelectNumberOfPlayers';
import type { Tplayers } from '../types/player.type';
import Player from './Player';
import style from './Normal.module.scss';
import AddPlayersInfo from './AddPlayersInfo';

const Normal = () => {
  const [players, setPlayers] = useState<Tplayers>([]);
  const [playersNumber, setPlayersNumber] = useState(1);

  return (
    <>
      <SelectNumberOfPlayers
        playersNumber={playersNumber}
        setPlayersNumber={setPlayersNumber}
        setPlayers={setPlayers}
      />
      <AddPlayersInfo
        setPlayers={setPlayers}
        playersNumber={playersNumber}
        setPlayersNumber={setPlayersNumber}
      />
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
