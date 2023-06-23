import React, { useEffect, useRef, useState } from "react";
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
  const [language, setLanguage] = useState([]);
  const [step2Data, setstep2Data] = useState([]); // complaint type
  const [step3Data, setstep3Data] = useState([]); // comment based on complaint id
  const [mobileNo, setMobileNo] = useState("");
  const [step2Value, setStep2Value] = useState({});
  const [step3Value, setStep3Value] = useState({});
  const [step4Value, setStep4Value] = useState({});
  const [step5Value, setStep5Value] = useState({});
  const [disable, setDisable] = useState(false);
  const [roadSurfaceDamage, setRoadSurfaceDamage] = useState("");
  const [potHoleOnRoad, setPotHoleOnRoad] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [complaintValue, setComplaintValue] = useState("");
  const chatbox = useRef();
  // Other form //
  const [languageName, setLanguageName] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [complaintId, setComplainId] = useState(0);
  const [complaintNo, setComplaintNo] = useState(0);
  const [complaintTypeId, setComplainTypeId] = useState(0);
  const [complainant, setComplain] = useState("");
  const [contactNo, setContactNo] = useState(0);
  const [userFormVisible, setuserFormVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [sourceId, setSourceId] = useState(0);
  const [complaintDate, setComplaintDate] = useState("");
  const [address, setAddress] = useState("");
  const [ipAddress, setIpAddress] = useState(0);
  const [complainImageName, setComplainImageName] = useState("");
  const [complaintImage, setComplainImage] = useState("");
  const [guiLatitude, setGuiLatitude] = useState("");
  const [guiLongitude, setGuiLongitude] = useState("");
  const [visible, setVisible] = useState(false);
  const ComplaitEndpoint = `${process.env.REACT_APP_API}Complaint/GetComplaintTypeMasters`;
  const CommentByComplaintId = `${process.env.REACT_APP_API}Complaint/GetComplaintCommentTexts?complaintTypeId=`;

  const history = useHistory;
  const [showInputChat, setShowInputChat] = useState(false);

  useEffect(() => {
    console.log(contactNo);
  }, [contactNo]);

  const handleStep2Selection = async (value) => {
    let data = step2Data.filter((ele) => ele.complaintTypeId === value)[0];
    setStep2Value(data);
    console.log(value);
    // get the step 3 data
    await axios
      .get(CommentByComplaintId + value)
      .then((response) => {
        console.log(response);
        setstep3Data(response.data);
        setStep(3);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleStep3Selection = async (value) => {
    let data = step3Data.filter((ele) => ele.id === value)[0];
    setStep3Value(data);
    setShowForm(false);
    setuserFormVisible(true);
    // setStep(4);
  };

  console.log(step2Data, "70");

  const handleOther = () => {
    setShowInputChat(true);
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
    const payload = {
      complaintNo,
      complaintTypeId: complaintTypeId,
      complainant,
      contactNo,
      comment,
      sourceId,
      complaintDate,
      address,
      complainImageName,
      complaintImage,
      guiLatitude,
      ipAddress,
    };
    console.log("219", payload);

    let formData = new FormData();
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
    const complaintNumber = complaintId; // Replace with actual complaint number
    alert(`Complaint Number: ${complaintNumber}`);
    // };
  };
  // Send data to the web service using the captured values   http://122.176.101.76:8085/api/Complaint/ComplaintRegister

  // Display the generated complaint number to the user

  const handleLanguageSelection = (response) => {};
  const handleCall = async () => {
    await axios
      .get(ComplaitEndpoint)
      .then((response) => {
        console.log(response);
        setstep2Data(response.data);
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
            setLanguageName(true);
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

    return (
      <div>
        {!showForm && (
          <>
            {step2Data.map((element) => {
              return (
                <button
                  className="btn btn-outline-dark me-3"
                  onClick={() => handleStep2Selection(element.complaintTypeId)}
                >
                  {element.complaintType}
                </button>
              );
            })}
            <button
              className="btn btn-dark me-3"
              onClick={() => {
                setStep(1);
                setShowForm(false);
              }}
            >
              Go Back
            </button>
          </>
        )}
      </div>
    );
  };

  const renderStep3Options = () => {
    const handleNewComplaint = () => {
      setShowForm(true);
      setStep(2);
    };
    const handleImageChange = (e) => {
      const selectedImage = e.target.files[0];
      console.log(selectedImage);
      // Do something with the selected image
    };

    return (
      <div>
        {!showForm && (
          <>
            {step3Data.map((element) => {
              return (
                <button
                  className="btn btn-outline-dark me-3"
                  onClick={() => handleStep3Selection(element.id)}
                >
                  {element.complaintComment}
                </button>
              );
            })}
            <button
              className="btn btn-dark me-3"
              onClick={() => {
                setStep(step - 1);
                setShowForm(false);
              }}
            >
              Go Back
            </button>
          </>
        )}
      </div>
    );
  };

  // const renderStep3Options = () => {
  //   return (
  //     <>
  //       <button
  //         className="btn btn-outline-dark me-3"
  //         onClick={() => handleStep3Selection("Other Road Issue")}
  //       >
  //         Pot Hole On Road
  //       </button>
  //       <button
  //         className="btn btn-outline-dark me-3"
  //         onClick={() => handleStep3Selection("Other Road Issue")}
  //       >
  //         Road Surface Damage
  //       </button>
  //       <button
  //         className="btn btn-outline-dark me-3"
  //         onClick={() => {
  //           setVisible(true);
  //         }}
  //       >
  //         Other
  //       </button>
  //       {visible && (
  //         <div>
  //           <input type="text" placeholder="Enter your message" />
  //           {/* Additional chat input related components can be added here */}
  //         </div>
  //       )}
  //       <button
  //         className="btn btn-dark me-3"
  //         onClick={() => {
  //           setStep(step - 1);
  //           setShowForm(false);
  //         }}
  //       >
  //         Go Back
  //       </button>
  //     </>
  //   );
  // };

  const handleNewComplaint = (value) => {
    if (value === "Other") {
      setShowInput(true);
    } else {
      setShowInput(false);
      // Handle the selected complaint type
    }
  };
  const handleComplaintChange = (e) => {
    setComplaintValue(e.target.value);
  };

  const redirectToComplaint = () => {
    history.push("/complaint");
  };

  const scrollToBottom = () => {
    chatbox.current.scrollTop = chatbox.current.scrollHeight;
  };

  const renderStepUserDetailOptions = () => {
    return (
      <div>
        <input
          type="text"
          onChange={(e) => setContactNo(e.target.value)}
          placeholder="Enter Contact Number"
        />

        <button
          className="btn btn-sm btn-dark me-3"
          onClick={() => {
            setStep(step - 1);
            setuserFormVisible(false);
          }}
        >
          Go Back
        </button>
      </div>
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
                  Welcome to the PWD SEWA whatsapp chatbot.Please select your
                  preferred language.
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
                <p className="small mb-0"> Please Choose Next.</p>
              </div>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                alt="avatar 1"
                style={{ width: 45, height: "100%" }}
              />
            </div>
          )}

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
          {step === 3 && renderStep3Options()}
          {userFormVisible && renderStepUserDetailOptions()}
          {step === 4 && renderStep4Options()}
          {step === 5 && renderStep5Options()}

          {/* {step === 3 && (
            <>
              <div className="chatbot-message">
                <p>Please select the type of damage:</p>
              </div>
              <div className="chatbot-options">{renderStep3Options()}</div>
            </>
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
                    handleSubmit();
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
