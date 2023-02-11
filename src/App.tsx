import React from 'react';
import LeagueRandomized from './components/LeagueRandomized';
import BtnContextProvider from './store/context';

function App() {
  return (
    <BtnContextProvider>
      <LeagueRandomized />
    </BtnContextProvider>
  );
}

export default App;
