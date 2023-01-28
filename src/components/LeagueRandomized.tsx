import React, { useState } from 'react';
import Normal from './Normal';
import style from './LeagueRandomized.module.scss';
import Header from './ui/Header/Header';
import Footer from './ui/Footer/Footer';

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
  const [chosen, setChosen] = useState<string | null>('');
  const [isInputFocused, setIsInputFocused] = useState(true);
  const [isNormalChecked, setIsNormalChecked] = useState(true);
  const [isAramChecked, setIsAramChecked] = useState(true);
  const [isUrfChecked, setIsUrfChecked] = useState(false);
  const [playerInputs, setPlayerInputs] = useState<string[]>(['Summoner 1']);

  let background;
  let gameModeIcon;
  const gameMode: string[] = [];

  switch (chosen) {
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

  const randomModeHandler = () => {
    setChosen(null);

    if (isAramChecked === true) {
      gameMode.push(ARAM);
    }
    if (isUrfChecked === true) {
      gameMode.push(URF);
    }
    if (isNormalChecked === true) {
      gameMode.push(NORMAL);
    }

    const chosenGameMode = gameMode[Math.floor(Math.random() * gameMode.length)];
    setChosen(chosenGameMode);
  };

  return (
    <div className={background}>
      <Header />
      <section onClick={() => setIsInputFocused(false)}>
        {chosen && (
          <div className={style.section_header}>
            <button onClick={() => setChosen('')}>
              <span className={style.hover_text}>Change Mode</span>
            </button>
            <img src={gameModeIcon}></img>
            <h2>Game mode: {chosen}</h2>
          </div>
        )}
        {!chosen && (
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
        {chosen === NORMAL && (
          <Normal playerInputs={playerInputs} setPlayerInputs={setPlayerInputs} />
        )}
        {chosen === ARAM && <p>Aram</p>}
        {chosen === URF && <p>URF</p>}
      </section>

      <Footer
        isInputFocused={isInputFocused}
        setIsInputFocused={setIsInputFocused}
        chosen={chosen}
        randomModeHandler={randomModeHandler}
        gameMode={gameMode}
        setChatInput={setPlayerInputs}
      />
    </div>
  );
};

export default LeagueRandomized;
