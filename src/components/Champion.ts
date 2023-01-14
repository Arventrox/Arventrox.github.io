import championData from '../data/championData.json';

export const generateRandomChampions = () => {
  // const topChampions = top[Math.floor(Math.random() * top.length)];
  const topindex = Math.floor(Math.random() * championData.lanes[0].topChampions.length);
  const topChampions = championData.lanes[0].topChampions[topindex];

  const jungleIndex = Math.floor(Math.random() * championData.lanes[0].jungle.length);
  const jungleChampions = championData.lanes[0].jungle[jungleIndex];

  const midIndex = Math.floor(Math.random() * championData.lanes[0].mid.length);
  const midChampions = championData.lanes[0].mid[midIndex];

  const bottomIndex = Math.floor(Math.random() * championData.lanes[0].bottom.length);
  const bottomChampions = championData.lanes[0].bottom[bottomIndex];

  const supportIndex = Math.floor(Math.random() * championData.lanes[0].support.length);
  const supportChampions = championData.lanes[0].support[supportIndex];

  return { topChampions, jungleChampions, midChampions, bottomChampions, supportChampions };
};
