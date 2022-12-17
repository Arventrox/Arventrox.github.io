export type Tplayers = Array<{
	playerName: string | string[];
	playerRole: string | string[];
	playerChampion: string;
}>;
export type Props = {
	children: JSX.Element;
};

export type Context = {
	playersNumber: string;
	playerName: string[];
	players: Tplayers;
	onSetPlayersNumber: (value: string) => void;
	inputsHandler: (event: React.FormEvent) => void;
	playerNameHandler: (e: React.FormEvent, index: number) => void;
	removePlayerNameHandler: (index: number, e: React.FormEvent) => void;
	submitHandler: (event: React.FormEvent) => void;
};
