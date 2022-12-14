import React, {useState, useEffect} from 'react';
import {top, jungle, bottom, middle, support} from './ChampionsRoles';
import style from './Player.module.css';

const Player: React.FC<{playerName: string | string[]; playerChampion: string; playerRole: string | string[]}> = props => {
	const [reroll, setReroll] = useState<string>();

	const {playerName, playerRole} = props;
	const {playerChampion} = props;

	const topChampions = top[Math.floor(Math.random() * top.length)];
	const jungleChampions = jungle[Math.floor(Math.random() * jungle.length)];
	const midChampions = middle[Math.floor(Math.random() * middle.length)];
	const bottomChampions = bottom[Math.floor(Math.random() * bottom.length)];
	const supportChampions = support[Math.floor(Math.random() * support.length)];

	const rerollHandler = (event: React.FormEvent) => {
		event.preventDefault();
		switch (playerRole) {
			case 'TOP':
				setReroll(topChampions);
				break;
			case 'JUNGLE':
				setReroll(jungleChampions);
				break;
			case 'MID':
				setReroll(midChampions);
				break;
			case 'BOTTOM':
				setReroll(bottomChampions);
				break;
			case 'SUPPORT':
				setReroll(supportChampions);
				break;
			default:
				setReroll('');
		}
	};

	return (<div className={style.container}>
		<p>Name: {playerName}</p>
		<p>Role: {playerRole}</p>
		<span className={style.championBox}>
			<p>Champion: {reroll ? reroll : playerChampion}</p>
			<button onClick={rerollHandler}>Reroll</button>
		</span>
		<img src='https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg' alt='none'/>
	</div>);
};

export default Player;
