import { generateRandomChampions } from './Champion';

export const getRandomChampionByRole = (role: string) => {
  const { topChampions, jungleChampions, midChampions, bottomChampions, supportChampions } =
    generateRandomChampions();

  switch (role) {
    case 'TOP':
      return topChampions;
    case 'JUNGLE':
      return jungleChampions;
    case 'MID':
      return midChampions;
    case 'BOTTOM':
      return bottomChampions;
    case 'SUPPORT':
      return supportChampions;
    default:
      return topChampions;
  }
};
