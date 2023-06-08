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
    const [id, setId] = useState(0);
    const [officeTypeId, setOfficeTypeId] = useState();
    const [officeTypeDropdownData, setOfficeTypeDropdownData] = useState([]);
    const [officeLevelError, setOfficeLevelError] = useState("");
    const [officeLevelId, setOfficeLevelId] = useState();
    const [officeLevel, setOfficeLevel] = useState("");
    const [formValid, setFormValid] = useState("");
    const [ipAddress, setIpAddress] = useState(0);
    const [updateBy, setUpdateBy] = useState(0);
    const [updateOn, setUpdateOn] = useState(new Date());
    const jsonData = {
        updateby: "123",
    };

    const query = new URLSearchParams(window.location.search);
    const Levelid = query.get("id");


    const handleCancel = () => {
        history.push("/officeLevel")
    }
    useEffect(() => {

        axios
            .get(
                `${process.env.REACT_APP_API}OfficeLevel/Get/${Levelid}`
            )
            .then((res) => {
                setId(res.data.id);
                setOfficeTypeId(res.data.officeTypeid);
                setOfficeLevelId(res.data.officeLevelId);
                setOfficeLevel(res.data.officeLevel);
                console.log(res, "res")
            }).catch((err) => {
                console.log(err);
            })

    }, [])

    const handleOfficeTypeChange = (selectedOption) => {
        setOfficeTypeId(selectedOption.value);
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



    useEffect(() => {
        getAllOfficeType();

    }, []);

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <h4>Office Level Details</h4>
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
                                    {/* {officeTypeError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{officeTypeError}</p>
                                    )} */}
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
                                    <Form.Label>Office Level Id</Form.Label>
                                    {/* {distNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{distNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" disabled placeholder="Enter Title here" value={officeLevelId}
                                        onChange={(e) => {

                                            setOfficeLevelId(e.target.value);
                                            // setDistNameError("");
                                            // handleChangeDisstName()
                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Office Level</Form.Label>
                                    {/* {distShortNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{distShortNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" disabled placeholder="Enter Title here" value={officeLevel}
                                        onChange={(e) => {
                                            setOfficeLevel(e.target.value);
                                            // setDistShortNameError("");
                                        }} />
                                </Form.Group>
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