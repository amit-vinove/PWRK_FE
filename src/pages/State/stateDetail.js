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
    const [pageMode, setPageMode] = useState("create");
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
        console.log(res.data.IPv4);
        setipAddress(res.data.IPv4)
    }
    useEffect(() => {
        fetchIp();
    }, [])
    useEffect(() => {
        handleChangeState();
    }, [stateName])
    const handleChangeState = () => {
        if (!stateName) return;
        if (stateName.length > 50 && stateName.length < 2) {
            setStateError("state Name  must be less 50 words");
            setFormValid(false)
        } else {
            setStateError("");
            setFormValid(true)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (stateName === "") {
            setStateError("District Name is Required");
        }
        else if (stateName.length > 50) {
            setCountryError("Country Name must be less 50 words");
        }
        if (formValid) {
            const payload = {
                country: country,
                stateName: stateName,
                isActive: isActive,
                updateby: updateby,
                updateon: updateon,
                ipAddress: ipAddress,
            };
            Axios.post(
                `${process.env.REACT_APP_API}State/SetState`,
                payload
            )
                .then((response) => {
                    console.log(response.data);
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
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>State Name</Form.Label>
                                    {stateError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{stateError}</p>
                                    )}
                                    <Form.Control required type="text" placeholder="Enter Title here" value={stateName}
                                        onChange={(e) => {
                                            setStateName(e.target.value);
                                            setStateError("");
                                            handleChangeState()
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
