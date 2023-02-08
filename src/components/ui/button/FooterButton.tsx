import React, { FC } from 'react';
import style from './FooterButton.module.scss';
import video from '../../../assets/videos/b657058269af174c.webm';
import { NORMAL } from '../../LeagueRandomized';

interface Props {
  onClick: () => void;
  chosen: string | undefined;
}

const Button: FC<Props> = ({ chosen, onClick }) => {
  return (
    <div className={style.video_container}>
      <video className={style.video} src={video} autoPlay loop muted />
      <button className={style.footerBtn} onClick={onClick}>
        {chosen ? <p>{chosen !== NORMAL ? 'Choose Again' : 'Submit'}</p> : <p>Choose Game mode</p>}
      </button>
    </div>
  );
};

export default Button;
