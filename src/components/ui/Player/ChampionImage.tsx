import React, { FC, useEffect, useState } from 'react';
import { Champion } from '../../../store/context';
// import questionMarkImage from '../../../assets/images/question_mark.svg';
import useChampionDisplay from '../../../hooks/useChampionDisplay';

interface Props {
  reroll: Champion | undefined;
  championImage_url: string;
  role: string;
}

const ChampionImage: FC<Props> = ({ reroll, championImage_url, role }) => {
  const [renderedImage, setRenderedImage] = useState('');
  const rerollChampionImage = reroll?.championImage_url;
  const championImage = !rerollChampionImage ? championImage_url : rerollChampionImage;

  const currentChampion = useChampionDisplay(role);

  useEffect(() => {
    setRenderedImage(championImage);
  }, [championImage]);

  return (
    <img
      src={currentChampion ? currentChampion.championImage_url : renderedImage}
      alt='champion image'
      loading='lazy'
    />
  );
};

export default ChampionImage;
