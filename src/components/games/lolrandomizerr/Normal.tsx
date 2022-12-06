import React, {type ReactElement, useState} from 'react';
import Player from './Player';

const players = [{playerName: 'Arventrox', playerRole: 'bottom', playerChampion: 'Caytlin'},
	{playerName: 'Anglox', playerRole: 'top', playerChampion: 'Jax'},
	{playerName: 'MonkerB', playerRole: 'mid', playerChampion: 'Azir'}];

const Normal = () => {
	// Getting number of players

	const options = ['1', '2', '3', '4', '5'];
	const [selectedNumber, setSelectedNumber] = useState(options[0]);

	const chosenNumberPlayers = (event: React.ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();
		setSelectedNumber(event.target.value);
	};

	// Creating Input fields depending on chosen number of players
	const inputFields: ReactElement[] = [];

	// Getting players name

	//	OPITVAM SE DA VZEMA STOINOSTITE OT INPUT FIELDOVETE NO NE ZNAM KAK KOGATO SA DYNAMIC CREATED

	for (let i = 1; i <= Number(selectedNumber); i++) {
		inputFields.push(<div key={i}>
			<label htmlFor='playersName'>Enter player {i}  name: </label>
			<input key={i} type='text' id='playersName' />
		</div>);
		// SetEnteredName();
	}

	return (<div>
		{/* Getting The Number of players  */}
		<select value={selectedNumber} onChange={chosenNumberPlayers} id='numberOfPlayers'>
			{options.map(option =>
				<option key={option} value={option}>{option}</option>,
			)}
		</select>
		{/* Adding input fields */}
		{inputFields}
		{/* Maping the single player */}
		<div>
			{players.map(({playerChampion, playerName, playerRole}) => <Player key={playerName} playerName={ playerName} playerRole={playerRole} playerChampion={playerChampion} />)}
		</div>
	</div>);
};

export default Normal;
