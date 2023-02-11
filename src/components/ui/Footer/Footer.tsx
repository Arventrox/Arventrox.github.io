import React, { FC } from 'react';
import style from './Footer.module.scss';
import FooterButton from '../button/FooterButton';
import Chat from '../chat/Chat';

const Footer: FC = () => {
  return (
    <footer className={style.footer}>
      <Chat />
      <FooterButton />
    </footer>
  );
};
export default Footer;
