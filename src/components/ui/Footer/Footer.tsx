import React, { FC, Dispatch, SetStateAction } from 'react';
import style from './Footer.module.scss';
import FooterButton from '../button/FooterButton';
import Chat from '../chat/Chat';
type props = {
  chosen: string;
  setChosen: Dispatch<SetStateAction<string>>;
  isInputFocused: boolean;
  setIsInputFocused: Dispatch<SetStateAction<boolean>>;
};

const Footer: FC<props> = ({ chosen, setChosen, isInputFocused, setIsInputFocused }) => {
  const gamemode = ['NORMAL', 'ARAM', 'URF'];

  const randomModeHandler = () => {
    setChosen('');
    const chosenGamemode = gamemode[Math.floor(Math.random() * gamemode.length)];
    setChosen(chosenGamemode);
  };
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
