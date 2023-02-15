import React, { useContext, useState } from 'react';
import SummonersRift from './SummonersRift';
import style from './LeagueRandomized.module.scss';
import Header from './ui/Header/Header';
import Footer from './ui/Footer/Footer';
import HowlingAbyss from './HowlingAbyss';
import { BtnContext } from '../store/context';

import normalActiveIcon from '../assets/images/game-icon-normal-hover.png';
import normalDefaultIcon from '../assets/images/game-icon-normal-default.png';
import aramActiveIcon from '../assets/images/game-icon-aram-hover.png';
import aramDefaultIcon from '../assets/images/game-icon-aram-default.png';
import urfActiveIcon from '../assets/images/game-icon-urf-hover.png';
import urfDefaultIcon from '../assets/images/game-icon-urf-default.png';

export const NORMAL = 'SR NORMAL';
export const ARAM = 'HA ARAM';
export const URF = 'SR URF';

const LeagueRandomized = () => {
  const [isNormalChecked, setIsNormalChecked] = useState(true);
  const [isAramChecked, setIsAramChecked] = useState(true);
  const [isUrfChecked, setIsUrfChecked] = useState(false);

  const {
    chosenGameMode,
    setPlayers,
    setCurrentPlayerIndex,
    setChosenGameMode,
    setButtonClickCounter,
    players,
    setCheckedGameModes,
    checkedGameModes,
    currentPlayersName,
    setCurrentPlayersName,
    buttonClickCounter,
  } = useContext(BtnContext);

  const backButtonText = players.length === 0 ? 'Change Game Mode' : 'Go Back';
  let background = style.default__background;
  let gameModeIcon;

  const checkBoxModes = [
    {
      label: "SUMMONER'S RIFT",
      value: NORMAL,
      checked: isNormalChecked,
      activeIcon: normalActiveIcon,
      defaultIcon: normalDefaultIcon,
    },
    {
      label: 'ARAM',
      value: ARAM,
      checked: isAramChecked,
      activeIcon: aramActiveIcon,
      defaultIcon: aramDefaultIcon,
    },
    {
      label: 'URF',
      value: URF,
      checked: isUrfChecked,
      activeIcon: urfActiveIcon,
      defaultIcon: urfDefaultIcon,
    },
  ];

  switch (chosenGameMode) {
    case NORMAL:
      background = style.normal;
      gameModeIcon = normalActiveIcon;
      break;
    case ARAM:
      background = style.aram;
      gameModeIcon = aramActiveIcon;
      break;
    case URF:
      gameModeIcon = urfActiveIcon;
      background = style.urf;
      break;
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkedGameModeName = event.target.value;
    const isGameModeChecked = event.target.checked;

    switch (checkedGameModeName) {
      case NORMAL:
        setIsNormalChecked(isGameModeChecked);
        break;
      case ARAM:
        setIsAramChecked(isGameModeChecked);
        break;
      case URF:
        setIsUrfChecked(isGameModeChecked);
    }

    if (isGameModeChecked === true) {
      setCheckedGameModes([...checkedGameModes, checkedGameModeName]);
    } else {
      setCheckedGameModes([
        ...checkedGameModes.filter((gameModes) => gameModes !== checkedGameModeName),
      ]);
    }
  };

  const handleBackButton = () => {
    if (players.length === 0) {
      setChosenGameMode(undefined);
    }
    if (buttonClickCounter > 2) {
      setButtonClickCounter(1);
    } else {
      setButtonClickCounter((prevCounter) => prevCounter - 1);
    }
    setCurrentPlayersName(undefined);
    setPlayers([]);
    setCurrentPlayerIndex(1);
  };

  return (
    <div className={background}>
      <Header />

      <section>
        {chosenGameMode && (
          <div className={style.section_header}>
            <div className={style.section_left_box}>
              <button onClick={handleBackButton}>
                <span className={style.hover_text}>{backButtonText}</span>
              </button>
              <img src={gameModeIcon}></img>
              <h2>Game mode: {chosenGameMode}</h2>
            </div>
            {currentPlayersName && (
              <h2 className={style.statusText}>Picking for : {currentPlayersName}</h2>
            )}
          </div>
        )}
        {!chosenGameMode && (
          <div className={style.gameMode_container}>
            {checkBoxModes.map((mode) => (
              <div className={style.gameMode_container__box} key={mode.value}>
                <img src={mode.checked ? mode.activeIcon : mode.defaultIcon} />
                <label>{mode.label}</label>
                <div className={style.checkbox}>
                  <input
                    type='checkbox'
                    checked={mode.checked}
                    value={mode.value}
                    onChange={handleCheckboxChange}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        {chosenGameMode === NORMAL && <SummonersRift />}
        {chosenGameMode === ARAM && <HowlingAbyss />}
        {chosenGameMode === URF && <SummonersRift />}
      </section>

      <Footer />
    </div>
  );
};

export default LeagueRandomized;
