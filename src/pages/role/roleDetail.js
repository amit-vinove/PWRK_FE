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
    const [pageMode, setPageMode] = useState("create");
    const [id, setId] = useState(0);
    const [officeTypeId, setofficeTypeId] = useState("");
    const [officeTypeError, setOfficeTypeError] = useState("");
    const [officeTypeDropdownData, setOfficeTypeDropdownData] = useState([]);
    const [roleName, setRoleName] = useState("");
    const [roleNameError, setRoleNameError] = useState("");
    const [maker, setMaker] = useState(0);
    const [checker, setChecker] = useState(0);
    const [viewer, setViewer] = useState(0);
    const [approver, setApprover] = useState(0);
    const [updateby, setupdateby] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [ipAddress, setipAddress] = useState(0);
    const [formValid, setFormValid] = useState(false);
    const jsonData = {
        updateby: "123",
    };
    const [updateon, setupdateon] = useState(new Date());

    const handleCancel = () => {
        history.push("/role");
    };

    const fetchIp = async () => {
        const res = await axios.get('https://geolocation-db.com/json/');
        console.log(res.data.IPv4);
        setipAddress(res.data.IPv4);
    };

    const handleOfficeTypeChange = (selectedOption) => {
        setofficeTypeId(selectedOption.value);
    };

    const getAllOfficeType = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API}OfficeType/GetOfficeType`);
            const formattedData = result.data.map((officeType) => ({
                value: officeType.officeTypeId,
                label: (
                    <span style={{ color: officeType.isActive ? "green" : "red" }}>
                        {officeType.officeTypeName}
                    </span>
                ),
            }));
            setOfficeTypeDropdownData(formattedData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getAllOfficeType();
        fetchIp();
    }, []);

    useEffect(() => {
        handleChangeRole();
    }, [roleName]);

    const handleChangeRole = () => {
        if (!roleName) return;
        if (roleName.length < 3 || roleName.length > 150) {
            setRoleNameError("Role Name must be between 3 to 150 characters");
            setFormValid(false);
        } else {
            setRoleNameError("");
            setFormValid(true);
        }
    };

    useEffect(() => {
        handleChangeOfficeType();
    }, [officeTypeId]);

    const handleChangeOfficeType = () => {
        if (!officeTypeId) return;
        if (officeTypeId === "" || officeTypeId === null) {
            setOfficeTypeError("Office type is required");
            setFormValid(false);
        } else {
            setOfficeTypeError("");
            setFormValid(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (officeTypeId === "" || officeTypeId === null) {
            setOfficeTypeError("Office Type is required");
        } else {
            setOfficeTypeError("");
        }
        if (roleName === null || roleName === "") {
            setRoleNameError("Role Name is required");
        } else if (roleName.length <= 2 || roleName.length > 150) {
            setRoleNameError("Role Name must be between 3 to 150 characters");
        } else {
            setRoleNameError("");
        }

        if (formValid) {
            let UserID = localStorage.getItem("UserId");
            const payload = {
                id: id,
                officeTypeId: officeTypeId,
                roleName: roleName,
                maker: maker,
                checker: checker,
                approver: approver,
                viewer: viewer,
                isActive: isActive,
                updateby: UserID,
                updateon: updateon,
                ipAddress: ipAddress,
            };

            Axios.post(
                `${process.env.REACT_APP_API}Role/SetRole`,
                payload
            )
                .then((response) => {
                    console.log(response.data);
                    Swal.fire("Save", "Role Saved Successfully", "success");
                    history.push("/role");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

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
                                    {roleNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>
                                            *{roleNameError}
                                        </p>
                                    )}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter Role here"
                                        value={roleName}
                                        onChange={(e) => {
                                            setRoleName(e.target.value);
                                            setRoleNameError("");
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="officeTypeId">
                                    <Form.Label>Office Type</Form.Label>
                                    {officeTypeError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>
                                            *{officeTypeError}
                                        </p>
                                    )}
                                    <Select
                                        value={officeTypeDropdownData.find((option) => option.value === officeTypeId)}
                                        options={officeTypeDropdownData}
                                        onChange={handleOfficeTypeChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Maker</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={maker}
                                        onChange={(e) => {
                                            setMaker(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Checker</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={checker}
                                        onChange={(e) => {
                                            setChecker(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Approver</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={approver}
                                        onChange={(e) => {
                                            setApprover(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Viewer</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={viewer}
                                        onChange={(e) => {
                                            setViewer(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Row>
                                    <Form.Label> <br /> </Form.Label>
                                    <Col md={1} className="mb-1">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={isActive}
                                            onChange={(e) => {
                                                setIsActive(e.target.checked);
                                            }}
                                            value={isActive}
                                            id="defaultCheck1"
                                        />
                                    </Col>
                                    <Col md={5} className="mb-2">
                                        <Form.Label>Status</Form.Label>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <div className="mt-3">
                            <Button variant="primary" type="button" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit" style={{ marginLeft: 10 }} onClick={handleSubmit}>
                                Save All
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};
