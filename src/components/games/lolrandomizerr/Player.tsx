import React, {useState, useEffect} from 'react';
import {top, jungle, bottom, middle, support} from './ChampionsRoles';

const Player: React.FC <{playerName: string; playerChampion: string; playerRole: string}> = props => {
	const [playerRole, setPlayerRole] = useState('');
	const [playerChampion, setPlayerChampion] = useState('');

	const {playerName} = props;
	// Chosing lane
	const lane = ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'];
	useEffect(() => {
		setPlayerRole(lane[Math.floor(Math.random() * lane.length)]);
	}, []);

	return (<div key={playerName}>
		<p>Name :{playerName}</p>
		<p>Role: {playerRole}</p>
		<p>Champion: {playerChampion}</p></div>);
};

export default Player;
