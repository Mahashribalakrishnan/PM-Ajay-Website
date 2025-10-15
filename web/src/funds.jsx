import { useEffect, useMemo, useRef, useState } from 'react';
import './homepage.css';
import './funds.css';

const navLinks = [
  { label: 'Dashboard', icon: 'home', key: 'home' },
  { label: 'BPL List', icon: 'list', key: 'bplList' },
  { label: 'Scheme Verification', icon: 'shield', key: 'schemeVerification' },
  { label: 'Approve Beneficiaries', icon: 'check', key: 'approveBeneficiaries' },
  { label: 'Scheme Listing', icon: 'layers', key: 'schemeListing' },
  { label: 'Beneficiary Page', icon: 'users', key: 'beneficiary' },
  { label: 'Beneficiary Checker', icon: 'search-user', key: 'beneficiarychecker' },
  { label: 'Fund Tracking', icon: 'chart', key: 'fundTracking' },
  { label: 'Project Suggestions', icon: 'lightbulb', key: 'projectSuggestions' },
  { label: 'Geo Map View', icon: 'map', key: 'geoMapView' },
];

const languages = ['English', 'தமிழ்', 'हिंदी', 'తెలుగు', 'मराठी'];
const metricsByYear = {
  2024: {
    summaryCards: [
      { id: 'total', label: 'Total Fund Allocated', amount: '₹1,20,00,000', color: '#1d4ed8' },
      { id: 'released', label: 'Released', amount: '₹90,00,000', color: '#22c55e' },
      { id: 'utilized', label: 'Utilized', amount: '₹75,00,000', color: '#0ea5e9' },
      { id: 'pending', label: 'Pending', amount: '₹15,00,000', color: '#ef4444' },
    ],
    distribution: [
      { label: 'Entrepreneurship', value: 45, color: '#2563eb' },
      { label: 'Infrastructure', value: 35, color: '#22c55e' },
      { label: 'Skill Development', value: 20, color: '#f59e0b' },
    ],
    flow: {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      lines: [
        {
          label: 'Allocated',
          color: '#1d4ed8',
          points: [62, 58, 65, 62, 67, 64, 60, 72, 78, 74, 70, 66],
        },
        {
          label: 'Utilized',
          color: '#22c55e',
          points: [55, 57, 60, 58, 63, 61, 65, 70, 68, 64, 62, 60],
        },
      ],
    },
    details: [
      {
        scheme: 'Entrepreneurship Development',
        allocated: '₹50,00,000',
        released: '₹40,00,000',
        utilized: '₹35,00,000',
        pending: '₹5,00,000',
      },
      {
        scheme: 'Infrastructure Development',
        allocated: '₹40,00,000',
        released: '₹25,00,000',
        utilized: '₹20,00,000',
        pending: '₹5,00,000',
      },
      {
        scheme: 'Skill Development Program',
        allocated: '₹30,00,000',
        released: '₹25,00,000',
        utilized: '₹20,00,000',
        pending: '₹5,00,000',
      },
    ],
  },
  2023: {
    summaryCards: [
      { id: 'total', label: 'Total Fund Allocated', amount: '₹1,05,00,000', color: '#1d4ed8' },
      { id: 'released', label: 'Released', amount: '₹82,00,000', color: '#22c55e' },
      { id: 'utilized', label: 'Utilized', amount: '₹69,00,000', color: '#0ea5e9' },
      { id: 'pending', label: 'Pending', amount: '₹13,00,000', color: '#ef4444' },
    ],
    distribution: [
      { label: 'Entrepreneurship', value: 42, color: '#2563eb' },
      { label: 'Infrastructure', value: 33, color: '#22c55e' },
      { label: 'Skill Development', value: 25, color: '#f59e0b' },
    ],
    flow: {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      lines: [
        {
          label: 'Allocated',
          color: '#1d4ed8',
          points: [58, 55, 60, 57, 62, 59, 56, 64, 70, 68, 63, 60],
        },
        {
          label: 'Utilized',
          color: '#22c55e',
          points: [50, 52, 55, 53, 57, 55, 58, 62, 61, 57, 55, 53],
        },
      ],
    },
    details: [
      {
        scheme: 'Entrepreneurship Development',
        allocated: '₹46,00,000',
        released: '₹36,00,000',
        utilized: '₹32,00,000',
        pending: '₹4,00,000',
      },
      {
        scheme: 'Infrastructure Development',
        allocated: '₹36,00,000',
        released: '₹23,00,000',
        utilized: '₹19,00,000',
        pending: '₹4,00,000',
      },
      {
        scheme: 'Skill Development Program',
        allocated: '₹23,00,000',
        released: '₹23,00,000',
        utilized: '₹18,00,000',
        pending: '₹5,00,000',
      },
    ],
  },
  2022: {
    summaryCards: [
      { id: 'total', label: 'Total Fund Allocated', amount: '₹96,00,000', color: '#1d4ed8' },
      { id: 'released', label: 'Released', amount: '₹74,00,000', color: '#22c55e' },
      { id: 'utilized', label: 'Utilized', amount: '₹61,00,000', color: '#0ea5e9' },
      { id: 'pending', label: 'Pending', amount: '₹13,00,000', color: '#ef4444' },
    ],
    distribution: [
      { label: 'Entrepreneurship', value: 39, color: '#2563eb' },
      { label: 'Infrastructure', value: 37, color: '#22c55e' },
      { label: 'Skill Development', value: 24, color: '#f59e0b' },
    ],
    flow: {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      lines: [
        {
          label: 'Allocated',
          color: '#1d4ed8',
          points: [52, 50, 54, 51, 56, 53, 51, 57, 60, 58, 55, 52],
        },
        {
          label: 'Utilized',
          color: '#22c55e',
          points: [45, 47, 49, 48, 52, 50, 51, 55, 54, 51, 49, 47],
        },
      ],
    },
    details: [
      {
        scheme: 'Entrepreneurship Development',
        allocated: '₹40,00,000',
        released: '₹30,00,000',
        utilized: '₹27,00,000',
        pending: '₹3,00,000',
      },
      {
        scheme: 'Infrastructure Development',
        allocated: '₹34,00,000',
        released: '₹22,00,000',
        utilized: '₹18,00,000',
        pending: '₹4,00,000',
      },
      {
        scheme: 'Skill Development Program',
        allocated: '₹22,00,000',
        released: '₹22,00,000',
        utilized: '₹16,00,000',
        pending: '₹6,00,000',
      },
    ],
  },
};

