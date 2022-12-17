import React, { useState } from 'react';
import SelectNumberOfPlayers from './SelectNumberOfPlayers';
import { type Tplayers } from '../../models/player';
import Player from './Player';
import style from './Normal.module.css';

const Normal = () => {
  const [players, setPlayers] = useState<Tplayers>([]);

  return (
    <>
      <SelectNumberOfPlayers onSetPlayers={setPlayers} />
      {/* AddPlayersInfo */}
      {/* this should be a component */}
      <div className={style.players}>
        {players.map((singleInput, index) => (
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
