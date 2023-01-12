import React, { useState } from 'react';
import Normal from './Normal';
import style from './LegueRandomizer.module.scss';
import FooterButton from './ui/button/FooterButton';

const LegueRandomizer = () => {
  const [chosen, setChosen] = useState<string>();
  const gamemode = ['NORMAL', 'ARAM', 'URF'];

  const randomModeHandler = () => {
    setChosen(undefined);
    const chosenGamemode = gamemode[Math.floor(Math.random() * gamemode.length)];
    setChosen(chosenGamemode);
  };

  let background;

  switch (chosen) {
    case 'NORMAL':
      background = style.normal;
      break;
    case 'ARAM':
      background = style.aram;
      break;
    case 'URF':
      background = style.urf;
      break;
    default:
      background = style.default__background;
      break;
  }

  return (
    <div className={style.container}>
      <div className={background}>
        <header>
          <h1>League of Legends Randomizer</h1>
          {chosen && <h2>Game mode: {chosen}</h2>}
        </header>
        <section>{chosen === 'NORMAL' && <Normal />}</section>
        <footer>
          <span className={style.footer__border_left} />
          {chosen !== 'NORMAL' && chosen && (
            <FooterButton onClick={randomModeHandler}>Choose Again</FooterButton>
          )}
          {!chosen && <FooterButton onClick={randomModeHandler}>Choose Gamemode</FooterButton>}
          <span className={style.footer__border_right} />
        </footer>
      </div>
    </div>
  );
};

export default LegueRandomizer;
