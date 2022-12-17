import React, {useState} from 'react';
import {top, jungle, bottom, middle, support} from '../components/games/lolrandomizerr/ChampionsRoles';
import {type Tplayers, type Props, type Context} from '../components/models/player';

export const playerContext = React.createContext<Context>({
	playersNumber: '',
	playerName: [''],
	players: [],
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onSetPlayersNumber(value: string) { },
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	inputsHandler(event: React.FormEvent) { },
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	playerNameHandler(e: React.FormEvent, index: number) { },
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	removePlayerNameHandler(index: number, e: React.FormEvent) { },
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	submitHandler(event: React.FormEvent) { },

});

const PlayerContextProvider = ({children}: Props) => {
	const [playersNumber, setPlayersNumber] = useState('1');
	const [players, setPlayers] = useState<Tplayers>([]);
	const [playerName, setPlayerName] = useState<string[]>([]);

	let lane = ['TOP', 'JUNGLE', 'MID', 'BOTTOM', 'SUPPORT'];
	let playerChampion;
	const topChampions = top[Math.floor(Math.random() * top.length)];
	const jungleChampions = jungle[Math.floor(Math.random() * jungle.length)];
	const midChampions = middle[Math.floor(Math.random() * middle.length)];
	const bottomChampions = bottom[Math.floor(Math.random() * bottom.length)];
	const supportChampions = support[Math.floor(Math.random() * support.length)];

	const chosenNumberPlayers = (value: string) => {
		setPlayersNumber(value);
	};

	const inputsHandler = (event: React.FormEvent) => {
		event.preventDefault();
		setPlayers([]);

		const inputsList = [];
		for (let i = 0; i < Number(playersNumber); i++) {
			inputsList.push('');
		}

		setPlayerName(inputsList);
	};

	const playerNameHandler = (e: React.FormEvent, index: number) => {
		const {value} = (e.target as HTMLInputElement);
		const list = [...playerName];

		list[index] = value;
		setPlayerName(list);
	};

	const removePlayerNameHandler = (index: number, e: React.FormEvent) => {
		e.preventDefault();
		const list = [...playerName];

		list.splice(index, 1);

		setPlayerName(list);
	};

	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		const playerList = [];

		for (let i = 0; i < Number(playersNumber); i++) {
			if (playerName[i] === '') {
				const list = [...playerName];
				list[i] = 'Please Enter a Name';
				setPlayerName(list);
				return;
			}

			const playerRole: string = lane[Math.floor(Math.random() * lane.length)];

			switch (playerRole) {
				case 'TOP':
					playerChampion = topChampions;
					break;

				case 'JUNGLE':
					playerChampion = jungleChampions;
					break;

				case 'MID':
					playerChampion = midChampions;
					break;

				case 'BOTTOM':
					playerChampion = bottomChampions;

					break;
				case 'SUPPORT':
					playerChampion = supportChampions;

					break;
				default:
					playerChampion = topChampions;
			}

			lane = lane.filter(usedRole => usedRole !== playerRole);

			playerList.push({playerName: playerName[i], playerRole, playerChampion});
		}

		setPlayers(playerList);
		setPlayerName([]);
	};

	//
	return <playerContext.Provider value={{onSetPlayersNumber: chosenNumberPlayers, playersNumber, playerName, inputsHandler, playerNameHandler, removePlayerNameHandler, submitHandler, players}}>
		{children}
	</playerContext.Provider>;
};

export default PlayerContextProvider;
