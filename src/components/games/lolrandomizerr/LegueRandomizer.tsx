import React, { useState } from 'react';
import Normal from './Normal';
import style from './LegueRandomizer.module.scss';

const LegueRandomizer = () => {
  const [chosen, setChosen] = useState('');
  const gamemode = ['NORMAL', 'ARAM', 'URF'];

  const randomModeHandler = () => {
    const chosenGamemode = gamemode[Math.floor(Math.random() * gamemode.length)];
    setChosen(chosenGamemode);
  };
  const background =
    chosen === 'NORMAL'
      ? style.normal
      : chosen === 'ARAM'
      ? style.aram
      : chosen === 'URF'
      ? style.urf
      : style.default__background;

  return (
    <div className={style.container}>
      <div className={background}>
        <header>
          <div className={style.blur}></div>
          <h1>League of Legends Randomizer</h1>
          {chosen && <h2>Game mode: {chosen}</h2>}
        </header>
        {chosen === 'NORMAL' && <Normal />}
        <div className={style.button__container}>
          <span className={style.button__border_left}></span>
          <button className={style.gamemode__button} onClick={randomModeHandler}>
            Chose Gamemode
          </button>
          <span className={style.button__border_right}></span>
        </div>
      </div>
    </div>
  );
};

export default LegueRandomizer;
