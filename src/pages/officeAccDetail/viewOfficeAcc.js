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
    const [officeId, setOfficeId] = useState(0);
    const [officeDData, setOfficeDData] = useState([]);
    const [ddoTypeId, setDdoTypeId] = useState(0);
    const [ddoTypeDData, setDdoTypeDData] = useState([]);
    const [ddoCode, setDdoCode] = useState("");
    const [ddoCodeName, setDdoCodeName] = useState("");
    const [ddoCodeNameError, setDdoCodeNameError] = useState("");
    const [pan, setPan] = useState("");
    const [panError, setPanError] = useState("");
    const [gst, setGst] = useState("");
    const [bankAccNo, setBankAccNo] = useState("");
    const [bankName, setBankName] = useState("");
    const [bankAddress, setBankAddress] = useState("");
    const [bankIFSC, setBankIFSC] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [updateBy, setUpdateBy] = useState(0);
    const [updateOfficeTypeId, setUpdateOfficeTypeId] = useState(0);
    const [updateOfficeId, setUpdateOfficeId] = useState(0);
    const [updateon, setUpdateOn] = useState(new Date());
    const [ipAddress, setIpAddress] = useState(0);
    const jsonData = {
        updateby: "123",
    };
    const handleCancel = () => {
        history.push("/officeAccDetail")
    }


    const handleDdoTypeChange = (selectedOption) => {
        setDdoTypeId(selectedOption.value);
    };

    const getAllDdoType = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API}DDOType/GetDDOType`);
            const formattedData = result.data.map((ddoType) => ({
                value: ddoType.ddoTypeId,
                label: (
                    <span style={{ color: ddoType.isActive ? "green" : "red" }}>
                        {ddoType.ddoType}
                        {/* {" -- "}
                        {ddoType.isActive ? "Active" : "Inactive"} */}
                    </span>
                ),
            }));
            setDdoTypeDData(formattedData);
        } catch (error) {
            console.error(error);
        }
    };

    const query = new URLSearchParams(window.location.search);
    const id = query.get("id");

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_API}OfficeAccountDetails/GetOfficeAccountDetails/${id}`
            ).then((res) => {
                setOfficeId(res.data.officeId);
                setDdoTypeId(res.data.ddoTypeId);
                setDdoCode(res.data.ddoCode);
                setDdoCodeName(res.data.ddoCodeName);
                setPan(res.data.pan);
                setGst(res.data.gst);
                setBankAccNo(res.data.bankAccNo);
                setBankName(res.data.bankName);
                setBankAddress(res.data.bankAddress);
                setBankIFSC(res.data.bankIFSC);
                setIsActive(res.data.isActive);
                setUpdateBy(res.data.updateBy);
                setUpdateOfficeTypeId(res.data.updateOfficeTypeId);
                setUpdateOfficeId(res.data.updateOfficeId);
                setUpdateOn(res.data.updateon);
                setIpAddress(res.data.ipAddress);
                console.log(officeId, "officeId");
            }).catch((response) => {
                console.log(response);
                if (response.response.status === 409) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: response.response.data,
                    });
                }
                else {
                }
            })

    }, []);



    useEffect(() => {
        getAllDdoType();

    }, []);




    return (

        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <h4>Office Account Details</h4>
                </div>
            </div>
            <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                    <h5 className="mb-4">General information</h5>
                    <Form>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="officeTypeId">
                                    <Form.Label>DDO Type</Form.Label>
                                    {/* {ddo && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{officeTypeError}</p>
                                    )} */}
                                    <Select
                                        isDisabled
                                        value={ddoTypeDData.find((option) => option.value === ddoTypeId)}
                                        options={ddoTypeDData}
                                        onChange={handleDdoTypeChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>DDO Code</Form.Label>
                                    {/* {officeNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{officeNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" disabled placeholder="Enter Title here" value={ddoCode}
                                        onChange={(e) => {
                                            setDdoCode(e.target.value);
                                            //setofficeNameError("");
                                            //handleChangeDisstName()
                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>DDO Code Name</Form.Label>
                                    {/* {officetype && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" disabled placeholder="Enter Title here" value={ddoCodeName}
                                        onChange={(e) => {
                                            setDdoCodeName(e.target.value);
                                            //setStateNameError("");
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>PAN Number</Form.Label>
                                    {/* {distNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{distNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" disabled placeholder="Enter Title here" value={pan}
                                        onChange={(e) => {
                                            setPan(e.target.value);
                                            //setDistNameError("");
                                            //handleChangeDisstName()
                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>GST Number</Form.Label>
                                    {/* {officetype && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" disabled placeholder="Enter Title here" value={gst}
                                        onChange={(e) => {
                                            setGst(e.target.value);
                                            //setStateNameError("");
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Bank Account Number</Form.Label>
                                    {/* {distNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{distNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" disabled placeholder="Enter Title here" value={bankAccNo}
                                        onChange={(e) => {
                                            setBankAccNo(e.target.value);
                                            //setDistNameError("");
                                            //handleChangeDisstName()
                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Bank Name</Form.Label>
                                    {/* {officetype && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" disabled placeholder="Enter Title here" value={bankName}
                                        onChange={(e) => {
                                            setBankName(e.target.value);
                                            //setStateNameError("");
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Bank Address</Form.Label>
                                    {/* {distNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{distNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" disabled placeholder="Enter Title here" value={bankAddress}
                                        onChange={(e) => {
                                            setBankAddress(e.target.value);
                                            //setDistNameError("");
                                            //handleChangeDisstName()
                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Bank IFSC</Form.Label>
                                    {/* {officetype && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" disabled placeholder="Enter Title here" value={bankIFSC}
                                        onChange={(e) => {
                                            setBankIFSC(e.target.value);
                                            //setStateNameError("");
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3" >
                                <Row >
                                    <Form.Label> <br /> </Form.Label>
                                    <Col md={1} className="mb-1" >
                                        <input
                                            disabled
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
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Update Office Type Id</Form.Label>
                                    {/* {officetype && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" disabled placeholder="Enter Title here" value={updateOfficeTypeId}
                                        onChange={(e) => {
                                            setUpdateOfficeTypeId(e.target.value);
                                            //setStateNameError("");
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Update Office Id</Form.Label>
                                    {/* {distNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{distNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" disabled placeholder="Enter Title here" value={updateOfficeId}
                                        onChange={(e) => {
                                            setUpdateOfficeId(e.target.value);
                                            //setDistNameError("");
                                            //handleChangeDisstName()
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