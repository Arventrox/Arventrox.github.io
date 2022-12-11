import React, {useState, useEffect} from 'react';
import {top, jungle, bottom, middle, support} from './ChampionsRoles';

const Player: React.FC <{playerName: string; playerChampion: string; playerRole: string}> = props => {
	const [playerRole, setPlayerRole] = useState('');
	const [playerChampion, setPlayerChampion] = useState('');

	const {playerName} = props;
	// Chosing lane
	useEffect(() => {
		const lane = ['TOP', 'JUNGLE', 'MID', 'BOTTOM', 'SUPPORT'];
		setPlayerRole(lane[Math.floor(Math.random() * lane.length)]);
	}, [setPlayerRole]);

	// Chosing Champion by role
	useEffect(() => {
		const topChampions = top[Math.floor(Math.random() * top.length)];
		const jungleChampions = jungle[Math.floor(Math.random() * jungle.length)];
		const midChampions = middle[Math.floor(Math.random() * middle.length)];
		const bottomChampions = bottom[Math.floor(Math.random() * bottom.length)];
		const supportChampions = support[Math.floor(Math.random() * support.length)];

		switch (playerRole) {
			case 'TOP':
				setPlayerChampion(topChampions);
				break;
			case 'JUNGLE':
				setPlayerChampion(jungleChampions);
				break;
			case 'MID':
				setPlayerChampion(midChampions);
				break;
			case 'BOTTOM':
				setPlayerChampion(bottomChampions);
				break;
			case 'SUPPORT':
				setPlayerChampion(supportChampions);
				break;
			default:
				setPlayerChampion('');
		}
	}, [playerRole, setPlayerChampion]);

	return (<div key={playerName}>
		<p>Name :{playerName}</p>
		<p>Role: {playerRole}</p>
		<p>Champion: {playerChampion}</p></div>);
};

export default Player;
