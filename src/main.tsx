import React from 'react';
import { createRoot } from 'react-dom/client';
import Application from './components/AppPage';

// Say something
console.log('[ERWT] : Renderer execution started');

// Application to Render
const app = <Application />;

// Render application in DOM
createRoot(document.getElementById('app')).render(app);
