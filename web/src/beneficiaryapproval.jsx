import { useMemo, useState } from 'react';
import './beneficiaryapproval.css';
import './homepage.css';

// Sidebar icons and nav, same pattern as homepage
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
  { label: 'Scheme Details', icon: 'file-text', key: 'schemeDetails' },
];

const NavIcon = ({ name }) => {
  switch (name) {
    case 'home': return (<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.6 10.6 12 3.6l8.4 7v9.8H14V14H10v5.4H3.6Z" /></svg>);
    case 'list': return (<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.8 6h14.4v2.4H4.8Zm0 4.8h14.4v2.4H4.8Zm0 4.8h9.6V18H4.8Z" /></svg>);
    case 'shield': return (<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 4.8 5.4v6c0 4.5 3.3 8.7 7.2 9.6 3.9-.9 7.2-5.1 7.2-9.6v-6Z" /></svg>);
    case 'check': return (<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.6 16.8 4.8 12l1.7-1.7 3.1 3 8-8L19.2 7Z" /></svg>);
    case 'layers': return (<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 4.5 9 4.5-9 4.5-9-4.5Zm0 10.8 7.5-3.7 1.5.8-9 4.5-9-4.5 1.5-.8Zm0 3.6 7.5-3.7 1.5.8-9 4.5-9-4.5 1.5-.8Z" /></svg>);
    case 'users': return (<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.4 11.4a3.6 3.6 0 1 1 3.6-3.6 3.6 3.6 0 0 1-3.6 3.6Zm0 2.4c-3 0-9 1.5-9 4.5V21h12v-2.7c0-3-6-4.5-9-4.5Zm7.2-2.4a3 3 0 1 1 3-3 3 3 0 0 1-3 3Zm0 2.4c-.7 0-1.5.1-2.3.3a4.8 4.8 0 0 1 3.3 4.2V21h4.8v-1.5c0-2.4-4.2-3.6-5.8-3.6Z" /></svg>);
    case 'search-user': return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10.2 13.2a4.8 4.8 0 1 1 2.8-8.7A4.8 4.8 0 0 1 10.2 13.2Zm0-7.5a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Z" />
        <path d="m13.8 14.6 1.7-1.7 4.9 4.9-1.7 1.7Z" />
        <path d="M3.6 21v-1.2c0-3 4.4-4.5 6.6-4.5s6.6 1.5 6.6 4.5V21Z" />
      </svg>
    );
    case 'chart': return (<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.4 18.6H3V5.4h2.4ZM10.8 18.6H8.4V9.6h2.4ZM16.2 18.6h-2.4V6.6h2.4ZM21.6 18.6h-2.4V3.6h2.4Z" /></svg>);
    case 'lightbulb': return (<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a6 6 0 0 0-3.6 10.8V18h7.2v-4.2A6 6 0 0 0 12 3Zm-1.2 16.2h2.4V21h-2.4Z" /></svg>);
    case 'map': return (<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 4.2 6-1.2v16.8l-6 1.2-6-1.2V3Z" /></svg>);
    case 'file-text': return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.4 3.6H7.2a2.4 2.4 0 0 0-2.4 2.4v12a2.4 2.4 0 0 0 2.4 2.4h9.6a2.4 2.4 0 0 0 2.4-2.4V8.4Zm2.4 14.4H7.2V6h6v3.6h3.6Z" />
        <path d="M9.6 12h4.8v1.2H9.6Zm0 2.4h4.8v1.2H9.6Z" />
      </svg>
    );
    default: return null;
  }
};

const HeaderIcon = ({ children, label }) => (
  <button type="button" className="ap-header-icon" aria-label={label}>
    {children}
  </button>
);

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.6 10.6 12 3.6l8.4 7v9.8H14V14H10v5.4H3.6Z" /></svg>
);

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9Zm0 15.6A6.6 6.6 0 1 1 18.6 12 6.6 6.6 0 0 1 12 18.6Zm0-9.6h4.2v1.8H13.8a10.4 10.4 0 0 1-1.8 4.2H9.6a12.4 12.4 0 0 0 1.8-4.2H7.8V9h2.7A10.4 10.4 0 0 1 7.8 6.6H9.6A12.4 12.4 0 0 0 11.4 9H16.2V9Z" /></svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 14.4A9 9 0 0 1 12.6 3a9 9 0 1 0 8.4 11.4Z" fill="#14b8a6" /></svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21a2.4 2.4 0 0 0 2.4-2.4h-4.8A2.4 2.4 0 0 0 12 21Zm7.2-6v-3.6a7.2 7.2 0 0 0-5.4-7v-.6a1.8 1.8 0 1 0-3.6 0v.6a7.2 7.2 0 0 0-5.4 7V15l-1.8 1.8v0.6h17.4v-.6L19.2 15Z"/></svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m18.6 17.3-3.8-3.8a6 6 0 1 0-1.3 1.3l3.8 3.8ZM6.6 10.2a3.6 3.6 0 1 1 3.6 3.6 3.6 3.6 0 0 1-3.6-3.6Z"/></svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15.6 7.2 10.8l1.7-1.7 2.1 2.1V3.6h2.4v7.6l2.1-2.1 1.7 1.7ZM4.8 18h14.4v2.4H4.8Z"/></svg>
);

const sampleCards = [
  { id: 1, name: 'Priya Verma', caste: 'OBC', income: '₹90,000', scheme: 'Education', image: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f469.svg', status: 'pending' },
  { id: 2, name: 'Arjun Singh', caste: 'SC', income: '₹75,000', scheme: 'Healthcare', image: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f468.svg', status: 'pending' },
  { id: 3, name: 'Sunita Devi', caste: 'General', income: '₹1,10,000', scheme: 'Housing', image: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f469.svg', status: 'pending' },
  { id: 4, name: 'Rajesh Kumar', caste: 'SC', income: '₹85,000', scheme: 'Agriculture', image: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f468.svg', status: 'pending' },
];

const approvedRowsInitial = [
  { id: 'BH12345', name: 'Rohan Sharma', scheme: 'Housing Scheme', date: '2024-07-26' },
  { id: 'BH67890', name: 'Priya Verma', scheme: 'Education Grant', date: '2024-07-25' },
  { id: 'BH11223', name: 'Arjun Singh', scheme: 'Healthcare Subsidy', date: '2024-07-24' },
  { id: 'BH55667', name: 'Vikram Joshi', scheme: 'Pension Scheme', date: '2024-07-22' },
];

export default function BeneficiaryApproval({ onNavigate = () => {}, activeKey = 'approveBeneficiaries', theme = 'light', onToggleTheme = () => {} }) {
  const isDarkMode = theme === 'dark';
  const [search, setSearch] = useState('');
  const [aiStatus, setAiStatus] = useState('all');
  const [scheme, setScheme] = useState('all');
  const [pendingCards, setPendingCards] = useState(sampleCards);
  const [approvedRows, setApprovedRows] = useState(approvedRowsInitial);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const filteredCards = useMemo(() => {
    return pendingCards.filter((c) => {
      const s = search.trim().toLowerCase();
      const matchesSearch = !s || c.name.toLowerCase().includes(s) || c.scheme.toLowerCase().includes(s) || String(c.id).includes(s);
      const matchesStatus = aiStatus === 'all' || (aiStatus === 'verified' && c.status === 'verified') || (aiStatus === 'pending' && c.status === 'pending');
      const matchesScheme = scheme === 'all' || c.scheme.toLowerCase() === scheme.toLowerCase();
      return matchesSearch && matchesStatus && matchesScheme;
    });
  }, [search, aiStatus, scheme, pendingCards]);

  const handleDownloadCSV = () => {
    const rows = [
      ['Beneficiary ID', 'Name', 'Scheme', 'Approval Date'],
      ...approvedRows.map(r => [r.id, r.name, r.scheme, r.date])
    ];
    const csv = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'approved_beneficiaries.csv';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleApprove = (card) => {
    // Add to approved list
    setApprovedRows(prev => [
      { 
        id: `BH${Math.floor(10000 + Math.random()*90000)}`, 
        name: card.name, 
        scheme: `${card.scheme} Scheme`, 
        date: new Date().toISOString().slice(0,10) 
      },
      ...prev
    ]);
    
    // Remove from pending list
    setPendingCards(prev => prev.filter(c => c.id !== card.id));
  };

  const handleDecline = (cardId) => {
    // Simply remove from pending list
    setPendingCards(prev => prev.filter(card => card.id !== cardId));
  };

  // Use homepage layout with sidebar
  return (
    <div className={`homepage ${isDarkMode ? 'dark' : 'light'} ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
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
                      onClick={() => { if (link.key) onNavigate(link.key); }}
                    >
                      <span className="nav-icon"><NavIcon name={link.icon} /></span>
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
        
        </div>
      </aside>

      <div
        className={`sidebar-backdrop ${isSidebarOpen ? 'visible' : ''}`}
        aria-hidden="true"
        onClick={() => setIsSidebarOpen(false)}
      />

      <main className="content" aria-label="Approve beneficiaries content">
        {/* Approval panel header (topbar within content) */}
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
              <section className="ap-title">
                <h1>Beneficiary Approval Panel</h1>
                <p>Review and manage beneficiary applications for government welfare programs.</p>
              </section>
            </div>
          </div>
        </header>

        {/* Existing approval UI wrapped to fit inside homepage layout */}
        <div className={` ${isDarkMode ? 'dark' : 'light'}`}>
          <header className="ap-topbar">
            <div className="ap-topbar-left" onClick={() => onNavigate('home')} role="button" aria-label="Go to Dashboard">
              <HomeIcon />
            </div>
            <div className="ap-topbar-right">
              <HeaderIcon label="Language"><GlobeIcon /></HeaderIcon>
              <HeaderIcon label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}><div onClick={onToggleTheme}><MoonIcon /></div></HeaderIcon>
              <HeaderIcon label="Notifications"><BellIcon /></HeaderIcon>
            </div>
          </header>

          <main className="ap-container">
            

            <section className="ap-filters">
              <div className="ap-search">
                <SearchIcon />
                <input
                  type="text"
                  placeholder="Search beneficiaries by name, ID, or scheme..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="ap-selects">
                <label>
                  <span>AI Status</span>
                  <select value={aiStatus} onChange={(e) => setAiStatus(e.target.value)}>
                    <option value="all">All</option>
                    <option value="verified">Verified</option>
                    <option value="pending">Pending</option>
                  </select>
                </label>
                <label>
                  <span>Scheme</span>
                  <select value={scheme} onChange={(e) => setScheme(e.target.value)}>
                    <option value="all">All</option>
                    <option value="Education">Education</option>
                    <option value="Housing">Housing</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Agriculture">Agriculture</option>
                  </select>
                </label>
              </div>
            </section>

            <section className="ap-cards-grid">
              {filteredCards.map((c) => (
                <article key={c.id} className="ap-card">
                  <div className="ap-card-media">
                    <img src={c.image} alt={c.name} />
                    {c.status === 'verified' && (
                      <span className="ap-badge"><span className="dot"/>AI: Verified</span>
                    )}
                  </div>
                  <div className="ap-card-body">
                    <h3>{c.name}</h3>
                    <div className="ap-kv"><strong>Caste:</strong><span>{c.caste}</span></div>
                    <div className="ap-kv"><strong>Income:</strong><span>{c.income}</span></div>
                    <div className="ap-kv"><strong>Scheme:</strong><span>{c.scheme}</span></div>
                    <div className="ap-card-actions">
                      <div className="action-buttons">
                        <button 
                          type="button" 
                          className="btn-approve"
                          onClick={() => handleApprove(c)}
                        >
                          Approve
                        </button>
                        <button 
                          type="button" 
                          className="btn-decline"
                          onClick={() => handleDecline(c.id)}
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <section className="ap-table">
              <div className="ap-table-header">
                <h2>Approved Beneficiaries</h2>
                <button className="btn-download" onClick={handleDownloadCSV}>
                  <DownloadIcon />
                  <span>Download CSV</span>
                </button>
              </div>
              <div className="ap-table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Beneficiary ID</th>
                      <th>Name</th>
                      <th>Scheme</th>
                      <th>Approval Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvedRows.map((r) => (
                      <tr key={r.id}>
                        <td>{r.id}</td>
                        <td>{r.name}</td>
                        <td>{r.scheme}</td>
                        <td>{r.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </main>
        </div>
      </main>
    </div>
  );
}
