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
    const [country, setCountry] = useState("");
    const [countryError, setCountryError] = useState("");
    const [stateName, setStateName] = useState("");
    const [stateError, setStateError] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [ipAddress, setipAddress] = useState("");
    const [updateby, setupdateby] = useState(0);
    const [formValid, setFormValid] = useState("");
    const jsonData = {
        updateby: "123",
    };
    const [updateon, setupdateon] = useState(new Date());
    const handleCancel = () => {
        history.push("/state")
    }
    const fetchIp = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        setipAddress(res.data.IPv4)
    }
    useEffect(() => {
        fetchIp();
    }, [])


    useEffect(() => {
        handleChangeCountry();
    }, [country])
    const handleChangeCountry = () => {
        if (!country) return;
        if (country.length <= 2 || country.length >= 100) {
            setCountryError("country name must be between 3 letter to 100 letters");
            setFormValid(false)
        } else {
            setCountryError("");
            setFormValid(true)
        }
    }
    const handleChangeState = () => {
        if (!stateName) return;
        if (stateName.length < 2 || stateName.length >= 150) {
            setStateError("state name must be between 3 letter to 150 letters");
            setFormValid(false)
        } else {
            setStateError("");
            setFormValid(true)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (country === "") {
            setCountryError("country Name is Required");
        }
        else if (country.length < 2 || country.length >= 100) {
            setCountryError("country name must be between 3 letter to 100 letters");
        }
        else {
            setCountryError("");
        }
        if (stateName === "") {
            setStateError("State Name is Required");
        }
        else if (stateName.length < 2 || stateName.length >= 150) {
            setStateError("state name must be between 3 letter to 150 letters");
        }
        else { setStateError(""); }

        if (formValid) {
            let UserID = localStorage.getItem("UserId")
            const payload = {
                country: country,
                stateName: stateName,
                isActive: isActive,
                updateby: UserID,
                updateon: updateon,
                ipAddress: ipAddress,
            };
            Axios.post(
                `${process.env.REACT_APP_API}State/SetState`,
                payload
            )
                .then((response) => {
                    Swal.fire("Save", "State Saved Sucessfully", "success");

                    history.push("/state")
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
                    <h4>State Details</h4>
                </div>
            </div>
            <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                    <h5 className="mb-4">General information</h5>
                    <Form>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Country Name</Form.Label>
                                    {countryError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{countryError}</p>
                                    )}
                                    <Form.Control required type="text" placeholder="Enter Country here" value={country}
                                        onChange={(e) => {
                                            setCountry(e.target.value);
                                            setCountryError("");
                                            handleChangeCountry();
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>State Name</Form.Label>
                                    {stateError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{stateError}</p>
                                    )}
                                    <Form.Control required type="text" placeholder="Enter State here" value={stateName}
                                        onChange={(e) => {
                                            setStateName(e.target.value);
                                            setStateError("");
                                            handleChangeState();
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
