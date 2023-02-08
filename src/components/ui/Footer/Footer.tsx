import React, { FC, Dispatch, SetStateAction } from 'react';
import style from './Footer.module.scss';
import FooterButton from '../button/FooterButton';
import Chat from '../chat/Chat';

interface Props {
  chosen: string | undefined;
  randomModeHandler: () => void;
  isInputFocused: boolean;
  setIsInputFocused: Dispatch<SetStateAction<boolean>>;
  setChatInput: Dispatch<SetStateAction<string[]>>;
  // submitHandler: () => void;
}

const Footer: FC<Props> = ({
  chosen,
  isInputFocused,
  setIsInputFocused,
  setChatInput,
  // submitHandler,
  randomModeHandler,
}) => {
  return (
    <footer className={style.footer}>
      <Chat
        isInputFocused={isInputFocused}
        setIsInputFocused={setIsInputFocused}
        setChatInput={setChatInput}
        chosen={chosen}
      />
      <FooterButton chosen={chosen} onClick={randomModeHandler} />
    </footer>
  );
};
export default Footer;
