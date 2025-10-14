import { useEffect, useMemo, useRef, useState } from 'react';
import './homepage.css';
import './project.css';

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

const languages = ['English', 'தமிழ்', 'हिंदी', 'తెలుగు', 'मराठी'];

const statusFilters = ['All', 'Approved', 'Pending', 'Rejected'];

const initialProjects = [
  { id: 1, title: 'Community Center Renovation', subtitle: 'Improved community engagement', date: '2024-01-15', cost: '$50,000', status: 'Approved' },
  { id: 2, title: 'Road Repair Project', subtitle: 'Enhanced road safety', date: '2024-02-20', cost: '$20,000', status: 'Pending' },
  { id: 3, title: 'School Library Upgrade', subtitle: 'Better learning resources', date: '2024-03-10', cost: '$15,000', status: 'Approved' },
  { id: 4, title: 'Water Well Construction', subtitle: 'Access to clean water', date: '2024-04-05', cost: '$30,000', status: 'Rejected' },
  { id: 5, title: 'Agricultural Training Program', subtitle: 'Increased crop yield', date: '2024-05-12', cost: '$10,000', status: 'Pending' },
];

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
          <path d="M10.2 3.6h3l.6 2.1a6 6 0 0 1 1.8.9l2-1.2 2.1 2.1-1.2 2a6 6 0 0 1 .9 1.8l2.1.6v3l-2.1.6a6 6 0 0 1-.9 1.8l1.2 2-2.1 2.1-2-1.2a6 6 0 0 1-1.8.9l-.6 2.1h-3l-.6-2.1a6 6 0 0 1-1.8-.9l-2 1.2-2.1-2.1 1.2-2a6 6 0 0 1-.9-1.8l-2.1-.6v-3l2.1-.6a6 6 0 0 1 .9-1.8l-1.2-2 2.1-2.1 2 1.2a6 6 0 0 1 1.8-.9Zm1.5 5.4a3 3 0 1 0 3 3 3 3 0 0 0-3-3Z" />
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
    case 'chevron-down':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m6.8 9 5.2 5.2L17.2 9" />
        </svg>
      );
    case 'search':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m18.6 17.3-3.8-3.8a6 6 0 1 0-1.3 1.3l3.8 3.8ZM6.6 10.2a3.6 3.6 0 1 1 3.6 3.6 3.6 3.6 0 0 1-3.6-3.6Z" />
        </svg>
      );
    case 'calendar':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 4.8h2.4V3h1.8v1.8h4.8V3h1.8v1.8H19.2A2.4 2.4 0 0 1 21.6 8.4v10.2A2.4 2.4 0 0 1 19.2 21H4.8A2.4 2.4 0 0 1 2.4 18.6V8.4A2.4 2.4 0 0 1 4.8 6.2H6Zm0 5.4h12V9H6Zm0 3.6h4.2V12.6H6Zm5.4 0h6.6V12.6h-6.6Zm-5.4 3.6h4.2V16.2H6Zm5.4 0h6.6V16.2h-6.6Z" />
        </svg>
      );
    default:
      return null;
  }
}

const statusClassMap = {
  Approved: 'status-approved',
  Pending: 'status-pending',
  Rejected: 'status-rejected',
};

