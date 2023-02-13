import React, { FC, useContext } from 'react';
import { BtnContext } from '../../../store/context';
import style from './Header.module.scss';
import lolIcon from '../../../assets/images/lol_icon.png';

const Header: FC = () => {
  const {
    setChosenGameMode,
    setPlayerInputs,
    setCurrentPlayerIndex,
    setPlayers,
    setButtonClickCounter,
  } = useContext(BtnContext);

  const homeButtonHandler = () => {
    setChosenGameMode(undefined);
    setPlayerInputs([]);
    setCurrentPlayerIndex(1);
    setPlayers([]);
    setButtonClickCounter(0);
  };

  return (
    <header className={style.header}>
      <div className={style.nav_container}>
        <img src={lolIcon}></img>
        <button onClick={homeButtonHandler}>Home</button>
      </div>
      <div className={style.header_text}>
        <h1>League of Legends Randomized</h1>
      </div>
    </header>
  );
};

export default Header;
