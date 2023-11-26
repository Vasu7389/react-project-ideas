import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TrackProvider from './context/TrackContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TrackProvider>
      <App />
    </TrackProvider>
  </React.StrictMode>
);