import React from 'react';
import style from './LoadingAfterEffect.module.scss';
import video from '../../../assets/videos/eog_intro_magic.webm';
const LoadingAfterEffect = () => {
  return (
    <span className={style.loader}>
      <video className={style.video} src={video} autoPlay muted></video>
    </span>
  );
};

export default LoadingAfterEffect;
