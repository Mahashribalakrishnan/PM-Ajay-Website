import { useEffect, useState } from 'react';
import BplListPage from './bplList.jsx';
import './homepage.css';

const navLinks = [
  { label: 'Dashboard', icon: 'home', key: 'home' },
  { label: 'BPL List', icon: 'list', key: 'bplList' },
  { label: 'Scheme Verification', icon: 'shield', key: 'schemeVerification' },
  { label: 'Approve Beneficiaries', icon: 'check' },
  { label: 'Scheme Listing', icon: 'layers', key: 'schemeListing' },
  { label: 'Beneficiary Page', icon: 'users' },
  { label: 'Beneficiary Checker', icon: 'search-user' },
  { label: 'Fund Tracking', icon: 'chart' },
  { label: 'Project Suggestions', icon: 'lightbulb' },
  { label: 'Geo Map View', icon: 'map' },
];

const metricCards = [
  {
    title: 'Pending Verifications',
    subtitle: '(Beneficiary)',
    value: '12',
    icon: 'clipboard',
    accent: '#f97316',
    bg: '#fff7ed',
    darkBg: 'rgba(249, 115, 22, 0.14)',
    darkAccent: '#fb923c',
  },
  {
    title: 'Total Schemes',
    value: '25',
    icon: 'grid',
    accent: '#2563eb',
    bg: '#eff6ff',
    darkBg: 'rgba(37, 99, 235, 0.18)',
    darkAccent: '#93c5fd',
  },
  {
    title: 'Funds Received',
    value: '₹12,00,000',
    icon: 'wallet',
    accent: '#22c55e',
    bg: '#ecfdf3',
    darkBg: 'rgba(34, 197, 94, 0.18)',
    darkAccent: '#86efac',
  },
  {
    title: 'Project Suggestions Submitted',
    value: '8',
    icon: 'send',
    accent: '#a855f7',
    bg: '#f3e8ff',
    darkBg: 'rgba(168, 85, 247, 0.22)',
    darkAccent: '#c084fc',
  },
];

const recentUpdates = [
  {
    title: 'Recently Approved Beneficiary',
    description: 'Lakshmi Devi - Rural Housing Scheme',
    timestamp: 'Approved 2 hours ago',
  },
  {
    title: 'Pending Tasks',
    description: '3 site inspections awaiting scheduling',
    timestamp: 'Updated 30 mins ago',
  },
  {
    title: 'Fund Allocation Notice',
    description: '₹3,50,000 earmarked for water infrastructure',
    timestamp: 'Updated yesterday',
  },
];

const languages = ['English', 'தமிழ்', 'हिंदी', 'తెలుగు', 'मराठी'];

const UtilityIcon = ({ name }) => {
  switch (name) {
    case 'sun':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M12 2.8v2.8M12 18.4v2.8M21.2 12h-2.8M5.6 12H2.8m14.3-7.1-2 2M7 17.9l-2 2m13.3 0-2-2M7 6.9l-2-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'moon':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 14.4A9 9 0 0 1 12.6 3a9 9 0 1 0 8.4 11.4Z" />
        </svg>
      );
    case 'bell':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21a2.4 2.4 0 0 0 2.4-2.4h-4.8A2.4 2.4 0 0 0 12 21Zm7.2-6v-3.6a7.2 7.2 0 0 0-5.4-7v-.6a1.8 1.8 0 1 0-3.6 0v.6a7.2 7.2 0 0 0-5.4 7V15l-1.8 1.8v0.6h17.4v-.6L19.2 15Z" />
        </svg>
      );
    case 'chevron-down':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m6.8 9 5.2 5.2L17.2 9" />
        </svg>
      );
    default:
      return null;
  }
};

