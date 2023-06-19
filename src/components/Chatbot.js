import React, { useRef, useState } from "react";
import "../assets/Chatbot.css";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
    Col,
    Row,
    Card,
    Form,
    Button,
    InputGroup,
} from "@themesberg/react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import ChatIcon from "@material-ui/icons/Chat";
const Chatbot = () => {
    const [step, setStep] = useState(1);
    const [language, setLanguage] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [step2Value, setStep2Value] = useState("");
    // const [step3Value, setStep3Value] = useState('');
    const [step4Value, setStep4Value] = useState("");
    const [step5Value, setStep5Value] = useState("");
    const [disable, setDisable] = useState(false);
    const chatbox = useRef();
    // Other form //
    const [showForm, setShowForm] = useState(false);
    const [complaintId, setComplainId] = useState(0);
    const [complaintNo, setComplaintNo] = useState(0);
    const [complaintTypeId, setComplainTypeId] = useState(0);
    const [complainant, setComplain] = useState("");
    const [contactNo, setContactNo] = useState(0);
    const [comment, setComment] = useState("");
    const [sourceId, setSourceId] = useState(0);
    const [complaintDate, setComplaintDate] = useState("");
    const [address, setAddress] = useState("");
    const [ipAddress, setIpAddress] = useState(0);
    const [complainImageName, setComplainImageName] = useState("");
    const [complaintImage, setComplainImage] = useState("");
    const [guiLatitude, setGuiLatitude] = useState("");
    const [guiLongitude, setGuiLongitude] = useState("");
    const API = `${process.env.REACT_APP_API}Complaint/GetComplaintTypeMasters`;
    const history = useHistory;

    const handleStep2Selection = (value) => {
        setStep2Value(value);
        console.log(value);
        // Send request to the web service with step 2 value and language
        // Receive response or 'False' from the web service
        // const response = 'Response from the web service'; // Replace with actual response

        if (value !== false) {
            setStep4Value(value);
            setStep(4);
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
        const complaintNumber = "COM-123456"; // Replace with actual complaint number
        alert(`Complaint Number: ${complaintNumber}`);
    };
    const handleLanguageSelection = (response) => { };
    const handleCall = async () => {
        await axios
            .get(API)
            .then((response) => {
                console.log(response);
                setLanguage(response.data);
                setStep(2);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const renderStep1Options = () => {
        return (
            <div>
                <button
                    className="btn btn-dark me-3"
                    onClick={() => handleLanguageSelection("हिंदी")}
                >
                    हिंदी
                </button>


                <button
                    className="btn btn-outline-secondary"
                    onClick={() => {
                        handleCall();
                    }}
                >
                    English
                </button>
            </div>
        );
    };

    const renderStep2Options = () => {
        const handleNewComplaint = () => {
            setShowForm(true);
            setStep(2);
        };
        const handleImageChange = (e) => {
            const selectedImage = e.target.files[0];
            console.log(selectedImage);
            // Do something with the selected image
        };
        const handleComSave = () => {
            // if (rtiDesignation === "") {
            //     setRtiDesignationError("RTI Designation is Required");
            // } else if (rtiDesignation.length <= 2 ||
            //     rtiDesignation.length > 100) {
            //     setRtiDesignationError("RTI Designation Must Be Between 3 to 100 Letter");
            // }

            // else {
            //     setRtiDesignationError("");
            // }

            // if (formValid) {
            //     let UserID = localStorage.getItem("UserId")
            let formData = new FormData();
            formData.append("complaintId", complaintId);
            formData.append("complaintNo", complaintNo);
            formData.append("complaintTypeId", complaintTypeId);
            formData.append("complainant", complainant);
            formData.append("contactNo", contactNo);
            formData.append("comment", comment);
            formData.append("sourceId", sourceId);
            formData.append("complaintDate", complaintDate);
            formData.append("address", address);
            formData.append("complainImageName", complainImageName);
            formData.append("complaintImage", complaintImage);
            formData.append("guiLatitude", guiLatitude);
            formData.append("guiLongitude", guiLongitude);
            formData.append("ipAddress", ipAddress);

            Axios.post(
                `${process.env.REACT_APP_API}Complaint/ComplaintRegister`,
                formData
            )
                .then((response) => {
                    console.log(response.data);
                    Swal.fire("Save", "Complaint Saved Sucessfully", "success");
                    history.push("/dashboard");
                })
                .catch((error) => {
                    console.log(error);
                });
            // };
        };

        return (
            <div>
                {!showForm && (
                    <>
                        <button
                            className="btn btn-outline-dark me-3"
                            onClick={() => handleStep2Selection("Water Logging")}
                        >
                            Water Logging
                        </button>
                        <button
                            className="btn btn-outline-dark me-3"
                            onClick={() => handleStep2Selection("Pot Holes")}
                        >
                            Pot Holes
                        </button>
                        <button
                            className="btn btn-outline-dark me-3"
                            onClick={() => handleStep2Selection("Street Light")}
                        >
                            Street Light
                        </button>
                        <button
                            className="btn btn-outline-dark me-3"
                            onClick={() => handleStep2Selection("Other Road Issue")}
                        >
                            Other Road Issue
                        </button>
                        <button
                            className="btn btn-dark me-3"
                            onClick={() => {
                                setStep(1);
                                setShowForm(false);
                            }}
                        >
                            Go Back
                        </button>
                        <button
                            className="btn btn-dark me-3"
                            onClick={() => handleNewComplaint()}
                        >
                            Other Complaint
                        </button>
                    </>
                )}

                {showForm && (
                    <form  >
                        {/* Render your form inputs here */}
                        {/* <div className="form-group">
                            <label htmlFor="complaintTitle">Complaint Title</label>
                            <input type="text" className="form-control" id="complaintTitle" />
                        </div> */}
                        {/* Add more form inputs as needed */}
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Complaint</Form.Label>
                                    <Form.Control
                                        value={complainant}
                                        required
                                        type="text"
                                        onChange={(e) => setComplain()}
                                        placeholder="Enter your Complaint"
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="lastName">
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter your Contact Number"
                                        value={contactNo}
                                        onChange={(e) => setContactNo()}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter your Comment"
                                        value={comment}
                                        onChange={(e) => setComment()}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="lastName">
                                    <Form.Label>Source Id</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter your source Id"
                                        value={sourceId}
                                        onChange={(e) => setSourceId()}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="align-items-center">
                            <Col md={6} className="mb-3">
                                <Form.Group id="birthday">
                                    <Form.Label>Complaint Date</Form.Label>
                                    <Datetime
                                        timeFormat={false}
                                        onChange={setComplaintDate}
                                        renderInput={(props, openCalendar) => (
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                                </InputGroup.Text>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    value={
                                                        complaintDate
                                                            ? moment(complaintDate).format("MM/DD/YYYY")
                                                            : ""
                                                    }
                                                    placeholder="mm/dd/yyyy"
                                                    onFocus={openCalendar}
                                                    onChange={(e) => {
                                                        setComplaintDate();
                                                    }}
                                                />
                                            </InputGroup>
                                        )}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter your Address"
                                        value={address}
                                        onChange={(e) => {
                                            setAddress();
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="lastName">
                                    <Form.Label>Complain Image Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter your Complain Image Name"
                                        value={complainImageName}
                                        onChange={(e) => {
                                            setComplainImageName();
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group controlId="complainImage">
                                    <Form.Label>Complain Image</Form.Label>
                                    <Form.Control
                                        required
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="lastName">
                                    <Form.Label>GUI Latitude</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter your GUI Latitude"
                                        value={guiLatitude}
                                        onChange={(e) => {
                                            setGuiLatitude();
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="lastName">
                                    <Form.Label>GUI Longitude</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter your Longitude"
                                        value={guiLongitude}
                                        onChange={(e) => {
                                            setGuiLongitude();
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>


                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={handleComSave()}
                        >
                            Submit
                        </button>
                    </form>
                )
                }
            </div >
        );
    };

    const renderStep4Options = () => {
        return (
            <div>
                <button
                    className="btn btn-sm btn-outline-secondary me-3"
                    onClick={() => handleStep4Selection(12.34, 56.78)}
                >
                    Fetch your current location
                </button>
                <button
                    className="btn btn-sm btn-outline-secondary me-3"
                    onClick={() => handleStep4Selection(0, 0)}
                >
                    Select Location on Map
                </button>
                <button className="btn btn-sm btn-dark me-3" onClick={() => setStep(2)}>
                    Go Back
                </button>
            </div>
        );
    };

    const renderStep5Options = () => {
        return (
            <div>
                <button
                    className="btn btn-sm btn-outline-dark me-3"
                    onClick={() => handleStep5Selection("Camera")}
                >
                    Camera
                </button>
                <button
                    className="btn btn-sm btn-outline-dark me-3"
                    onClick={() => handleStep5Selection("Upload from Gallery")}
                >
                    Upload from Gallery
                </button>
                <button className="btn btn-sm btn-dark me-3" onClick={() => setStep(4)}>
                    Go Back
                </button>
            </div>
        );
    };
    const handleChatbox = () => {
        chatbox.current.classList.toggle("show");
        console.log(chatbox.current.classList.contains("show"));
        if (!chatbox.current.classList.contains("show")) {
            setStep(1);
        }
    };

    return (
        <div className="botBox">
            <div>
                <button
                    onClick={() => handleChatbox()}
                    className=" pmd-btn-fab pmd-ripple-effect pmd-btn-raised btn btn-dark rounded-circle position-fixed botBtn"
                    type="button"
                >
                    <ChatIcon style={{ height: 68, width: 64, marginLeft: -6.5 }} />
                </button>
            </div>

            <div
                id="chat1"
                ref={chatbox}
                className="card"
                style={{ borderRadius: 15 }}
            >
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
                                style={{ width: 45, height: "100%" }}
                            />
                            <div
                                className="p-3 ms-3"
                                style={{
                                    borderRadius: 15,
                                    backgroundColor: "rgba(57, 192, 237,.2)",
                                }}
                            >
                                <p className="small mb-0">
                                    Hello and thank you for visiting . Please click the given
                                    option.
                                </p>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="d-flex flex-row justify-content-end mb-4">
                            <div
                                className="p-3 me-3 border"
                                style={{ borderRadius: 15, backgroundColor: "#fbfbfb" }}
                            >
                                <p className="small mb-0"> Please click the given option</p>
                            </div>
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                alt="avatar 1"
                                style={{ width: 45, height: "100%" }}
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
                                style={{ width: 45, height: "100%" }}
                            />
                            <div
                                className="p-3 ms-3"
                                style={{
                                    borderRadius: 15,
                                    backgroundColor: "rgba(57, 192, 237,.2)",
                                }}
                            >
                                <p className="small mb-0">
                                    We're glad to hear that! If you have any questions or need
                                    further assistance, feel free to ask.
                                </p>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="d-flex flex-row justify-content-end mb-4">
                            <div
                                className="p-3 me-3 border"
                                style={{ borderRadius: 15, backgroundColor: "#fbfbfb" }}
                            >
                                <p className="small mb-0">Sure, I'm here to help!</p>
                            </div>
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                alt="avatar 1"
                                style={{ width: 45, height: "100%" }}
                            />
                        </div>
                    )}

                    {step === 5 && (
                        <div className="d-flex flex-row justify-content-start mb-4">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                alt="avatar 1"
                                style={{ width: 45, height: "100%" }}
                            />
                            <div
                                className="p-3 ms-3"
                                style={{
                                    borderRadius: 15,
                                    backgroundColor: "rgba(57, 192, 237,.2)",
                                }}
                            >
                                <p className="small mb-0">You're welcome! Have a great day!</p>
                            </div>
                        </div>
                    )}

                    {step === 6 && (
                        <div className="d-flex flex-row justify-content-end mb-4">
                            <div
                                className="p-3 me-3 border"
                                style={{ borderRadius: 15, backgroundColor: "#fbfbfb" }}
                            >
                                <p className="small mb-0">Thank you, you too!</p>
                            </div>
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                alt="avatar 1"
                                style={{ width: 45, height: "100%" }}
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
                                <button
                                    className="btn btn-sm btn-dark me-3"
                                    onClick={() => {
                                        setStep(1);
                                        setShowForm(false);
                                    }}
                                >
                                    <i className="fas fa-angle-left" />
                                    Cancel
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
                                {step === 5 ? "Submit" : "Next"}
                            </button>
                        </div>
                    )}

                    {step === 7 && (
                        <button
                            className="btn btn-sm btn-primary"
                            onClick={() => setStep(1)}
                        >
                            Start Over
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
