import React, { FC, useContext } from 'react';
import style from './FooterButton.module.scss';
import video from '../../../assets/videos/b657058269af174c.webm';
import { ARAM, NORMAL } from '../../LeagueRandomized';
import { Context } from '../../../store/context';

const Button: FC = () => {
  const {
    chosenGameMode,
    buttonHandler: submitHandler,
    checkedGameModes,
    buttonClickCounter,
    playersNumber,
    currentPlayerIndex,
    isCurrentlyPicking,
    playerInputs,
  } = useContext(Context);

  const aramText =
    checkedGameModes.length === 1 && checkedGameModes.includes(ARAM) ? 'Go Back' : 'Choose Again';
  let buttonText;

  switch (buttonClickCounter) {
    case 0:
      buttonText = 'Choose Game mode';
      break;
    case 1:
      buttonText = chosenGameMode !== NORMAL ? aramText : 'Submit';

      break;
    case 2:
      buttonText = 'Choose Role';
      break;
    case 3:
      buttonText = 'Choose Champion';
      break;
    case 4:
      if (currentPlayerIndex < playersNumber) {
        buttonText = 'Next';
      } else {
        buttonText = 'Copy Lobby';
      }
      break;
  }

  return (
    <div className={style.video_container}>
      {playerInputs.length !== 0 && !isCurrentlyPicking && checkedGameModes.length !== 0 && (
        <video className={style.video} src={video} autoPlay loop muted />
      )}
      <button
        className={`${style['footerBtn']} ${
          playerInputs.length === 0 || isCurrentlyPicking || checkedGameModes.length === 0
            ? style.btn_disabled
            : ''
        }`}
        onClick={submitHandler}
      >
        <p>{buttonText}</p>
      </button>
    </div>
  );
};

export default Button;
