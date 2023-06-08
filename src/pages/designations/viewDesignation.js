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
    const [designationId, setDesignationId] = useState(0);
    const [officeTypeId, setofficeTypeId] = useState(0);
    const [officeTypeDropdownData, setOfficeTypeDropdownData] = useState([]);
    const [officeTypeError, setOfficeTypeError] = useState("");
    const [designationName, setdesignationName] = useState("");
    const [designationNameError, setDesignationNameError] = useState("");
    const [designationShort, setdesignationShort] = useState("");
    const [designationShortError, setDesignationShortError] = useState("");
    const [designationOrderId, setdesignationOrderId] = useState("1");
    const [isActive, setIsActive] = useState(true);
    const [ipAddress, setipAddress] = useState("");
    const [ipAddressError, setIpAddressError] = useState(0);
    const [updateby, setupdateby] = useState(0);
    const [formValid, setFormValid] = useState(false);
    const [updateon, setupdateon] = useState(new Date());
    const jsonData = {
        updateby: "123",
    }
    const handleCancel = () => {
        history.push("/designations")
    }

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
                        {/* {" -- "}
                        {officeType.isActive ? "Active" : "Inactive"} */}
                    </span>
                ),
            }));
            setOfficeTypeDropdownData(formattedData);
        } catch (error) {
            console.error(error);
        }
    };


    const query = new URLSearchParams(window.location.search);
    const id = query.get("id");
    useEffect(() => {

        axios
            .get(
                `${process.env.REACT_APP_API}Designation/GetDesignation/${id}`
            )
            .then((res) => {
                setDesignationId(res.data.designationId);
                setofficeTypeId(res.data.officeTypeId);
                setdesignationName(res.data.designationName);
                setdesignationShort(res.data.designationShort);
                setdesignationOrderId(res.data.designationOrderId);
            }).catch((err) => {
                console.log(err);
            })

    }, [])


    useEffect(() => {
        getAllOfficeType();

    }, []);




    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <h4>Designation Details</h4>
                </div>
            </div>
            <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                    <h5 className="mb-4">General information</h5>
                    <Form>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="officeTypeId">
                                    <Form.Label>Office Type</Form.Label>
                                    {officeTypeError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{officeTypeError}</p>
                                    )}
                                    <Select
                                        value={officeTypeDropdownData.find((option) => option.value === officeTypeId)}
                                        options={officeTypeDropdownData}
                                        onChange={handleOfficeTypeChange}
                                        isDisabled
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Designation Name</Form.Label>
                                    {designationNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{designationNameError}</p>
                                    )}
                                    <Form.Control required type="text" placeholder="Enter designation name here" value={designationName}
                                        onChange={(e) => {
                                            setdesignationName(e.target.value);

                                            setDesignationNameError("");

                                        }} disabled />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Designation Short Name</Form.Label>
                                    {designationShortError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{designationShortError}</p>
                                    )}
                                    <Form.Control required type="text" placeholder="Enter designation short here" value={designationShort}
                                        onChange={(e) => {
                                            setdesignationShort(e.target.value);
                                            setDesignationShortError("");

                                        }} disabled />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Designation Order ID</Form.Label>
                                    {/* {designationNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{designationNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" placeholder="Enter designation order here" value={designationOrderId}
                                        onChange={(e) => {
                                            setdesignationOrderId(e.target.value);
                                        }} disabled />
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
                                        disabled
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
