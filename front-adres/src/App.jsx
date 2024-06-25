import React from 'react';
import AppRoutes from './app/routes/AppRoutes';
import Header from './app/components/Header';

const App = () => {
  return (
    <div className="App">
      <Header />
      <AppRoutes />
    </div>
  );
};

export default App;