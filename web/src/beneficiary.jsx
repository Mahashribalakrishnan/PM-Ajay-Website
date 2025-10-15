import { useState, useEffect } from 'react';
import './beneficiary.css';

const BeneficiaryPage = ({ onNavigate = () => {}, activeKey = 'beneficiary', theme = 'light', onToggleTheme = () => {} }) => {
  const [searchId, setSearchId] = useState('');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [profileExpansionState, setProfileExpansionState] = useState({});
  
  // Get current beneficiary's expansion state
  const isProfileExpanded = selectedBeneficiary ? profileExpansionState[selectedBeneficiary.id] || false : false;
  
  // Function to toggle profile expansion for current beneficiary
  const toggleProfileExpansion = () => {
    if (selectedBeneficiary) {
      setProfileExpansionState(prev => ({
        ...prev,
        [selectedBeneficiary.id]: !prev[selectedBeneficiary.id]
      }));
    }
  };

  const isDarkMode = theme === 'dark';

  // Sample beneficiary data
  const sampleBeneficiary = {
    id: 'BH1234',
    name: 'Rajesh Kumar',
    profile: {
      fatherName: 'Suresh Kumar',
      motherName: 'Kamala Devi',
      dateOfBirth: '15/08/1978',
      phoneNumber: '+91 9876543210',
      email: 'rajesh.kumar@email.com',
      address: 'Village Rampur, Block Sadar, District Muzaffarpur, Bihar - 842001',
      bankAccount: 'XXXX-XXXX-XXXX-4567',
      ifscCode: 'SBIN0001234',
      rationCardNumber: 'BH/RC/2023/001234'
    },
    personalInfo: {
      caste: 'SC',
      age: 45,
      gender: 'Male',
      maritalStatus: 'Married',
      education: 'Primary',
      occupation: 'Farmer'
    },
    familyDetails: {
      spouseName: 'Sunita Devi',
      children: 3,
      totalMembers: 5,
      dependents: 2
    },
    schemeDetails: {
      scheme: 'Housing Assistance',
      stage: 'Application Approved',
      fundReceived: '₹ 50,000',
      applicationDate: '12/03/2024',
      approvalDate: '25/03/2024'
    },
    fundDetails: {
      allocated: '₹1L',
      released: '₹50K',
      pending: '₹50K'
    },
    documents: [
      { name: 'Ration Card', type: 'pdf', viewable: true },
      { name: 'Community Certificate', type: 'pdf', viewable: true },
      { name: 'Income Certificate', type: 'pdf', viewable: true },
      { name: 'Aadhaar Card', type: 'pdf', viewable: true }
    ]
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchId.trim()) {
      setSelectedBeneficiary(sampleBeneficiary);
    }
  };

  // Reset all profile expansion states when navigating away from beneficiary page
  useEffect(() => {
    if (activeKey !== 'beneficiary') {
      setProfileExpansionState({});
    }
  }, [activeKey]);

  // Reset all profile expansion states when component unmounts
  useEffect(() => {
    return () => {
      setProfileExpansionState({});
    };
  }, []);

  const handleDownloadAll = () => {
    // Implementation for downloading all documents
    console.log('Downloading all documents...');
  };

  const handleViewDocument = (docName) => {
    // Implementation for viewing individual document
    console.log(`Viewing ${docName}...`);
  };

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
      case 'search':
        return (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m18.6 17.3-3.8-3.8a6 6 0 1 0-1.3 1.3l3.8 3.8ZM6.6 10.2a3.6 3.6 0 1 1 3.6 3.6 3.6 3.6 0 0 1-3.6-3.6Z" />
          </svg>
        );
      case 'download':
        return (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 15.6 7.2 10.8l1.7-1.7 2.1 2.1V3.6h2.4v7.6l2.1-2.1 1.7 1.7ZM4.8 18h14.4v2.4H4.8Z" />
          </svg>
        );
      case 'eye':
        return (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 4.8c-7.2 0-10.8 7.2-10.8 7.2s3.6 7.2 10.8 7.2 10.8-7.2 10.8-7.2S19.2 4.8 12 4.8Zm0 12a4.8 4.8 0 1 1 4.8-4.8A4.8 4.8 0 0 1 12 16.8Zm0-7.2a2.4 2.4 0 1 0 2.4 2.4A2.4 2.4 0 0 0 12 9.6Z" />
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
      case 'file-text':
        return (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14.4 3.6H7.2a2.4 2.4 0 0 0-2.4 2.4v12a2.4 2.4 0 0 0 2.4 2.4h9.6a2.4 2.4 0 0 0 2.4-2.4V8.4Zm2.4 14.4H7.2V6h6v3.6h3.6Z" />
            <path d="M9.6 12h4.8v1.2H9.6Zm0 2.4h4.8v1.2H9.6Z" />
          </svg>
        );
      default:
        return null;
    }
  };

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
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [showLanguages, setShowLanguages] = useState(false);

  const themeIcon = isDarkMode ? 'moon' : 'sun';
  const themeAriaLabel = isDarkMode ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <div className={`beneficiary-page ${isDarkMode ? 'dark' : 'light'} ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      {/* Sidebar */}
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

      {/* Sidebar Backdrop */}
      <div
        className={`sidebar-backdrop ${isSidebarOpen ? 'visible' : ''}`}
        aria-hidden="true"
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="content" aria-label="Beneficiary page content">
        {/* Header */}
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
              <h1>Beneficiary Page</h1>
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
                        <button type="button" onClick={() => {
                          setSelectedLanguage(language);
                          setShowLanguages(false);
                        }}>
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

        {/* Search Section */}
        <section className="search-section">
          <form className="beneficiary-search" onSubmit={handleSearch}>
            <div className="search-input-group">
              <span className="search-icon">
                <UtilityIcon name="search" />
              </span>
              <input
                type="text"
                placeholder="Enter Beneficiary ID (e.g., BH1234)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                <UtilityIcon name="search" />
              </button>
            </div>
          </form>
        </section>

        {/* Beneficiary Details */}
        {selectedBeneficiary && (
          <div className="beneficiary-details">
            {/* Main Profile and Info Section */}
            <div className="main-profile-section">
              {/* Left: Profile Card */}
              <div className="profile-card-main" onClick={toggleProfileExpansion}>
                <div className="profile-avatar">
                  <div className="avatar-placeholder">
                    <svg viewBox="0 0 120 120" className="avatar-icon">
                      <circle cx="60" cy="45" r="20" fill="currentColor" opacity="0.6"/>
                      <path d="M60 75c-16.5 0-30 13.5-30 30v15h60v-15c0-16.5-13.5-30-30-30z" fill="currentColor" opacity="0.6"/>
                    </svg>
                  </div>
                </div>
                <div className="profile-info">
                  <h2 className="beneficiary-name">{selectedBeneficiary.name}</h2>
                  <p className="beneficiary-id">Beneficiary ID: {selectedBeneficiary.id}</p>
                </div>
                <div className="profile-expand-icon">
                  <svg viewBox="0 0 24 24" className={`expand-arrow ${isProfileExpanded ? 'expanded' : ''}`}>
                    <path d="m6.8 9 5.2 5.2L17.2 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                
                {/* Expanded Profile Details */}
                {isProfileExpanded && (
                  <div className="expanded-profile-details">
                    <div className="profile-detail-section">
                      <h4 className="detail-section-title">PROFILE DETAILS</h4>
                      <div className="detail-rows">
                        <div className="detail-row">
                          <span className="detail-label">Father's Name:</span>
                          <span className="detail-value">{selectedBeneficiary.profile.fatherName}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Mother's Name:</span>
                          <span className="detail-value">{selectedBeneficiary.profile.motherName}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Date of Birth:</span>
                          <span className="detail-value">{selectedBeneficiary.profile.dateOfBirth}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Phone Number:</span>
                          <span className="detail-value">{selectedBeneficiary.profile.phoneNumber}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Email:</span>
                          <span className="detail-value">{selectedBeneficiary.profile.email}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="profile-detail-section">
                      <h4 className="detail-section-title">FAMILY DETAILS</h4>
                      <div className="detail-rows">
                        <div className="detail-row">
                          <span className="detail-label">Spouse Name:</span>
                          <span className="detail-value">{selectedBeneficiary.familyDetails.spouseName}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Children:</span>
                          <span className="detail-value">{selectedBeneficiary.familyDetails.children}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Total Members:</span>
                          <span className="detail-value">{selectedBeneficiary.familyDetails.totalMembers}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Dependents:</span>
                          <span className="detail-value">{selectedBeneficiary.familyDetails.dependents}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="profile-detail-section">
                      <h4 className="detail-section-title">ADDRESS & BANKING</h4>
                      <div className="detail-rows">
                        <div className="detail-row">
                          <span className="detail-label">Address:</span>
                          <span className="detail-value">{selectedBeneficiary.profile.address}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Account Number:</span>
                          <span className="detail-value">{selectedBeneficiary.profile.bankAccount}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">IFSC Code:</span>
                          <span className="detail-value">{selectedBeneficiary.profile.ifscCode}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Ration Card No:</span>
                          <span className="detail-value">{selectedBeneficiary.profile.rationCardNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Personal Information and Scheme Details */}
              <div className="info-cards-section">
                {/* Personal Information */}
                <div className="info-card">
                  <h3 className="card-title">PERSONAL INFORMATION</h3>
                  <div className="info-rows">
                    <div className="info-row">
                      <span className="info-label">Caste:</span>
                      <span className="info-value">{selectedBeneficiary.personalInfo.caste}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Age:</span>
                      <span className="info-value">{selectedBeneficiary.personalInfo.age}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Gender:</span>
                      <span className="info-value">{selectedBeneficiary.personalInfo.gender}</span>
                    </div>
                  </div>
                </div>

                {/* Scheme Details */}
                <div className="info-card">
                  <h3 className="card-title">SCHEME DETAILS</h3>
                  <div className="info-rows">
                    <div className="info-row">
                      <span className="info-label">Scheme:</span>
                      <span className="info-value">{selectedBeneficiary.schemeDetails.scheme}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Stage:</span>
                      <span className="info-value status-approved">{selectedBeneficiary.schemeDetails.stage}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Fund Received:</span>
                      <span className="info-value fund-received">{selectedBeneficiary.schemeDetails.fundReceived}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* Fund Details and Documents Grid */}
            <div className="bottom-grid">
              {/* Fund Details */}
              <div className="fund-details">
                <h3 className="section-title">Fund Details</h3>
                <div className="fund-cards">
                  <div className="fund-card allocated">
                    <div className="fund-label">Allocated</div>
                    <div className="fund-amount">{selectedBeneficiary.fundDetails.allocated}</div>
                  </div>
                  <div className="fund-card released">
                    <div className="fund-label">Released</div>
                    <div className="fund-amount">{selectedBeneficiary.fundDetails.released}</div>
                  </div>
                  <div className="fund-card pending">
                    <div className="fund-label">Pending</div>
                    <div className="fund-amount">{selectedBeneficiary.fundDetails.pending}</div>
                  </div>
                </div>
              </div>

              {/* Uploaded Documents */}
              <div className="documents-section">
                <div className="documents-header">
                  <h3 className="section-title">Uploaded Documents</h3>
                  <button className="download-all-btn" onClick={handleDownloadAll}>
                    <UtilityIcon name="download" />
                    Download All
                  </button>
                </div>
                <div className="documents-list">
                  {selectedBeneficiary.documents.map((doc, index) => (
                    <div key={index} className="document-item">
                      <span className="document-name">{doc.name}</span>
                      <button
                        className="view-document-btn"
                        onClick={() => handleViewDocument(doc.name)}
                      >
                        <UtilityIcon name="eye" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!selectedBeneficiary && (
          <div className="empty-state">
            <div className="empty-icon">
              <UtilityIcon name="search" />
            </div>
            <h3>Search for a Beneficiary</h3>
            <p>Enter a Beneficiary ID in the search box above to view their details and documents.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default BeneficiaryPage;