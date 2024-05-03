import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FireBaseContext } from './Store/Context'
import FireBaseConfig from './Firebase/config'
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContextFunction } from './Store/Context'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <FireBaseContext.Provider value={{ FireBaseConfig }}>
        <UserContextFunction>
          <App />
        </UserContextFunction>
      </FireBaseContext.Provider>
    </Router>

  </React.StrictMode>
);

