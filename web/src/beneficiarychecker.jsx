import { useState, useRef } from 'react';
import './beneficiarychecker.css';

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

const BeneficiaryChecker = ({ onNavigate = () => {}, activeKey = 'beneficiarychecker', theme = 'light', onToggleTheme = () => {} }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    occupation: '',
    caste: '',
    annualIncome: '',
    aadhaarNumber: '',
    state: '',
    district: '',
    city: '',
    village: ''
  });
  const [uploadedFiles, setUploadedFiles] = useState({
    aadhaarCard: null,
    incomeCertificate: null,
    communityCertificate: null,
    rationCard: null
  });
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null); // null, 'success', 'failure'
  const [generatedId, setGeneratedId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const photoInputRef = useRef(null);
  
  const isDarkMode = theme === 'dark';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (documentType, file) => {
    setUploadedFiles(prev => ({
      ...prev,
      [documentType]: file
    }));
  };

  const handlePhotoCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedPhoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateBeneficiaryId = () => {
    const id = 'BH' + Math.random().toString(36).substr(2, 6).toUpperCase();
    setGeneratedId(id);
  };

  const handleVerifyBeneficiary = async () => {
    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      // Check if all required fields are filled
      const requiredFields = ['name', 'fatherName', 'aadhaarNumber', 'state', 'district'];
      const isFormComplete = requiredFields.every(field => formData[field].trim() !== '');
      const hasRequiredDocs = uploadedFiles.aadhaarCard && uploadedFiles.incomeCertificate;
      
      if (isFormComplete && hasRequiredDocs && capturedPhoto) {
        setVerificationStatus('success');
        generateBeneficiaryId();
      } else {
        setVerificationStatus('failure');
      }
      setIsVerifying(false);
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      fatherName: '',
      occupation: '',
      caste: '',
      annualIncome: '',
      aadhaarNumber: '',
      state: '',
      district: '',
      city: '',
      village: ''
    });
    setUploadedFiles({
      aadhaarCard: null,
      incomeCertificate: null,
      communityCertificate: null,
      rationCard: null
    });
    setCapturedPhoto(null);
    setVerificationStatus(null);
    setGeneratedId('');
  };

  const UtilityIcon = ({ name }) => {
    const icons = {
      menu: (
        <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      ),
      upload: (
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      ),
      camera: (
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2v11z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      ),
      checkCircle: (
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      ),
      sun: (
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      ),
      moon: (
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      )
    };
    
    return (
      <svg viewBox="0 0 24 24" fill="none" className="icon">
        {icons[name]}
      </svg>
    );
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

  const FileUploadButton = ({ documentType, label, description, uploaded }) => (
    <div className="document-upload-item">
      <div className="document-info">
        <h4 className="document-title">{label}</h4>
        <p className="document-description">{description}</p>
      </div>
      <div className="upload-button-container">
        <input
          type="file"
          id={documentType}
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleFileUpload(documentType, e.target.files[0])}
          className="file-input"
        />
        <label htmlFor={documentType} className={`upload-button ${uploaded ? 'uploaded' : ''}`}>
          <UtilityIcon name="upload" />
          {uploaded ? 'Uploaded' : 'Upload'}
        </label>
      </div>
    </div>
  );

  return (
    <div className={`beneficiary-checker ${isDarkMode ? 'dark' : 'light'} ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
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
      <main className="content" aria-label="Beneficiary verification content">
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
              <h1>Beneficiary Verification</h1>
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
            </div>
          </div>
        </header>

        <div className="content">
          {verificationStatus === null && (
            <div className="verification-form">
              {/* Personal Details Section */}
              <section className="form-section">
                <h2 className="section-title">Personal Details</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter full name"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="occupation">Occupation</label>
                    <select
                      id="occupation"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Select Occupation</option>
                      <option value="farmer">Farmer</option>
                      <option value="laborer">Laborer</option>
                      <option value="shopkeeper">Shopkeeper</option>
                      <option value="driver">Driver</option>
                      <option value="housewife">Housewife</option>
                      <option value="student">Student</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="fatherName">Father's Name</label>
                    <input
                      type="text"
                      id="fatherName"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleInputChange}
                      placeholder="Enter father's name"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="caste">Caste</label>
                    <select
                      id="caste"
                      name="caste"
                      value={formData.caste}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="">Select Caste</option>
                      <option value="general">General</option>
                      <option value="obc">OBC</option>
                      <option value="sc">SC</option>
                      <option value="st">ST</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="annualIncome">Annual Income</label>
                    <input
                      type="text"
                      id="annualIncome"
                      name="annualIncome"
                      value={formData.annualIncome}
                      onChange={handleInputChange}
                      placeholder="Enter annual income"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="aadhaarNumber">Aadhaar Number</label>
                    <input
                      type="text"
                      id="aadhaarNumber"
                      name="aadhaarNumber"
                      value={formData.aadhaarNumber}
                      onChange={handleInputChange}
                      placeholder="XXXX-XXXX-XXXX"
                      className="form-input"
                      maxLength="12"
                    />
                  </div>
                </div>
              </section>

              {/* Location Section */}
              <section className="form-section">
                <h2 className="section-title">Location</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Enter state"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="district">District</label>
                    <input
                      type="text"
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      placeholder="Enter district"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="village">Village</label>
                    <input
                      type="text"
                      id="village"
                      name="village"
                      value={formData.village}
                      onChange={handleInputChange}
                      placeholder="Enter village"
                      className="form-input"
                    />
                  </div>
                </div>
                <div className="auto-detect">
                  <button type="button" className="auto-detect-btn">
                    📍 Auto-detect Location
                  </button>
                </div>
              </section>

              {/* Photo Capture Section */}
              <section className="form-section">
                <h2 className="section-title">Photo Capture</h2>
                <div className="photo-capture-container">
                  {capturedPhoto ? (
                    <div className="captured-photo">
                      <img src={capturedPhoto} alt="Captured" className="photo-preview" />
                      <button 
                        type="button" 
                        className="retake-photo-btn"
                        onClick={() => setCapturedPhoto(null)}
                      >
                        Retake Photo
                      </button>
                    </div>
                  ) : (
                    <div className="photo-placeholder">
                      <UtilityIcon name="camera" />
                      <p>No image</p>
                      <input
                        type="file"
                        ref={photoInputRef}
                        accept="image/*"
                        onChange={handlePhotoCapture}
                        className="file-input"
                      />
                      <button 
                        type="button" 
                        className="capture-photo-btn"
                        onClick={() => photoInputRef.current?.click()}
                      >
                        Take Photo
                      </button>
                    </div>
                  )}
                  <p className="photo-instruction">Please provide a clear front-facing photo.</p>
                </div>
              </section>

              {/* Upload Documents Section */}
              <section className="form-section">
                <h2 className="section-title">Upload Documents</h2>
                <div className="documents-upload">
                  <FileUploadButton
                    documentType="aadhaarCard"
                    label="Aadhaar Card"
                    description="Upload a copy of your Aadhaar card"
                    uploaded={uploadedFiles.aadhaarCard}
                  />
                  <FileUploadButton
                    documentType="incomeCertificate"
                    label="Income Certificate"
                    description="Upload your income certificate"
                    uploaded={uploadedFiles.incomeCertificate}
                  />
                  <FileUploadButton
                    documentType="communityCertificate"
                    label="Community Certificate"
                    description="Upload your community certificate"
                    uploaded={uploadedFiles.communityCertificate}
                  />
                  <FileUploadButton
                    documentType="rationCard"
                    label="Ration Card"
                    description="Upload a copy of the ration card"
                    uploaded={uploadedFiles.rationCard}
                  />
                </div>
              </section>

              {/* Verify Button */}
              <div className="verify-button-container">
                <button 
                  type="button" 
                  className="verify-button"
                  onClick={handleVerifyBeneficiary}
                  disabled={isVerifying}
                >
                  {isVerifying ? 'Verifying...' : 'Verify Beneficiary'}
                </button>
              </div>
            </div>
          )}

          {/* Verification Success */}
          {verificationStatus === 'success' && (
            <div className="verification-result success">
              <div className="result-icon success-icon">
                <UtilityIcon name="checkCircle" />
              </div>
              <h2 className="result-title">Verification Successful!</h2>
              <p className="result-message">
                Your beneficiary verification has been completed successfully.
              </p>
              <div className="generated-id">
                <h3>Your Beneficiary ID:</h3>
                <div className="id-display">{generatedId}</div>
              </div>
              <div className="result-actions">
                <button className="generate-id-btn" onClick={generateBeneficiaryId}>
                  Generate New ID
                </button>
                <button className="new-verification-btn" onClick={resetForm}>
                  New Verification
                </button>
              </div>
            </div>
          )}

          {/* Verification Failure */}
          {verificationStatus === 'failure' && (
            <div className="verification-result failure">
              <div className="result-icon failure-icon">
                ❌
              </div>
              <h2 className="result-title">Verification Unsuccessful</h2>
              <p className="result-message">
                We couldn't verify your details. Please check your information and try again later.
              </p>
              <div className="result-actions">
                <button className="try-again-btn" onClick={() => setVerificationStatus(null)}>
                  Try Again
                </button>
                <button className="new-verification-btn" onClick={resetForm}>
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BeneficiaryChecker;