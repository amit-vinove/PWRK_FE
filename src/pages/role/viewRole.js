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

    const [updateon, setupdateon] = useState(new Date());
    const handleCancel = () => {
        history.push("/role")
    }

    const query = new URLSearchParams(window.location.search);
    const Rid = query.get("id");

    useEffect(() => {
        Axios.get(
            `${process.env.REACT_APP_API}Role/GetRole/${Rid}`,
        )
            .then((res) => {
                setId(res.data.id);
                setofficeTypeId(res.data.officeTypeId);
                setRoleName(res.data.roleName);
                setMaker(res.data.maker);
                setChecker(res.data.checker);
                setViewer(res.data.viewer)
                setApprover(res.data.approver);
                setIsActive(res.data.isActive);
                console.log(res, "id id");
            }).catch((err) => {
                console.log(err)
            })
    }, [])



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


    useEffect(() => {
        getAllOfficeType();

    }, []);
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
                                    <Form.Control required type="text" disabled placeholder="Enter Role here" value={roleName}
                                        onChange={(e) => {
                                            setRoleName(e.target.value);

                                        }} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="officeTypeId">
                                    <Form.Label>Office Type</Form.Label>
                                    {officeTypeIdError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{officeTypeIdError}</p>
                                    )}
                                    <Select
                                        value={officeTypeDropdownData.find((option) => option.value === officeTypeId)}
                                        options={officeTypeDropdownData}
                                        onChange={handleOfficeTypeChange}
                                        isDisabled
                                    />
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
                                    <Form.Control required type="text" disabled placeholder="Enter value here" value={maker}
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
                                    <Form.Control required type="text" disabled placeholder="Enter value here" value={checker}
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
                                    <Form.Control required type="text" disabled placeholder="Enter value here" value={approver}
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
                                    <Form.Control required type="text" disabled placeholder="Enter value here" value={viewer}
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
                            <Button variant="primary" type="submit" onClick={handleCancel} >Cancel</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};
