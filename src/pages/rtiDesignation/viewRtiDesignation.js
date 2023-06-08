import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import { useHistory } from "react-router-dom";
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
    const [ipAddress, setipAddress] = useState(0);
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
    const query = new URLSearchParams(window.location.search);
    const id = query.get("id");
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}RtiDesignation/GetRtiDesignation/${id}`)

            .then((res) => {
                setrtiDesigId(res.data.rtiDesigId);
                setrtiDesignation(res.data.rtiDesignation);
                setIsActive(res.data.isActive);

            }).catch((err) => {
                console.log(err)
            })
    }, []);

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
                                    <Form.Control required type="text" disabled placeholder="Enter Rti designation here" value={rtiDesignation}
                                        onChange={(e) => {
                                            setrtiDesignation(e.target.value);
                                            setRtiDesignationError("");

                                        }} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3" >
                                <Row >
                                    <Form.Label> <br /> </Form.Label>
                                    <Col md={1} className="mb-1" >   <input
                                        class="form-check-input" disabled type="checkbox"
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
                         </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};