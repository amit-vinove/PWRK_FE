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
    const [rtiDesigId, setrtiDesigId] = useState(0);
    const [rtiDesignation, setrtiDesignation] = useState("");
    const [rtiDesignationError, setRtiDesignationError] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [ipAddress, setipAddress] = useState("");
    const [ipAddressError, setipAddresserror] = useState("");
    const [updateby, setupdateby] = useState(0);
    const [formValid, setFormValid] = useState("");
    const jsonData = {
        updateby: "123",
    };
    const [updateon, setupdateon] = useState(new Date());
    const handleCancel = () => {
        history.push("/rti-designations")
    }
    useEffect(() => {
        handleChangeRtiDesignation();
    }, [rtiDesignation])
    const handleChangeRtiDesignation = () => {
        if (!rtiDesignation) return;
        if (rtiDesignation.length <= 2 ||
            rtiDesignation.length > 100) {
            setRtiDesignationError("RTI Designation Must Be Between 3 to 100 Letter");
            setFormValid(false)
        } else {
            setRtiDesignationError("");
            setFormValid(true)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (rtiDesignation === "") {
            setRtiDesignationError("RTI Designation is Required");
        } else if (rtiDesignation.length <= 2 ||
            rtiDesignation.length > 100) {
            setRtiDesignationError("RTI Designation Must Be Between 3 to 100 Letter");
        }

        else {
            setRtiDesignationError("");
        }

        if (formValid) {
            const payload = {
                rtiDesigId: rtiDesigId,
                rtiDesignation: rtiDesignation,
                isActive: isActive,
                updateby: updateby,
                updateon: updateon,
                ipAddress: "ipAddress",
            };
            Axios.post(
                `${process.env.REACT_APP_API}RTIDesignation/SetRTIDesignation`,
                payload
            )
                .then((response) => {
                    console.log(response.data);
                    Swal.fire("Save", "RTI designation Saved Sucessfully", "success");
                    history.push("/rti-designations")
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
                    <h4>RTI Designation Details</h4>
                </div>
            </div>
            <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                    <h5 className="mb-4">General information</h5>
                    <Form>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Rti Designation Name</Form.Label>
                                    {rtiDesignationError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{rtiDesignationError}</p>
                                    )}
                                    <Form.Control required type="text" placeholder="Enter Country here" value={rtiDesignation}
                                        onChange={(e) => {
                                            setrtiDesignation(e.target.value);
                                            setRtiDesignationError("");
                                            handleChangeRtiDesignation();
                                        }} />
                                </Form.Group>
                            </Col>
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
