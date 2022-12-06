import React, {type ReactElement, useEffect, useState} from 'react';

const LaneChampionsRandomizer = () => {
	const lane = ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'];
	const options = [{value: '1'}, {value: '2'}, {value: '3'}, {value: '4'}, {value: '5'}];

	const [selectedNumber, setSelectedNumber] = useState(options[0].value);
	const [playersName, setPlayersName] = useState('');
	const [chosenLane, setChosenLane] = useState('');
	const playerInput: ReactElement[] = [];

	const players = [];

	useEffect(() => {
		setChosenLane(lane[Math.floor(Math.random() * lane.length)]);
	}, []);

	const chosenNumberPlayers = (event: React.ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();
		setSelectedNumber(event.target.value);
	};

	const getPlayersNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPlayersName(event.target.value);
		console.log(playersName);
	};

	const player = {
		name: playersName,
		id: Number(selectedNumber),
		champion: 'asdasd',
		lane: chosenLane,
	};
	for (let i = 0; i < Number(selectedNumber); i++) {
		playerInput.push(<div key={i}>
			<label htmlFor='playersName'>Enter players name : </label>
			<input key={i} onChange={getPlayersNameHandler} type='text' id='playersName' />
		</div>);
	}

	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();
	};

	return (<div>
		<form onSubmit={submitHandler}>
			<label htmlFor='numberOfPlayers'>Chose number of players </label>
			<select value={selectedNumber} onChange={chosenNumberPlayers} id='numberOfPlayers'>
				{options.map(option =>
					<option key={option.value} value={option.value}>{option.value }</option>,
				)}
			</select>
			{playerInput}
			<button >Chose Roles and Champions</button>
		</form>
		<p> The randomizer chose for you : {chosenLane}</p>
	</div>);
};

export default LaneChampionsRandomizer;
