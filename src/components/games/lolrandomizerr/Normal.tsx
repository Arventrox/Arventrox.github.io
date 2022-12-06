import React, {type ReactElement, useState} from 'react';

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

	// Console.log(selectedNumber);

	// Creating Input fields depending on chosen number of players
	const inputFields: ReactElement[] = [];

	// Getting players name
	const [enteredName, setEnteredName] = useState('');
	const playersName = [];

	const playerNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		//
	};

	playersName.push(enteredName);
	// Console.log(playersName);
	// console.log(inputFields);

	//	OPITVAM SE DA VZEMA STOINOSTITE OT INPUT FIELDOVETE NO NE ZNAM KAK KOGATO SA DYNAMIC CREATED

	for (let i = 1; i <= Number(selectedNumber); i++) {
		inputFields.push(<div key={i}>
			<label htmlFor='playersName'>Enter player {i}  name: </label>
			<input key={i} onChange={playerNameHandler} type='text' id='playersName' />
		</div>);
		// SetEnteredName();
		// For (const singleInput of inputFields) {
		// 	// Console.log(singleInput);
		// }
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
			{players.map(player => <div key={player.playerName}><p>Name :{player.playerName}</p>
				<p>Role: {player.playerRole}</p>
				<p>Champion: {player.playerChampion}</p></div>)}
		</div>
	</div>);
};

export default Normal;