const NavIcon = ({ name }) => {
  switch (name) {
    case 'home':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3.6 10.6 12 3.6l8.4 7v9.8H14V14H10v5.4H3.6Z" />
        </svg>
      );
    case 'list':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.8 6h14.4v2.4H4.8Zm0 4.8h14.4v2.4H4.8Zm0 4.8h9.6V18H4.8Z" />
        </svg>
      );
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3 4.8 5.4v6c0 4.5 3.3 8.7 7.2 9.6 3.9-.9 7.2-5.1 7.2-9.6v-6Z" />
        </svg>
      );
    case 'check':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9.6 16.8 4.8 12l1.7-1.7 3.1 3 8-8L19.2 7Z" />
        </svg>
      );
    case 'layers':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m12 4.5 9 4.5-9 4.5-9-4.5Zm0 10.8 7.5-3.7 1.5.8-9 4.5-9-4.5 1.5-.8Zm0 3.6 7.5-3.7 1.5.8-9 4.5-9-4.5 1.5-.8Z" />
        </svg>
      );
    case 'users':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.4 11.4a3.6 3.6 0 1 1 3.6-3.6 3.6 3.6 0 0 1-3.6 3.6Zm0 2.4c-3 0-9 1.5-9 4.5V21h12v-2.7c0-3-6-4.5-9-4.5Zm7.2-2.4a3 3 0 1 1 3-3 3 3 0 0 1-3 3Zm0 2.4c-.7 0-1.5.1-2.3.3a4.8 4.8 0 0 1 3.3 4.2V21h4.8v-1.5c0-2.4-4.2-3.6-5.8-3.6Z" />
        </svg>
      );
    case 'search-user':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M10.2 13.2a4.8 4.8 0 1 1 2.8-8.7A4.8 4.8 0 0 1 10.2 13.2Zm0-7.5a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Z" />
          <path d="m13.8 14.6 1.7-1.7 4.9 4.9-1.7 1.7Z" />
          <path d="M3.6 21v-1.2c0-3 4.4-4.5 6.6-4.5s6.6 1.5 6.6 4.5V21Z" />
        </svg>
      );
    case 'chart':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5.4 18.6H3V5.4h2.4ZM10.8 18.6H8.4V9.6h2.4ZM16.2 18.6h-2.4V6.6h2.4ZM21.6 18.6h-2.4V3.6h2.4Z" />
        </svg>
      );
    case 'lightbulb':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3a6 6 0 0 0-3.6 10.8V18h7.2v-4.2A6 6 0 0 0 12 3Zm-1.2 16.2h2.4V21h-2.4Z" />
        </svg>
      );
    case 'map':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m9 4.2 6-1.2v16.8l-6 1.2-6-1.2V3Z" />
        </svg>
      );
    default:
      return null;
  }
};

const CardIcon = ({ name, color }) => {
  switch (name) {
    case 'clipboard':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" style={{ color }}>
          <path d="M16.2 3.6h-1.2a2.4 2.4 0 0 0-4.8 0H9a2.4 2.4 0 0 0-2.4 2.4v13.2A2.4 2.4 0 0 0 9 21.6h7.2a2.4 2.4 0 0 0 2.4-2.4V6a2.4 2.4 0 0 0-2.4-2.4Zm-3.6 0a.6.6 0 1 1-.6.6.6.6 0 0 1 .6-.6ZM15 16.2H10.2v-1.8H15Zm0-3.6H10.2v-1.8H15Z" />
        </svg>
      );
    case 'grid':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" style={{ color }}>
          <path d="M4.8 3.6h6v6h-6Zm8.4 0h6v6h-6Zm-8.4 8.4h6v6h-6Zm8.4 0h6v6h-6Z" />
        </svg>
      );
    case 'wallet':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" style={{ color }}>
          <path d="M19.2 6H4.8A2.4 2.4 0 0 0 2.4 8.4v9.6A2.4 2.4 0 0 0 4.8 20.4h14.4A2.4 2.4 0 0 0 21.6 18V8.4A2.4 2.4 0 0 0 19.2 6Zm0 3.6v3H16.8a1.5 1.5 0 0 1 0-3Z" />
        </svg>
      );
    case 'send':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" style={{ color }}>
          <path d="m3 4.2 18 7.8-18 7.8v-6l12-1.8-12-1.8Z" />
        </svg>
      );
    default:
      return null;
  }
};

