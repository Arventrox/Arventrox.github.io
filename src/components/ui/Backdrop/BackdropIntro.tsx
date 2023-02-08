import React from 'react';
import style from './Backdrop.module.scss';
import video from '../../../assets/videos/outro-role-selector-magic.webm';

const BackdropIntro = () => {
  return (
    <div className={style.backdrop}>
      <video loop autoPlay muted preload='auto'>
        <source src={video} type='video/mp4'></source>
      </video>
    </div>
  );
};

export default BackdropIntro;
