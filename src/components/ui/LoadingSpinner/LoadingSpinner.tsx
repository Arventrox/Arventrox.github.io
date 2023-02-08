import React from 'react';
import style from './LoadingSpinner.module.scss';
import spinner from '../../../assets/images/spinner.png';
import video from '../../../assets/videos/eog_intro_magic.webm';
const LoadingSpinner = () => {
  return (
    <span className={style.loader}>
      <img src={spinner}></img>
      <video className={style.video} src={video} autoPlay muted></video>
    </span>
  );
};

export default LoadingSpinner;
