import { useEffect, useRef, useState } from 'react';
import './schverify.css';

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

const languages = ['English', 'தமிழ்', 'हिंदी', 'తెలుగు', 'मराठी'];

const verificationMatrix = [
  { name: 'Arjun Verma', a: 'Eligible', b: 'Not Eligible', c: 'Eligible' },
  { name: 'Priya Sharma', a: 'Eligible', b: 'Eligible', c: 'Not Eligible' },
  { name: 'Rohan Kapoor', a: 'Not Eligible', b: 'Eligible', c: 'Eligible' },
  { name: 'Divya Singh', a: 'Eligible', b: 'Not Eligible', c: 'Not Eligible' },
  { name: 'Vikram Patel', a: 'Not Eligible', b: 'Not Eligible', c: 'Eligible' },
];

const filters = ['Age', 'Income', 'Location'];

const schemeOptions = [
  {
    id: 'schemeA',
    label: 'Scheme A',
    checklist: [
      { id: 'income', label: 'Meets income criteria', defaultChecked: true },
      { id: 'resident', label: 'Resident of designated area', defaultChecked: true },
      { id: 'id-proof', label: 'Valid identification provided', defaultChecked: false },
    ],
  },
  {
    id: 'schemeB',
    label: 'Scheme B',
    checklist: [
      { id: 'documentation', label: 'Documentation verified', defaultChecked: true },
      { id: 'income', label: 'Income within threshold', defaultChecked: false },
      { id: 'family', label: 'Family size confirmed', defaultChecked: true },
    ],
  },
  {
    id: 'schemeC',
    label: 'Scheme C',
    checklist: [
      { id: 'land', label: 'Land ownership confirmed', defaultChecked: true },
      { id: 'occupation', label: 'Primary occupation eligible', defaultChecked: false },
      { id: 'bank', label: 'Bank account linked', defaultChecked: true },
    ],
  },
];

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
    case 'globe':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9Zm0 15.6A6.6 6.6 0 1 1 18.6 12 6.6 6.6 0 0 1 12 18.6Zm0-9.6h4.2v1.8H13.8a10.4 10.4 0 0 1-1.8 4.2H9.6a12.4 12.4 0 0 0 1.8-4.2H7.8V9h2.7A10.4 10.4 0 0 1 7.8 6.6H9.6A12.4 12.4 0 0 0 11.4 9H16.2V9Z" />
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
          <path d="M4.5 5.4 9 3.6l6 1.8 4.5-1.8v14.4L15 19.8l-6-1.8-4.5 1.8Zm4.5.6v10.8l4.8 1.5V7.5Z" />
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
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3 4.8 5.4v6c0 4.5 3.3 8.7 7.2 9.6 3.9-.9 7.2-5.1 7.2-9.6v-6Z" />
        </svg>
      );
    case 'list':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.8 6h14.4v2.4H4.8Zm0 4.8h14.4v2.4H4.8Zm0 4.8h9.6V18H4.8Z" />
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
    case 'grid':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.8 3.6h6v6h-6Zm8.4 0h6v6h-6Zm-8.4 8.4h6v6h-6Zm8.4 0h6v6h-6Z" />
        </svg>
      );
    case 'checklist':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M16.2 3.6H7.8A2.4 2.4 0 0 0 5.4 6v12A2.4 2.4 0 0 0 7.8 20.4h8.4a2.4 2.4 0 0 0 2.4-2.4V6a2.4 2.4 0 0 0-2.4-2.4Zm-4.2 1.8a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9ZM10.5 17.7l-3-3 1.2-1.2 1.8 1.8 4.5-4.5 1.2 1.2Zm6-6.3H9.6v-1.8h6.9Zm0-3.6H9.6V6.9h6.9Z" />
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
    case 'settings':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M10.2 3.6h3l.6 2.1a6 6 0 0 1 1.8.9l2-1.2 2.1 2.1-1.2 2a6 6 0 0 1 .9 1.8l2.1.6v3l-2.1.6a6 6 0 0 1-.9 1.8l1.2 2-2.1 2.1-2-1.2a6 6 0 0 1-1.8.9l-.6 2.1h-3l-.6-2.1a6 6 0 0 1-1.8-.9l-2 1.2-2.1-2.1 1.2-2a6 6 0 0 1-.9-1.8l-2.1-.6v-3l2.1-.6a6 6 0 0 1 .9-1.8l-1.2-2 2.1-2.1 2 1.2a6 6 0 0 1 1.8-.9Zm1.5 5.4a3 3 0 1 0 3 3 3 3 0 0 0-3-3Z"
          />
        </svg>
      );
    default:
      return null;
  }
};

const statusClassMap = {
  Eligible: 'status-eligible',
  'Not Eligible': 'status-not-eligible',
};

