import { useState } from 'react';
import './geomap.css';

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

const GeoMap = ({ onNavigate = () => {}, activeKey = 'geoMapView', theme = 'light', onToggleTheme = () => {} }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const isDarkMode = theme === 'dark';

  // Sample data for beneficiaries and locations
  const beneficiaryStats = {
    totalBeneficiaries: 12456,
    currentBeneficiaries: 2500,
    pastYearBeneficiaries: 2200,
    yearActiveParticipants: 12456,
    beneficiariesByScheme: 8000
  };

  const locations = [
    { id: 1, name: 'Delhi', lat: 28.6, lng: 77.2, beneficiaries: 1200, color: '#3b82f6' },
    { id: 2, name: 'Mumbai', lat: 19.1, lng: 72.9, beneficiaries: 850, color: '#10b981' },
    { id: 3, name: 'Kolkata', lat: 22.6, lng: 88.4, beneficiaries: 650, color: '#f59e0b' },
    { id: 4, name: 'Chennai', lat: 13.1, lng: 80.3, beneficiaries: 920, color: '#ef4444' },
    { id: 5, name: 'Bangalore', lat: 12.9, lng: 77.6, beneficiaries: 780, color: '#8b5cf6' },
    { id: 6, name: 'Hyderabad', lat: 17.4, lng: 78.5, beneficiaries: 540, color: '#06b6d4' },
    { id: 7, name: 'Ahmedabad', lat: 23.0, lng: 72.6, beneficiaries: 690, color: '#f97316' },
    { id: 8, name: 'Pune', lat: 18.5, lng: 73.9, beneficiaries: 420, color: '#84cc16' }
  ];

  const analyticsData = [
    { month: '2019', value: 65 },
    { month: '2020', value: 45 },
    { month: '2021', value: 80 },
    { month: '2022', value: 55 },
    { month: '2023', value: 90 },
    { month: '2024', value: 75 }
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

  // Filter locations based on search term
  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.beneficiaries.toString().includes(searchTerm)
  );

  const themeIcon = isDarkMode ? 'moon' : 'sun';
  const themeAriaLabel = isDarkMode ? 'Switch to light theme' : 'Switch to dark theme';
  const homepageClassName = `homepage ${isDarkMode ? 'dark' : 'light'} ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`;

  return (
    <div className={homepageClassName}>
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
      <div
        className={`sidebar-backdrop ${isSidebarOpen ? 'visible' : ''}`}
        aria-hidden="true"
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="content" aria-label="Geo Map content">
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
              <h1>Beneficiary Insights</h1>
            </div>
            <div className="top-actions">
              <button
                type="button"
                className="icon-button theme-toggle"
                onClick={onToggleTheme}
                aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
              >
                <UtilityIcon name={isDarkMode ? 'sun' : 'moon'} />
              </button>
              <button type="button" className="icon-button notification" aria-label="Notifications">
                <UtilityIcon name="bell" />
                <span className="notification-dot" />
              </button>
            </div>
          </div>
          <div className="header-bottom">
            <form className="search-bar" role="search">
              <span aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="m18.6 17.3-3.8-3.8a6 6 0 1 0-1.3 1.3l3.8 3.8ZM6.6 10.2a3.6 3.6 0 1 1 3.6 3.6 3.6 3.6 0 0 1-3.6-3.6Z" />
                </svg>
              </span>
              <input
                type="search"
                placeholder="Search locations, beneficiaries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </form>
            <div className="sort-control">
              <button type="button">
                Sort by: Region
                <UtilityIcon name="chevron-down" />
              </button>
              {searchTerm && (
                <div className="search-results-count">
                  {filteredLocations.length} of {locations.length} locations
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="content-grid">
          {/* Map Section */}
          <div className="map-section">
            <div className="map-container">
              <div className="map-overlay">
                <div className="location-info">
                  <span className="location-label">India - Beneficiary Distribution</span>
                </div>
              </div>
              
              {/* Interactive Map */}
              <div className="interactive-map">
                <div className="map-image-container">
                  {/* Real Google Maps Embed */}
                  <div className="google-maps-container">
                    {/* Google Maps Iframe */}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15076621.311314514!2d73.7250245!3d20.750301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1697360400000!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0, borderRadius: '8px' }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="google-maps-iframe"
                      title="India Map"
                      onError={(e) => {
                        console.log('Google Maps failed to load, showing fallback');
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `
                          <div class="map-fallback">
                            <div class="fallback-content">
                              <h3>🗺️ India Map</h3>
                              <p>Interactive map showing beneficiary distribution across India</p>
                              <p>Unable to load Google Maps. Please check your internet connection.</p>
                              <div class="fallback-cities">
                                ${locations.map(loc => `<div class="city-marker" style="background: ${loc.color}">${loc.name}</div>`).join('')}
                              </div>
                            </div>
                          </div>
                        `;
                      }}
                    ></iframe>

                    {/* Map Controls Overlay */}
                    <div className="google-map-controls">
                      <button className="map-control-button zoom-in">+</button>
                      <button className="map-control-button zoom-out">−</button>
                      <button className="map-control-button compass">⌂</button>
                    </div>

                    {/* View Layers Button */}
                    <div className="view-layers-btn">
                      <button className="layers-button">
                        <svg className="layers-icon" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        View Layers
                      </button>
                    </div>
                  </div>
                  
                  {/* Location markers overlay */}
                  <div className="map-markers-overlay">
                    {filteredLocations.map((location) => (
                      <div
                        key={location.id}
                        className="location-marker-pin"
                        style={{
                          left: `${((location.lng - 68) / 25) * 100}%`, // Adjusted for Google Maps scale
                          top: `${((37 - location.lat) / 30) * 100}%`, // Adjusted for Google Maps scale
                          backgroundColor: location.color
                        }}
                        onClick={() => setSelectedLocation(location)}
                        title={location.name}
                      >
                        <div className="marker-dot"></div>
                        <div className="marker-label">{location.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map Controls */}
              <div className="map-controls">
                <button className="map-control-btn">+</button>
                <button className="map-control-btn">-</button>
                <button className="map-control-btn">⌂</button>
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="stats-section">
            <h3 className="section-title">Beneficiary Statistics</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-label">Current Beneficiaries</div>
                <div className="stat-value">{beneficiaryStats.currentBeneficiaries.toLocaleString()}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Past Year Beneficiaries</div>
                <div className="stat-value">{beneficiaryStats.pastYearBeneficiaries.toLocaleString()}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Year Active Participants</div>
                <div className="stat-value">{beneficiaryStats.yearActiveParticipants.toLocaleString()}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Beneficiaries by Scheme</div>
                <div className="stat-value">{beneficiaryStats.beneficiariesByScheme.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Analytics Section */}
          <div className="analytics-section">
            <h3 className="section-title">Analytics</h3>
            <div className="analytics-metric">
              <div className="metric-label">Non-zero Beneficiary Count</div>
              <div className="metric-value">+15%</div>
              <div className="metric-subtitle">+2.5% from last month</div>
            </div>
            
            {/* Chart */}
            <div className="chart-container">
              <svg viewBox="0 0 400 150" className="analytics-chart">
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary-blue)" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="var(--primary-blue)" stopOpacity="0.1"/>
                  </linearGradient>
                </defs>
                
                {/* Chart area */}
                <path
                  d={`M 20 ${150 - analyticsData[0].value} ${analyticsData.map((point, index) => 
                    `L ${20 + (index * 60)} ${150 - point.value}`
                  ).join(' ')}`}
                  fill="none"
                  stroke="var(--primary-blue)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                
                {/* Fill area under curve */}
                <path
                  d={`M 20 150 L 20 ${150 - analyticsData[0].value} ${analyticsData.map((point, index) => 
                    `L ${20 + (index * 60)} ${150 - point.value}`
                  ).join(' ')} L ${20 + ((analyticsData.length - 1) * 60)} 150 Z`}
                  fill="url(#chartGradient)"
                />
                
                {/* Data points */}
                {analyticsData.map((point, index) => (
                  <circle
                    key={index}
                    cx={20 + (index * 60)}
                    cy={150 - point.value}
                    r="4"
                    fill="var(--primary-blue)"
                    stroke="white"
                    strokeWidth="2"
                  />
                ))}
                
                {/* X-axis labels */}
                {analyticsData.map((point, index) => (
                  <text
                    key={index}
                    x={20 + (index * 60)}
                    y={170}
                    textAnchor="middle"
                    fontSize="12"
                    fill="var(--text-muted)"
                  >
                    {point.month}
                  </text>
                ))}
              </svg>
            </div>
          </div>
        </div>

        {/* Selected Location Info */}
        {selectedLocation && (
          <div className="location-popup">
            <div className="popup-content">
              <h4>{selectedLocation.name}</h4>
              <p>Beneficiaries: {selectedLocation.beneficiaries}</p>
              <button onClick={() => setSelectedLocation(null)}>×</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default GeoMap;