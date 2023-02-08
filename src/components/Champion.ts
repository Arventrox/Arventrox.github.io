import championData from '../data/championData.json';

import topImg from '../assets/images/position-top.svg';
import jungleImg from '../assets/images/position-jungle.svg';
import middleImg from '../assets/images/position-middle.svg';
import bottomImg from '../assets/images/position-bottom.svg';
import supportImg from '../assets/images/position-utility.svg';

export const Champions = () => {
  const { lanes } = championData;

  const top = lanes[0].top;
  const topIndex = Math.floor(Math.random() * top.length);
  const topChampion = { role: top[topIndex], roleImg: topImg };

  const jungle = lanes[0].jungle.filter(
    (champion) => champion.championName !== topChampion.role.championName,
  );
  const jungleIndex = Math.floor(Math.random() * jungle.length);
  const jungleChampion = { role: jungle[jungleIndex], roleImg: jungleImg };

  const mid = lanes[0].mid.filter(
    (champion) =>
      champion.championName !== jungleChampion.role.championName && topChampion.role.championName,
  );
  const midIndex = Math.floor(Math.random() * mid.length);
  const midChampion = { role: mid[midIndex], roleImg: middleImg };

  const bottom = lanes[0].bottom.filter(
    (champion) =>
      champion.championName !== jungleChampion.role.championName &&
      topChampion.role.championName &&
      midChampion.role.championName,
  );
  const bottomIndex = Math.floor(Math.random() * bottom.length);
  const bottomChampion = { role: bottom[bottomIndex], roleImg: bottomImg };

  const support = lanes[0].support.filter(
    (champion) =>
      champion.championName !== jungleChampion.role.championName &&
      topChampion.role.championName &&
      midChampion.role.championName &&
      bottomChampion.role.championName,
  );
  const supportIndex = Math.floor(Math.random() * support.length);
  const supportChampion = { role: support[supportIndex], roleImg: supportImg };

  return { topChampion, jungleChampion, midChampion, bottomChampion, supportChampion };
};
