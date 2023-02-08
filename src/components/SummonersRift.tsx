import React, { FC, useState, useEffect } from 'react';
import PlayerRender from './PlayerRender';
import style from './SummonersRift.module.scss';
import PlayerForm from './PlayerForm';
import { Tplayers } from '../types/player.type';
import BackdropOutro from './ui/Backdrop/BackdropOutro';

interface Props {
  playerInputs: string[];
  setPlayerInputs: React.Dispatch<React.SetStateAction<string[]>>;
  chosen: string;
}

const SummonersRift: FC<Props> = ({ playerInputs, setPlayerInputs, chosen }) => {
  const [playersNumber, setPlayersNumber] = useState(playerInputs.length);
  const [players, setPlayers] = useState<Tplayers>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(1);

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
        {players.map(
          (_, index) =>
            currentPlayerIndex > index && (
              <PlayerRender
                key={index}
                playerName={players[index].playerName}
                playerRole={players[index].playerRole}
                playerChampion={players[index].playerChampion}
                setCurrentPlayerIndex={setCurrentPlayerIndex}
                currentPlayerIndex={currentPlayerIndex}
                chosen={chosen}
              />
            ),
        )}
      </div>
    </>
  );
};

export default SummonersRift;
