import React, { FC } from 'react';
import style from './Backdrop.module.scss';
import ReactPlayer from 'react-player';
import video from '../../../assets/videos/outro-role-selector-magic.webm';

const BackdropIntro: FC = () => {
  return (
    <div className={style.backdrop}>
      {/* <video loop autoPlay muted preload='auto'>
        <source src={video} type='video/mp4'></source>
      </video> */}
      <ReactPlayer url={video} playing={true} controls></ReactPlayer>
    </div>
  );
};

export default BackdropIntro;
