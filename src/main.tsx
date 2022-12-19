import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import AppPage from './components/main-page/AppPage';
import { store } from './redux/store';

const App = (
  <Provider store={store}>
    <AppPage />
  </Provider>
);

createRoot(document.getElementById('app')).render(App);
