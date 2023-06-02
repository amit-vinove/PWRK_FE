import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import axios from "axios";
import Select from "react-select";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
export default () => {
    const history = useHistory();
    const [officeUnitId, setOfficeUnitId] = useState(0);
    const [officeTypeId, setOfficeTypeId] = useState(0);
    const [officeTypeDData, setOfficeTypeDData] = useState([]);
    const [officeDData, setOfficeDData] = useState([]);
    const [officeTypeError, setOfficeTypeError] = useState("");
    const [officeTypeIdError, setOfficeTypeIdError] = useState("");
    const [officeUnitError, setOfficeUnitError] = useState("");
    const [officeId, setOfficeId] = useState(0);
    const [designationId, setDesignationId] = useState(0);
    const [designationDData, SetDesignationDData] = useState([]);
    const [unitName, setUnitName] = useState("");
    const [unitNameError, setUnitNameError] = useState("");
    const [unitAddress, setUnitAddress] = useState("");
    const [unitAddressError, setUnitAddressError] = useState("");
    const [emailId, setEmailId] = useState("");
    const [emailError, setEmailError] = useState("");
    const [contactNo, setContactNo] = useState(0);
    const [contactError, setContactError] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setlatitude] = useState("");
    const [comment, setComment] = useState("");
    const [commentError, setCommentError] = useState("");
    const [seqId, setSeqId] = useState("");
    const [updateOfficeTypeId, setUpdateOfficeTypeId] = useState(0);
    const [updateOfficeId, setUpdateOfficeId] = useState(0);
    const [ipAddress, setipAddress] = useState(0);
    const [updatedby, setUpdatedBy] = useState(0);
    const [formValid, setFormValid] = useState(0);
    const jsonData = {
        updateby: "123",
    };
    const fetchIp = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        console.log(res.data.IPv4);
        setipAddress(res.data.IPv4)
    }
    const validateEmail = (emailId) => {
        return emailId.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    const [updateon, setupdateon] = useState(new Date());
    const handleCancel = () => {
        history.push("/officeUnit")
    }
    const handleOfficeTypeChange = (selectedOption) => {
        setOfficeTypeId(selectedOption.value);
    };

    const getAllOfficeType = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API}OfficeType/GetOfficeType`);
            const formattedData = result.data.map((officeType) => ({
                value: officeType.officeTypeId,
                label: officeType.officeTypeName,
            }));
            setOfficeTypeDData(formattedData);
        } catch (error) {
            console.error(error);
        }
    };


    const handleOfficeChange = (selectedOption) => {
        setOfficeId(selectedOption.value);
    };

    const getAllOffice = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API}Office/GetOffice`);
            const formattedData = result.data.map((office) => ({
                value: office.officeId,
                label: office.officeName,
            }));
            setOfficeDData(formattedData);
        } catch (error) {
            console.error(error);
        }
    };




    const handleDesignationChange = (selectedOption) => {
        setDesignationId(selectedOption.value);
    };

    const getAllDesignation = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API}Designation/GetDesignation`);
            const formattedData = result.data.map((designation) => ({
                value: designation.designationId,
                label: designation.designationName,
            }));
            SetDesignationDData(formattedData);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        getAllOfficeType();
        getAllOffice();
        getAllDesignation();
        fetchIp();
    }, []);

    useEffect(() => {
        handleContactChange();
    }, [contactNo])

    const handleContactChange = () => {
        if (!contactNo) return;
        if (contactNo.length <= 7 || contactNo.length >= 11) {
            setContactError("Invalid Mobile Number(Mobile Number  must be 8 to 10 Characters)");
        }
        else {
            setContactError("");
        }
    }
    useEffect(() => {
        handleEmailChange();
    }, [emailId])
    const handleEmailChange = () => {
        if (!emailId) return;
        if (validateEmail(emailId) == null)
            if (emailId != "") {
                setEmailError("Please Enter Valid Email Address");
            } else {
                setEmailError("")
            }
    }

    useEffect(() => {
        handleChangeUnitName();
    }, [unitName])
    const handleChangeUnitName = () => {
        if (!unitName) return;
        if (unitName.length <= 3 || unitName.length >= 150) {
            setUnitNameError("unit Name must be between 3 to 150 Characters");
            setFormValid(false)
        } else {
            setUnitNameError("");
            setFormValid(true)
        }
    }
    useEffect(() => {
        handleChangeUnitAddress();
    }, [unitAddress])
    const handleChangeUnitAddress = () => {
        if (!unitAddress) return;
        if (unitAddress.length <= 3 || unitAddress.length >= 500) {
            setUnitAddressError("unit Address must be between 3 to 500 Characters");
            setFormValid(false)
        } else {
            setUnitAddressError("");
            setFormValid(true)
        }
    }
    useEffect(() => {
        handleChangeComment();
    }, [comment])
    const handleChangeComment = () => {
        if (!comment) return;
        if (comment.length <= 3 || comment.length >= 500) {
            setCommentError("Comment must be between 3 to 500 Characters");
            setFormValid(false)
        } else {
            setCommentError("");
            setFormValid(true)
        }
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        if (unitName === "") { setUnitNameError("unit Name Requeried"); }
        else if (unitName.length <= 3 || unitName.length >= 150) {
            setUnitNameError("unit Name must be between 3 to 150 Characters");
        } else {
            setEmailError("")
        }
        if (unitName === "") {
            setUnitNameError("unit Name Requeried");
        }
        else if (unitName.length <= 3 || unitName.length >= 150) {
            setUnitNameError("unit Name must be between 3 to 150 Characters");
        }

        if (unitAddress === "") {
            setUnitAddressError("unit Address Requeried");
        }
        else if (unitAddress.length <= 3 || unitAddress.length >= 500) {
            setUnitAddressError("unit Address must be between 3 to 500 Characters");
        }


        if (emailId === "") {
            setEmailError("Email Is Requeried")
        } else {
            setEmailError("")
        }
        if (comment === "") {
            setCommentError("comment Is Requeried")
        }
        else if (comment.length <= 3 || comment.length >= 500) {
            setCommentError("Comment must be between 3 to 500 Characters");
        } else {
            setCommentError("")
        }
        if (formValid) {
            let UserID = localStorage.getItem("UserId");
            const payload = {
                officeUnitId: officeUnitId,
                officeTypeId: officeTypeId,
                officeId: officeId,
                designationId: designationId,
                unitName: unitName,
                unitAddress: unitAddress,
                emailId: emailId,
                contactNo: contactNo,
                longitude: longitude,
                latitude: latitude,
                comment: comment,
                seqId: seqId,
                updateOfficeTypeId: updateOfficeTypeId,
                updateOfficeId: updateOfficeId,
                updatedOn: updateon,
                updatedBy: UserID,
                ipAddress: ipAddress,
            };
            if (validateEmail(emailId)) {
                Axios.post(
                    `${process.env.REACT_APP_API}OfficeUnit/SetOfficeUnit`,
                    payload
                )
                    .then((response) => {
                        console.log(response.data);
                        Swal.fire("Save", "Office Unit Saved Sucessfully", "success");

                        history.push("/officeUnit")
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            };
        }
    }
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <h4>Office Unit Details</h4>
                </div>
            </div>
            <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                    <h5 className="mb-4">General information</h5>
                    <Form>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="officeTypeId">
                                    <Form.Label>Office Type</Form.Label>
                                    {officeTypeError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{officeTypeError}</p>
                                    )}
                                    <Select
                                        value={officeTypeDData.find((option) => option.value === officeTypeId)}
                                        options={officeTypeDData}
                                        onChange={handleOfficeTypeChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="office">
                                    <Form.Label>Office</Form.Label>
                                    {/* {officee && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{officeTypeError}</p>
                                    )} */}
                                    <Select
                                        value={officeDData.find((option) => option.value === officeId)}
                                        options={officeDData}
                                        onChange={handleOfficeChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="designation">
                                    <Form.Label>Designation Name</Form.Label>
                                    {/* {desig && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{officeTypeError}</p>
                                    )} */}
                                    <Select
                                        value={designationDData.find((option) => option.value === designationId)}
                                        options={designationDData}
                                        onChange={handleDesignationChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Unit Name</Form.Label>
                                    {unitNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{unitNameError}</p>
                                    )}
                                    <Form.Control required type="text" placeholder="Enter value here" value={unitName}
                                        onChange={(e) => {
                                            setUnitName(e.target.value);
                                            setUnitNameError("");
                                            handleChangeUnitName();
                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Unit Address</Form.Label>
                                    {unitAddressError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{unitAddressError}</p>
                                    )}
                                    <Form.Control required type="text" placeholder="Enter value here" value={unitAddress}
                                        onChange={(e) => {
                                            setUnitAddress(e.target.value);
                                            setUnitAddressError("");
                                            handleChangeUnitAddress();
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Email Id</Form.Label>
                                    {emailError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{emailError}</p>
                                    )}
                                    <Form.Control required type="text" placeholder="Enter value here" value={emailId}
                                        onChange={(e) => {
                                            setEmailId(e.target.value);
                                            setEmailError("");
                                            handleEmailChange();
                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Contact Number</Form.Label>
                                    {contactError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{contactError}</p>
                                    )}
                                    <Form.Control required type="number" placeholder="Enter value here" value={contactNo}
                                        onChange={(e) => {
                                            setContactNo(e.target.value);
                                            setContactError("");
                                            handleContactChange();
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Longitude</Form.Label>
                                    {/* {stateNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" placeholder="Enter value here" value={longitude}
                                        onChange={(e) => {
                                            setLongitude(e.target.value);
                                            //setStateNameError("");
                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Latitude</Form.Label>
                                    {/* {distNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{distNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" placeholder="Enter value here" value={latitude}
                                        onChange={(e) => {
                                            setlatitude(e.target.value);
                                            // setDistNameError("");
                                            // handleChangeDisstName()
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Comment</Form.Label>
                                    {commentError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{commentError}</p>
                                    )}
                                    <Form.Control required type="text" placeholder="Enter value here" value={comment}
                                        onChange={(e) => {
                                            setComment(e.target.value);
                                            setCommentError();
                                            handleChangeComment();
                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Seq Id</Form.Label>
                                    {/* {distNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{distNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" placeholder="Enter value here" value={seqId}
                                        onChange={(e) => {
                                            setSeqId(e.target.value);
                                            // setDistNameError("");
                                            // handleChangeDisstName()
                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="mt-3">
                            <Button variant="primary" type="submit" onClick={handleCancel} >Cancel</Button>
                            <Button variant="primary" type="submit" style={{ marginLeft: 10 }} onClick={handleSubmit}>Save All</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};
