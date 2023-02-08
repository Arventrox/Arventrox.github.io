export type Tplayers = Array<{
  playerName: string | string[];
  playerRole: string;
  playerChampion: {
    role: {
      championName: string;
      championImage_url: string;
    };
    roleImg: string;
  };
}>;
