import React from 'react';
import AppPage from './components/AppPage';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <AppPage />
    </Provider>
  );
};

export default App;
