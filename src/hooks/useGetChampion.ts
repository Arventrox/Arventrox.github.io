import championData from '../data/championData.json';

import topImg from '../assets/images/position-top.svg';
import jungleImg from '../assets/images/position-jungle.svg';
import middleImg from '../assets/images/position-middle.svg';
import bottomImg from '../assets/images/position-bottom.svg';
import supportImg from '../assets/images/position-utility.svg';

const { lanes } = championData;

let top = lanes[0].top;
const topIndex = Math.floor(Math.random() * top.length);
const topChampion = { champion: top[topIndex], role: { roleName: 'TOP', roleImg: topImg } };

const jungle = lanes[0].jungle.filter(
  (champion) => champion.championName !== topChampion.champion.championName,
);
const jungleIndex = Math.floor(Math.random() * jungle.length);
const jungleChampion = {
  champion: jungle[jungleIndex],
  role: { roleName: 'JUNGLE', roleImg: jungleImg },
};
const mid = lanes[0].mid.filter(
  (champion) =>
    champion.championName !== jungleChampion.champion.championName &&
    topChampion.champion.championName,
);
const midIndex = Math.floor(Math.random() * mid.length);
const midChampion = { champion: mid[midIndex], role: { roleName: 'MIDDLE', roleImg: middleImg } };

const bottom = lanes[0].bottom.filter(
  (champion) =>
    champion.championName !== jungleChampion.champion.championName &&
    topChampion.champion.championName &&
    midChampion.champion.championName,
);
const bottomIndex = Math.floor(Math.random() * bottom.length);
const bottomChampion = {
  champion: bottom[bottomIndex],
  role: { roleName: 'BOTTOM', roleImg: bottomImg },
};

const support = lanes[0].support.filter(
  (champion) =>
    champion.championName !== jungleChampion.champion.championName &&
    topChampion.champion.championName &&
    midChampion.champion.championName &&
    bottomChampion.champion.championName,
);
const supportIndex = Math.floor(Math.random() * support.length);
const supportChampion = {
  champion: support[supportIndex],
  role: { roleName: 'SUPPORT', roleImg: supportImg },
};

export const roles = [topChampion, jungleChampion, midChampion, bottomChampion, supportChampion];

const useGetChampion = (role: string) => {
  switch (role) {
    case 'TOP':
      top = top.filter((usedChampion) => usedChampion !== topChampion.champion);
      return topChampion;
    case 'JUNGLE':
      return jungleChampion;
    case 'MIDDLE':
      return midChampion;
    case 'BOTTOM':
      return bottomChampion;
    case 'SUPPORT':
      return supportChampion;
    default:
      return supportChampion;
  }
};

export default useGetChampion;
