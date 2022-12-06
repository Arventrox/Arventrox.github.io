import React, {useState} from 'react';
import Normal from './Normal';

const LegueRandomizer = () => {
	const [chosen, setChosen] = useState('No mod was chosen');
	const gamemode = ['NORMAL', 'ARAM', 'URF'];

	const randomBtnHandler = () => {
		const chosenGamemode = gamemode[Math.floor(Math.random() * gamemode.length)];
		setChosen(chosenGamemode);
	};

	return (<div>
		<h1>Legue of Legends Randomizer</h1>
		<p>The randomizer chose : {chosen}</p>
		{chosen === 'NORMAL' && <Normal/>}
		<button onClick={randomBtnHandler}>Chose Gamemode</button>
	</div>);
};

export default LegueRandomizer;
