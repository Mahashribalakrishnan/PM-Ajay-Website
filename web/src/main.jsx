import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Login from './login.jsx';
import Homepage from './homepage.jsx';
import './styles.css';

function AppRoot() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <Homepage />;
  }

  return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRoot />
  </React.StrictMode>
);
