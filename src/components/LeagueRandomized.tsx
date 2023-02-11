import React, { useContext } from 'react';
import SummonersRift from './SummonersRift';
import style from './LeagueRandomized.module.scss';
import Header from './ui/Header/Header';
import Footer from './ui/Footer/Footer';
import HowlingAbyss from './HowlingAbyss';
import { BtnContext } from '../store/context';

import normalActiveIcon from '../assets/images/game-icon-normal-hover.png';
import normalDefaultIcon from '../assets/images/game-icon-normal-default.png';
import aramActiveIcon from '../assets/images/game-icon-aram-hover.png';
import aramDefaultIcon from '../assets/images/game-icon-aram-default.png';
import urfActiveIcon from '../assets/images/game-icon-urf-hover.png';
import urfDefaultIcon from '../assets/images/game-icon-urf-default.png';

export const NORMAL = 'SR NORMAL';
export const ARAM = 'HA ARAM';
export const URF = 'SR URF';

const LeagueRandomized = () => {
  const {
    chosenGameMode,
    setIsAramChecked,
    setIsNormalChecked,
    setIsUrfChecked,
    isAramChecked,
    isNormalChecked,
    isUrfChecked,
    setPlayers,
    setCurrentPlayerIndex,
    setChosenGameMode,
    setButtonClickCounter,
    players,
  } = useContext(BtnContext);

  const backButtonText = players.length === 0 ? 'Change Game Mode' : 'Go Back';
  let background;
  let gameModeIcon;

  switch (chosenGameMode) {
    case NORMAL:
      background = style.normal;
      gameModeIcon = normalActiveIcon;
      break;
    case ARAM:
      background = style.aram;
      gameModeIcon = aramActiveIcon;

      break;
    case URF:
      gameModeIcon = urfActiveIcon;
      background = style.urf;
      break;
    default:
      background = style.default__background;
      break;
  }

  const handleCheckboxNormalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsNormalChecked(event.target.checked);
  };

  const handleCheckboxAramChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAramChecked(event.target.checked);
  };

  const handleCheckboxUrfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsUrfChecked(event.target.checked);
  };

  const handleBackButton = () => {
    if (players.length === 0) {
      setChosenGameMode('');
    }

    setButtonClickCounter((prevState) => prevState - 1);
    setPlayers([]);
    setCurrentPlayerIndex(1);
  };

  return (
    <div className={background}>
      <Header />

      <section>
        {chosenGameMode && (
          <div className={style.section_header}>
            <div className={style.section_left_box}>
              <button onClick={handleBackButton}>
                <span className={style.hover_text}>{backButtonText}</span>
              </button>
              <img src={gameModeIcon}></img>
              <h2>Game mode: {chosenGameMode}</h2>
            </div>
            <h2 className={style.statusText}>PICKING FOR </h2>
          </div>
        )}
        {!chosenGameMode && (
          <div className={style.gameMode_container}>
            <div className={style.gameMode_container__box}>
              <img src={isNormalChecked ? normalActiveIcon : normalDefaultIcon} />
              <label>{"SUMMONER'S RIFT"}</label>
              <div className={style.checkbox}>
                <input
                  type='checkbox'
                  checked={isNormalChecked}
                  onChange={handleCheckboxNormalChange}
                />
              </div>
            </div>
            <div className={style.gameMode_container__box}>
              <img src={isAramChecked ? aramActiveIcon : aramDefaultIcon} />
              <label>ARAM</label>
              <div className={style.checkbox}>
                <input
                  type='checkbox'
                  checked={isAramChecked}
                  onChange={handleCheckboxAramChange}
                />
              </div>
            </div>
            <div className={style.gameMode_container__box}>
              <img src={isUrfChecked ? urfActiveIcon : urfDefaultIcon} />
              <label>URF</label>
              <div className={style.checkbox}>
                <input type='checkbox' checked={isUrfChecked} onChange={handleCheckboxUrfChange} />
              </div>
            </div>
          </div>
        )}
        {chosenGameMode === NORMAL && <SummonersRift />}
        {chosenGameMode === ARAM && <HowlingAbyss />}
        {chosenGameMode === URF && <SummonersRift />}
      </section>

      <Footer />
    </div>
  );
};

export default LeagueRandomized;
