import React, { FC } from 'react';
import style from './Header.module.scss';
import lolIcon from '../../../assets/images/lol_icon.png';

type props = {
  chosen: string | null;
};

const Header: FC<props> = ({ chosen }) => {
  const refreshHandler = () => {
    window.location.reload();
  };
  return (
    <header className={style.header}>
      <div className={style.nav_container}>
        <img src={lolIcon}></img>
        <button onClick={refreshHandler}>Home</button>
      </div>
      <div className={style.header_text}>
        <h1>League of Legends Randomizer</h1>
        {chosen && <h2>Game mode: {chosen}</h2>}
      </div>
    </header>
  );
};

export default Header;
