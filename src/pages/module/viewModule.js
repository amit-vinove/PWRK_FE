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

    const [moduleId, setModuleId] = useState(0);
    const [maduleName, setMaduleName] = useState("");
    const [moduleNameError, setModuleNameError] = useState("");
    const [moduleNameShort, setModuleNameShort] = useState("");
    const [moduleNameShortError, setModuleNameShortError] = useState("");
    const [moduleUrl, setModuleUrl] = useState("");
    const [moduleUrlError, setModuleUrlError] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [ipAddress, setipAddress] = useState(0);
    const [updateby, setupdateby] = useState(0);
    const [formValid, setFormValid] = useState("");
    const jsonData = {
        updateby: "123",
    };
    const [updateon, setupdateon] = useState(new Date());
    const handleCancel = () => {
        history.push("/module")
    }
    const query = new URLSearchParams(window.location.search);
    const id = query.get("id");

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_API}Module/GetModule/${id}`
            ).then((res) => {
                setModuleId(res.data.moduleId);
                setMaduleName(res.data.maduleName);
                setModuleNameShort(res.data.moduleNameShort);
                setModuleUrl(res.data.moduleUrl);
                setIsActive(res.data.isActive);
            }).catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <h4>Module Details</h4>
                </div>
            </div>
            <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                    <h5 className="mb-4">General information</h5>
                    <Form>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Module Name</Form.Label>
                                    {moduleNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{moduleNameError}</p>
                                    )}
                                    <Form.Control required type="text" disabled placeholder="Enter value here" value={maduleName}
                                        onChange={(e) => {
                                            setMaduleName(e.target.value);
                                            setModuleNameError("");

                                        }} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Module Short Name</Form.Label>
                                    {moduleNameShortError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{moduleNameShortError}</p>
                                    )}
                                    <Form.Control required type="text" disabled placeholder="Enter value here" value={moduleNameShort}
                                        onChange={(e) => {
                                            setModuleNameShort(e.target.value);
                                            setModuleNameShortError("");

                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Module URL</Form.Label>

                                    <Form.Control required type="text" disabled placeholder="Enter value here" value={moduleUrl}
                                        onChange={(e) => {
                                            setModuleUrl(e.target.value);

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
                            <Button variant="primary" type="submit" onClick={handleCancel} >Back</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};
