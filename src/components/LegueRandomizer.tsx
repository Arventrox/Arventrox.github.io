import React, { useState } from 'react';
import Normal from './Normal';
import style from './LegueRandomizer.module.scss';
import Header from './ui/Header/Header';
import Footer from './ui/Footer/Footer';
import normalActiveIcon from '../assets/images/game-icon-normal-hover.png';
import normalDefaultIcon from '../assets/images/game-icon-normal-default.png';

import aramActiveIcon from '../assets/images/game-icon-aram-hover.png';
import aramlDefaultIcon from '../assets/images/game-icon-aram-default.png';

import urfActiveIcon from '../assets/images/game-icon-urf-hover.png';
import urfDefaultIcon from '../assets/images/game-icon-urf-default.png';

const NORMAL = 'NORMAL';
const ARAM = 'ARAM';
const URF = 'URF';

const LegueRandomizer = () => {
  const [chosen, setChosen] = useState<string | null>('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isNormalChecked, setIsNormalChecked] = useState(true);
  const [isAramChecked, setIsAramChecked] = useState(true);
  const [isUrfChecked, setIsUrfChecked] = useState(false);

  let background;
  const gameMode: string[] = [];

  switch (chosen) {
    case NORMAL:
      background = style.normal;
      break;
    case ARAM:
      background = style.aram;
      break;
    case URF:
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
    if (isAramChecked === true) {
      gameMode.push(ARAM);
    }
    if (isUrfChecked === true) {
      gameMode.push(URF);
    }
    if (isNormalChecked === true) {
      gameMode.push(NORMAL);
    }
    setChosen(null);
    const chosenGamemode = gameMode[Math.floor(Math.random() * gameMode.length)];
    setChosen(chosenGamemode);
  };

  return (
    <div className={background}>
      <Header chosen={chosen} />
      <section onClick={() => setIsInputFocused(false)}>
        {!chosen && (
          <div className={style.gamemode_container}>
            <div className={style.gamemode_container__box}>
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
            <div className={style.gamemode_container__box}>
              <img src={isAramChecked ? aramActiveIcon : aramlDefaultIcon} />
              <label>ARAM</label>
              <div className={style.checkbox}>
                <input
                  type='checkbox'
                  checked={isAramChecked}
                  onChange={handleCheckboxAramChange}
                />
              </div>
            </div>
            <div className={style.gamemode_container__box}>
              <img src={isUrfChecked ? urfActiveIcon : urfDefaultIcon} />
              <label>URF</label>
              <div className={style.checkbox}>
                <input type='checkbox' checked={isUrfChecked} onChange={handleCheckboxUrfChange} />
              </div>
            </div>
          </div>
        )}
        {chosen === 'NORMAL' && <Normal />}
        {chosen === 'ARAM' && <p>Aram</p>}
        {chosen === 'URF' && <p>URF</p>}
      </section>
      <Footer
        isInputFocused={isInputFocused}
        setIsInputFocused={setIsInputFocused}
        chosen={chosen}
        randomModeHandler={randomModeHandler}
        gameMode={gameMode}
      />
    </div>
  );
};

export default LegueRandomizer;
