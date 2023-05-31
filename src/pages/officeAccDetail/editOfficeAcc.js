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
    const fetchIp = async () => {
        const response = await axios.get('https://geolocation-db.com/json/')
        console.log(response.data.IPv4);
        setIpAddress(response.data.IPv4)
    }


    const [formValid, setFormValid] = useState(false);
    useEffect(() => {
        handleChangeOfficeAcc();
    }, [ddoCodeName])

    const handleDdoTypeChange = (event) => {
        setDdoTypeId(event.target.value);

        //setUserNameError("");
    };
    const query = new URLSearchParams(window.location.search);
    const id = query.get("id");

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_API}OfficeAccountDetails/GetOfficeAccountDetails/${id}`
            ).then((response) => {
                setOfficeId(response.dada.officeId);
                setDdoTypeId(response.dada.ddoTypeId);
                setDdoCode(response.dada.ddoCode);
                setDdoCodeName(response.dada.ddoCodeName);
                setPan(response.dada.pan);
                setGst(response.dada.gst);
                setBankAccNo(response.dada.bankAccNo);
                setBankName(response.dada.bankName);
                setBankAddress(response.dada.bankAddress);
                setBankIFSC(response.dada.bankIFSC);
                setIsActive(response.dada.isActive);
                setUpdateBy(response.dada.updateBy);
                setUpdateOfficeTypeId(response.dada.updateOfficeTypeId);
                setUpdateOfficeId(response.dada.updateOfficeId);
                setUpdateOn(response.dada.updateon);
                setIpAddress(response.dada.ipAddress);
                console.log(response, "response response")
            }).catch((response) => {
                if (response.response.status === 409) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: response.response.data,
                    });
                }
                else {
                    console.log(response);
                    // Swal.fire({
                    //     icon: 'error',
                    //     title: 'Oops...',
                    //     text: "Somthing went wrong ! please login again",
                    // });
                }
            })

    }, []);

    const getAllDdoType = async () => {
        let result = await Axios.get(`${process.env.REACT_APP_API}DDOType/GetDDOType`);
        setDdoTypeDData(result.data);
    };

    useEffect(() => {
        getAllDdoType();
        fetchIp();
    }, []);


    const handleChangeOfficeAcc = () => {
        if (!ddoCodeName) return;
        if (ddoCodeName.length > 50 && ddoCodeName.length < 2) {
            setDdoCodeNameError("DDo code  Name must be less 50 words");
            setFormValid(false)
        } else {
            setDdoCodeNameError("");
            setFormValid(true)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (ddoCodeName === "") {
            setDdoCodeNameError("ddo code Name is Required");
        }
        else if (pan.length > 50) {
            setPanError("Pan must be less 50 words");
        }
        if (formValid) {
            let UserID = localStorage.getItem("UserId");
            const payload = {
                officeId: officeId,
                ddoTypeId: ddoTypeId,
                ddoCode: ddoCode,
                ddoCodeName: ddoCodeName,
                pan: pan,
                gst: gst,
                bankAccNo: bankAccNo,
                bankName: bankName,
                bankAddress: bankAddress,
                bankIFSC: bankIFSC,
                isActive: isActive,
                updateBy: UserID,
                updateOfficeTypeId: updateOfficeTypeId,
                updateOfficeId: updateOfficeId,
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
                            `${process.env.REACT_APP_API}OfficeAccountDetails/UpdateOfficeAccountDetails`,
                            payload
                        )
                            .then((response) => {
                                Swal.fire({
                                    icon: "success",
                                    title: "Your work has been successfully update",
                                    showConfirmButton: false,
                                    timer: 1500,
                                });
                                history.push("/officeAccDetail")
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
                    <h4>Office Account Details</h4>
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
                                    {/* {ddot && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{officeTypeError}</p>
                                    )} */}
                                    <Form.Select
                                        onChange={handleDdoTypeChange}
                                        disablePortal
                                        id="combo-box-demo"
                                        sx={{ width: 600 }}
                                        defaultValue="" // Set the default value to an empty string
                                    >
                                        <option value="" disabled>
                                            Choose Ddo type....
                                        </option>
                                        {ddoTypeDData.map((s) => (
                                            <option key={s.ddoTypeId} value={s.ddoTypeId}>
                                                {s.ddoType}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>DDO Code</Form.Label>
                                    {/* {officeNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{officeNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" placeholder="Enter Title here" value={ddoCode}
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
                                    <Form.Control required type="text" placeholder="Enter Title here" value={ddoCodeName}
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
                                    <Form.Control required type="text" placeholder="Enter Title here" value={pan}
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
                                    <Form.Control required type="text" placeholder="Enter Title here" value={gst}
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
                                    <Form.Control required type="text" placeholder="Enter Title here" value={bankAccNo}
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
                                    <Form.Control required type="text" placeholder="Enter Title here" value={bankName}
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
                                    <Form.Control required type="text" placeholder="Enter Title here" value={bankAddress}
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
                                    <Form.Control required type="text" placeholder="Enter Title here" value={bankIFSC}
                                        onChange={(e) => {
                                            setBankIFSC(e.target.value);
                                            //setStateNameError("");
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
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Update Office Type Id</Form.Label>
                                    {/* {officetype && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
                                    )} */}
                                    <Form.Control required type="text" placeholder="Enter Title here" value={updateOfficeTypeId}
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
                                    <Form.Control required type="text" placeholder="Enter Title here" value={updateOfficeId}
                                        onChange={(e) => {
                                            setUpdateOfficeId(e.target.value);
                                            //setDistNameError("");
                                            //handleChangeDisstName()
                                        }} />
                                </Form.Group>
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
