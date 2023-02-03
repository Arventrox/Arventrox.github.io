import React, { type FC, Dispatch, useEffect, useState } from 'react';
import { type Tplayers } from '../types/player.type';
import { getRandomChampionByRole } from './Role';
import style from './PlayerForm.module.scss';
import PlayerSelect from './PlayerSelect';
import Banner from './ui/Banner/Banner';

interface Props {
  playersNumber: number;
  setPlayers: Dispatch<React.SetStateAction<Tplayers>>;
  setPlayersNumber: Dispatch<React.SetStateAction<number>>;
  playerInputs: string[];
  setPlayerInputs: React.Dispatch<React.SetStateAction<string[]>>;
}

const NameInput: FC<Props> = ({
  playersNumber,
  setPlayers,
  setPlayersNumber,
  playerInputs,
  setPlayerInputs,
}) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  useEffect(() => {
    const inputsList: string[] = [...playerInputs];

    for (let i = 1; i <= playersNumber; i++) {
      if (inputsList.length < i) {
        inputsList.push(`Summoner ${i}`);
      }
    }

    for (let i = 5; i > playersNumber; i--) {
      if (inputsList.length > playersNumber) {
        const reversedInputsList = inputsList.reverse();
        const indexOfLast = reversedInputsList.find((el) => el.includes('' || 'Summoner'), 1);
        inputsList.reverse().splice(inputsList.lastIndexOf(indexOfLast || ''), 1);
      }
    }

    setPlayerInputs(inputsList);
  }, [playersNumber]);

  const playerNameHandler = (e: React.FormEvent, index: number) => {
    const { value } = e.target as HTMLInputElement;
    const newInputs = [...playerInputs];
    newInputs[index] = value;
    setPlayerInputs(newInputs);
  };

  const clearNameHandler = (e: React.FormEvent, index: number) => {
    let { value } = e.target as HTMLInputElement;
    const newInputs = [...playerInputs];

    if (newInputs[index].includes('Summoner')) {
      value = '';
    }

    newInputs[index] = value;
    setPlayerInputs(newInputs);
  };

  const removePlayerNameHandler = (index: number, e: React.FormEvent) => {
    e.preventDefault();
    const newInputs = [...playerInputs];
    newInputs.splice(index, 1);
    setPlayersNumber(newInputs.length);
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
    setPlayerInputs(['Summoner 1']);
  };

  return (
    <div className={style.container}>
      <Banner />
      {!isButtonClicked ? (
        <div className={style.form_container}>
          <p>Paste champions in chat or </p>
          <button onClick={() => setIsButtonClicked(true)}>Expand</button>
        </div>
      ) : (
        <div className={style.form_container}>
          <PlayerSelect setPlayersNumber={setPlayersNumber} setPlayers={setPlayers} />
          <form onSubmit={submitHandler}>
            {playerInputs.map((singleInput, index) => (
              <div className={style.input_container} key={index}>
                <div className={style.input_container__box}>
                  {playerInputs[index] === '' && <label htmlFor='player'>Name :</label>}
                  <input
                    type='text'
                    id='playersName'
                    value={singleInput}
                    onClick={(e) => {
                      clearNameHandler(e, index);
                    }}
                    onChange={(e) => {
                      playerNameHandler(e, index);
                    }}
                  />
                </div>

                <button
                  className={style.remove__btn}
                  onClick={(e) => {
                    removePlayerNameHandler(index, e);
                  }}
                >
                  <span className={style.hover_text}>Remove this player</span>
                </button>
              </div>
            ))}

            {playerInputs.length !== 0 ? (
              !playerInputs.includes('') ? (
                <button>Submit</button>
              ) : (
                <p>Not all summoners have a name</p>
              )
            ) : (
              <p>No summoners are selected</p>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default NameInput;
