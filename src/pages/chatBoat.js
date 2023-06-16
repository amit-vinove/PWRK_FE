import React, { useState, useRef } from 'react';

function Chatbot() {
  const [language, setLanguage] = useState('');
  const [step, setStep] = useState(1);
  const [selectedIssue, setSelectedIssue] = useState('');
  const [selectedComplaintType, setSelectedComplaintType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState('');
  const fileInputRef = useRef(null);

  const handleLanguageSelect = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setStep(2);
  };

  const handleIssueSelect = (selectedIssue) => {
    setSelectedIssue(selectedIssue);
    setStep(3);
  };

  const handleComplaintTypeSelect = (selectedComplaintType) => {
    setSelectedComplaintType(selectedComplaintType);
    setStep(4);
  };

  const handleLocationSelect = (selectedLocation) => {
    setSelectedLocation(selectedLocation);
    setStep(5);
  };

  const handlePhotoSelect = (selectedPhoto) => {
    setSelectedPhoto(selectedPhoto);
    setStep(6);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedPhoto(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    // Simulate submitting data to the server
    console.log('Language:', language);
    console.log('Issue:', selectedIssue);
    console.log('Complaint Type:', selectedComplaintType);
    console.log('Location:', selectedLocation);
    console.log('Photo:', selectedPhoto);
    setStep(7);
  };

  const handleGoBack = () => {
    setStep(step - 1);
  };

  const renderOptions = (options) => {
    return (
      <div className="chatbox">
        {options.map((option) => (
          <button key={option} onClick={() => handleIssueSelect(option)}>
            {option}
          </button>
        ))}
        <button onClick={handleGoBack}>Go Back</button>
      </div>
    );
  };

  const renderChatbotUI = () => {
    switch (step) {
      case 1:
        return (
          <div className="chatbox">
            <h2>Select Language</h2>
            <button onClick={() => handleLanguageSelect('हिंदी')}>हिंदी</button>
            <button onClick={() => handleLanguageSelect('English')}>English</button>
          </div>
        );
      case 2:
        return (
          <div className="chatbox">
            <h2>Select Issue</h2>
            <button onClick={() => handleIssueSelect('Water Logging')}>Water Logging</button>
            <button onClick={() => handleIssueSelect('Pot Holes')}>Pot Holes</button>
            <button onClick={() => handleIssueSelect('Street Light')}>Street Light</button>
            <button onClick={() => handleIssueSelect('Other Road Issue')}>Other Road Issue</button>
            <button onClick={() => setStep(1)}>Go Back</button>
          </div>
        );
      case 3:
        return (
          <div className="chatbox">
            <h2>Select Complaint Type</h2>
            <button onClick={() => handleComplaintTypeSelect('Encroachment')}>Encroachment</button>
            <button onClick={() => handleComplaintTypeSelect('Cleaning')}>Cleaning</button>
            <button onClick={() => setStep(2)}>Go Back</button>
          </div>
        );
      case 4:
        return (
          <div className="chatbox">
            <h2>Select Location</h2>
            <button onClick={() => handleLocationSelect('Fetch Current Location')}>
              Fetch Current Location
            </button>
            <button onClick={() => handleLocationSelect('Select Location on Map')}>
              Select Location on Map
            </button>
            <button onClick={() => setStep(3)}>Go Back</button>
          </div>
        );
      case 5:
        return (
          <div className="chatbox">
            <h2>Select Photo</h2>
            <button onClick={() => handlePhotoSelect('Camera')}>Camera</button>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <button onClick={() => fileInputRef.current.click()}>Upload from Gallery</button>
            <button onClick={() => setStep(4)}>Go Back</button>
        
          </div>
        );
      case 6:
        return (
          <div className="chatbox">
            <h2>Submit Complaint</h2>
            {selectedPhoto && (
              <div>
                <img src={selectedPhoto} alt="Selected" />
              </div>
            )}
            <button onClick={handleSubmit}>Submit and Generate Complaint No</button>
            <button onClick={() => setStep(5)}>Go Back</button>
          </div>
        );
      case 7:
        return (
          <div className="chatbox">
            <h2>Success!</h2>
            <p>Complaint submitted successfully! Complaint number: 12345</p>
          </div>
        );
      default:
        return null;
    }
  };

  return <div>{renderChatbotUI()}</div>;
}

export default Chatbot;
