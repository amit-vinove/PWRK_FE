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


    const query = new URLSearchParams(window.location.search);
    const id = query.get("id");

    const [updateon, setupdateon] = useState(new Date());
    const handleCancel = () => {
        history.push("/officeUnit")
    }
    const handleOfficeTypeChange = (selectedOption) => {
        setOfficeTypeId(selectedOption.value);
    };

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_API}OfficeUnit/GetOfficeUnit/${id}`
            ).then((res) => {
                setOfficeUnitId(res.data.officeUnitId);
                setOfficeTypeId(res.data.officeTypeId);
                setOfficeId(res.data.officeId);
                setDesignationId(res.data.designationId);
                setUnitName(res.data.unitName);
                setUnitAddress(res.data.unitAddress);
                setEmailId(res.data.emailId);
                setContactNo(res.data.contactNo);
                setLongitude(res.data.longitude);
                setlatitude(res.data.latitude);
                setComment(res.data.comment);
                setSeqId(res.data.seqId);
                setUpdateOfficeTypeId(res.data.updateOfficeTypeId);
                setUpdateOfficeId(res.data.updateOfficeId);
            }).catch((err) => {
                console.log(err);
            })
    }, [])
    const getAllOfficeType = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API}OfficeType/GetOfficeType`);
            const formattedData = result.data.map((officeType) => ({
                value: officeType.officeTypeId,
                label: (
                    <span style={{ color: officeType.isActive ? "green" : "red" }}>
                        {officeType.officeTypeName}
                        {/* {" -- "}
                        {officeType.isActive ? "Active" : "Inactive"} */}
                    </span>
                ),
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
                label: (
                    <span style={{ color: office.isActive ? "green" : "red" }}>
                        {office.officeName}
                        {/* {" -- "}
                        {office.isActive ? "Active" : "Inactive"} */}
                    </span>
                ),
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
                label: (
                    <span style={{ color: designation.isActive ? "green" : "red" }}>
                        {designation.designationName}
                        {/* {" -- "}
                        {designation.isActive ? "Active" : "Inactive"} */}
                    </span>
                ),
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
                                        isDisabled
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
                                        isDisabled
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
                                        isDisabled
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
                                    <Form.Control required type="text" disabled placeholder="Enter value here" value={unitName}
                                        onChange={(e) => {
                                            setUnitName(e.target.value);
                                            setUnitNameError("");

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
                                    <Form.Control required type="text" disabled placeholder="Enter value here" value={unitAddress}
                                        onChange={(e) => {
                                            setUnitAddress(e.target.value);
                                            setUnitAddressError("");

                                        }} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Email Id</Form.Label>
                                    {emailError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{emailError}</p>
                                    )}
                                    <Form.Control required type="text" disabled placeholder="Enter value here" value={emailId}
                                        onChange={(e) => {
                                            setEmailId(e.target.value);
                                            setEmailError("");

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
                                    <Form.Control required type="number" disabled placeholder="Enter value here" value={contactNo}
                                        onChange={(e) => {
                                            setContactNo(e.target.value);
                                            setContactError("");

                                        }} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Longitude</Form.Label>
                                    {/* {stateNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" disabled placeholder="Enter value here" value={longitude}
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
                                    <Form.Control required type="text" disabled placeholder="Enter value here" value={latitude}
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
                                    <Form.Control required type="text" disabled placeholder="Enter value here" value={comment}
                                        onChange={(e) => {
                                            setComment(e.target.value);
                                            setCommentError();
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
                                    <Form.Control required type="text" disabled placeholder="Enter value here" value={seqId}
                                        onChange={(e) => {
                                            setSeqId(e.target.value);
                                            // setDistNameError("");
                                            // handleChangeDisstName()
                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="mt-3">
                            <Button variant="primary" type="submit" onClick={handleCancel} >Back</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};
