import React, {useState} from 'react';
import Normal from './Normal';
import style from './LegueRandomizer.module.css';

const LegueRandomizer = () => {
	const [chosen, setChosen] = useState('');
	const gamemode = ['NORMAL', 'ARAM', 'URF'];

	const randomBtnHandler = () => {
		const chosenGamemode = gamemode[Math.floor(Math.random() * gamemode.length)];
		setChosen(chosenGamemode);
	};

	return (<div className={style.lolRadnomizer}>
		<h1>Legue of Legends Randomizer</h1>
		<button onClick={randomBtnHandler}>Chose Gamemode</button>
		{chosen && <h2>The randomizer chose : {chosen}</h2>}
		{chosen === 'NORMAL' && <Normal/>}
	</div>);
};

export default LegueRandomizer;
