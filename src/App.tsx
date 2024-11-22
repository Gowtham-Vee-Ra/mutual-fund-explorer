/**
 * Root Application Component
 * Serves as the entry point for the application
 */
import React from 'react';
import MutualFundSearch from './components/MutualFundSearch';

const App: React.FC = () => {
  return (
    <div className="App">
      <MutualFundSearch />
    </div>
  );
};

export default App;