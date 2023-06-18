import React, { useRef, useState } from 'react';
import '../assets/Chatbot.css'

const Chatbot = () => {
    const [step, setStep] = useState(1);
    const [language, setLanguage] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [step2Value, setStep2Value] = useState('');
    const [step3Value, setStep3Value] = useState('');
    const [step4Value, setStep4Value] = useState('');
    const [step5Value, setStep5Value] = useState('');
    const [disable, setDisable] = useState(false);
    const chatbox = useRef();

    const handleLanguageSelection = (selectedLanguage) => {
        setLanguage(selectedLanguage);
        setStep(2);
    };

    const handleStep2Selection = (value) => {
        setStep2Value(value);
        console.log(value);
        // Send request to the web service with step 2 value and language
        // Receive response or 'False' from the web service
        // const response = 'Response from the web service'; // Replace with actual response

        if (value !== false) {
            setStep3Value(value);
            setStep(3);
        } else {
            setStep(4);
        }
    };

    const handleStep4Selection = (longitude, latitude) => {
        setStep4Value(`${longitude},${latitude}`);
        setStep(5);
    };

    const handleStep5Selection = (image) => {
        // Handle the uploaded photo

        setStep(6);
    };

    const handleSubmit = () => {
        // Send data to the web service using the captured values

        // Display the generated complaint number to the user
        const complaintNumber = 'COM-123456'; // Replace with actual complaint number
        alert(`Complaint Number: ${complaintNumber}`);
    };

    const renderStep1Options = () => {
        return (
            <div>
                <button className='btn btn-dark me-3' onClick={() => handleLanguageSelection('हिंदी')}>हिंदी</button>
                <button className='btn btn-outline-secondary' onClick={() => handleLanguageSelection('English')}>English</button>
            </div>
        );
    };

    const renderStep2Options = () => {
        return (
            <div>
                <button className='btn btn-outline-dark me-3' onClick={() => handleStep2Selection('Water Logging')}>Water Logging</button>
                <button className='btn btn-outline-dark me-3' onClick={() => handleStep2Selection('Pot Holes')}>Pot Holes</button>
                <button className='btn btn-outline-dark me-3' onClick={() => handleStep2Selection('Street Light')}>Street Light</button>
                <button className='btn btn-outline-dark me-3' onClick={() => handleStep2Selection('Other Road Issue')}>Other Road Issue</button>
                <button className='btn btn-dark me-3' onClick={() => setStep(1)}>Go Back</button>
            </div>
        );
    };

    const renderStep4Options = () => {
        return (
            <div>
                <button className="btn btn-sm btn-outline-secondary me-3" onClick={() => handleStep4Selection(12.34, 56.78)}>Fetch your current location</button>
                <button className="btn btn-sm btn-outline-secondary me-3" onClick={() => handleStep4Selection(0, 0)}>Select Location on Map</button>
                <button className="btn btn-sm btn-dark me-3" onClick={() => setStep(2)}>Go Back</button>
            </div>
        );
    };

    const renderStep5Options = () => {
        return (
            <div>
                <button className="btn btn-sm btn-outline-dark me-3" onClick={() => handleStep5Selection('Camera')}>Camera</button>
                <button className="btn btn-sm btn-outline-dark me-3" onClick={() => handleStep5Selection('Upload from Gallery')}>Upload from Gallery</button>
                <button className="btn btn-sm btn-dark me-3" onClick={() => setStep(4)}>Go Back</button>
            </div>
        );
    };
    const handleChatbox = () => {
        chatbox.current.classList.toggle("show");
    }

    return (
        <div className='botBox'>
            <div>
                <button
                    onClick={() => handleChatbox()}
                    className=" pmd-btn-fab pmd-ripple-effect pmd-btn-raised btn btn-dark rounded-circle position-fixed botBtn"
                    type="button"
                >
                    <i className="material-icons pmd-sm">star</i>
                </button>
            </div>


            <div id="chat1" ref={chatbox} className="card" style={{ borderRadius: 15 }}>
                <div
                    className="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
                    style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
                >
                    <i className="fas fa-angle-left" />
                    <p className="mb-0 fw-bold">Live chat</p>
                    <i className="fas fa-times" />
                </div>
                <div className="card-body">
                    {step === 1 && (
                        <div className="d-flex flex-row justify-content-start mb-4">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                alt="avatar 1"
                                style={{ width: 45, height: '100%' }}
                            />
                            <div
                                className="p-3 ms-3"
                                style={{ borderRadius: 15, backgroundColor: 'rgba(57, 192, 237,.2)' }}
                            >
                                <p className="small mb-0">Hello and thank you for visiting MDBootstrap. Please click the video below.</p>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="d-flex flex-row justify-content-end mb-4">
                            <div className="p-3 me-3 border" style={{ borderRadius: 15, backgroundColor: '#fbfbfb' }}>
                                <p className="small mb-0">Thank you, I really like your product.</p>
                            </div>
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                alt="avatar 1"
                                style={{ width: 45, height: '100%' }}
                            />
                        </div>
                    )}

                    {/* {step === 3 && (
                         <div className="d-flex flex-row justify-content-start mb-4">
                             <img
                                 src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                 alt="avatar 1"
                                 style={{ width: 45, height: '100%' }}
                             />
                             <div className="ms-3" style={{ borderRadius: 15 }}>
                                 <div className="bg-image">
                                     <img
                                         src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/screenshot1.webp"
                                         style={{ borderRadius: 15 }}
                                         alt="video"
                                     />
                                     <a href="#!">
                                         <div className="mask" />
                                     </a>
                                 </div>
                             </div>
                         </div>
                     )} */}

                    {step === 3 && (
                        <div className="d-flex flex-row justify-content-start mb-4">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                alt="avatar 1"
                                style={{ width: 45, height: '100%' }}
                            />
                            <div className="p-3 ms-3" style={{ borderRadius: 15, backgroundColor: 'rgba(57, 192, 237,.2)' }}>
                                <p className="small mb-0">
                                    We're glad to hear that! If you have any questions or need further assistance, feel free to ask.
                                </p>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="d-flex flex-row justify-content-end mb-4">
                            <div className="p-3 me-3 border" style={{ borderRadius: 15, backgroundColor: '#fbfbfb' }}>
                                <p className="small mb-0">Sure, I'm here to help!</p>
                            </div>
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                alt="avatar 1"
                                style={{ width: 45, height: '100%' }}
                            />
                        </div>
                    )}

                    {step === 5 && (
                        <div className="d-flex flex-row justify-content-start mb-4">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                alt="avatar 1"
                                style={{ width: 45, height: '100%' }}
                            />
                            <div className="p-3 ms-3" style={{ borderRadius: 15, backgroundColor: 'rgba(57, 192, 237,.2)' }}>
                                <p className="small mb-0">You're welcome! Have a great day!</p>
                            </div>
                        </div>
                    )}

                    {step === 6 && (
                        <div className="d-flex flex-row justify-content-end mb-4">
                            <div className="p-3 me-3 border" style={{ borderRadius: 15, backgroundColor: '#fbfbfb' }}>
                                <p className="small mb-0">Thank you, you too!</p>
                            </div>
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                alt="avatar 1"
                                style={{ width: 45, height: '100%' }}
                            />
                        </div>
                    )}

                    {step === 1 && renderStep1Options()}
                    {step === 2 && renderStep2Options()}
                    {step === 4 && renderStep4Options()}
                    {step === 5 && renderStep5Options()}

                    {/* {step === 3 && (
                         <div>
                             <p>Response: {step3Value}</p>
                             <p>Mobile No.: {mobileNo}</p>
                             <p>Language: {language}</p>
                         </div>
                     )} */}

                    {step === 6 && (
                        <div>
                            <p>Location: {step4Value}</p>
                            <p>Image: {step5Value}</p>
                        </div>
                    )}

                    {step === 7 && (
                        <div>
                            <p>Complaint Submitted Successfully!</p>
                            <p>Complaint Number: COM-123456</p>
                        </div>
                    )}
                </div>
                <div
                    className="card-footer p-3 bg-white"
                    style={{ borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}
                >
                    {step !== 7 && (
                        <div>
                            {step !== 1 && (
                                <button className="btn btn-sm btn-dark me-3" onClick={() => setStep(step - 1)}>
                                    <i className="fas fa-angle-left" />Back
                                </button>
                            )}
                            <button
                                className="btn btn-sm btn-primary"
                                onClick={() => {
                                    if (step === 5) {
                                        handleSubmit();
                                    } else {
                                        setStep(step + 1);
                                    }
                                }}
                            >
                                {step === 5 ? 'Submit' : 'Next'}
                            </button>
                        </div>
                    )}

                    {step === 7 && (
                        <button className="btn btn-sm btn-primary" onClick={() => setStep(1)}>
                            Start Over
                        </button>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Chatbot;
