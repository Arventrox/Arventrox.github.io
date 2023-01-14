export type Tplayers = Array<{
  playerName: string | string[];
  playerRole: string;
  playerChampion: { championName: string; championImage_url: string };
}>;
