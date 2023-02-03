import React, { FC, Dispatch, SetStateAction, useState, useEffect, useRef } from 'react';
import { ARAM } from '../../LeagueRandomized';
import style from './Chat.module.scss';
import chatEnabled from '../../../assets/images/chat-enabled.png';

interface Props {
  isInputFocused: boolean;
  setIsInputFocused: Dispatch<SetStateAction<boolean>>;
  setChatInput: Dispatch<SetStateAction<string[]>>;
  chosen: string | null;
}

const Chat: FC<Props> = ({ isInputFocused, setIsInputFocused, setChatInput, chosen }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const lastLineRef = useRef<HTMLLIElement>(null);

  const scrollToLast = () => {
    lastLineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(scrollToLast, [messages]);

  useEffect(() => {
    if (chosen?.length !== 0 && chosen !== ARAM) {
      setIsInputFocused(true);
    }
  }, [chosen]);

  const handlePaste = (event: React.ClipboardEvent) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text/plain');
    const lines = pastedText.split('\n').filter((line) => line.length !== 0 && line.length > 1);
    const firstWords = lines.map((line) => line.split('joined')[0]);
    const uniqueFirstWords = firstWords.filter((word, index) => firstWords.indexOf(word) === index);

    if (!pastedText.includes('joined' && 'lobby')) {
      setMessages([...messages, 'Please paste a valid lobby']);
      return;
    }

    setMessages([...messages, ...lines]);
    setChatInput(uniqueFirstWords);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (inputValue === '') {
      return;
    }

    const input = inputValue.split(' ');
    const filteredWords = input.filter(
      (word) => word !== 'joined' && word !== 'the' && word !== 'lobby',
    );

    setChatInput(filteredWords);
    setMessages([...messages, inputValue]);
    setInputValue('');
  };

  return (
    <div className={style.chat_container}>
      <div className={style.chat_subcontainer}>
        <img src={chatEnabled}></img>
        <form onSubmit={handleSubmit} className={style.form}>
          <input
            type='text'
            onPaste={handlePaste}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            placeholder=' Type or paste lobby here ...'
          />
        </form>
      </div>

      {isInputFocused && (
        <div className={style.msg_box}>
          <button onFocus={() => setIsInputFocused(false)}>-</button>
          <ul>
            {chosen?.length !== 0 ? (
              <div className={style.li_container}>
                <li>You can paste or write your LoL lobby here !</li>
              </div>
            ) : (
              <div className={style.li_container}>
                <li>Welcome to LoL Randomized </li>
                <li>Please Select which modes to randomize</li>
              </div>
            )}

            {messages.map((message, index) => (
              <li key={index}> {message}</li>
            ))}
            <span ref={lastLineRef} className={style.ref}></span>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Chat;
