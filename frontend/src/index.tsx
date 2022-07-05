import React from 'react';
import ReactDOM from 'react-dom';

import './css/tailwind.css';
import "aos/dist/aos.css";
import './css/index.css';

import Routes from './routes';

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);