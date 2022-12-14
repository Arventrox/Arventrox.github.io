import React, {Fragment, useState, type FC} from 'react';
import AddPlayersInfo from './AddPlayersInfo';
import {type Tplayers} from '../../models/player';

const SelectNumberOfPlayers: FC<{onSetPlayers: React.Dispatch<React.SetStateAction<Tplayers>>}> = props => {
	const [playersNumber, setPlayersNumber] = useState('1');

	const {onSetPlayers} = props;
	const options: number[] = [];

	for (let i = 1; i <= 5; i++) {
		options.push(i);
	}

	const chosenNumberPlayers = (event: React.ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();
		setPlayersNumber(event.target.value);
	};

	return (<Fragment>
		<span>
			<label>Chose a number of players</label>
			<select value={playersNumber} onChange={ chosenNumberPlayers} id='numberOfPlayers'>
				{options.map(option =>
					<option key={option} value={option}>{option}</option>,
				)}
			</select>
		</span>
		<AddPlayersInfo playersNumber={playersNumber} onSetPlayers={onSetPlayers} />
	</Fragment>);
};

export default SelectNumberOfPlayers;
