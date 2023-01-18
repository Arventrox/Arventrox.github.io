import React, { FC, Dispatch, SetStateAction, useState } from 'react';
import style from './Chat.module.scss';

type props = {
  isInputFocused: boolean;
  setIsInputFocused: Dispatch<SetStateAction<boolean>>;
};

const Chat: FC<props> = ({ isInputFocused, setIsInputFocused }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [playersName, setPlayersName] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const namess = inputValue.split(' ');
    const filteredWords = namess.filter(
      (word) => word !== 'joined' && word !== 'the' && word !== 'lobby',
    );

    setPlayersName(filteredWords);
    setMessages([...messages, inputValue]);
    setInputValue('');
  };

  const handlePaste = (event: React.ClipboardEvent) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text/plain');
    const lines = pastedText.split('\n');
    const firstWords = lines.map((line) => line.split(' ')[0]);
    setMessages([...messages, pastedText]);
    setPlayersName(firstWords);
  };

  console.log(playersName);

  //Arventrox joined the lobby
  return (
    <div className={style.chat_container}>
      <form onSubmit={handleSubmit} className={style.form}>
        <input
          type='text'
          onPaste={handlePaste}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
        />
      </form>
      {isInputFocused && (
        <ul>
          <button onClick={() => setIsInputFocused(false)}>-</button>
          <li className={style.chat_default__text}>You can paste your client lobby here </li>
          {messages.map((message, index) => (
            <li key={index}>User: {message}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Chat;
