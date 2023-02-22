import React, { useContext, useEffect, useState } from 'react';

import SummonersRift from './SummonersRift';
import style from './LeagueRandomized.module.scss';
import Header from './ui/Header/Header';
import Footer from './ui/Footer/Footer';
import HowlingAbyss from './HowlingAbyss';
import { BtnContext } from '../store/context';

import defaultBG from '../assets/images/defaultBG.png';
import normalBG from '../assets/images/normal.png';
import aramBG from '../assets/images/aram.png';
import urfBG from '../assets/images/urf.png';

import normalActiveIcon from '../assets/images/game-icon-normal-hover.png';
import normalDefaultIcon from '../assets/images/game-icon-normal-default.png';
import aramActiveIcon from '../assets/images/game-icon-aram-hover.png';
import aramDefaultIcon from '../assets/images/game-icon-aram-default.png';
import urfActiveIcon from '../assets/images/game-icon-urf-hover.png';
import urfDefaultIcon from '../assets/images/game-icon-urf-default.png';

import activeVideo from '../assets/videos/eog_looping_bgmagic.webm';

export const NORMAL = 'SR NORMAL';
export const ARAM = 'HA ARAM';
export const URF = 'SR URF';

const LeagueRandomized = () => {
  const [isNormalChecked, setIsNormalChecked] = useState(true);
  const [isAramChecked, setIsAramChecked] = useState(true);
  const [isUrfChecked, setIsUrfChecked] = useState(false);
  const [statusText, setStatusText] = useState<string>('');
  const [background, setBackground] = useState(defaultBG);
  const [gameModeIcon, setGameModeIcon] = useState<string | undefined>(undefined);

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
    isCurrentlyPicking,
    setIsCurrentlyPicking,
    playersNumber,
    currentPlayerIndex,
    playerInputs,
    setPlayerInputs,
  } = useContext(BtnContext);

  const backButtonText = players.length === 0 ? 'Change Game Mode' : 'Go Back';

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

  useEffect(() => {
    switch (chosenGameMode) {
      case NORMAL:
        setBackground(normalBG);
        setGameModeIcon(normalActiveIcon);
        break;
      case ARAM:
        setBackground(aramBG);
        setGameModeIcon(aramActiveIcon);

        break;
      case URF:
        setBackground(urfBG);
        setGameModeIcon(urfActiveIcon);
        break;
      default:
        setBackground(defaultBG);
        setGameModeIcon(undefined);
        break;
    }
  }, [chosenGameMode]);

  // Setting the statusText
  useEffect(() => {
    switch (buttonClickCounter) {
      case 2:
        setStatusText(`click choose role button to select the role for  ${currentPlayersName}`);
        break;
      case 3:
        if (isCurrentlyPicking) {
          setStatusText(`picking role for  ${currentPlayersName}`);
        } else {
          setStatusText(
            `click choose champion button to select the Role for : ${currentPlayersName}`,
          );
        }
        break;
      case 4:
        if (isCurrentlyPicking) {
          setStatusText(`picking champion for  ${currentPlayersName}`);
        } else {
          if (currentPlayerIndex < playersNumber) {
            setStatusText(`click next to go to the next player`);
          } else {
            setStatusText('copy lobby results to clipboard');
          }
        }
        break;
    }
  }, [isCurrentlyPicking, buttonClickCounter, currentPlayersName]);

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
    if (players.length === 0) setChosenGameMode(undefined);
    if (playerInputs.length < 1) {
      console.log(playerInputs.length);

      setPlayerInputs(['Summoner 1']);
    }
    if (buttonClickCounter > 2) {
      setButtonClickCounter(1);
    } else {
      setButtonClickCounter((prevCounter) => prevCounter - 1);
    }

    setIsCurrentlyPicking(false);
    setCurrentPlayersName(undefined);
    setPlayers([]);
    setCurrentPlayerIndex(1);
  };
  return (
    <div
      className={style.leagueRandomized_container}
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <Header />

      <section>
        {chosenGameMode && (
          <div className={style.section_header}>
            <div className={style.section_left_box}>
              <button onClick={handleBackButton}>
                <span className={style.hover_text}>{backButtonText}</span>
              </button>
              <img src={gameModeIcon}></img>
              <h2>GAME MODE: {chosenGameMode}</h2>
            </div>
            {currentPlayersName && <h2 className={style.statusText}>{statusText.toUpperCase()}</h2>}
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
                {mode.checked && <video src={activeVideo} loop autoPlay muted />}
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
