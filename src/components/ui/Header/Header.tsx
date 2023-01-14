import React, { FC } from 'react';
import style from './Header.module.scss';
type props = {
  chosen: string;
};

const Header: FC<props> = ({ chosen }) => {
  const refreshHandler = () => {
    window.location.reload();
  };
  return (
    <header className={style.header}>
      <button onClick={refreshHandler}>Home</button>
      <div className={style.header_text}>
        <h1>League of Legends Randomizer</h1>
        {chosen && <h2>Game mode: {chosen}</h2>}
      </div>
    </header>
  );
};

export default Header;
