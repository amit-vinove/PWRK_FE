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
    const [id, setId] = useState(0);
    const [officeTypeId, setOfficeTypeId] = useState(0);
    const [officeTypeDropdownData, setOfficeTypeDropdownData] = useState([]);
    const [officeLevelError, setOfficeLevelError] = useState("");
    const [officeLevelId, setOfficeLevelId] = useState(0);
    const [officeLevel, setOfficeLevel] = useState("");
    const [formValid, setFormValid] = useState("");
    const [ipAddress, setIpAddress] = useState(0);
    const [updateBy, setUpdateBy] = useState(0);
    const [updateOn, setUpdateOn] = useState(new Date()); // initialize with current date and time
    const jsonData = {
        updateby: "123",
    };
    const fetchIp = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        console.log(res.data.IPv4);
        setIpAddress(res.data.IPv4)
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
            setOfficeTypeDropdownData(formattedData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getAllOfficeType();
        fetchIp();
    }, [])

    const handleCancel = () => {
        history.push("/officeLevel")
    }
    useEffect(() => {
        handleChangeOfficeLevel();
    }, [officeLevel])
    const handleChangeOfficeLevel = () => {
        if (!officeLevel) return;
        if (officeLevel.length > 50 && officeLevel.length < 2) {
            setOfficeLevelError("Office Level Error");
            setFormValid(false)
        } else {
            setOfficeLevelError("");
            setFormValid(true)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // if (officeLevelId === "") {
        //     seto("District Name is Required");
        // }
        // else if (distName.length > 50) {
        //     setDistNameError("title Name must be less 50 words");
        // }
        if (formValid) {
            let UserID = localStorage.getItem("UserId");
            const payload = {
                id: id,
                officeTypeId: officeTypeId,
                officeLevelId: officeLevelId,
                officeLevel: officeLevel,
                updateBy: UserID,
                updateOn: updateOn,
                ipAddress: ipAddress,
            };
            Axios.post(
                `${process.env.REACT_APP_API}OfficeLevel/SetOfficeLevel`,
                payload
            )
                .then((response) => {
                    console.log(response.data);
                    Swal.fire("Save", "Office Level Saved Sucessfully", "success");

                    history.push("/officeLevel")
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
                    <h4>Office Level Details</h4>
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
                                    {/* {officeTypeError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{officeTypeError}</p>
                                    )} */}
                                    <Select
                                        value={officeTypeDropdownData.find((option) => option.value === officeTypeId)}
                                        options={officeTypeDropdownData}
                                        onChange={handleOfficeTypeChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Office Level Id</Form.Label>
                                    {/* {distNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{distNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" placeholder="Enter Title here" value={officeLevelId}
                                        onChange={(e) => {
                                            setOfficeLevelId(e.target.value);
                                            // setDistNameError("");
                                            // handleChangeDisstName()
                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Office Level</Form.Label>
                                    {/* {distShortNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{distShortNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" placeholder="Enter Title here" value={officeLevel}
                                        onChange={(e) => {
                                            setOfficeLevel(e.target.value);
                                            // setDistShortNameError("");
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
