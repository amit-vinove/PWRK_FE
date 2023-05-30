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

    const fetchIp = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        console.log(res.data.IPv4);
        setipAddress(res.data.IPv4)
    }

    useEffect(() => {
        handleChangeModuleName();
    }, [maduleName])
    const handleChangeModuleName = () => {
        if (!maduleName) return;
        if (maduleName.length <= 2 || maduleName.length >= 150) {
            setModuleNameError("module Name must be between 3 to 150 charecters");
            setFormValid(false)
        } else {
            setModuleNameError("");
            setFormValid(true)
        }
    }
    useEffect(() => {
        handleChangeModuleNameShort();
    }, [moduleNameShort])
    const handleChangeModuleNameShort = () => {
        if (!moduleNameShort) return;
        if (moduleNameShort.length <= 2 || moduleNameShort.length >= 50) {
            setModuleNameShortError("module Name Short must be between 3 to 50 charecters");
            setFormValid(false)
        } else {
            setModuleNameShortError("");
            setFormValid(true)
        }
    }
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
    useEffect(() => {
        fetchIp();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (maduleName === "") {
            setModuleNameError("module name is Required")
        }
        else if (maduleName.length <= 2 || moduleNameShort.length >= 150) {
            setModuleNameError("madule Name must be between 3 to 150 charecters");
        } else {
            setModuleNameError("")
        }
        if (moduleNameShort === "") {
            setModuleNameShortError("module name is Required")
        }
        else if (moduleNameShort.length <= 2 || moduleNameShort.length >= 50) {
            setModuleNameShortError("madule Name Short must be between 3 to 50 charecters");
        } else {
            setModuleNameShortError("")
        }
        if (formValid) {
            const payload = {
                moduleId: moduleId,
                maduleName: maduleName,
                moduleNameShort: moduleNameShort,
                moduleUrl: moduleUrl,
                isActive: isActive,
                updateby: updateby,
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
                            `${process.env.REACT_APP_API}Module/UpdateModule`,
                            payload
                        )
                            .then((res) => {
                                Swal.fire({
                                    icon: "success",
                                    title: "Your work has been successfully update",
                                    showConfirmButton: false,
                                    timer: 1500,
                                });
                                history.push("/module")
                            })
                            .catch(() => {
                                Swal.fire("Module not Update.");
                            });
                    }
                });
        }
    }
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
                                    <Form.Control required type="text" placeholder="Enter value here" value={maduleName}
                                        onChange={(e) => {
                                            setMaduleName(e.target.value);
                                            setModuleNameError("");
                                            handleChangeModuleName();
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Module Short Name</Form.Label>
                                    {moduleNameShortError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{moduleNameShortError}</p>
                                    )}
                                    <Form.Control required type="text" placeholder="Enter value here" value={moduleNameShort}
                                        onChange={(e) => {
                                            setModuleNameShort(e.target.value);
                                            setModuleNameShortError("");
                                            handleChangeModuleNameShort();
                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Module URL</Form.Label>
                                    {/* {distShortNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{distShortNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" placeholder="Enter value here" value={moduleUrl}
                                        onChange={(e) => {
                                            setModuleUrl(e.target.value);
                                            // setDistShortNameError("");
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
