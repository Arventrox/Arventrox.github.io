import './App.css';
import RockPaperScissors from './components/games/RockPaperScissors';
import React from 'react';
import LegueRandomizer from './components/games/lolrandomizerr/LegueRandomizer';

function App() {
	return (
		<div className='App'>
			<RockPaperScissors />
			{/* <LegueRandomizer/> */}
		</div>
	);
}

export default App;
