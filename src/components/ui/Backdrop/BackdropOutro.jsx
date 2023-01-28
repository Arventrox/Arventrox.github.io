import React from 'react';
import style from './Backdrop.module.scss';
import video from '../../../assets/videos/lobby-crystal-intro-player.webm';

const BackdropOutro = () => {
  return (
    <div className={style.backdrop}>
      <video loop autoPlay muted preload='auto'>
        <source src={video} type='video/mp4'></source>
      </video>
    </div>
  );
};

export default BackdropOutro;
