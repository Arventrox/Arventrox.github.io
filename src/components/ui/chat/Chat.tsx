import React, { FC, Dispatch, SetStateAction, useState, useEffect, useRef } from 'react';
import { ARAM, NORMAL } from '../../LeagueRandomized';
import style from './Chat.module.scss';
import chatEnabled from '../../../assets/images/chat-enabled.png';

interface Props {
  isInputFocused: boolean;
  setIsInputFocused: Dispatch<SetStateAction<boolean>>;
  setChatInput: Dispatch<SetStateAction<string[]>>;
  chosen: string | undefined;
}

const Chat: FC<Props> = ({ isInputFocused, setIsInputFocused, setChatInput, chosen }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isExampleButtonClicked, setIsExampleButtonClicked] = useState(false);

  const lastLineRef = useRef<HTMLLIElement>(null);
  const chatInputFocus = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isInputFocused) {
      chatInputFocus.current?.focus();
    }
  }, [isInputFocused]);

  useEffect(() => {
    lastLineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [[messages]]);

  useEffect(() => {
    if (!chosen || chosen !== ARAM) {
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

    setMessages([...lines]);
    setChatInput(uniqueFirstWords);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    //Checks if the user tried to submit empty value
    if (inputValue === '') {
      return;
    }

    //Filters the input to contain only the players names
    const input = inputValue.split(' ');
    const filteredWords = input.filter(
      (word) => word !== 'joined' && word !== 'the' && word !== 'lobby' && word !== '',
    );

    //Limits the user input to 5 words
    if (filteredWords.length > 5) {
      for (let i = 5; filteredWords.length > i; ) {
        filteredWords.pop();
      }
    }
    //Sets the user names if the entered input is not empty
    if (filteredWords.length !== 0) {
      setChatInput(filteredWords);
    }
    setMessages([inputValue]);
    setInputValue('');
  };

  const exampleButtonHandler = () => {
    !isExampleButtonClicked ? setIsExampleButtonClicked(true) : setIsExampleButtonClicked(false);
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
            autoFocus
            ref={chatInputFocus}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => {
              setIsInputFocused(true), focus();
            }}
            placeholder=' Type or paste lobby here ...'
          />
        </form>
      </div>

      {isInputFocused && (
        <div className={style.msg_box}>
          <button onFocus={() => setIsInputFocused(false)}>-</button>
          <ul>
            {chosen === NORMAL ? (
              <div>
                <div className={style.li_container}>
                  <li>You can paste or write your LoL lobby here !</li>
                </div>

                <div className={style.exampleButton_container}>
                  <button className={style.exampleButton} onClick={exampleButtonHandler}>
                    {isExampleButtonClicked ? 'Hide Example' : 'Show Example'}
                  </button>
                </div>

                {isExampleButtonClicked && (
                  <div>
                    <li>Summoner1 joined the lobby</li>
                    <li>Summoner2 joined the lobby</li>
                    <li>Summoner3 joined the lobby</li>
                    <li>Summoner4 joined the lobby</li>
                    <li>Summoner5 joined the lobby</li>
                  </div>
                )}
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
