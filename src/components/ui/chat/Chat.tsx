import React, { FC, Dispatch, SetStateAction, useState } from 'react';
import style from './Chat.module.scss';

type props = {
  isInputFocused: boolean;
  setIsInputFocused: Dispatch<SetStateAction<boolean>>;
};

const Chat: FC<props> = ({ isInputFocused, setIsInputFocused }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessages([...messages, inputValue]);
    setInputValue('');
  };
  return (
    <div className={style.chat_container}>
      <form onSubmit={handleSubmit} className={style.form}>
        <input
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
