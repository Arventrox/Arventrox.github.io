import { useState, useEffect } from 'react';
import championData from '../data/championData.json';

export interface Champion {
  championName: string;
  championImage_url: string;
}

interface RoleChampions {
  [key: string]: Champion[];
}

const { lanes } = championData;
const TOP = lanes[0].top;
const JUNGLE = lanes[0].jungle;
const MIDDLE = lanes[0].mid;
const BOTTOM = lanes[0].bottom;
const SUPPORT = lanes[0].support;

const roleChampions: RoleChampions = {
  TOP: TOP,
  JUNGLE: JUNGLE,
  MIDDLE: MIDDLE,
  BOTTOM: BOTTOM,
  SUPPORT: SUPPORT,
};
const useChampionDisplay = (role: string, startInterval: boolean) => {
  const [currentChampion, setCurrentChampion] = useState<Champion | null>(null);

  useEffect(() => {
    if (!startInterval) {
      return;
    }
  }, [startInterval]);

  useEffect(() => {
    const champions = roleChampions[role];
    let index = 0;
    let displayedChampions = 0;

    const interval = 300;
    let previousTime = performance.now();

    const intervalId = setInterval(() => {
      const currentTime = performance.now();
      const elapsedTime = currentTime - previousTime;
      if (elapsedTime >= interval) {
        setCurrentChampion(champions[index]);
        displayedChampions += 1;
        index = (index + 1) % champions.length;
        previousTime = currentTime;

        if (displayedChampions > 10) {
          clearInterval(intervalId);
          setCurrentChampion(null);
        }
      }
    }, interval);

    return () => {
      clearInterval(interval);
    };
  }, [role]);

  return currentChampion;
};

export default useChampionDisplay;
