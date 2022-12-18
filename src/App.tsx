import './App.scss';
// import RockPaperScissors from './components/games/RockPaperScissors/RockPaperScissors';
import React from 'react';
import LegueRandomizer from './components/games/lolrandomizerr/LegueRandomizer';

function App() {
  return (
    <div className='App'>
      {/* <RockPaperScissors /> */}
      <LegueRandomizer />
    </div>
  );
}

export default App;
