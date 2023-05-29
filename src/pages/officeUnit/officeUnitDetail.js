import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import axios from "axios";
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
    const [updateOfficeTypeId, setUpdateOfficeTypeId] = useState("");
    const [updateOfficeId, setUpdateOfficeId] = useState();
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
    const [updateon, setupdateon] = useState(new Date());
    const handleCancel = () => {
        history.push("/officeUnit")
    }
    const handleOfficeTypeChange = (event) => {
        setOfficeTypeId(event.target.value);

        //setUserNameError("");
    };

    const getAllOfficeType = async () => {
        let result = await Axios.get(`${process.env.REACT_APP_API}OfficeType/GetOfficeType`);
        setOfficeTypeDData(result.data);
    };
    const handleOfficeChange = (event) => {
        setOfficeId(event.target.value);

        //setUserNameError("");
    };

    const getAllOffice = async () => {
        let result = await Axios.get(`${process.env.REACT_APP_API}Office/GetOffice`);
        setOfficeDData(result.data);
    };

    const handleDesignationChange = (event) => {
        setDesignationId(event.target.value);

        //setUserNameError("");
    };

    const getAllDesignation = async () => {
        let result = await Axios.get(`${process.env.REACT_APP_API}Designation/GetDesignation`);
        SetDesignationDData(result.data);
    };


    useEffect(() => {
        getAllOfficeType();
        getAllOffice();
        getAllDesignation();
        fetchIp();
    }, []);

    useEffect(() => {
        handleChangeOfficeUnit();
    }, [officeTypeError])
    const handleChangeOfficeUnit = () => {
        if (!officeTypeError) return;
        if (officeTypeError.length > 50 && officeTypeError.length < 2) {
            setOfficeTypeError("value Name must be less 50 words");
            setFormValid(false)
        } else {
            setOfficeTypeError("");
            setFormValid(true)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (officeTypeId === "") {
            setOfficeTypeError("Office Type Name is Required");
        }
        else if (contactNo.length === 9) {
            setContactError("Contact Number Name must be 10 ");
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
                                <Form.Group id="firstName">
                                    <Form.Label>Office Type Id</Form.Label>
                                    {officeTypeError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{officeTypeError}</p>
                                    )}
                                    <Form.Select
                                        onChange={handleOfficeTypeChange}
                                        disablePortal
                                        id="combo-box-demo"
                                        sx={{ width: 600 }}
                                        defaultValue="" // Set the default value to an empty string
                                    >
                                        <option value="" disabled>
                                            Choose office type....
                                        </option>
                                        {officeTypeDData.map((s) => (
                                            <option key={s.officeTypeId} value={s.officeTypeId}>
                                                {s.officeTypeName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Office</Form.Label>
                                    {/* {officeError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{officeError}</p>
                                    )} */}
                                    <Form.Select
                                        onChange={handleOfficeChange}
                                        disablePortal
                                        id="combo-box-demo"
                                        sx={{ width: 600 }}
                                        defaultValue="" // Set the default value to an empty string
                                    >
                                        <option value="" disabled>
                                            Choose office....
                                        </option>
                                        {officeDData.map((s) => (
                                            <option key={s.officeId} value={s.officeId}>
                                                {s.officeName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Designation</Form.Label>
                                    {/* {designationId && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{officeTypeError}</p>
                                    )} */}
                                    <Form.Select
                                        onChange={handleDesignationChange}
                                        disablePortal
                                        id="combo-box-demo"
                                        sx={{ width: 600 }}
                                        defaultValue="" // Set the default value to an empty string
                                    >
                                        <option value="" disabled>
                                            Choose designation....
                                        </option>
                                        {designationDData.map((s) => (
                                            <option key={s.designationId} value={s.designationId}>
                                                {s.designationName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Unit Name</Form.Label>
                                    {/* {stateNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" placeholder="Enter value here" value={unitName}
                                        onChange={(e) => {
                                            setUnitName(e.target.value);
                                            //setStateNameError("");
                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Unit Address</Form.Label>
                                    {/* {distNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{distNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" placeholder="Enter value here" value={unitAddress}
                                        onChange={(e) => {
                                            setUnitAddress(e.target.value);
                                            // setDistNameError("");
                                            // handleChangeDisstName()
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Email Id</Form.Label>
                                    {/* {stateNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" placeholder="Enter value here" value={emailId}
                                        onChange={(e) => {
                                            setEmailId(e.target.value);
                                            //setStateNameError("");
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
                                    <Form.Control required type="text" placeholder="Enter value here" value={contactNo}
                                        onChange={(e) => {
                                            setContactNo(e.target.value);
                                            setContactError("");
                                            // handleChangeDisstName()
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
                                    {/* {stateNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" placeholder="Enter value here" value={comment}
                                        onChange={(e) => {
                                            setComment(e.target.value);
                                            //setStateNameError("");
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
