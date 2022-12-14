import React, {type FC, useState, useEffect} from 'react';
import {type Tplayers} from '../../models/player';
import {top, jungle, bottom, middle, support} from './ChampionsRoles';
import file from './ChampionsByRoles.json';

const NameInput: FC<{playersNumber: string; onSetPlayers: React.Dispatch<React.SetStateAction<Tplayers>>}> = props => {
	const [playerName, setPlayerName] = useState<string[]>([]);
	const {playersNumber, onSetPlayers} = props;

	const {topChampions}: any = file;

	// For (const key in topChampions) {
	// 	console.log(key);

	// 	// eslint-disable-next-line guard-for-in
	// 	for (const key1 in topChampions[key]) {
	// 		const top = topChampions;
	// 		console.log(topChampions[key][key1]);
	// 	}
	// }

	const inputsHandler = (event: React.FormEvent) => {
		event.preventDefault();
		onSetPlayers([]);

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

	const removeplayerNameHandler = (index: number, e: React.FormEvent) => {
		e.preventDefault();
		const list = [...playerName];

		list.splice(index, 1);

		setPlayerName(list);
	};

	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();

		const playerList = [];
		let lane = ['TOP', 'JUNGLE', 'MID', 'BOTTOM', 'SUPPORT'];
		let playerChampion;
		const topChampions = top[Math.floor(Math.random() * top.length)];
		const jungleChampions = jungle[Math.floor(Math.random() * jungle.length)];
		const midChampions = middle[Math.floor(Math.random() * middle.length)];
		const bottomChampions = bottom[Math.floor(Math.random() * bottom.length)];
		const supportChampions = support[Math.floor(Math.random() * support.length)];

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

		onSetPlayers(playerList);
		setPlayerName([]);
	};

	return <form onSubmit={submitHandler}>

		{playerName.map((singleInput, index) => (
			<div key={index}>
				<label htmlFor='playersName'>Enter Player {index + 1}: </label>
				<input type='text' id='playersName' value={singleInput} onChange={e => {
					playerNameHandler(e, index);
				}} />
				<span>
					<button onClick={e => {
						removeplayerNameHandler(index, e);
					}} >Remove Player</button>
				</span>
			</div>
		))}
		<button onClick={inputsHandler} >Select the number of players</button>
		{playerName.length !== 0 && <button>Submit Players</button>}

	</form>;
};

export default NameInput;
