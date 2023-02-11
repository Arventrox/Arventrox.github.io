import React, { FC, useState, useEffect, useContext } from 'react';
import PlayerRender from './PlayerRender';
import style from './SummonersRift.module.scss';
import PlayerForm from './PlayerForm';
import BackdropOutro from './ui/Backdrop/BackdropOutro';
import { BtnContext } from '../store/context';

const SummonersRift: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { playersNumber, setPlayersNumber, players, currentPlayerIndex } = useContext(BtnContext);

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
          <PlayerForm playersNumber={playersNumber} setPlayersNumber={setPlayersNumber} />
        )
      )}

      <div className={style.players}>
        {players.map(
          (_, index) =>
            currentPlayerIndex > index && (
              <PlayerRender
                key={index}
                playerName={players[index].playerName}
                playerChampion={players[index].playerChampion}
                currentPlayerIndex={currentPlayerIndex}
              />
            ),
        )}
      </div>
    </>
  );
};

export default SummonersRift;
