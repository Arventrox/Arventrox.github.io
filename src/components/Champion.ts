import championData from '../data/championData.json';

export const generateRandomChampions = () => {
  const { lanes } = championData;

  const top = lanes[0].top;
  const topindex = Math.floor(Math.random() * top.length);
  const topChampion = top[topindex];

  const jungle = lanes[0].jungle.filter(
    (champion) => champion.championName !== topChampion.championName,
  );
  const jungleIndex = Math.floor(Math.random() * jungle.length);
  const jungleChampion = jungle[jungleIndex];

  const mid = lanes[0].mid.filter(
    (champion) => champion.championName !== jungleChampion.championName && topChampion.championName,
  );
  const midIndex = Math.floor(Math.random() * mid.length);
  const midChampion = mid[midIndex];

  const bottom = lanes[0].bottom.filter(
    (champion) =>
      champion.championName !== jungleChampion.championName &&
      topChampion.championName &&
      midChampion.championName,
  );
  const bottomIndex = Math.floor(Math.random() * bottom.length);
  const bottomChampion = bottom[bottomIndex];

  const support = lanes[0].support.filter(
    (champion) =>
      champion.championName !== jungleChampion.championName &&
      topChampion.championName &&
      midChampion.championName &&
      bottomChampion.championName,
  );
  const supportIndex = Math.floor(Math.random() * support.length);
  const supportChampion = support[supportIndex];

  return { topChampion, jungleChampion, midChampion, bottomChampion, supportChampion };
};
