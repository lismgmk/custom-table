import React from 'react';
import AppPage from './components/AppPage';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App = () => {
  return (
    <>
      <AppPage />
    </>
  );
};

export default App;