function NavIcon({ name }) {
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
    case 'settings':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19.4 13.5a7.4 7.4 0 0 0 .1-1.5 7.4 7.4 0 0 0-.1-1.5l1.8-1.3a.4.4 0 0 0 .1-.5l-1.7-2.9a.4.4 0 0 0-.4-.2l-2.1.8a6.7 6.7 0 0 0-2.6-1.5l-.4-2.1a.4.4 0 0 0-.4-.3h-3.4a.4.4 0 0 0-.4.3l-.4 2.1a6.7 6.7 0 0 0-2.6 1.5l-2.1-.8a.4.4 0 0 0-.4.2L2.6 8.7a.4.4 0 0 0 .1.5l1.8 1.3a7.4 7.4 0 0 0-.1 1.5 7.4 7.4 0 0 0 .1 1.5l-1.8 1.3a.4.4 0 0 0-.1.5l1.7 2.9a.4.4 0 0 0 .4.2l2.1-.8a6.7 6.7 0 0 0 2.6 1.5l.4 2.1a.4.4 0 0 0 .4.3h3.4a.4.4 0 0 0 .4-.3l.4-2.1a6.7 6.7 0 0 0 2.6-1.5l2.1.8a.4.4 0 0 0 .4-.2l1.7-2.9a.4.4 0 0 0-.1-.5ZM12 15.3A3.3 3.3 0 1 1 15.3 12 3.3 3.3 0 0 1 12 15.3Z" />
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
          <path d="M12 21a2.4 2.4 0 0 0 2.4-2.4h-4.8A2.4 2.4 0 0 0 12 21Zm7.2-6v-3.6a7.2 7.2 0 0 0-5.4-7v-.6a1.8 1.8 0 1 0-3.6 0v.6a7.2 7.2 0 0 0-5.4 7V15l-1.8 1.8v0.6h17.4v-.6L19.2 15Z" />
        </svg>
      );
    case 'globe':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9Zm0 15.6A6.6 6.6 0 1 1 18.6 12 6.6 6.6 0 0 1 12 18.6Zm0-9.6h4.2v1.8H13.8a10.4 10.4 0 0 1-1.8 4.2H9.6a12.4 12.4 0 0 0 1.8-4.2H7.8V9h2.7A10.4 10.4 0 0 1 7.8 6.6H9.6A12.4 12.4 0 0 0 11.4 9H16.2V9Z" />
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
}

