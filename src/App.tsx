import React from 'react';
import LeagueRandomized from './components/LeagueRandomized';
import ContextProvider from './store/context';

function App() {
  return (
    <ContextProvider>
      <LeagueRandomized />
    </ContextProvider>
  );
}

export default App;
