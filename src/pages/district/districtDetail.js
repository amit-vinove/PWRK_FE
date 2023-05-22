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
    const [disttId, setDisstId] = useState(0);
    const [stateId, setStateId] = useState(0);
    const [stateNameError, setStateNameError] = useState("");
    const [distName, setDistName] = useState("");
    const [distNameError, setDistNameError] = useState("");
    const [distShortName, setDistShortName] = useState("");
    const [distShortNameError, setDistShortNameError] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [ipAddress, setipAddress] = useState("");
    const [ipAddressErorr, setipAddressError] = useState("");
    const [updateby, setupdateby] = useState(0);
    const [formValid, setFormValid] = useState(false);
    const jsonData = { updateby: "123" };
    const [updateon, setupdateon] = useState(new Date());
    const handleCancel = () => {
        history.push("/district")
    }
    useEffect(() => {
        handleChangeDisstName();
    }, [distShortName])
    const handleChangeDisstName = () => {
        if (!distShortName) return;
        if (distShortName.length > 50 && distShortName.length < 2) {
            setDistNameError("Title Name must be less 50 words");
            setFormValid(false)
        } else {
            setDistNameError("");
            setFormValid(true)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (distName === "") {
            setDistNameError("District Name is Required");
        }
        else if (distName.length > 50) {
            setDistNameError("title Name must be less 50 words");
        }
        if (formValid) {
            const payload = {
                disttId: disttId,
                stateId: stateId,
                distName: distName,
                distShortName: distShortName,
                isActive: isActive,
                updateby: updateby,
                updateon: updateon,
                ipAddress: "ipAddress",
            };
            console.log(disttId, "disttId");
            Axios.post(
                `http://122.176.101.76:8085/api/District/SetDistrict`,
                payload
            )
                .then((response) => {
                    console.log(response.data);
                    Swal.fire("Save", "Title Saved Sucessfully", "success");
                    history.push("/district")
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
                    <h4>District Details</h4>
                </div>
            </div>
            <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                    <h5 className="mb-4">General information</h5>
                    <Form>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>State Name</Form.Label>
                                    {stateNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
                                    )}
                                    <Form.Control required type="text" placeholder="Enter Title here" value={stateId}
                                        onChange={(e) => {
                                            setStateId(e.target.value);
                                            setStateNameError("");
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>District Name</Form.Label>
                                    {distNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{distNameError}</p>
                                    )}
                                    <Form.Control required type="text" placeholder="Enter Title here" value={distName}
                                        onChange={(e) => {
                                            setDistName(e.target.value);
                                            setDistNameError("");
                                            handleChangeDisstName()
                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>District Short Name</Form.Label>
                                    {distShortNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{distShortNameError}</p>
                                    )}
                                    <Form.Control required type="text" placeholder="Enter Title here" value={distShortName}
                                        onChange={(e) => {
                                            setDistShortName(e.target.value);
                                            setDistShortNameError("");
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
