import { useEffect, useMemo, useRef, useState } from 'react';
import './homepage.css';
import './schlist.css';

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

const schemes = [
  {
    id: 1,
    title: 'Rural Road Connectivity',
    category: 'Infrastructure',
    status: 'Active',
    budget: '₹75,00,000',
    beneficiaries: 3500,
    duration: '2 years',
    progress: 85,
  },
  {
    id: 2,
    title: 'Skill Development Initiative',
    category: 'Skill Development',
    status: 'Active',
    budget: '₹25,00,000',
    beneficiaries: 1500,
    duration: '1.5 years',
    progress: 60,
  },
  {
    id: 3,
    title: 'Startup Seed Fund',
    category: 'Entrepreneurship',
    status: 'Upcoming',
    budget: '₹1,00,00,000',
    beneficiaries: 500,
    duration: '3 years',
    progress: 0,
  },
];

const kpis = [
  { id: 'schemes', title: 'Total Schemes', value: '25', icon: 'file' },
  { id: 'beneficiaries', title: 'Total Beneficiaries', value: '15,000', icon: 'users' },
  {
    id: 'funds',
    title: 'Funds Utilized',
    value: '₹3.7 Cr',
    icon: 'wallet',
    iconBg: '#e8f2ff',
    iconColor: '#2563eb',
    iconBgDark: 'rgba(37, 99, 235, 0.28)',
    iconColorDark: '#93c5fd',
  },
  { id: 'progress', title: 'Average Progress', value: '75%', icon: 'chart' },
];

const languages = ['English', 'தமிழ்', 'हिंदी', 'తెలుగు', 'मराठी'];

function NavIcon({ name }) {
  switch (name) {
    case 'home':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m12 5.4 7.2 6V21h-4.8v-6h-4.8v6H4.8V11.4Z" />
        </svg>
      );
    case 'list':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6h12v2.4H6Zm0 4.8h12v2.4H6Zm0 4.8h12V18H6Z" />
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
          <path d="m9.6 16.8-3.6-3.6 1.7-1.7 1.9 1.8 6-6 1.7 1.7Z" />
        </svg>
      );
    case 'layers':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m12 4.8 9 4.2-9 4.2-9-4.2Zm0 9 7.5-3.5 1.5.7-9 4.2-9-4.2 1.5-.7Zm0 3.6 7.5-3.5 1.5.7-9 4.2-9-4.2 1.5-.7Z" />
        </svg>
      );
    case 'users':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 11.4A3.6 3.6 0 1 1 12.6 7.8 3.6 3.6 0 0 1 9 11.4Zm0 2.4C6 13.8 0 15.3 0 18.3V21h18v-2.7c0-3-6-4.5-9-4.5Zm9-2.4a3 3 0 1 1 3-3 3 3 0 0 1-3 3Zm0 2.4c-.6 0-1.5.1-2.1.3a4.8 4.8 0 0 1 3.3 4.2V21H24v-1.5c0-2.4-4.2-3.6-6-3.6Z" />
        </svg>
      );
    case 'search-user':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M10.2 13.2a4.8 4.8 0 1 1 4.2-7.2 4.8 4.8 0 0 1-4.2 7.2Zm0-7.5A2.7 2.7 0 1 0 12.9 8.4 2.7 2.7 0 0 0 10.2 5.7Z" />
          <path d="m13.5 14.7 1.8-1.8 5 5-1.8 1.8Z" />
          <path d="M3.6 21v-1.2c0-3 4.5-4.5 6.6-4.5s6.6 1.5 6.6 4.5V21Z" />
        </svg>
      );
    case 'chart':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5.4 18.6H3V5.4h2.4Zm5.4 0H8.4V9.6h2.4Zm5.4 0h-2.4V6.6h2.4Zm5.4 0h-2.4V3.6h2.4Z" />
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
    case 'settings':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M10.2 3.6h3l.6 2.1a6 6 0 0 1 1.8.9l2-1.2 2.1 2.1-1.2 2a6 6 0 0 1 .9 1.8l2.1.6v3l-2.1.6a6 6 0 0 1-.9 1.8l1.2 2-2.1 2.1-2-1.2a6 6 0 0 1-1.8.9l-.6 2.1h-3l-.6-2.1a6 6 0 0 1-1.8-.9l-2 1.2-2.1-2.1 1.2-2a6 6 0 0 1-.9-1.8l-2.1-.6v-3l2.1-.6a6 6 0 0 1 .9-1.8l-1.2-2 2.1-2.1 2 1.2a6 6 0 0 1 1.8-.9Zm1.5 5.4a3 3 0 1 0 3 3 3 3 0 0 0-3-3Z"
          />
        </svg>
      );
    case 'wallet':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.6 6H5.4A2.4 2.4 0 0 0 3 8.4v9.6A2.4 2.4 0 0 0 5.4 20.4h13.2A2.4 2.4 0 0 0 21 18V8.4A2.4 2.4 0 0 0 18.6 6Zm0 3.6v3h-2.4a1.5 1.5 0 0 1 0-3Z" />
        </svg>
      );
    default:
      return null;
  }
}

