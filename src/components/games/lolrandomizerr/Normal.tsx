import React, {type ReactElement, useState, useEffect, Fragment} from 'react';
import Player from './Player';

const options = ['1', '2', '3', '4', '5'];
const Normal = () => {
	const [selectedNumber, setSelectedNumber] = useState(options[0]);
	const [playerName, setPlayerName] = useState([{playerName: ''}]);
	const [players, setPlayers] = useState([{playerName: playerName[0], playerRole: '', playerChampion: ''}]);
	const [playersVisible, setPlayersVisible] = useState(false);

	// Getting number of players
	type Players = Array<{
		playerName: {playerName: string};
		playerRole: string;
		playerChampion: string;
	}>;

	const chosenNumberPlayers = (event: React.ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();
		setSelectedNumber(event.target.value);
	};

	const addplayerNameHandler = (event: React.FormEvent) => {
		event.preventDefault();
		const list = [];
		const playerslist = [];
		for (let i = 0; i < Number(selectedNumber); i++) {
			list.push({playerName: ''});
			playerslist.push({playerName: playerName[0], playerRole: '', playerChampion: ''});
		}

		setPlayerName(list);
		setPlayers(playerslist);
	};

	// Removing players
	const removeplayerNameHandler = (index: number, e: React.FormEvent) => {
		e.preventDefault();
		const list = [...playerName];

		list.splice(index, 1);
		setPlayerName(list);
	};
	// Getting players name

	const playerNameHandler = (e: React.FormEvent, index: number) => {
		const {value} = (e.target as HTMLInputElement);
		const list = [...playerName];
		list[index].playerName = value;
		setPlayerName(list);
	};

	const submitPlayersHandler = (event: React.FormEvent) => {
		event.preventDefault();
		const playerslist = [];

		for (let i = 0; i < Number(selectedNumber); i++) {
			if (players[i].playerName.playerName === '') {
				return;
			}

			playerslist.push({playerName: playerName[i], playerRole: '', playerChampion: ''});
		}

		setPlayers(playerslist);
		setPlayersVisible(true);
	};

	return (<Fragment>
		<form onSubmit={submitPlayersHandler} >
			{/* Getting The Number of players  */}
			<span>
				<label>Chose a number of players</label>
				<select value={selectedNumber} onChange={ chosenNumberPlayers} id='numberOfPlayers'>
					{options.map(option =>
						<option key={option} value={option}>{option}</option>,
					)}
				</select>
			</span>

			{/* Adding input fields */}
			{playerName.map((singleInput, index) => (<div key={index}>
				<label htmlFor='playersName'>Enter Player {index + 1}: </label>
				<input type='text' id='playersName' value={singleInput.playerName} onChange={e => {
					playerNameHandler(e, index);
				}} />
				<span>
					<button onClick={e => {
						removeplayerNameHandler(index, e);
					}} >Remove Player</button>
				</span>
			</div>))}
			<button onClick={addplayerNameHandler} >Select the number of players</button>
			<button>Submit Players</button>
		</form>

		{/* Maping the single player */}
		{(playersVisible && players.map(({playerChampion, playerName, playerRole}, index) =>
			<Player key={index} playerName={playerName.playerName} playerRole={playerRole} playerChampion={playerChampion}
			/>))}
	</Fragment>);
};

export default Normal;
