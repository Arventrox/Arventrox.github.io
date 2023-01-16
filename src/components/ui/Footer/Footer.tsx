import React, { FC, MouseEventHandler, Dispatch, SetStateAction } from 'react';
import style from './Footer.module.scss';
import FooterButton from '../button/FooterButton';
import Chat from '../chat/Chat';

type props = {
  chosen: string | null;
  randomModeHandler: MouseEventHandler<HTMLButtonElement>;
  isInputFocused: boolean;
  setIsInputFocused: Dispatch<SetStateAction<boolean>>;
  gameMode: string[];
};

const Footer: FC<props> = ({ chosen, isInputFocused, setIsInputFocused, randomModeHandler }) => {
  return (
    <footer className={style.footer}>
      <Chat isInputFocused={isInputFocused} setIsInputFocused={setIsInputFocused} />
      {chosen !== 'NORMAL' && chosen && (
        <FooterButton onClick={randomModeHandler}>Choose Again</FooterButton>
      )}
      {!chosen && <FooterButton onClick={randomModeHandler}>Choose Gamemode</FooterButton>}
    </footer>
  );
};
export default Footer;
