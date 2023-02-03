import React from 'react';
import style from './LoadingSpinner.module.scss';
import spinner from '../../../assets/images/spinner.png';

const LoadingSpinner = () => {
  return (
    <span className={style.loader}>
      <img src={spinner}></img>
      {/* <video
        className={style.video}
        src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/animations/videos/celebration/eog_intro_magic.webm'
        autoPlay
        muted
      ></video> */}
    </span>
  );
};

export default LoadingSpinner;
