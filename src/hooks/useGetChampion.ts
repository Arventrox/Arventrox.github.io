import championData from '../data/championData.json';

import topImg from '../assets/images/position-top.svg';
import jungleImg from '../assets/images/position-jungle.svg';
import middleImg from '../assets/images/position-middle.svg';
import bottomImg from '../assets/images/position-bottom.svg';
import supportImg from '../assets/images/position-utility.svg';

const { lanes } = championData;

const top = () => {
  const top = lanes[0].top;
  const topIndex = Math.floor(Math.random() * top.length);
  const topChampion = { champion: top[topIndex], role: { roleName: 'TOP', roleImg: topImg } };
  return topChampion;
};

const jungle = () => {
  const jungle = lanes[0].jungle;
  const jungleIndex = Math.floor(Math.random() * jungle.length);
  const jungleChampion = {
    champion: jungle[jungleIndex],
    role: { roleName: 'JUNGLE', roleImg: jungleImg },
  };
  return jungleChampion;
};

const middle = () => {
  const mid = lanes[0].mid;
  const midIndex = Math.floor(Math.random() * mid.length);
  const midChampion = { champion: mid[midIndex], role: { roleName: 'MIDDLE', roleImg: middleImg } };
  return midChampion;
};

const bottom = () => {
  const bottom = lanes[0].bottom;
  const bottomIndex = Math.floor(Math.random() * bottom.length);
  const bottomChampion = {
    champion: bottom[bottomIndex],
    role: { roleName: 'BOTTOM', roleImg: bottomImg },
  };
  return bottomChampion;
};

const support = () => {
  const support = lanes[0].support;
  const supportIndex = Math.floor(Math.random() * support.length);
  const supportChampion = {
    champion: support[supportIndex],
    role: { roleName: 'SUPPORT', roleImg: supportImg },
  };
  return supportChampion;
};
const topChampion = top();
const jungleChampion = jungle();
const midChampion = middle();
const bottomChampion = bottom();
const supportChampion = support();

export const roles = [topChampion, jungleChampion, midChampion, bottomChampion, supportChampion];

const useGetChampion = (role: string) => {
  const topChampion = top();
  const jungleChampion = jungle();
  const midChampion = middle();
  const bottomChampion = bottom();
  const supportChampion = support();

  switch (role) {
    case 'TOP':
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