export default function Homepage({ onNavigate = () => {}, activeKey = 'home', theme = 'light', onToggleTheme = () => {} }) {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [showLanguages, setShowLanguages] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const isDarkMode = theme === 'dark';

  const themeIcon = isDarkMode ? 'moon' : 'sun';
  const themeAriaLabel = isDarkMode ? 'Switch to light theme' : 'Switch to dark theme';
  const homepageClassName = `homepage ${isDarkMode ? 'dark' : 'light'} ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`;

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setShowLanguages(false);
  };

  useEffect(() => {
    const className = 'dark-homepage';
    if (isDarkMode) {
      document.body.classList.add(className);
    } else {
      document.body.classList.remove(className);
    }
  }, [isDarkMode]);

  return (
    <div className={homepageClassName}>
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`} aria-label="Primary navigation">
        <div className="brand">GramSeva</div>
        <div className="sidebar-scroll">
          <nav>
            <ul>
              {navLinks.map((link) => {
                const isActive = Boolean(link.key) && link.key === activeKey;
                return (
                  <li key={link.label} className={isActive ? 'active' : ''}>
                    <button
                      type="button"
                      className="nav-button"
                      onClick={() => {
                        if (link.key) {
                          onNavigate(link.key);
                        }
                      }}
                    >
                      <span className="nav-icon">
                        <NavIcon name={link.icon} />
                      </span>
                      <span className="nav-label">{link.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <div className="sidebar-footer">
          <button type="button" className="nav-button">
            <span className="nav-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M10.2 3.6h3l.6 2.1a6 6 0 0 1 1.8.9l2-1.2 2.1 2.1-1.2 2a6 6 0 0 1 .9 1.8l2.1.6v3l-2.1.6a6 6 0 0 1-.9 1.8l1.2 2-2.1 2.1-2-1.2a6 6 0 0 1-1.8.9l-.6 2.1h-3l-.6-2.1a6 6 0 0 1-1.8-.9l-2 1.2-2.1-2.1 1.2-2a6 6 0 0 1-.9-1.8l-2.1-.6v-3l2.1-.6a6 6 0 0 1 .9-1.8l-1.2-2 2.1-2.1 2 1.2a6 6 0 0 1 1.8-.9Zm1.5 5.4a3 3 0 1 0 3 3 3 3 0 0 0-3-3Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="nav-label">Settings</span>
          </button>
          <div className="profile-card">
            <div className="avatar" aria-hidden="true">HS</div>
            <div>
              <p className="profile-name">Headman Sharma</p>
              <p className="profile-role">Village Head</p>
            </div>
          </div>
        </div>
      </aside>
      <div
        className={`sidebar-backdrop ${isSidebarOpen ? 'visible' : ''}`}
        aria-hidden="true"
        onClick={() => setIsSidebarOpen(false)}
      />
      {activeKey === 'home' && (
      <main className="content" aria-label="Dashboard content">
        <header className="content-header">
          <div className="header-top">
            <div className="title-group">
              <button
                type="button"
                className="hamburger-button"
                aria-label={isSidebarOpen ? 'Hide navigation menu' : 'Show navigation menu'}
                onClick={() => setIsSidebarOpen((prev) => !prev)}
              >
                <span />
                <span />
                <span />
              </button>
              <h1>Dashboard</h1>
            </div>
            <div className="top-actions">
              <button
                type="button"
                className="icon-button theme-toggle"
                onClick={onToggleTheme}
                aria-label={themeAriaLabel}
              >
                <UtilityIcon name={themeIcon} />
              </button>
              <button type="button" className="icon-button notification" aria-label="Notifications">
                <UtilityIcon name="bell" />
                <span className="notification-dot" />
              </button>
              <div className="language-container">
                <button
                  type="button"
                  className="language-toggle"
                  aria-haspopup="listbox"
                  aria-expanded={showLanguages ? 'true' : 'false'}
                  onClick={() => setShowLanguages((prev) => !prev)}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9Zm0 15.6A6.6 6.6 0 1 1 18.6 12 6.6 6.6 0 0 1 12 18.6Zm0-9.6h4.2v1.8H13.8a10.4 10.4 0 0 1-1.8 4.2H9.6a12.4 12.4 0 0 0 1.8-4.2H7.8V9h2.7A10.4 10.4 0 0 1 7.8 6.6H9.6A12.4 12.4 0 0 0 11.4 9H16.2V9Z" />
                  </svg>
                  <span>{selectedLanguage}</span>
                  <UtilityIcon name="chevron-down" />
                </button>
                {showLanguages && (
                  <ul className="language-dropdown" role="listbox">
                    {languages.map((language) => (
                      <li key={language}>
                        <button type="button" onClick={() => handleLanguageSelect(language)}>
                          {language}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="header-bottom">
            <form className="search-bar" role="search">
              <span aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="m18.6 17.3-3.8-3.8a6 6 0 1 0-1.3 1.3l3.8 3.8ZM6.6 10.2a3.6 3.6 0 1 1 3.6 3.6 3.6 3.6 0 0 1-3.6-3.6Z" />
                </svg>
              </span>
              <input type="search" placeholder="Search beneficiaries, schemes, etc." />
            </form>
            <div className="sort-control">
              <button type="button">
                Sort by: Date
                <UtilityIcon name="chevron-down" />
              </button>
            </div>
          </div>
        </header>

        <section className="metrics" aria-label="Dashboard summary">
          {metricCards.map((card) => {
            const cardAccent = isDarkMode ? card.darkAccent ?? card.accent : card.accent;
            const cardBackground = isDarkMode ? card.darkBg ?? card.bg : card.bg;
            return (
              <article key={card.title} className="metric-card" style={{ backgroundColor: cardBackground }}>
                <div className="metric-icon" style={{ color: cardAccent }}>
                  <CardIcon name={card.icon} color={cardAccent} />
                </div>
                <div className="metric-content">
                  <p className="metric-title">{card.title}</p>
                  {card.subtitle && <p className="metric-subtitle">{card.subtitle}</p>}
                  <p className="metric-value" style={{ color: cardAccent }}>
                    {card.value}
                  </p>
                </div>
              </article>
            );
          })}
        </section>

        <section className="recent-updates" aria-label="Recent updates">
          <header>
            <h2>Recently Updated Information</h2>
            <span className="subheading">Stay informed about recent actions and pending follow-ups.</span>
          </header>
          <ul>
            {recentUpdates.map((update) => (
              <li key={update.title}>
                <div className="update-card">
                  <div className="update-header">
                    <h3>{update.title}</h3>
                    <time>{update.timestamp}</time>
                  </div>
                  <p>{update.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
      )}
      {activeKey === 'bplList' && (
        <div className="content" aria-label="BPL list content" style={{ padding: 0 }}>
          <BplListPage
            onToggleSidebar={() => setIsSidebarOpen((p) => !p)}
            theme={theme}
            onToggleTheme={onToggleTheme}
          />
        </div>
      )}
    </div>
  );
}
