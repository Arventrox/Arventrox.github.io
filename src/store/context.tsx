import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Champions } from '../components/Champion';

import { ARAM, NORMAL, URF } from '../components/LeagueRandomized';
import { getRandomChampionByRole } from '../components/Role';

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
  setIsNormalChecked: Dispatch<SetStateAction<boolean>>;
  setIsAramChecked: Dispatch<SetStateAction<boolean>>;
  setIsUrfChecked: Dispatch<SetStateAction<boolean>>;
  isNormalChecked: boolean;
  isAramChecked: boolean;
  isUrfChecked: boolean;
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
  submitHandler: () => void;
  setIsRoleLoader: Dispatch<SetStateAction<boolean[]>>;
  isRoleLoader: boolean[];
  isChampionLoader: boolean[];
  setIsChampionLoader: Dispatch<SetStateAction<boolean[]>>;

  // roleLoader: Role;
  // championLoader: Champion;
  // intervalId: NodeJS.Timeout | null;
  setButtonClickCounter: Dispatch<SetStateAction<number>>;
  buttonClickCounter: number;
}

export const BtnContext = React.createContext<BtnContext>({
  chosenGameMode: undefined,
  setChosenGameMode: () => undefined,
  setIsNormalChecked: () => true,
  setIsAramChecked: () => true,
  setIsUrfChecked: () => false,
  isNormalChecked: true,
  isAramChecked: true,
  isUrfChecked: true,
  submitHandler: () => undefined,
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
  // roleLoader: { roleName: '', roleImg: '' },
  // championLoader: { championName: '', championImage_url: '' },
  // intervalId: null,
  setIsRoleLoader: () => true,
  isRoleLoader: [true],
  isChampionLoader: [true],
  setIsChampionLoader: () => true,
});

const BtnContextProvider = ({ children }: Props) => {
  const [chosenGameMode, setChosenGameMode] = useState<string | undefined>();
  const [buttonClickCounter, setButtonClickCounter] = useState(0);

  const [isNormalChecked, setIsNormalChecked] = useState(true);
  const [isAramChecked, setIsAramChecked] = useState(true);
  const [isUrfChecked, setIsUrfChecked] = useState(false);

  const [players, setPlayers] = useState<Array<Player>>([]);
  const [playerInputs, setPlayerInputs] = useState<string[]>(['Summoner 1']);
  const [playersNumber, setPlayersNumber] = useState(1);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(1);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(true);

  const [isRoleLoader, setIsRoleLoader] = useState<boolean[]>([]);
  const [isChampionLoader, setIsChampionLoader] = useState<boolean[]>([]);

  // const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  // const [roleLoader, setRoleLoader] = useState({ roleName: '', roleImg: '' });
  // const [championLoader, setChampionLoader] = useState({ championName: '', championImage_url: '' });

  const gameMode: string[] = [];
  const { topChampion, jungleChampion, midChampion, bottomChampion, supportChampion } = Champions();

  const roles = [topChampion, jungleChampion, midChampion, bottomChampion, supportChampion];

  // useEffect(() => {
  //   if (intervalId === null) {
  //     return;
  //   }
  //   return () => clearInterval(intervalId);
  // }, [intervalId]);

  const randomModeHandler = () => {
    if (isAramChecked && chosenGameMode !== ARAM) {
      gameMode.push(ARAM);
    }
    if (isUrfChecked && chosenGameMode !== URF) {
      gameMode.push(URF);
    }
    if (isNormalChecked && chosenGameMode !== NORMAL) {
      gameMode.push(NORMAL);
    }
    const randomGameMode = gameMode[Math.floor(Math.random() * gameMode.length)];

    setChosenGameMode(randomGameMode);
  };

  const formSubmitHandler = () => {
    const playerList = [];
    let lane = roles;
    for (let i = 0; i < playersNumber; i++) {
      const playerRole: string = lane[Math.floor(Math.random() * lane.length)].role.roleName;
      const playerChampion = getRandomChampionByRole(playerRole);
      lane = lane.filter((usedRole) => usedRole.role.roleName !== playerRole);

      playerList.push({
        playerName: playerInputs[i],
        playerChampion,
      });
    }

    setPlayers(playerList);
    setPlayerInputs(['Summoner 1']);
  };

  // const roleLoaderHandler = () => {
  //   setChampionLoader(topChampion.champion);

  //   const id = setInterval(() => {
  //     const randomRole = roles[Math.floor(Math.random() * roles.length)];
  //     const randomRoleIndex = roles.indexOf(randomRole);
  //     setRoleLoader(randomRole.role);

  //     if (randomRoleIndex !== -1) {
  //       roles.splice(randomRoleIndex, 1);
  //     }
  //   }, 500);

  //   setIntervalId(id);

  //   setTimeout(() => {
  //     clearInterval(id);
  //     setIntervalId(null);
  //   }, 2500);

  //   setButtonClickCounter((prevState) => prevState + 1);
  // };

  // const championLoaderHandler = () => {
  //   setRoleLoader(topChampion.role);
  //   setChampionLoader(topChampion.champion);

  //   const id = setInterval(() => {
  //     const randomChampion = roles[Math.floor(Math.random() * roles.length)];
  //     const randomChampionIndex = roles.indexOf(randomChampion);

  //     setChampionLoader(randomChampion.champion);

  //     if (randomChampionIndex !== -1) {
  //       roles.splice(randomChampionIndex, 1);
  //     }
  //   }, 500);
  //   setIntervalId(id);
  //   setTimeout(() => {
  //     clearInterval(id);
  //     setIntervalId(null);
  //   }, 2000);
  //   setCurrentPlayerIndex((prevIndex) => prevIndex + 1);
  // };

  const submitHandler = () => {
    switch (buttonClickCounter) {
      case 0:
        randomModeHandler();
        setButtonClickCounter((prevCounter) => prevCounter + 1);
        break;
      case 1:
        if (chosenGameMode === ARAM) {
          randomModeHandler();
        } else {
          setButtonClickCounter((prevCounter) => prevCounter + 1);
          formSubmitHandler();
        }
        break;
      case 2:
        // roleLoaderHandler();
        // setIsRoleLoader(true);
        setIsRoleLoader([...isRoleLoader, true]);
        console.log(isRoleLoader);

        break;
      case 3:
        // championLoaderHandler();
        // setIsChampionLoader(true);
        setIsChampionLoader([...isChampionLoader, true]);
        setCurrentPlayerIndex((prevIndex) => prevIndex + 1);

        // setCurrentPlayerIndex((prevIndex) => prevIndex + 1);

        setButtonClickCounter((prevCounter) => prevCounter - 1);
        break;
    }
  };

  return (
    <BtnContext.Provider
      value={{
        chosenGameMode,
        setChosenGameMode,
        setIsNormalChecked,
        setIsAramChecked,
        setIsUrfChecked,
        isAramChecked,
        isNormalChecked,
        isUrfChecked,
        submitHandler,
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
        isRoleLoader,
        setIsRoleLoader,
        setIsChampionLoader,
        isChampionLoader,
        // roleLoader,
        // championLoader,
        // intervalId,
        setButtonClickCounter,
      }}
    >
      {children}
    </BtnContext.Provider>
  );
};

export default BtnContextProvider;