function UtilityIcon({ name }) {
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
          <path d="M19.2 15.6v-4.2a7.2 7.2 0 0 0-6-7.2V3h-2.4v1.2a7.2 7.2 0 0 0-6 7.2v4.2L3 18v1.2h18V18Zm-6 4.8a2.4 2.4 0 0 1-4.8 0Z" />
        </svg>
      );
    case 'chevron-down':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m6.6 9.6 5.4 5.4 5.4-5.4L15.9 8.1 12 12 8.1 8.1Z" />
        </svg>
      );
    case 'globe':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9Zm0 15.6A6.6 6.6 0 1 1 18.6 12 6.6 6.6 0 0 1 12 18.6Zm3-6.6a10.2 10.2 0 0 1-1.8 3.9h-2.4A12.2 12.2 0 0 0 12.6 12H9.6v-1.8h2.7A10.2 10.2 0 0 1 9.6 6.6h2.4A12.2 12.2 0 0 0 15 10.2h2.4V12Z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function SchemeListing({ onNavigate = () => {}, activeKey = 'schemeListing', theme = 'light', onToggleTheme = () => {} }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [schemeTypeFilter, setSchemeTypeFilter] = useState('All Scheme Types');
  const [statusFilter, setStatusFilter] = useState('Any Status');
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [showLanguages, setShowLanguages] = useState(false);
  const languageRef = useRef(null);
  const isDarkMode = theme === 'dark';

  const pageClassName = `homepage ${isDarkMode ? 'dark' : 'light'} ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`;
  const themeIcon = isDarkMode ? 'moon' : 'sun';
  const themeAriaLabel = isDarkMode ? 'Switch to light theme' : 'Switch to dark theme';

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
    return () => {
      document.body.classList.remove(className);
    };
  }, [isDarkMode]);

  useEffect(() => {
    if (!showLanguages) {
      return undefined;
    }
    const handleClickOutside = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setShowLanguages(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLanguages]);

  const filteredSchemes = useMemo(() => {
    return schemes.filter((scheme) => {
      const matchesQuery = scheme.title.toLowerCase().includes(searchQuery.trim().toLowerCase());
      const matchesType = schemeTypeFilter === 'All Scheme Types' || scheme.category === schemeTypeFilter;
      const matchesStatus = statusFilter === 'Any Status' || scheme.status === statusFilter;
      return matchesQuery && matchesType && matchesStatus;
    });
  }, [searchQuery, schemeTypeFilter, statusFilter]);

  return (
    <div className={pageClassName}>
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
              <NavIcon name="settings" />
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
      <main className="content scheme-listing">
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
              <div>
                <h1>Scheme Listing</h1>
                <p className="scheme-subheading">Manage and monitor all government welfare schemes in your village.</p>
              </div>
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
              <div className="language-container" ref={languageRef}>
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
        </header>

        <section className="scheme-controls" aria-label="Scheme filters">
          <div className="scheme-search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m18.6 17.3-3.8-3.8a6 6 0 1 0-1.3 1.3l3.8 3.8ZM6.6 10.2a3.6 3.6 0 1 1 3.6 3.6 3.6 3.6 0 0 1-3.6-3.6Z" />
            </svg>
            <input
              type="search"
              placeholder="Search schemes by name or keyword..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
          <div className="scheme-selects">
            <select value={schemeTypeFilter} onChange={(event) => setSchemeTypeFilter(event.target.value)}>
              <option>All Scheme Types</option>
              <option>Infrastructure</option>
              <option>Skill Development</option>
              <option>Entrepreneurship</option>
            </select>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option>Any Status</option>
              <option>Active</option>
              <option>Upcoming</option>
            </select>
          </div>
        </section>

        <section className="scheme-cards" aria-label="Schemes">
          <h2>Schemes</h2>
          <div className="scheme-card-grid">
            {filteredSchemes.map((scheme) => (
              <article key={scheme.id} className="scheme-card" aria-labelledby={`scheme-${scheme.id}`}>
                <div className="scheme-card-header">
                  <div>
                    <h3 id={`scheme-${scheme.id}`}>{scheme.title}</h3>
                    <p>{scheme.category}</p>
                  </div>
                  <span className={`status-badge ${scheme.status === 'Active' ? 'status-active' : 'status-upcoming'}`}>
                    {scheme.status}
                  </span>
                </div>
                <ul className="scheme-card-meta">
                  <li>
                    <span>Budget:</span>
                    <strong>{scheme.budget}</strong>
                  </li>
                  <li>
                    <span>Beneficiaries:</span>
                    <strong>{scheme.beneficiaries.toLocaleString('en-IN')}</strong>
                  </li>
                  <li>
                    <span>Duration:</span>
                    <strong>{scheme.duration}</strong>
                  </li>
                </ul>
                <div className="scheme-progress">
                  <div className="scheme-progress-header">
                    <span>Progress</span>
                    <span>{scheme.progress}%</span>
                  </div>
                  <div className="scheme-progress-track">
                    <div className="scheme-progress-bar" style={{ width: `${scheme.progress}%` }} />
                  </div>
                </div>
                <button type="button" className="scheme-card-button">View Details</button>
              </article>
            ))}
          </div>
        </section>

        <section className="scheme-kpis" aria-label="Key performance indicators">
          <h2>Key Performance Indicators</h2>
          <div className="scheme-kpi-grid">
            {kpis.map((item) => (
              <article key={item.id} className="scheme-kpi-card">
                <div
                  className="scheme-kpi-icon"
                  aria-hidden="true"
                  style={{
                    background: isDarkMode ? item.iconBgDark ?? item.iconBg : item.iconBg,
                    color: isDarkMode ? item.iconColorDark ?? item.iconColor : item.iconColor,
                  }}
                >
                  <NavIcon name={item.icon === 'file' ? 'list' : item.icon} />
                </div>
                <div>
                  <p>{item.title}</p>
                  <h3>{item.value}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