export default function SchemeVerification({
  onNavigate = () => {},
  activeKey = 'schemeVerification',
  theme = 'light',
  onToggleTheme = () => {},
}) {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [showLanguages, setShowLanguages] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isDarkMode = theme === 'dark';
  const pageClassName = `schverify ${isDarkMode ? 'dark' : 'light'} ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`;
  const [selectedScheme, setSelectedScheme] = useState(schemeOptions[0]);
  const [isSchemeMenuOpen, setIsSchemeMenuOpen] = useState(false);
  const schemeMenuRef = useRef(null);
  const schemeButtonRef = useRef(null);

  useEffect(() => {
    const className = 'dark-schverify';
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
    const handleClickOutside = (event) => {
      if (!isSchemeMenuOpen) {
        return;
      }
      const menuEl = schemeMenuRef.current;
      const buttonEl = schemeButtonRef.current;
      if (menuEl && !menuEl.contains(event.target) && buttonEl && !buttonEl.contains(event.target)) {
        setIsSchemeMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSchemeMenuOpen]);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setShowLanguages(false);
  };

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
            <div className="avatar" aria-hidden="true">SV</div>
            <div>
              <p className="profile-name">Scheme Officer</p>
              <p className="profile-role">Verification Lead</p>
            </div>
          </div>
        </div>
      </aside>
      <div
        className={`sidebar-backdrop ${isSidebarOpen ? 'visible' : ''}`}
        aria-hidden="true"
        onClick={() => setIsSidebarOpen(false)}
      />
      <main className="content" aria-label="Scheme verification content">
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
              <div className="title-text">
                <h1>Scheme Verification</h1>
                <p className="title-description">Verify beneficiary eligibility across government welfare schemes and manage approvals efficiently.</p>
              </div>
            </div>
            <div className="top-actions">
              <button
                type="button"
                className="icon-button theme-toggle"
                aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
                onClick={onToggleTheme}
              >
                <UtilityIcon name={isDarkMode ? 'moon' : 'sun'} />
              </button>
              <button type="button" className="icon-button" aria-label="Notifications">
                <UtilityIcon name="bell" />
              </button>
              <div className="language-container">
                <button
                  type="button"
                  className="icon-button"
                  aria-label="Language settings"
                  onClick={() => setShowLanguages((prev) => !prev)}
                  aria-haspopup="listbox"
                  aria-expanded={showLanguages ? 'true' : 'false'}
                >
                  <UtilityIcon name="globe" />
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

        <div className="main-grid">
          <section className="search-panel" aria-label="Search filters">
            <div className="search-input">
              <span aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="m18.6 17.3-3.8-3.8a6 6 0 1 0-1.3 1.3l3.8 3.8ZM6.6 10.2a3.6 3.6 0 1 1 3.6 3.6 3.6 3.6 0 0 1-3.6-3.6Z" />
                </svg>
              </span>
              <input type="search" placeholder="Search beneficiaries..." />
            </div>
            <div className="filter-tags">
              {filters.map((filter) => (
                <button type="button" key={filter} className="filter-pill">
                  {filter}
                </button>
              ))}
            </div>
            <section className="summary-card" aria-label="Beneficiary summary">
              <h2>Beneficiary Summary</h2>
              <div className="summary-item">
                <span>Total Beneficiaries</span>
                <strong>1,250</strong>
              </div>
              <div className="summary-item">
                <span>Verified</span>
                <strong className="verified">850</strong>
              </div>
              <div className="summary-item">
                <span>Pending</span>
                <strong className="pending">400</strong>
              </div>
            </section>
          </section>

          <section className="verification-panel" aria-label="Verification content">
            <div className="schema-card" aria-label="Scheme selection">
              <header>
                <h2>Scheme Selection</h2>
                <p>Select eligible schemes for verification</p>
              </header>
              <div className="select-field" ref={schemeMenuRef}>
                <label htmlFor="scheme-select">Select Schemes</label>
                <button type="button" id="scheme-select"
                  ref={schemeButtonRef}
                  aria-haspopup="listbox"
                  aria-expanded={isSchemeMenuOpen ? 'true' : 'false'}
                  onClick={() => setIsSchemeMenuOpen((prev) => !prev)}
                >
                  {selectedScheme.label}
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m8 10 4 4 4-4" />
                  </svg>
                </button>
                {isSchemeMenuOpen && (
                  <ul className="scheme-dropdown" role="listbox">
                    {schemeOptions.map((option) => (
                      <li key={option.id}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={selectedScheme.id === option.id}
                          onClick={() => {
                            setSelectedScheme(option);
                            setIsSchemeMenuOpen(false);
                          }}
                        >
                          {option.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="matrix-card" aria-label="Eligibility matrix">
              <header>
                <h2>Eligibility Verification Matrix</h2>
              </header>
              <div className="matrix-table" role="table">
                <div className="matrix-row matrix-header" role="row">
                  <div role="columnheader">Beneficiary Name</div>
                  <div role="columnheader">Scheme A</div>
                  <div role="columnheader">Scheme B</div>
                  <div role="columnheader">Scheme C</div>
                </div>
                {verificationMatrix.map((row) => (
                  <div key={row.name} className="matrix-row" role="row">
                    <div role="cell">{row.name}</div>
                    <div role="cell" className={statusClassMap[row.a]}>{row.a}</div>
                    <div role="cell" className={statusClassMap[row.b]}>{row.b}</div>
                    <div role="cell" className={statusClassMap[row.c]}>{row.c}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid-bottom">
              <div className="ai-card" aria-label="AI eligibility checklist">
                <h3>AI Eligibility Checklist</h3>
                <ul>
                  {selectedScheme.checklist.map((item) => (
                    <li key={`${selectedScheme.id}-${item.id}`}>
                      <label>
                        <input
                          type="checkbox"
                          defaultChecked={item.defaultChecked}
                          aria-label={item.label}
                        />
                        <span>{item.label}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="actions-card" aria-label="Actions">
                <h3>Actions</h3>
                <p>Once verification is complete, add beneficiaries to schemes or export the data.</p>
                <div className="action-buttons">
                  <button type="button" className="primary">
                    <span aria-hidden="true">+</span>
                    Add to Scheme
                  </button>
                  <button type="button" className="secondary">Export</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