function ActionIcon({ name }) {
  switch (name) {
    case 'export':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 18.6h12V21H6Zm6-13.2 4.8 4.8-1.7 1.7-2.1-2.1V16.2h-2.4V9.8l-2.1 2.1-1.7-1.7Z" />
        </svg>
      );
    case 'print':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.6 7.2h-1.8V3.6H7.2v3.6H5.4A2.4 2.4 0 0 0 3 9.6v6A2.4 2.4 0 0 0 5.4 18h1.8v3.6h9.6V18h1.8A2.4 2.4 0 0 0 21 15.6v-6A2.4 2.4 0 0 0 18.6 7.2ZM9.6 6h4.8V5.4H9.6Zm6 12.6H8.4V15h7.2Zm3-3H18V12H6v3h-.6a.6.6 0 0 1-.6-.6v-6a.6.6 0 0 1 .6-.6h13.2a.6.6 0 0 1 .6.6v6a.6.6 0 0 1-.6.6Z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function FundTracking({ onNavigate = () => {}, activeKey = 'fundTracking', theme = 'light', onToggleTheme = () => {} }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [showLanguages, setShowLanguages] = useState(false);
  const [year, setYear] = useState('2024');
  const languageRef = useRef(null);
  const metrics = metricsByYear[year] ?? metricsByYear[2024];
  const isDarkMode = theme === 'dark';

  const pageClass = `homepage ${isDarkMode ? 'dark' : 'light'} ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`;
  const themeIcon = isDarkMode ? 'moon' : 'sun';
  const themeAriaLabel = isDarkMode ? 'Switch to light theme' : 'Switch to dark theme';
  const handleExport = () => {
    document.body.classList.add('funds-print');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('funds-print');
    }, 1000);
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
    const handleClick = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setShowLanguages(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [showLanguages]);

  useEffect(() => {
    const handleAfterPrint = () => {
      document.body.classList.remove('funds-print');
    };
    window.addEventListener('afterprint', handleAfterPrint);
    return () => {
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);

  const distributionTotal = useMemo(() => metrics.distribution.reduce((sum, item) => sum + item.value, 0), [metrics]);

  return (
    <div className={pageClass}>
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
      <div className={`sidebar-backdrop ${isSidebarOpen ? 'visible' : ''}`} aria-hidden="true" onClick={() => setIsSidebarOpen(false)} />
      <main className="content funds-page">
        <header className="funds-topbar">
          <div className="funds-brand-group">
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
              <h1>Funds Tracking</h1>
              <p>Monitor allocations, releases, and utilization across schemes.</p>
            </div>
          </div>
          <div className="funds-actions">
            <div className="funds-icon-group">
              <button type="button" className="funds-icon-button" aria-label={themeAriaLabel} onClick={onToggleTheme}>
                <UtilityIcon name={themeIcon} />
              </button>
            </div>
            <div className="funds-locale-group" ref={languageRef}>
              <button
                type="button"
                className="language-toggle"
                aria-haspopup="listbox"
                aria-expanded={showLanguages ? 'true' : 'false'}
                onClick={() => setShowLanguages((prev) => !prev)}
              >
                <span className="language-icon">
                  <UtilityIcon name="globe" />
                </span>
                <span>{selectedLanguage}</span>
                <UtilityIcon name="chevron-down" />
              </button>
              {showLanguages && (
                <ul className="language-dropdown" role="listbox">
                  {languages.map((language) => (
                    <li key={language}>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedLanguage(language);
                          setShowLanguages(false);
                        }}
                      >
                        {language}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button type="button" className="funds-icon-button" aria-label="Export fund report" onClick={handleExport}>
              <ActionIcon name="export" />
            </button>
          </div>
        </header>
        <div className="funds-secondary-actions" />

        <section className="funds-summary" aria-label="Fund summary cards">
          {metrics.summaryCards.map((item) => (
            <article key={item.id} className="funds-summary-card">
              <p>{item.label}</p>
              <h2 style={{ color: item.color }}>{item.amount}</h2>
            </article>
          ))}
        </section>

        <div className="funds-export-target">
          <section className="funds-analytics" aria-label="Fund analytics">
            <article className="funds-card">
              <header>
                <h3>Fund Distribution by Scheme</h3>
              </header>
              <div className="funds-distribution">
                <div className="distribution-chart" aria-hidden="true">
                  <div className="distribution-ring">
                    <svg viewBox="0 0 160 160">
                      <g transform="translate(80,80)">
                      {metrics.distribution.reduce((acc, slice) => {
                        const { startAngle } = acc;
                        const angle = (slice.value / distributionTotal) * Math.PI * 2;
                        const endAngle = startAngle + angle;
                        const largeArc = angle > Math.PI ? 1 : 0;
                        const startX = Math.cos(startAngle) * 70;
                        const startY = Math.sin(startAngle) * 70;
                        const endX = Math.cos(endAngle) * 70;
                        const endY = Math.sin(endAngle) * 70;
                        const pathData = `M 0 0 L ${startX} ${startY} A 70 70 0 ${largeArc} 1 ${endX} ${endY} Z`;
                        acc.slices.push(
                          <path key={slice.label} d={pathData} fill={slice.color} />,
                        );
                        acc.startAngle = endAngle;
                        return acc;
                      }, { startAngle: -Math.PI / 2, slices: [] }).slices}
                    </g>
                  </svg>
                </div>
              </div>
              <ul className="distribution-legend">
                {metrics.distribution.map((item) => (
                  <li key={item.label}>
                    <span className="legend-dot" style={{ background: item.color }} />
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article className="funds-card">
            <header>
              <h3>Monthly Fund Flow</h3>
            </header>
            <div className="funds-line-chart" aria-hidden="true">
              <svg viewBox="0 0 600 260">
                <defs>
                  <linearGradient id="fundsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(37,99,235,0.1)" />
                    <stop offset="100%" stopColor="rgba(37,99,235,0)" />
                  </linearGradient>
                </defs>
                <g>
                  {Array.from({ length: 5 }).map((_, index) => {
                    const y = 40 + index * 45;
                    return <line key={index} x1="50" y1={y} x2="560" y2={y} stroke="rgba(148, 163, 184, 0.35)" strokeDasharray="6 6" strokeWidth="1" />;
                  })}
                </g>
                {metrics.flow.lines.map((line) => {
                  const points = line.points
                    .map((value, idx) => {
                      const x = 50 + (idx / (metrics.flow.months.length - 1)) * 510;
                      const y = 220 - (value / 80) * 160;
                      return `${x},${y}`;
                    })
                    .join(' ');

                  return <polyline key={line.label} points={points} fill="none" stroke={line.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />;
                })}
                {metrics.flow.lines.map((line) => {
                  return line.points.map((value, idx) => {
                    const x = 50 + (idx / (metrics.flow.months.length - 1)) * 510;
                    const y = 220 - (value / 80) * 160;
                    return <circle key={`${line.label}-${idx}`} cx={x} cy={y} r={4} fill="#fff" stroke={line.color} strokeWidth="3" />;
                  });
                })}
                <g fontSize="12" fill="#64748b">
                  {metrics.flow.months.map((month, idx) => {
                    const x = 50 + (idx / (metrics.flow.months.length - 1)) * 510;
                    return (
                      <text key={month} x={x} y="240" textAnchor="middle">
                        {month}
                      </text>
                    );
                  })}
                </g>
              </svg>
            </div>
          </article>
        </section>

        <section className="funds-details" aria-label="Fund details table">
          <header>
            <div>
              <h2>Fund Details</h2>
              <p>Track allocations and utilization by scheme.</p>
            </div>
            <div className="funds-detail-actions">
              <label>
                <span className="sr-only">Select year</span>
                <select value={year} onChange={(event) => setYear(event.target.value)}>
                  <option value="2024">Year 2024</option>
                  <option value="2023">Year 2023</option>
                  <option value="2022">Year 2022</option>
                </select>
              </label>
            </div>
          </header>
          <div className="funds-table" role="table">
            <div className="table-header" role="row">
              <div role="columnheader">Scheme</div>
              <div role="columnheader">Total Allocated</div>
              <div role="columnheader">Released</div>
              <div role="columnheader">Utilized</div>
              <div role="columnheader">Pending</div>
            </div>
            <div className="table-body">
              {metrics.details.map((row) => (
                <div key={row.scheme} className="table-row" role="row">
                  <div role="cell">
                    <span className="table-status" />
                    {row.scheme}
                  </div>
                  <div role="cell">{row.allocated}</div>
                  <div role="cell">{row.released}</div>
                  <div role="cell">{row.utilized}</div>
                  <div role="cell">{row.pending}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        </div>
      </main>
    </div>
  );
}
