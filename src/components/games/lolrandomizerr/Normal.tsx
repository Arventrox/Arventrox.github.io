import React, {type ReactElement, useState, useEffect, Fragment} from 'react';
import Player from './Player';

const players = [{playerName: 'Arventrox', playerRole: 'bottom', playerChampion: 'Caytlin'},
	{playerName: 'Anglox', playerRole: 'top', playerChampion: 'Jax'},
	{playerName: 'MonkerB', playerRole: 'mid', playerChampion: 'Azir'}];

const options = ['1', '2', '3', '4', '5'];
const Normal = () => {
	const [selectedNumber, setSelectedNumber] = useState(options[0]);
	const [playerName, setPlayerName] = useState([{playerName: ''}]);
	const [playersVisible, setPlayersVisible] = useState(false);

	console.log(playerName);

	// Getting number of players

	const chosenNumberPlayers = (event: React.ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();
		setSelectedNumber(prevEvent => event.target.value);
	};

	const addplayerNameHandler = (event: React.FormEvent) => {
		event.preventDefault();
		const list = [];

		for (let i = 0; i < Number(selectedNumber); i++) {
			list.push({playerName: ''});
		}

		setPlayerName(list);
		setPlayersVisible(true);
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

	console.log(players);

	return (<Fragment>
		<form >
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
		</form>

		{/* Maping the single player */}
		{(playersVisible && players.map(({playerChampion, playerName, playerRole}) =>
			<Player key={playerName} playerName={playerName} playerRole={playerRole} playerChampion={playerChampion} />))}
	</Fragment>);
};

export default Normal;
