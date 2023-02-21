import React, { type FC, Dispatch, useEffect, useContext } from 'react';
import style from './PlayerForm.module.scss';
import PlayerSelect from './PlayerSelect';
import Banner from './ui/Banner/Banner';
import { BtnContext } from '../store/context';

interface Props {
  playersNumber: number;
  setPlayersNumber: Dispatch<React.SetStateAction<number>>;
}

const PlayerForm: FC<Props> = ({ playersNumber, setPlayersNumber }) => {
  const { playerInputs, setPlayerInputs, isFormVisible, setIsFormVisible } = useContext(BtnContext);

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

  return (
    <div className={style.container}>
      <Banner />
      {!isFormVisible ? (
        <div className={style.form_container}>
          <h3>Paste champions in chat or Expand to enter manually </h3>
          <button className={style.expand_button} onClick={() => setIsFormVisible(true)}>
            Expand
          </button>
        </div>
      ) : (
        <div className={style.form_container}>
          <PlayerSelect setPlayersNumber={setPlayersNumber} playerInputs={playerInputs} />
          <form>
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
            {playerInputs.length === 0 && <h5>There are no players selected</h5>}
          </form>
        </div>
      )}
    </div>
  );
};

export default PlayerForm;
