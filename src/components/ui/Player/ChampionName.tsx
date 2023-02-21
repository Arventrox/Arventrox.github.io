import React, { FC } from 'react';
import { Champion } from '../../../store/context';
import useChampionDisplay from '../../../hooks/useChampionDisplay';

interface Props {
  reroll: Champion | undefined;
  championName: string;
  role: string;
}

const ChampionName: FC<Props> = ({ reroll, championName, role }) => {
  const championText = reroll?.championName ? reroll?.championName : championName;
  const currentChampion = useChampionDisplay(role);

  return <p>Champion:{currentChampion ? currentChampion.championName : championText}</p>;
};

export default ChampionName;
