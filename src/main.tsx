import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Application from './components/AppPage';
import { store } from './redux/store';

// Say something
console.log('[ERWT] : Renderer execution started');

// Application to Render
const app = (
  <Provider store={store}>
    <Application />
  </Provider>
);

// Render application in DOM
createRoot(document.getElementById('app')).render(app);
