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
    const [officeTypeId, setofficeTypeId] = useState(0);
    const [officeTypeDropdownData, setOfficeTypeDropdownData] = useState([]);
    const [officeTypeError, setOfficeTypeError] = useState("");
    const [designationName, setdesignationName] = useState("");
    const [designationNameError, setDesignationNameError] = useState("");
    const [designationShort, setdesignationShort] = useState("");
    const [designationShortError, setDesignationShortError] = useState("");
    const [designationOrderId, setdesignationOrderId] = useState("1");
    const [isActive, setIsActive] = useState(true);
    const [ipAddress, setipAddress] = useState("");
    const [ipAddressError, setIpAddressError] = useState("");
    const [updateby, setupdateby] = useState(0);
    const [formValid, setFormValid] = useState(false);
    const [updateon, setupdateon] = useState(new Date());
    const jsonData = {
        updateby: "123",
    }
    const handleCancel = () => {
        history.push("/designations")
    }
    const fetchIp = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        console.log(res.data.IPv4);
        setipAddress(res.data.IPv4)
    }
    const handleOfficeTypeChange = (event) => {
        setofficeTypeId(event.target.value);

        //setUserNameError("");
    };

    const getAllOfficeType = async () => {
        let result = await Axios.get(`${process.env.REACT_APP_API}OfficeType/GetOfficeType`);
        setOfficeTypeDropdownData(result.data);
    };

    useEffect(() => {
        getAllOfficeType();
        fetchIp();
    }, []);

    useEffect(() => {
        handleChangeDesignationName();
    }, [designationName])
    const handleChangeDesignationName = () => {
        if (!designationName) return;
        if (designationName.length < 3 ||
            designationName.length > 150) {
            setDesignationNameError("Designation Name must be between 3 to 150 words");
            setFormValid(false)
        } else {
            setDesignationNameError("");
            setFormValid(true)
        }
    }
    useEffect(() => {
        handleChangeDesignationShort();
    }, [designationShort])
    const handleChangeDesignationShort = () => {
        if (!designationShort) return;
        if (designationShort.length <= 2 ||
            designationShort.length > 150) {
            setDesignationShortError("Designation Name must be between 3 to 150 words");
            setFormValid(false)
        } else {
            setDesignationShortError("");
            setFormValid(true)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (designationName === null || designationName === "") {
            setDesignationNameError("designation is required");

        } else if (designationName.length <= 2 ||
            designationName.length > 150) {
            setDesignationNameError("Designation Name must be between 3 to 150 words");
        }
        else {
            setDesignationNameError("");

        }
        if (designationShort === null || designationShort === "") {
            setDesignationShortError("designation short is required");

        } else if (designationShort.length <= 2 ||
            designationShort.length > 150) {
            setDesignationShortError("Designation Name must be between 3 to 150 words");
        }

        else { setDesignationShortError(""); }

        if (officeTypeId === "") {
            setOfficeTypeError("Office Type is required/Input Only Numereic value");

        } else { setOfficeTypeError(""); }
        if (formValid) {
            const payload = {
                officeTypeId: officeTypeId,
                designationName: designationName,
                designationShort: designationShort,
                designationOrderId: designationOrderId,
                isActive: isActive,
                updateby: updateby,
                updateon: updateon,
                ipAddress: ipAddress,
            };
            Axios.post(
                `http://122.176.101.76:8085/api/Designation/SetDesignation`,
                payload
            )
                .then((response) => {
                    console.log(response.data);
                    Swal.fire("Save", "Designation Saved Sucessfully", "success");

                    history.push("/designations")
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
                    <h4>Designation Details</h4>
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
                                    <Form.Select onChange={handleOfficeTypeChange}
                                        disablePortal
                                        id="combo-box-demo"
                                        sx={{ width: 600 }}
                                    >
                                        {officeTypeDropdownData.map((s) => <option value={s.officeTypeId}>{s.officeTypeId}</option>)}
                                        {/* Add other menu items here */}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Designation Name</Form.Label>
                                    {designationNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{designationNameError}</p>
                                    )}
                                    <Form.Control required type="text" placeholder="Enter Title here" value={designationName}
                                        onChange={(e) => {
                                            setdesignationName(e.target.value);
                                            setDesignationNameError("");
                                            handleChangeDesignationName()
                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Designation Short Name</Form.Label>
                                    {designationShortError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{designationShortError}</p>
                                    )}
                                    <Form.Control required type="text" placeholder="Enter office type here" value={designationShort}
                                        onChange={(e) => {
                                            setdesignationShort(e.target.value);
                                            setDesignationShortError("");
                                            handleChangeDesignationShort();
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Designation Order Id</Form.Label>
                                    {/* {designationNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{designationNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" placeholder="Enter Title here" value={designationOrderId}
                                        onChange={(e) => {
                                            setdesignationOrderId(e.target.value);
                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3" >
                                <Row >
                                    <Form.Label> <br /> </Form.Label>
                                    <Col md={1} className="mb-1" >   <input
                                        class="form-check-input" type="checkbox"
                                        checked={isActive}
                                        onChange={(e) => {
                                            setIsActive(e.target.checked);
                                        }}
                                        value={isActive}
                                        id="defaultCheck1"
                                    /></Col>
                                    <Col md={5} className="mb-2" >
                                        <Form.Label>Status</Form.Label>
                                    </Col>
                                </Row>
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
