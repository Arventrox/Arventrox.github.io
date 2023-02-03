import React, { FC, MouseEventHandler, Dispatch, SetStateAction } from 'react';
import style from './Footer.module.scss';
import FooterButton from '../button/FooterButton';
import Chat from '../chat/Chat';
import { NORMAL } from '../../LeagueRandomized';
interface Props {
  chosen: string | null;
  randomModeHandler: MouseEventHandler<HTMLButtonElement>;
  isInputFocused: boolean;
  setIsInputFocused: Dispatch<SetStateAction<boolean>>;
  gameMode: string[];
  setChatInput: Dispatch<SetStateAction<string[]>>;
}

const Footer: FC<Props> = ({
  chosen,
  isInputFocused,
  setIsInputFocused,
  randomModeHandler,
  setChatInput,
}) => {
  return (
    <footer className={style.footer}>
      <Chat
        isInputFocused={isInputFocused}
        setIsInputFocused={setIsInputFocused}
        setChatInput={setChatInput}
        chosen={chosen}
      />
      {chosen !== NORMAL && chosen && (
        <FooterButton onClick={randomModeHandler}>Choose Again</FooterButton>
      )}
      {!chosen && chosen !== NORMAL && (
        <FooterButton onClick={randomModeHandler}>Choose Game mode</FooterButton>
      )}
    </footer>
  );
};
export default Footer;
