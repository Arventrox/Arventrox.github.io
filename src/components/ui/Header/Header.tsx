import React, { FC, useContext, useState } from 'react';
import { Context } from '../../../store/context';
import style from './Header.module.scss';
// import lolIcon from '../../../assets/images/lol_icon.png';
import lolIconVideoDefault from '../../../assets/videos/league-logo-loop-idle.webm';
import lolIconIntroVideo from '../../../assets/videos/league-logo-intro.webm';
import playButton from '../../../assets/videos/play-button-enabled-intro.webm';
import playButtonHover from '../../../assets/videos/play-button-hover-loop.webm';
import playButtonDisabled from '../../../assets/images/play-button-disabled.png';

const Header: FC = () => {
  const [lolIconVideo, setLoLIconVideo] = useState(lolIconIntroVideo);
  const [isHomeButtonHovered, setIsHomeButtonHovered] = useState(false);
  const [isLoop, setIsLoop] = useState(false);

  const {
    setChosenGameMode,
    setPlayerInputs,
    setCurrentPlayerIndex,
    setPlayers,
    setButtonClickCounter,
    setCurrentPlayersName,
    setIsCurrentlyPicking,
    buttonClickCounter,
    playerInputs,
  } = useContext(Context);

  const disabledStyle = buttonClickCounter === 0 ? style.disabled : '';
  const homeButtonHandler = () => {
    if (playerInputs.length < 1) {
      setPlayerInputs(['Summoner 1']);
    }
    setChosenGameMode(undefined);
    setCurrentPlayerIndex(1);
    setPlayers([]);
    setButtonClickCounter(0);
    setCurrentPlayersName(undefined);
    setIsCurrentlyPicking(false);
  };

  const lolIconHandler = () => {
    setLoLIconVideo(lolIconVideoDefault);
    setIsLoop(true);
  };

  return (
    <header className={style.header}>
      <div className={style.nav_container}>
        <button onClick={homeButtonHandler} className={disabledStyle}>
          <video
            src={lolIconVideo}
            className={style.logoVideo}
            onEnded={lolIconHandler}
            loop={isLoop}
            autoPlay
            muted
          />
          <p className={disabledStyle}>Home</p>
          {buttonClickCounter !== 0 ? (
            <div className={style.homeVideo}>
              <video
                src={playButton}
                onMouseEnter={() => setIsHomeButtonHovered(true)}
                autoPlay
                muted
              />
              {isHomeButtonHovered && (
                <video
                  src={playButtonHover}
                  className={style.buttonVideo_hover}
                  onMouseLeave={() => setIsHomeButtonHovered(false)}
                  onClick={() => setIsHomeButtonHovered(false)}
                  loop
                  autoPlay
                  muted
                />
              )}
            </div>
          ) : (
            <img src={playButtonDisabled} alt='home button disabled'></img>
          )}
        </button>
      </div>
      <div className={style.header_text}>
        <h1>League of Legends Randomized</h1>
      </div>
    </header>
  );
};

export default Header;
