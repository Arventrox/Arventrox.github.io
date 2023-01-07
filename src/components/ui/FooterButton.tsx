import React, { FC, MouseEventHandler } from 'react';
import style from './FooterButton.module.scss';

type footerBtn = {
  children: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const Button: FC<footerBtn> = ({ children, onClick }) => {
  //
  return (
    <button className={style.footerBtn} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
