import React, { FC, Dispatch, SetStateAction, useState } from 'react';
import style from './Chat.module.scss';

interface Props {
  isInputFocused: boolean;
  setIsInputFocused: Dispatch<SetStateAction<boolean>>;
  setChatInput: Dispatch<SetStateAction<string[]>>;
}

const Chat: FC<Props> = ({ isInputFocused, setIsInputFocused, setChatInput }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handlePaste = (event: React.ClipboardEvent) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text/plain');
    const lines = pastedText.split('\n').filter((line) => line.length !== 0 && line.length > 1);
    const firstWords = lines.map((line) => line.split('joined')[0]);

    if (!pastedText.includes('joined' && 'lobby')) {
      setMessages([...messages, 'Please paste a valid lobby']);
      return;
    }

    setMessages([...messages, ...lines]);
    setChatInput(firstWords);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
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
          <li className={style.chat_default__text}>Welcome to LoL Randomized </li>
          <li className={style.chat_default__text}>Please Select which modes to randomize</li>
          {messages.map((message, index) => (
            <li key={index}>User: {message}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Chat;
