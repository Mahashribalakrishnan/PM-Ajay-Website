import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Login from './login.jsx';
import Homepage from './homepage.jsx';
import SchemeVerification from './schverify.jsx';
import SchemeListing from './schlist.jsx';
import ProjectSuggestions from './project.jsx';
import SchemeDetails from './schdetails.jsx';
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

  if (currentPage === 'schemeListing') {
    return (
      <SchemeListing
        onNavigate={setCurrentPage}
        activeKey={currentPage}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />
    );
  }

  if (currentPage === 'schemeDetails') {
    return (
      <SchemeDetails
        onNavigate={setCurrentPage}
        activeKey={currentPage}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />
    );
  }

  if (currentPage === 'projectSuggestions') {
    return (
      <ProjectSuggestions
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
