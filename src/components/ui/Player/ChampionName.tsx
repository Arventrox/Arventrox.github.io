import React, { FC } from 'react';
import { Champion } from '../../../store/context';
import useChampionDisplay from '../../../hooks/useChampionDisplay';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

interface Props {
  reroll: Champion | undefined;
  championName: string;
  role: string;
}

const ChampionName: FC<Props> = ({ reroll, championName, role }) => {
  const { width } = useWindowDimensions();

  const championText = reroll?.championName ? reroll?.championName : championName;
  const currentChampion = useChampionDisplay(role);

  return (
    <p>
      {width > 400 ? 'Champion:' : ''}
      {currentChampion ? currentChampion.championName : championText}
    </p>
  );
};

export default ChampionName;
