import React, { FC, useState, useEffect, useContext } from 'react';
import PlayerRender from './PlayerRender';
import style from './SummonersRift.module.scss';
import PlayerForm from './PlayerForm';
import BackdropOutro from './ui/Backdrop/BackdropOutro';
import { Context } from '../store/context';
import video from '../assets/videos/invited-banner.webm';
import useWindowDimensions from '../hooks/useWindowDimensions';

const SummonersRift: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { width } = useWindowDimensions();
  const { playersNumber, setPlayersNumber, players, currentPlayerIndex, buttonClickCounter } =
    useContext(Context);

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
                index={index}
              />
            ),
        )}
        {currentPlayerIndex < players.length && buttonClickCounter === 4 && width > 900 && (
          <video src={video} autoPlay loop muted></video>
        )}
      </div>
    </>
  );
};

export default SummonersRift;
