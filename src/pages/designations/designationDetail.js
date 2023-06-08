import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Card, Form, Button, InputGroup } from "@themesberg/react-bootstrap";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Select from "react-select";

export default () => {
    const history = useHistory();
    const [officeTypeId, setOfficeTypeId] = useState(0);
    const [officeTypeDropdownData, setOfficeTypeDropdownData] = useState([]);
    const [officeTypeError, setOfficeTypeError] = useState("");
    const [designationName, setDesignationName] = useState("");
    const [designationNameError, setDesignationNameError] = useState("");
    const [designationShort, setDesignationShort] = useState("");
    const [designationShortError, setDesignationShortError] = useState("");
    const [designationOrderId, setDesignationOrderId] = useState("1");
    const [isActive, setIsActive] = useState(true);
    const [ipAddress, setIpAddress] = useState("");
    const [ipAddressError, setIpAddressError] = useState(0);
    const [updateby, setUpdateBy] = useState(0);
    const [formValid, setFormValid] = useState(false);
    const [updateon, setUpdateOn] = useState(new Date());
    const jsonData = {
        updateby: "123",
    };

    const handleCancel = () => {
        history.push("/designations");
    };

    const fetchIp = async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        console.log(res.data.IPv4);
        setIpAddress(res.data.IPv4);
    };

    const handleOfficeTypeChange = (selectedOption) => {
        setOfficeTypeId(selectedOption.value);
    };


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
            setOfficeTypeDropdownData(formattedData);
        } catch (error) {
            console.error(error);
        }
    };


    // const getAllOfficeType = async () => {
    //     try {
    //         const result = await Axios.get(`${process.env.REACT_APP_API}OfficeType/GetOfficeType`);
    //         const formattedData = result.data.map((officeType) => ({
    //             value: officeType.officeTypeId,
    //             label: officeType.officeTypeName,
    //         }));
    //         setOfficeTypeDropdownData(formattedData);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    useEffect(() => {
        getAllOfficeType();
        fetchIp();
    }, []);

    useEffect(() => {
        handleChangeDesignationName();
    }, [designationName]);

    const handleChangeDesignationName = () => {
        if (!designationName) return;
        if (designationName.length < 3 || designationName.length > 150) {
            setDesignationNameError("Designation Name must be between 3 to 150 characters");
            setFormValid(false);
        } else {
            setDesignationNameError("");
            setFormValid(true);
        }
    };

    useEffect(() => {
        handleChangeDesignationShort();
    }, [designationShort]);

    const handleChangeDesignationShort = () => {
        if (!designationShort) return;
        if (designationShort.length <= 2 || designationShort.length > 150) {
            setDesignationShortError("Designation Name must be between 3 to 150 characters");
            setFormValid(false);
        } else {
            setDesignationShortError("");
            setFormValid(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (designationName === null || designationName === "") {
            setDesignationNameError("Designation is required");
        } else if (designationName.length <= 2 || designationName.length > 150) {
            setDesignationNameError("Designation Name must be between 3 to 150 characters");
        } else {
            setDesignationNameError("");
        }

        if (designationShort === null || designationShort === "") {
            setDesignationShortError("Designation short is required");
        } else if (designationShort.length <= 2 || designationShort.length > 150) {
            setDesignationShortError("Designation Name must be between 3 to 150 characters");
        } else {
            setDesignationShortError("");
        }

        if (officeTypeId === "") {
            setOfficeTypeError("Office Type is required/Input Only Numeric value");
        } else {
            setOfficeTypeError("");
        }

        if (formValid) {
            let UserID = localStorage.getItem("UserId");
            const payload = {
                officeTypeId: officeTypeId,
                designationName: designationName,
                designationShort: designationShort,
                designationOrderId: designationOrderId,
                isActive: isActive,
                updateby: UserID,
                updateon: updateon,
                ipAddress: ipAddress,
            };

            Axios.post(`${process.env.REACT_APP_API}Designation/SetDesignation`, payload)
                .then((response) => {
                    console.log(response.data);
                    Swal.fire("Save", "Designation Saved Successfully", "success");
                    history.push("/designations");
                })
                .catch((response) => {
                    if (response.response.status === 409) {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: response.response.data,
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong! Please login again",
                        });
                    }
                });
        }
    };

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
                                <Form.Group id="officeTypeId">
                                    <Form.Label>Office Type</Form.Label>
                                    {officeTypeError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{officeTypeError}</p>
                                    )}
                                    <Select
                                        value={officeTypeDropdownData.find((option) => option.value === officeTypeId)}
                                        options={officeTypeDropdownData}
                                        onChange={handleOfficeTypeChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="designationName">
                                    <Form.Label>Designation Name</Form.Label>
                                    {designationNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{designationNameError}</p>
                                    )}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter Designation name here"
                                        value={designationName}
                                        onChange={(e) => {
                                            setDesignationName(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="designationShort">
                                    <Form.Label>Designation Short Name</Form.Label>
                                    {designationShortError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{designationShortError}</p>
                                    )}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter designation short here"
                                        value={designationShort}
                                        onChange={(e) => {
                                            setDesignationShort(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="designationOrderId">
                                    <Form.Label>Designation Order ID</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter designation Order here"
                                        value={designationOrderId}
                                        onChange={(e) => {
                                            setDesignationOrderId(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Row>
                                    <Form.Label> <br /> </Form.Label>
                                    <Col md={1} className="mb-1" >
                                        <Form.Check
                                            type="checkbox"
                                            checked={isActive}
                                            onChange={(e) => {
                                                setIsActive(e.target.checked);
                                            }}
                                            value={isActive}
                                            id="defaultCheck1"
                                        />
                                    </Col>
                                    <Col md={5} className="mb-2" >
                                        <Form.Label>Status</Form.Label>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <div className="mt-3">
                            <Button variant="primary" type="submit" onClick={handleCancel}>Cancel</Button>
                            <Button variant="primary" type="submit" style={{ marginLeft: 10 }} onClick={handleSubmit}>Save All</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};

