import React, { FC, useContext } from 'react';
import style from './FooterButton.module.scss';
import video from '../../../assets/videos/b657058269af174c.webm';
import { ARAM, NORMAL } from '../../LeagueRandomized';
import { BtnContext } from '../../../store/context';

const Button: FC = () => {
  const { chosenGameMode, submitHandler, checkedGameModes } = useContext(BtnContext);
  const aramText =
    checkedGameModes.length === 1 && checkedGameModes.includes(ARAM) ? 'Go Back' : 'Choose Again';
  const buttonText = chosenGameMode !== NORMAL ? aramText : 'Submit';

  return (
    <div className={style.video_container}>
      <video className={style.video} src={video} autoPlay loop muted />
      <button className={style.footerBtn} onClick={submitHandler}>
        {chosenGameMode ? <p>{buttonText}</p> : <p>Choose Game mode</p>}
      </button>
    </div>
  );
};

export default Button;
