import { useEffect, useState } from 'react';
import './homepage.css';
import './schlist.css';
import './schdetails.css';

const navLinks = [
  { label: 'Dashboard', icon: 'home', key: 'home' },
  { label: 'BPL List', icon: 'list', key: 'bplList' },
  { label: 'Scheme Verification', icon: 'shield', key: 'schemeVerification' },
  { label: 'Approve Beneficiaries', icon: 'check' },
  { label: 'Scheme Listing', icon: 'layers', key: 'schemeListing' },
  { label: 'Beneficiary Page', icon: 'users' },
  { label: 'Beneficiary Checker', icon: 'search-user' },
  { label: 'Fund Tracking', icon: 'chart' },
  { label: 'Project Suggestions', icon: 'lightbulb', key: 'projectSuggestions' },
  { label: 'Geo Map View', icon: 'map' },
];

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
    default:
      return null;
  }
}

function Breadcrumb() {
  return (
    <div className="breadcrumb">
      <span>Schemes</span>
      <span className="separator">/</span>
      <span>Scheme Details</span>
    </div>
  );
}

function StatusBadge({ status = 'Active' }) {
  const isActive = status.toLowerCase() === 'active';
  return <span className={`status-badge ${isActive ? 'status-active' : 'status-completed'}`}>{status}</span>;
}

export default function SchemeDetails({ onNavigate = () => {}, activeKey = 'schemeDetails', theme = 'light' }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isDarkMode = theme === 'dark';

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

  const pageClassName = `homepage ${isDarkMode ? 'dark' : 'light'} ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`;

  const scheme = {
    id: '2023-AJAY-001',
    name: 'Skill Development Initiative',
    status: 'Active',
    lastUpdated: '20 Jan 2024',
    totals: {
      budget: '₹50L',
      utilized: '₹25L',
      beneficiaries: '125',
      progressPct: 50,
      duration: '2023–25',
    },
    objective:
      'To uplift the socio-economic status of marginalized communities by providing essential resources and opportunities for sustainable development.',
    agency: 'Ministry of Social Justice and Empowerment',
    released: 2500000,
    used: 2000000,
    remarks:
      'The scheme is progressing as per the planned timeline, with a focus on community participation and empowerment.',
  };

  const utilizationPct = Math.min(100, Math.round((scheme.used / scheme.released) * 100));

  const beneficiaries = [
    { id: 'BH12345', name: 'Aarav Sharma', village: 'Sundarpur', scheme: scheme.name, fund: '₹20,000', stage: 'Stage 2', docs: 'View Docs', status: 'Active' },
    { id: 'BH67890', name: 'Diya Patel', village: 'Rampur', scheme: scheme.name, fund: '₹15,000', stage: 'Stage 1', docs: 'View Docs', status: 'Active' },
    { id: 'BH11223', name: 'Arjun Singh', village: 'Shivpur', scheme: scheme.name, fund: '₹25,000', stage: 'Stage 3', docs: 'View Docs', status: 'Completed' },
    { id: 'BH44556', name: 'Ishani Verma', village: 'Krishnanagar', scheme: scheme.name, fund: '₹18,000', stage: 'Stage 2', docs: 'View Docs', status: 'Active' },
    { id: 'BH77889', name: 'Rohan Kapoor', village: 'Gopalganj', scheme: scheme.name, fund: '₹22,000', stage: 'Stage 1', docs: 'View Docs', status: 'Active' },
  ];

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

      <main className="content scheme-details">
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
                <Breadcrumb />
                <h1>Skill Development Initiative</h1>
                <div className="subtitle-row">
                  <span className="meta">Scheme ID: {scheme.id}</span>
                  <span className="dot" />
                  <span className="meta">Status: <span className="text-green">Active</span></span>
                  <span className="dot" />
                  <span className="meta">Last Updated: {scheme.lastUpdated}</span>
                </div>
              </div>
            </div>
            <div className="top-actions">
              <button type="button" className="link-button" onClick={() => onNavigate('schemeListing')}>
                ← Back
              </button>
            </div>
          </div>
        </header>

        <section className="card scheme-summary">
          <div className="card-header">
            <h2>Scheme Information</h2>
          </div>
          <div className="summary-grid">
            <div className="info-counters">
              <div className="counter-row">
                <div className="counter">
                  <span className="label">Total Budget</span>
                  <span className="value">{scheme.totals.budget}</span>
                </div>
                <div className="counter">
                  <span className="label">Funds Utilized</span>
                  <span className="value">{scheme.totals.utilized}</span>
                </div>
                <div className="counter">
                  <span className="label">Beneficiaries</span>
                  <span className="value">{scheme.totals.beneficiaries}</span>
                </div>
                <div className="counter">
                  <span className="label">Progress</span>
                  <span className="value">{scheme.totals.progressPct}%</span>
                </div>
              </div>

              <div className="details">
                <div className="detail-item detail-duration">
                  <p className="detail-label">Duration</p>
                  <p className="detail-text">{scheme.totals.duration}</p>
                </div>
                <div className="detail-item detail-agency">
                  <p className="detail-label">Implementing Agency</p>
                  <p className="detail-text">{scheme.agency}</p>
                </div>
                <div className="detail-item detail-funds">
                  <p className="detail-label">Funds Released/Utilized</p>
                  <p className="detail-text">₹25,00,000 / ₹20,00,000</p>
                </div>
                <div className="detail-item detail-objective">
                  <p className="detail-label">Scheme Objective</p>
                  <p className="detail-text">{scheme.objective}</p>
                </div>
                <div className="detail-item detail-remarks">
                  <p className="detail-label">Remarks</p>
                  <p className="detail-text">{scheme.remarks}</p>
                </div>
              </div>
            </div>

            <div className="utilization">
              <p className="utilization-label">Fund Utilization</p>
              <div className="progress-track">
                <div className="progress-bar" style={{ width: `${utilizationPct}%` }} />
              </div>
              <p className="utilization-meta">₹20L utilized out of ₹25L released</p>
              <div className="overall-progress">
                <span className="label">Overall Progress</span>
                <span className="value">{scheme.totals.progressPct}%</span>
              </div>
            </div>
          </div>
        </section>

        <section className="card beneficiary-list">
          <div className="card-header">
            <h2>Beneficiary List</h2>
            <div className="tools">
              <div className="search">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m18.6 17.3-3.8-3.8a6 6 0 1 0-1.3 1.3l3.8 3.8ZM6.6 10.2a3.6 3.6 0 1 1 3.6 3.6 3.6 3.6 0 0 1-3.6-3.6Z" />
                </svg>
                <input type="search" placeholder="Search..." />
              </div>
              <select>
                <option>Fund</option>
                <option>≥ ₹20,000</option>
                <option>≤ ₹20,000</option>
              </select>
              <select>
                <option>Stage</option>
                <option>Stage 1</option>
                <option>Stage 2</option>
                <option>Stage 3</option>
              </select>
              <button type="button" className="export">Export</button>
            </div>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Beneficiary ID</th>
                  <th>Name</th>
                  <th>Village</th>
                  <th>Scheme Name</th>
                  <th>Fund Received</th>
                  <th>Current Stage</th>
                  <th>Documents</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {beneficiaries.map((b) => (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.name}</td>
                    <td>{b.village}</td>
                    <td>{b.scheme}</td>
                    <td>{b.fund}</td>
                    <td>{b.stage}</td>
                    <td>
                      <button type="button" className="link-button">View Docs</button>
                    </td>
                    <td>
                      <StatusBadge status={b.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
