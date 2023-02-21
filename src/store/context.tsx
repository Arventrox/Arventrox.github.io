import React, { Dispatch, SetStateAction, useState } from 'react';

import { ARAM, NORMAL } from '../components/LeagueRandomized';
import useGetChampion from '../hooks/useGetChampion';

export interface Role {
  roleName: string;
  roleImg: string;
}
export interface Champion {
  championName: string;
  championImage_url: string;
}

export interface PlayerChampion {
  champion: Champion;
  role: Role;
}
interface Player {
  playerName: string | string[];
  playerChampion: PlayerChampion;
}

interface Props {
  children: JSX.Element;
}

interface BtnContext {
  chosenGameMode: string | undefined;
  setChosenGameMode: Dispatch<SetStateAction<string | undefined>>;
  playerInputs: string[];
  setPlayerInputs: Dispatch<SetStateAction<string[]>>;
  setPlayersNumber: Dispatch<SetStateAction<number>>;
  playersNumber: number;
  players: Array<Player>;
  setPlayers: Dispatch<SetStateAction<Array<Player>>>;
  currentPlayerIndex: number;
  setCurrentPlayerIndex: Dispatch<SetStateAction<number>>;
  setIsFormVisible: Dispatch<SetStateAction<boolean>>;
  isFormVisible: boolean;
  setIsInputFocused: Dispatch<SetStateAction<boolean>>;
  isInputFocused: boolean;
  buttonHandler: () => void;
  setButtonClickCounter: Dispatch<SetStateAction<number>>;
  buttonClickCounter: number;
  setCheckedGameModes: Dispatch<SetStateAction<string[]>>;
  checkedGameModes: string[];
  currentPlayersName: string | string[] | undefined;
  setCurrentPlayersName: Dispatch<SetStateAction<string | string[] | undefined>>;
  setIsCurrentlyPicking: Dispatch<SetStateAction<boolean | null>>;
  isCurrentlyPicking: boolean | null;
}

export const BtnContext = React.createContext<BtnContext>({
  chosenGameMode: undefined,
  setChosenGameMode: () => undefined,
  buttonHandler: () => undefined,
  playerInputs: [],
  setPlayerInputs: () => ['Summoner 1'],
  setPlayersNumber: () => 1,
  playersNumber: 1,
  players: [],
  setPlayers: () => undefined,
  setButtonClickCounter: () => 0,
  buttonClickCounter: 0,
  setCurrentPlayerIndex: () => 1,
  currentPlayerIndex: 1,
  setIsFormVisible: () => false,
  isFormVisible: false,
  isInputFocused: true,
  setIsInputFocused: () => true,
  setCheckedGameModes: () => [],
  checkedGameModes: [],
  currentPlayersName: '',
  setCurrentPlayersName: () => '',
  setIsCurrentlyPicking: () => false,
  isCurrentlyPicking: false,
});

const BtnContextProvider = ({ children }: Props) => {
  const [chosenGameMode, setChosenGameMode] = useState<string | undefined>();
  const [buttonClickCounter, setButtonClickCounter] = useState(0);
  const [checkedGameModes, setCheckedGameModes] = useState<string[]>([NORMAL, ARAM]);

  const [players, setPlayers] = useState<Array<Player>>([]);
  const [playerInputs, setPlayerInputs] = useState<string[]>(['Summoner 1']);
  const [playersNumber, setPlayersNumber] = useState(1);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(1);
  const [currentPlayersName, setCurrentPlayersName] = useState<string | string[]>();
  const [isCurrentlyPicking, setIsCurrentlyPicking] = useState<boolean | null>(null);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(true);

  const randomModeHandler = () => {
    let gameMode: string[] = [''];
    gameMode = [...checkedGameModes];
    const randomGameMode = gameMode[Math.floor(Math.random() * gameMode.length)];
    setChosenGameMode(randomGameMode);
  };

  const aramRandomModeHandler = () => {
    if (checkedGameModes.length === 1 && checkedGameModes.includes(ARAM)) {
      setChosenGameMode(undefined);
      setButtonClickCounter(0);
    } else {
      randomModeHandler();
    }
  };

  const getPlayersHandler = () => {
    const playerList = [];
    let lane = ['TOP', 'JUNGLE', 'MIDDLE', 'BOTTOM', 'SUPPORT'];

    for (let i = 0; i < playersNumber; i++) {
      const playerRole: string = lane[Math.floor(Math.random() * lane.length)];
      const playerChampion = useGetChampion(playerRole);
      lane = lane.filter((usedRole) => usedRole !== playerRole);

      playerList.push({
        playerName: playerInputs[i],
        playerChampion,
      });
    }

    setPlayers(playerList);
    setPlayerInputs(['Summoner 1']);
  };

  const copyToClipBoard = async () => {
    const copyPlayers = players.map(
      (player) =>
        `Name: ${player.playerName} Role: ${player.playerChampion.role.roleName} Champion: ${player.playerChampion.champion.championName}\n`,
    );

    try {
      await navigator.clipboard.writeText(copyPlayers.toLocaleString());
      console.log('Content copied to clipboard');
      /* Resolved - text copied to clipboard successfully */
    } catch (err) {
      console.error('Failed to copy: ', err);
      /* Rejected - text failed to copy to the clipboard */
    }
  };

  const buttonHandler = () => {
    switch (buttonClickCounter) {
      case 0:
        randomModeHandler();
        setButtonClickCounter((prevCounter) => prevCounter + 1);
        break;
      case 1:
        //gameMode is rendered
        if (chosenGameMode === ARAM) {
          aramRandomModeHandler();
        } else {
          if (playerInputs.length !== 0) {
            setButtonClickCounter((prevCounter) => prevCounter + 1);
            getPlayersHandler();
          }
        }
        break;
      case 2:
        //Players are rendered
        setButtonClickCounter((prevCounter) => prevCounter + 1);
        break;
      case 3:
        // Role is rendered
        if (!isCurrentlyPicking) {
          setButtonClickCounter((prevCounter) => prevCounter + 1);
        }

        break;
      case 4:
        // Champion is rendered
        if (!isCurrentlyPicking) {
          if (currentPlayerIndex < playersNumber) {
            setCurrentPlayerIndex((prevIndex) => prevIndex + 1);
            setButtonClickCounter((prevCounter) => prevCounter - 2);
          } else {
            copyToClipBoard();
          }
        }
        break;
    }
  };

  return (
    <BtnContext.Provider
      value={{
        chosenGameMode,
        setChosenGameMode,
        buttonHandler,
        playerInputs,
        setPlayerInputs,
        setPlayersNumber,
        playersNumber,
        players,
        setPlayers,
        setCurrentPlayerIndex,
        currentPlayerIndex,
        buttonClickCounter,
        isFormVisible,
        setIsFormVisible,
        isInputFocused,
        setIsInputFocused,
        setButtonClickCounter,
        setCheckedGameModes,
        checkedGameModes,
        currentPlayersName,
        setCurrentPlayersName,
        setIsCurrentlyPicking,
        isCurrentlyPicking,
      }}
    >
      {children}
    </BtnContext.Provider>
  );
};

export default BtnContextProvider;
