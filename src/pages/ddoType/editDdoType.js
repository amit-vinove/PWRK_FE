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
    const [ddoType, setDdoType] = useState("");
    const [ddoTypeId, setDdoTypeId] = useState(0);
    const [ddoTypeError, setDdoTypeError] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [ipAddress, setipAddress] = useState(0);
    const [ipAddressError, setIpaddressError] = useState("");
    const [formValid, setFormValid] = useState("");
    const [updateby, setupdateby] = useState(0);
    const [updateon, setupdateon] = useState(new Date());
    const jsonData = {
        updateby: "123",
    };
    const handleCancel = () => {
        history.push("/ddoType")
    }
    const fetchIp = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        console.log(res.data.IPv4);
        setipAddress(res.data.IPv4)
    }
    const query = new URLSearchParams(window.location.search);
    const id = query.get("id");

    useEffect(() => {
        fetchIp();
    }, [])


    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_API}DDOType/GetDDOType/${id}`
            ).then((res) => {
                setDdoTypeId(res.data.ddoTypeId);
                setDdoType(res.data.ddoType);
                setIsActive(res.data.isActive);
            })
    }, [])

    useEffect(() => {
        handleChangeDDoType();
    }, [ddoType])
    const handleChangeDDoType = () => {
        if (!ddoType) return;
        if (ddoType.length >= 50) {
            setDdoTypeError("ddo type does no more the 50 letters");
            setFormValid(false)
        } else {
            setDdoTypeError("");
            setFormValid(true)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if (ddoType === "") {
            setDdoTypeError("DdoType is Required");
        } else if (ddoType.length >= 50) {
            setDdoTypeError("ddo type does no more the 50 letters");
        }
        else {
            setDdoTypeError("");
        }

        if (formValid) {
            const payload = {
                ddoTypeId: ddoTypeId,
                ddotype: ddoType,
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
                            `${process.env.REACT_APP_API}DDOType/UpdateDDOType`,
                            payload
                        )
                            .then((res) => {
                                Swal.fire({
                                    icon: "success",
                                    title: "Your work has been successfully update",
                                    showConfirmButton: false,
                                    timer: 1500,
                                });
                                history.push("/ddoType")
                            })
                            .catch((response) => {
                                if (response.response.status === 409) {
                                  Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: response.response.data,
                                  });
                                }
                                else {
                                  Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: "Somthing went wrong ! please login again",
                                  });
                                }
                              })
                    }
                });
        }
    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <h4>DDO Type Details</h4>
                </div>
            </div>
            <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                    <h5 className="mb-4">General information</h5>
                    <Form>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>DDO Type</Form.Label>
                                    {ddoTypeError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{ddoTypeError}</p>
                                    )}
                                    <Form.Control required type="text" placeholder="Enter Ddo type here" value={ddoType}
                                        onChange={(e) => {
                                            setDdoType(e.target.value);
                                            setDdoTypeError("");
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
