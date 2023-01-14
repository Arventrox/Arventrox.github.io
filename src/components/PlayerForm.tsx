import React, { type FC, Dispatch, useState, useEffect } from 'react';
import { type Tplayers } from '../types/player.type';
import { getRandomChampionByRole } from './Role';
import style from './PlayerForm.module.scss';
import FooterButton from './ui/button/FooterButton';
import PlayerSelect from './PlayerSelect';

type Iprops = {
  playersNumber: number;
  setPlayers: Dispatch<React.SetStateAction<Tplayers>>;
  setPlayersNumber: Dispatch<React.SetStateAction<number>>;
};

const NameInput: FC<Iprops> = ({ playersNumber, setPlayers, setPlayersNumber }) => {
  const [playerInputs, setPlayerInputs] = useState<string[]>([]);

  useEffect(() => {
    const inputsList: string[] = [];

    for (let i = 0; i < playersNumber; i++) {
      inputsList.push(`Summoner ${i + 1}`);
    }
    setPlayerInputs(inputsList);
  }, [playersNumber]);

  const playerNameHandler = (e: React.FormEvent, index: number) => {
    const { value } = e.target as HTMLInputElement;
    const newInputs = [...playerInputs];
    newInputs[index] = value;
    setPlayerInputs(newInputs);
  };

  const removeplayerNameHandler = (index: number, e: React.FormEvent) => {
    e.preventDefault();
    const newInputs = [...playerInputs];
    newInputs.splice(index, 1);
    setPlayersNumber(playersNumber - 1);
    setPlayerInputs(newInputs);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const playerList = [];
    let lane = ['TOP', 'JUNGLE', 'MID', 'BOTTOM', 'SUPPORT'];

    for (let i = 0; i < playersNumber; i++) {
      const playerRole: string = lane[Math.floor(Math.random() * lane.length)];
      const randomChampionByRole = getRandomChampionByRole(playerRole);
      lane = lane.filter((usedRole) => usedRole !== playerRole);

      playerList.push({
        playerName: playerInputs[i],
        playerRole,
        playerChampion: randomChampionByRole,
      });
    }

    setPlayers(playerList);
    setPlayerInputs([]);
  };

  return (
    <div className={style.form_container}>
      <div></div>
      <PlayerSelect
        playersNumber={playersNumber}
        setPlayersNumber={setPlayersNumber}
        setPlayers={setPlayers}
      />
      <form>
        {playerInputs.map((singleInput, index) => (
          <div className={style.form_input__container} key={index}>
            {/* <img src={questionMark} alt='none' /> */}
            <input
              type='text'
              id='playersName'
              value={singleInput}
              onChange={(e) => {
                playerNameHandler(e, index);
              }}
            />
            <button
              className={style.remove__btn}
              onClick={(e) => {
                removeplayerNameHandler(index, e);
              }}
            >
              <span className={style.hover_text}>Remove this player</span>
            </button>
          </div>
        ))}

        {playerInputs.length !== 0 && <FooterButton onClick={submitHandler}>Submit</FooterButton>}
      </form>
    </div>
  );
};

export default NameInput;
