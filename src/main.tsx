import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Application from './components/AppPage';
import { store } from './redux/store';


const app = (
  <Provider store={store}>
    <Application />
  </Provider>
);

createRoot(document.getElementById('app')).render(app);
