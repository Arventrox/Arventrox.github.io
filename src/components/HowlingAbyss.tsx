import React from 'react';
import style from './HowlingAbyss.module.scss';
import video from '../assets/videos/background_loop.webm';
const HowlingAbyss = () => {
  //
  return (
    <div className={style.container}>
      <h2>Good Luck Summoner</h2>
      <div className={style.video_container}>
        <video autoPlay muted loop>
          <source src={video}></source>
        </video>
      </div>
    </div>
  );
};

export default HowlingAbyss;
