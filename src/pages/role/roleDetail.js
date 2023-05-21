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
    const [roleId, setRoleId] = useState(0);
    const [officeTypeId, setofficeTypeId] = useState("");
    const [officeTypeError, setOfficeTypeError] = useState("");
    const [officeTypeDropdownData, setOfficeTypeDropdownData] = useState([]);
    const [roleName, setRoleName] = useState("");
    const [maker, setMaker] = useState("");
    const [checker, setChecker] = useState("");
    const [viewer, setViewer] = useState("");
    const [approver, setApprover] = useState("");
    const [updateby, setupdateby] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [ipAddress, setipAddress] = useState("");
    const [formValid, setFormValid] = useState("");
    const jsonData = {
        updateby: "123",
    };
    const [updateon, setupdateon] = useState(new Date());
    const handleCancel = () => {
        history.push("/role")
    }

    useEffect(() => {
        handleChangeRole();
    }, [officeTypeId])

    const handleChangeRole = () => {
        if (!officeTypeId) return;
        if (officeTypeId.length > 50 && officeTypeId.length < 2) {
            setOfficeTypeError("Title Name must be less 50 words");
            setFormValid(false)
        } else {
            setRoleName("");
            setFormValid(true)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (officeTypeId === "") {
            setOfficeTypeError("Office Type Name is Required");
        }

        if (formValid) {
            const payload = {
                roleId: roleId,
                officeTypeId: officeTypeId,
                roleName: roleName,
                maker: maker,
                checker: checker,
                approver: approver,
                viewer: viewer,
                isActive: isActive,
                updateby: updateby,
                updateon: updateon,
                ipAddress: "ipAddress",
            };

            Axios.post(
                `http://122.176.101.76:8085/api/Role/SetRole`,
                payload
            )
                .then((response) => {
                    console.log(response.data);
                    Swal.fire("Save", "Role Saved Sucessfully", "success");

                    history.push("/role")
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
                    <h4>Role Details</h4>
                </div>
            </div>
            <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                    <h5 className="mb-4">General information</h5>
                    <Form>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Role Name</Form.Label>
                                    {/* {role && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{moduleNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" placeholder="Enter Role here" value={roleName}
                                        onChange={(e) => {
                                            setRoleName(e.target.value);
                                            //setModuleNameError("");
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Office Type Id</Form.Label>
                                    {/* {moduleNameShortError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{moduleNameShortError}</p>
                                    )} */}
                                    <Form.Control required type="text" placeholder="Enter Title here" value={officeTypeId}
                                        onChange={(e) => {
                                            setofficeTypeId(e.target.value);
                                            //setModuleNameShortError("");

                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Maker</Form.Label>
                                    {/* {role && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{moduleNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" placeholder="Enter Title here" value={maker}
                                        onChange={(e) => {
                                            setMaker(e.target.value);
                                            //setModuleNameError("");
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Checker</Form.Label>
                                    {/* {moduleNameShortError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{moduleNameShortError}</p>
                                    )} */}
                                    <Form.Control required type="text" placeholder="Enter Title here" value={checker}
                                        onChange={(e) => {
                                            setChecker(e.target.value);
                                            //setModuleNameShortError("");

                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>


                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Approver</Form.Label>
                                    {/* {role && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{moduleNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" placeholder="Enter Title here" value={approver}
                                        onChange={(e) => {
                                            setApprover(e.target.value);
                                            //setModuleNameError("");
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Viewer</Form.Label>
                                    {/* {moduleNameShortError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{moduleNameShortError}</p>
                                    )} */}
                                    <Form.Control required type="text" placeholder="Enter Title here" value={viewer}
                                        onChange={(e) => {
                                            setViewer(e.target.value);
                                            //setModuleNameShortError("");

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
                            <Button variant="primary" type="submit" style={{ marginLeft: 10 }} onClick={(e) => handleSubmit(e)}>Save All</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};
