import { useEffect, useMemo, useState } from 'react';
import './bplList.css';

const communityOptions = ['All', 'OBC', 'SC', 'ST', 'General'];

const languages = ['English', 'தமிழ்', 'हिंदी', 'తెలుగు', 'मराठी'];

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

function TopBar({ onToggleSidebar, isDarkMode, onToggleTheme, selectedLanguage, showLanguages, setShowLanguages, onSelectLanguage, year, onYearChange }) {
  return (
    <header className="bpl-topbar">
      <div className="left">
        <button type="button" className="hamburger" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <span />
          <span />
          <span />
        </button>
        <div className="app-brand">
          <div className="brand-text">
            <h1>BPL Boarding Members</h1>
            <span>Manage and view the list of Below Poverty Line families.</span>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="year-and-actions">
          <select className="year-select" value={year} onChange={(e) => onYearChange(e.target.value)} aria-label="Select Year">
            <option value="2024">Year 2024</option>
            <option value="2025">Year 2025</option>
          </select>
          <button type="button" className="btn primary">+ New List</button>
        </div>
        <div className="toolbar">
          <button type="button" className="icon-button notification" aria-label="Notifications">
            <UtilityIcon name="bell" />
            <span className="notification-dot" />
          </button>
          <button
            type="button"
            className="icon-button theme-toggle"
            onClick={onToggleTheme}
            aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            <UtilityIcon name={isDarkMode ? 'moon' : 'sun'} />
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
                {languages.map((lang) => (
                  <li key={lang}>
                    <button type="button" onClick={() => onSelectLanguage(lang)}>
                      {lang}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="avatar" aria-hidden="true">HS</div>
        </div>
      </div>
    </header>
  );
}

export default function BplListPage({ onToggleSidebar, theme = 'light', onToggleTheme = () => {} }) {
  const [year, setYear] = useState(() => {
    try {
      return localStorage.getItem('bplYear') || '2024';
    } catch (_) {
      return '2024';
    }
  });
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [showLanguages, setShowLanguages] = useState(false);
  const isDarkMode = theme === 'dark';
  const [form, setForm] = useState({
    serial: '',
    village: '',
    head: '',
    category: '',
    income: '',
  });
  const defaultMembersByYear = {
    '2024': [
      { serial: '1', village: 'Greenfield', head: 'Rajesh Sharma', category: 'OBC', income: 6500 },
      { serial: '2', village: 'Greenfield', head: 'Priya Verma', category: 'General', income: 7200 },
      { serial: '3', village: 'Greenfield', head: 'Amit Patel', category: 'OBC', income: 5800 },
      { serial: '4', village: 'Greenfield', head: 'Sunita Devi', category: 'SC', income: 4300 },
      { serial: '5', village: 'Greenfield', head: 'Vikram Singh', category: 'ST', income: 3900 },
    ],
    '2025': [
      { serial: '1', village: 'Greenfield', head: 'Ravi Kumar', category: 'OBC', income: 6100 },
      { serial: '2', village: 'Greenfield', head: 'Neha Gupta', category: 'SC', income: 5200 },
      { serial: '3', village: 'Greenfield', head: 'Suresh Yadav', category: 'ST', income: 4050 },
      { serial: '4', village: 'Greenfield', head: 'Pooja Singh', category: 'General', income: 7800 },
      { serial: '5', village: 'Greenfield', head: 'Aakash Verma', category: 'OBC', income: 6900 },
    ],
  };
  const [members, setMembers] = useState(defaultMembersByYear['2024']);
  const [filterCommunity, setFilterCommunity] = useState('All');
  const [filterIncome, setFilterIncome] = useState(10000);

  useEffect(() => {
    const className = 'dark-homepage';
    if (isDarkMode) {
      document.body.classList.add(className);
    } else {
      document.body.classList.remove(className);
    }
  }, [isDarkMode]);

  const handleToggleTheme = () => {
    if (typeof onToggleTheme === 'function') {
      onToggleTheme();
    }
  };

  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      const byCommunity = filterCommunity === 'All' || m.category === filterCommunity;
      const byIncome = m.income <= Number(filterIncome || 0);
      return byCommunity && byIncome;
    });
  }, [members, filterCommunity, filterIncome]);

  function storageKey(y) { return `bplMembers:${y}`; }

  // Load members for the selected year (fallback to defaults if none in storage)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey(year));
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setMembers(parsed);
          return;
        }
      }
    } catch (e) {
      // ignore storage errors
    }
    setMembers(defaultMembersByYear[year] || []);
  }, [year]);

  // Persist selected year so it restores when returning to this page
  useEffect(() => {
    try { localStorage.setItem('bplYear', year); } catch (_) {}
  }, [year]);

  // Persist members to localStorage for the active year when they change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey(year), JSON.stringify(members));
    } catch (e) {
      // ignore storage errors
    }
  }, [members, year]);

  function resetForm() {
    setForm({ serial: '', village: '', head: '', category: '', income: '' });
  }

  function handleAddToList() {
    if (!form.serial || !form.village || !form.head || !form.category || !form.income) return;
    const incomeNum = Number(form.income);
    if (Number.isNaN(incomeNum)) return;
    setMembers((prev) => [
      ...prev,
      { serial: String(form.serial), village: form.village, head: form.head, category: form.category, income: incomeNum },
    ]);
  }

  function exportCsv() {
    const header = ['Serial No.', 'Village Name', 'Head of Family', 'Community', 'Monthly Income'];
    const rows = filteredMembers.map((m) => [m.serial, m.village, m.head, m.category, m.income]);
    const csv = [header, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bpl-members-${year}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportPdf() {
    // Simple print-to-PDF via browser print dialog
    window.print();
  }

  return (
    <div className="bpl-page">
      <TopBar
        onToggleSidebar={onToggleSidebar}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        selectedLanguage={selectedLanguage}
        showLanguages={showLanguages}
        setShowLanguages={setShowLanguages}
        onSelectLanguage={(lang) => { setSelectedLanguage(lang); setShowLanguages(false); }}
        year={year}
        onYearChange={setYear}
      />

      <div className="bpl-grid">
        <section className="card add-member">
          <h2>Add New Member</h2>
          <div className="form-grid">
            <label className="field">
              <span>Serial Number</span>
              <input
                type="text"
                placeholder="Enter Serial Number"
                value={form.serial}
                onChange={(e) => setForm((f) => ({ ...f, serial: e.target.value }))}
              />
            </label>
            <label className="field">
              <span>Town/Village Name</span>
              <input
                type="text"
                placeholder="Enter Town/Village Name"
                value={form.village}
                onChange={(e) => setForm((f) => ({ ...f, village: e.target.value }))}
              />
            </label>
            <label className="field">
              <span>Head of Family Name</span>
              <input
                type="text"
                placeholder="Enter Head of Family Name"
                value={form.head}
                onChange={(e) => setForm((f) => ({ ...f, head: e.target.value }))}
              />
            </label>
            <label className="field">
              <span>Community Category</span>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              >
                <option value="">Select Category</option>
                {communityOptions.filter((o) => o !== 'All').map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Monthly Income</span>
              <input
                type="text"
                placeholder="Enter Monthly Income"
                value={form.income}
                onChange={(e) => setForm((f) => ({ ...f, income: e.target.value }))}
              />
            </label>
          </div>
          <div className="form-actions">
            <button type="button" className="btn primary" onClick={handleAddToList}>Add to List</button>
            <button type="button" className="btn outline" onClick={resetForm}>+ Add Another Member</button>
          </div>
        </section>

        <section className="card member-list">
          <div className="list-header">
            <div>
              <h2>BPL Members List</h2>
              <div className="filters">
                <label className="filter">
                  <span>Filter by Community</span>
                  <select value={filterCommunity} onChange={(e) => setFilterCommunity(e.target.value)}>
                    {communityOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </label>
                <label className="filter">
                  <span>Filter by Income (≤ ₹{filterIncome})</span>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={filterIncome}
                    onChange={(e) => setFilterIncome(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className="export-actions">
              <button type="button" className="btn outline" onClick={exportCsv}>Export as CSV</button>
              <button type="button" className="btn outline" onClick={exportPdf}>Export as PDF</button>
            </div>
          </div>

          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Serial No.</th>
                  <th>Village Name</th>
                  <th>Head of Family</th>
                  <th>Community</th>
                  <th>Monthly Income</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((m, idx) => (
                  <tr key={`${m.serial}-${idx}`}>
                    <td>{m.serial}</td>
                    <td>{m.village}</td>
                    <td>{m.head}</td>
                    <td>{m.category}</td>
                    <td>₹{m.income.toLocaleString('en-IN')}</td>
                    <td className="row-actions">
                      <button type="button" className="icon edit" aria-label="Edit">✏️</button>
                      <button
                        type="button"
                        className="icon delete"
                        aria-label="Delete"
                        onClick={() => setMembers((prev) => prev.filter((x) => !(x.serial === m.serial && x.head === m.head)))}
                      >🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}


