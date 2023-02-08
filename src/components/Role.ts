import { Champions } from './Champion';

export const getRandomChampionByRole = (role: string) => {
  const { topChampion, jungleChampion, midChampion, bottomChampion, supportChampion } = Champions();

  switch (role) {
    case 'TOP':
      return topChampion;
    case 'JUNGLE':
      return jungleChampion;
    case 'MID':
      return midChampion;
    case 'BOTTOM':
      return bottomChampion;
    case 'SUPPORT':
      return supportChampion;
    default:
      return topChampion;
  }
};
