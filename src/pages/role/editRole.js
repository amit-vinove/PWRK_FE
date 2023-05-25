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
    const [officeTypeIdError, setOfficeTypeIdError] = useState("");
    const [officeTypeDropdownData, setOfficeTypeDropdownData] = useState([]);
    const [roleName, setRoleName] = useState("");
    const [maker, setMaker] = useState("");
    const [checker, setChecker] = useState("");
    const [viewer, setViewer] = useState("");
    const [approver, setApprover] = useState("");
    const [updateby, setupdateby] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [ipAddress, setipAddress] = useState(0);
    const [formValid, setFormValid] = useState("");
    const jsonData = {
        updateby: "123",
    };
    const query = new URLSearchParams(window.location.search);
    const id = query.get("id");
    const [updateon, setupdateon] = useState(new Date());
    const handleCancel = () => {
        history.push("/role")
    }

    const fetchIp = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        console.log(res.data.IPv4);
        setipAddress(res.data.IPv4)
    }

    useEffect(() => {
        Axios.post(
            `${process.env.REACT_APP_API}Role/GetRole/${id}`,
        )
            .then((res) => {
                setofficeTypeId(res.data.officeTypeId);
                setRoleName(res.data.roleName);
                setMaker(res.data.maker);
                setChecker(res.data.checker);
                setViewer(res.data.viewer)
                setApprover(res.data.approver);
                setIsActive(res.data.isActive);
            }).catch((err) => {
                console.log(err)
            })
    }, [])



    const handleOfficeTypeChange = (event) => {
        setofficeTypeId(event.target.value);
    };
    const getAllOfficeType = async () => {
        let result = await Axios.get(`${process.env.REACT_APP_API}OfficeType/GetOfficeType`);
        setOfficeTypeDropdownData(result.data);
    };
    useEffect(() => {
        getAllOfficeType();
        fetchIp();
    }, []);
    useEffect(() => {
        handleChangeRole();
    }, [officeTypeId])
    const handleChangeRole = () => {
        if (!officeTypeId) return;
        if (officeTypeId === "") {
            setOfficeTypeIdError("Office Type is Required");
            setFormValid(false)
        } else {
            setOfficeTypeIdError("");
            setFormValid(true)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (officeTypeId === "") {
            setOfficeTypeIdError("Office Type is Required");
        } else {
            setOfficeTypeIdError("");
        }
        if (formValid) {
            let UserID = localStorage.getItem("UserId")
            const payload = {
                roleId: roleId,
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
            Swal.fire({
                title: "Do You Want To Save Changes?",
                showCancelButton: true,
                icon: "warning",
                confirmButtonText: "Yes",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        Axios.post(
                            `${process.env.REACT_APP_API}Role/UpdateRole`,
                            payload
                        )
                            .then((res) => {
                                Swal.fire({
                                    icon: "success",
                                    title: "Your work has been successfully update",
                                    showConfirmButton: false,
                                    timer: 1500,
                                });
                                history.push("/Role")
                            })
                            .catch(() => {
                                Swal.fire("Role not Update.");
                            });
                    }
                });
        }
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
                                    {officeTypeIdError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{officeTypeIdError}</p>
                                    )}
                                    <Form.Select
                                        onChange={handleOfficeTypeChange}
                                        disablePortal
                                        id="combo-box-demo"
                                        sx={{ width: 600 }}
                                        defaultValue="" // Set the default value to an empty string
                                    >
                                        <option value="" disabled>
                                            Choose office type....
                                        </option>
                                        {officeTypeDropdownData.map((s) => (
                                            <option key={s.officeTypeId} value={s.officeTypeId}>
                                                {s.officeTypeId}
                                            </option>
                                        ))}
                                    </Form.Select>
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
                                    <Form.Control required type="text" placeholder="Enter value here" value={maker}
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
                                    <Form.Control required type="text" placeholder="Enter value here" value={checker}
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
                                    <Form.Control required type="text" placeholder="Enter value here" value={approver}
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
                                    <Form.Control required type="text" placeholder="Enter value here" value={viewer}
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
