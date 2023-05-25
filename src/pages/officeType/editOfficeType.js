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
    const [pageMode, setPageMode] = useState("create");
    const [officeTypeId, setofficeTypeId] = useState(0);
    const [officeTypeError, setOfficeTypeError] = useState("");
    const [officeTypeName, setofficeTypeName] = useState("");
    const [officeTypeNameError, setOfficeTypeNameError] = useState("");
    const [titleError, setTitleError] = useState("");
    const [officeTypeNameShort, setofficeTypeNameShort] = useState("");
    const [officeTypeNameShortError, setOfficeTypeNameShortError] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [ipAddress, setipAddress] = useState(0);
    const [ipAddressError, setIpAddressError] = useState("");
    const [updateby, setupdateby] = useState(0);
    const [formValid, setFormValid] = useState(0);
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
                `${process.env.REACT_APP_API}OfficeType/GetOfficeType/${id}`
            ).then((res) => {
                setofficeTypeName(res.data.officeTypeName);
                setofficeTypeNameShort(res.data.officeTypeNameShort);
                setIsActive(res.data.isActive);
            }).catch((err) => {
                console.log(err);
            })
    }, [])
    useEffect(() => {
        handleChangeOfficeType();
    }, [officeTypeName])
    const handleChangeOfficeType = () => {
        if (!officeTypeName) return;
        if (officeTypeName.length > 50 && officeTypeName.length < 2) {
            setOfficeTypeNameError("Title Name must be less 50 words");
            setFormValid(false)
        } else {
            setOfficeTypeError("");
            setFormValid(true)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (officeTypeName === "") {
            setOfficeTypeNameError("District Name is Required");
        }
        else if (officeTypeNameShort.length > 50) {
            setOfficeTypeNameShortError("title Name must be less 50 words");
        }
        if (formValid) {
            const payload = {
                officeTypeId: officeTypeId,
                officeTypeName: officeTypeName,
                officeTypeNameShort: officeTypeNameShort,
                isActive: isActive,
                updateby: updateby,
                updateon: updateon,
                ipAddress: "ipAddress",
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
                            `${process.env.REACT_APP_API}OfficeType/UpdateOfficeType`,
                            payload
                        )
                            .then((res) => {
                                Swal.fire({
                                    icon: "success",
                                    title: "Your work has been successfully update",
                                    showConfirmButton: false,
                                    timer: 1500,
                                });
                                history.push("/officeType")
                            })
                            .catch(() => {
                                Swal.fire("Office type not Update.");
                            });
                    }
                });
        }
    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <h4>Office Type Details</h4>
                </div>
            </div>
            <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                    <h5 className="mb-4">General information</h5>
                    <Form>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Office Type Name</Form.Label>
                                    {officeTypeNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{officeTypeNameError}</p>
                                    )}
                                    <Form.Control required type="text" placeholder="Enter Title here" value={officeTypeName}
                                        onChange={(e) => {
                                            setofficeTypeName(e.target.value);
                                            setOfficeTypeNameError("");
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Office Type Short Name</Form.Label>
                                    {officeTypeNameShortError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{officeTypeNameShortError}</p>
                                    )}
                                    <Form.Control required type="text" placeholder="Enter Title here" value={officeTypeNameShort}
                                        onChange={(e) => {
                                            setofficeTypeNameShort(e.target.value);
                                            setOfficeTypeNameShortError("");

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
