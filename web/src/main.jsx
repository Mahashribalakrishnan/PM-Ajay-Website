import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Login from './login.jsx';
import Homepage from './homepage.jsx';
import SchemeVerification from './schverify.jsx';
import BeneficiaryPage from './beneficiary.jsx';
import BeneficiaryChecker from './beneficiarychecker.jsx';
import './styles.css';

function AppRoot() {
  const [currentPage, setCurrentPage] = useState('login');
  const [theme, setTheme] = useState('light');

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  if (currentPage === 'login') {
    return <Login onLoginSuccess={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'schemeVerification') {
    return (
      <SchemeVerification
        onNavigate={setCurrentPage}
        activeKey={currentPage}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />
    );
  }

  if (currentPage === 'beneficiary') {
    return (
      <BeneficiaryPage
        onNavigate={setCurrentPage}
        activeKey={currentPage}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />
    );
  }

  if (currentPage === 'beneficiarychecker') {
    return (
      <BeneficiaryChecker
        onNavigate={setCurrentPage}
        activeKey={currentPage}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />
    );
  }

  return (
    <Homepage
      onNavigate={setCurrentPage}
      activeKey={currentPage}
      theme={theme}
      onToggleTheme={handleToggleTheme}
    />
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRoot />
  </React.StrictMode>
);
