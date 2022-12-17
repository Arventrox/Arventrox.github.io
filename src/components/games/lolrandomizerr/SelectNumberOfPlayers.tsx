import React, {Fragment, type FC, useContext} from 'react';
import AddPlayersInfo from './AddPlayersInfo';
import {playerContext} from '../../../context/lolrandomizer-context';

const SelectNumberOfPlayers: FC = () => {
	const {onSetPlayersNumber, playersNumber} = useContext(playerContext);
	const options: number[] = [];

	for (let i = 1; i <= 5; i++) {
		options.push(i);
	}

	const chosenNumberPlayers = (event: React.ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();
		onSetPlayersNumber(event.target.value);
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
		<AddPlayersInfo />
	</Fragment>);
};

export default SelectNumberOfPlayers;