export default function ProjectSuggestions({ onNavigate = () => {}, activeKey = 'projectSuggestions', theme = 'light', onToggleTheme = () => {} }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [showLanguages, setShowLanguages] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [impact, setImpact] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState(statusFilters[0]);
  const [submissionDate, setSubmissionDate] = useState('');
  const [projectList, setProjectList] = useState(initialProjects);
  const languageRef = useRef(null);
  const isDarkMode = theme === 'dark';

  const pageClassName = `homepage ${isDarkMode ? 'dark' : 'light'} ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`;
  const themeIcon = isDarkMode ? 'moon' : 'sun';
  const themeAriaLabel = isDarkMode ? 'Switch to light theme' : 'Switch to dark theme';

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

  const filteredProjects = useMemo(() => {
    return projectList.filter((project) => {
      const matchesQuery = project.title.toLowerCase().includes(searchQuery.trim().toLowerCase());
      const matchesStatus = statusFilter === 'All' || project.status === statusFilter;
      const matchesDate = !submissionDate || project.date === submissionDate;
      return matchesQuery && matchesStatus && matchesDate;
    });
  }, [projectList, searchQuery, statusFilter, submissionDate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedTitle = projectTitle.trim();
    const trimmedDescription = description.trim();
    const trimmedImpact = impact.trim();
    const numericCost = Number(cost);
    const formattedCost = Number.isFinite(numericCost) && numericCost > 0 ? `$${numericCost.toLocaleString('en-US')}` : '$0';
    const today = new Date().toISOString().slice(0, 10);

    const newProject = {
      id: Date.now(),
      title: trimmedTitle || 'Untitled Project',
      subtitle: trimmedImpact || trimmedDescription || 'Details pending review',
      date: today,
      cost: formattedCost,
      status: 'Pending',
    };

    setProjectList((prev) => [newProject, ...prev]);
    setProjectTitle('');
    setDescription('');
    setCost('');
    setImpact('');
    setSearchQuery('');
    setStatusFilter(statusFilters[0]);
    setSubmissionDate('');
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
      <main className="content project-page">
        <header className="content-header project-header">
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
                <h1>Project Suggestions</h1>
                <p className="project-subheading">Submit new development ideas and monitor previously suggested projects.</p>
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
            </div>
          </div>
        </header>

        <section className="project-layout" aria-label="Project management">
          <section className="project-form-card" aria-label="Submit new project">
            <h2>Submit New Project</h2>
            <form className="project-form" onSubmit={handleSubmit}>
              <label>
                <span>Project Title</span>
                <input
                  type="text"
                  placeholder="e.g., New Community Well"
                  value={projectTitle}
                  onChange={(event) => setProjectTitle(event.target.value)}
                />
              </label>
              <label>
                <span>Description</span>
                <textarea
                  rows={4}
                  placeholder="Describe the project's goals and scope."
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </label>
              <label>
                <span>Estimated Cost ($)</span>
                <input
                  type="number"
                  placeholder="e.g., 5000"
                  value={cost}
                  onChange={(event) => setCost(event.target.value)}
                />
              </label>
              <label>
                <span>Expected Impact</span>
                <textarea
                  rows={3}
                  placeholder="Describe the benefits to the community."
                  value={impact}
                  onChange={(event) => setImpact(event.target.value)}
                />
              </label>
              <button type="submit" className="project-submit-button">Submit Suggestion</button>
            </form>
          </section>

          <section className="project-submissions-card" aria-label="Previously submitted suggestions">
            <div className="project-submissions-header">
              <h2>Previously Submitted Suggestions</h2>
              <div className="project-submissions-controls">
                <div className="project-search">
                  <UtilityIcon name="search" />
                  <input
                    type="search"
                    placeholder="Search by project title..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />
                </div>
                <select
                  className="project-status-filter"
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                >
                  {statusFilters.map((status) => (
                    <option key={status} value={status}>
                      {status === 'All' ? 'Status: All' : status}
                    </option>
                  ))}
                </select>
                <label className="project-date-picker">
                  <input
                    type="date"
                    value={submissionDate}
                    onChange={(event) => setSubmissionDate(event.target.value)}
                    aria-label="Filter by submission date"
                  />
                  <UtilityIcon name="calendar" />
                </label>
              </div>
            </div>
            <div className="project-table" role="table" aria-label="Project submissions">
              <div className="project-table-header" role="row">
                <div role="columnheader">Project Title</div>
                <div role="columnheader">Submission Date</div>
                <div role="columnheader">Cost</div>
                <div role="columnheader">Status</div>
              </div>
              <div className="project-table-body">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="project-table-row" role="row">
                    <div role="cell">
                      <p className="project-name">{project.title}</p>
                      <p className="project-description">{project.subtitle}</p>
                    </div>
                    <div role="cell">{project.date}</div>
                    <div role="cell">{project.cost}</div>
                    <div role="cell">
                      <span className={`project-status ${statusClassMap[project.status]}`}>{project.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
