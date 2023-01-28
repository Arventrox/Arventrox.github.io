import React, { FC, MouseEventHandler } from 'react';
import style from './FooterButton.module.scss';

interface Props {
  children: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<Props> = ({ children, onClick }) => {
  return (
    <div className={style.video_container}>
      <video
        className={style.video}
        src='https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/unknown/b657058269af174c.webm'
        autoPlay
        loop
        muted
      />
      <button className={style.footerBtn} onClick={onClick}>
        <p>{children}</p>
      </button>
    </div>
  );
};

export default Button;
