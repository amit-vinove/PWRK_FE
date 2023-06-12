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
    const [officeId, setOfficeId] = useState(0);
    const [officeDData, setOfficeDData] = useState([]);
    const [ddoTypeId, setDdoTypeId] = useState(0);
    const [ddoTypeIdError, setDdoTypeIdError] = useState(0);
    const [ddoTypeDData, setDdoTypeDData] = useState([]);
    const [ddoCode, setDdoCode] = useState("");
    const [ddoCodeName, setDdoCodeName] = useState("");
    const [ddoCodeNameError, setDdoCodeNameError] = useState("");
    const [pan, setPan] = useState("");
    const [panError, setPanError] = useState("");
    const [gst, setGst] = useState("");
    const [gstError, setGstError] = useState("");
    const [bankAccNo, setBankAccNo] = useState("");
    const [bankAccNoError, setBankAccNoError] = useState("");
    const [bankName, setBankName] = useState("");
    const [bankNameError, setBankNameError] = useState("");
    const [bankAddress, setBankAddress] = useState("");
    const [bankAddressError, setBankAddressError] = useState("");
    const [bankIFSC, setBankIFSC] = useState("");
    const [bankIFSCError, setBankIFSCError] = useState("");
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
        const res = await axios.get('https://geolocation-db.com/json/')
        console.log(res.data.IPv4);
        setIpAddress(res.data.IPv4)
    }
    const [formValid, setFormValid] = useState(false);



    const handleDdoTypeChange = (selectedOption) => {
        setDdoTypeId(selectedOption.value);
        if (selectedOption.value.length > 50) {
            setDdoTypeIdError("DDO type must be less than 50 words");
        } else {
            setDdoTypeIdError("");
        }
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

    useEffect(() => {
        getAllDdoType();
        fetchIp();
    }, []);




    useEffect(() => {
        handleChangeDDOCodeName();
    }, [ddoCodeName]);
    const handleChangeDDOCodeName = () => {
        if (!ddoCodeName) return;
        if (ddoCodeName.length > 200) {
            setDdoCodeNameError("DDO code must be less than 200 words");
            setFormValid(false);
        } else {
            setDdoCodeNameError("");
            setFormValid(true);
        }
    };
    useEffect(() => {
        handleChangePan();
    }, [pan]);
    const handleChangePan = () => {
        if (!pan) return;
        if (pan.length > 15) {
            setPanError("Pan must be less than 15 words");
            setFormValid(false);
        } else {
            setPanError("");
            setFormValid(true);
        }
    };
    useEffect(() => {
        handleChangeGst();
    }, [gst]);
    const handleChangeGst = () => {
        if (!gst) return;
        if (gst.length > 20) {
            setGstError("Gst must be less than 20 words");
            setFormValid(false);
        } else {
            setGstError("");
            setFormValid(true);
        }
    };
    useEffect(() => {
        handleChangeBankAcc();
    }, [bankAccNo]);
    const handleChangeBankAcc = () => {
        if (!bankAccNo) return;
        if (bankAccNo.length > 20) {
            setBankAccNoError("Bank Account Number must be less than 20 words");
            setFormValid(false);
        } else {
            setBankAccNoError("");
            setFormValid(true);
        }
    };
    useEffect(() => {
        handleChangeBankName();
    }, [bankName]);
    const handleChangeBankName = () => {
        if (!bankName) return;
        if (bankName.length > 50) {
            setBankNameError("Bank name must be less than 50 words");
            setFormValid(false);
        } else {
            setBankNameError("");
            setFormValid(true);
        }
    };
    useEffect(() => {
        handleChangeBankAddress();
    }, [bankAddress]);
    const handleChangeBankAddress = () => {
        if (!bankAddress) return;
        if (bankAddress.length > 200) {
            setBankAddressError("Bank address must be less than 200 words");
            setFormValid(false);
        } else {
            setBankAddressError("");
            setFormValid(true);
        }
    };
    useEffect(() => {
        handleChangeBankIfsc();
    }, [bankIFSC]);
    const handleChangeBankIfsc = () => {
        if (!bankIFSC) return;
        if (bankIFSC.length > 11) {
            setBankIFSCError("Bank IFSC must be less than 11 words");
            setFormValid(false);
        } else {
            setBankIFSCError("");
            setFormValid(true);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (ddoTypeId === 0 || ddoTypeId === null) {
            setDdoTypeIdError("DDO Type is Required");
        }
        else if (ddoTypeId.length > 50) {
            setDdoTypeIdError("DDO type must be less than 50 words");
        } else {
            setDdoTypeIdError("");
        }

        if (ddoCodeName === "" || ddoCodeName === null) {
            setDdoCodeNameError("DDO Type is Required");
        }
        else if (ddoCodeName.length > 200) {
            setDdoCodeNameError("DDO type must be less than 200 words");
        } else {
            setDdoCodeNameError("");
        }

        if (pan === "" || pan === null) {
            setPanError("PAN Number is Required");
        }
        else if (pan.length > 15) {
            setPanError("PAN Number must be less than 15 letter");
        } else {
            setPanError("");
        }

        if (bankAccNo === "" || bankAccNo === null) {
            setBankAccNoError("Bank Account Number is Required");
        }
        else if (bankAccNo.length > 20) {
            setBankAccNoError("Back Account Number must be less than 15 letter");
        } else {
            setBankAccNoError("");
        }

        if (bankName === "" || bankName === null) {
            setBankNameError("Bank Name is Required");
        }
        else if (bankName.length > 50) {
            setBankNameError("Bank Name must be less than 50 letter");
        } else {
            setBankNameError("");
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
            console.log(UserID, "UserId");
            Axios.post(
                `${process.env.REACT_APP_API}OfficeAccountDetails/SetOfficeAccountDetails`,
                payload
            )
                .then((response) => {
                    console.log(response.data);
                    Swal.fire("Save", "Office Account Saved Sucessfully", "success");

                    history.push("/officeAccDetail")
                })
                .catch((error) => {
                    console.log(error);
                });
        };
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
                                <Form.Group id="officeTypeId">
                                    <Form.Label>DDO Type</Form.Label>
                                    {ddoTypeIdError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{ddoTypeIdError}</p>
                                    )}
                                    <Select
                                        value={ddoTypeDData.find((option) => option.value === ddoTypeId)}
                                        options={ddoTypeDData}
                                        onChange={handleDdoTypeChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>DDO Code</Form.Label>

                                    <Form.Control required type="text" placeholder="Enter Title here" value={ddoCode}
                                        onChange={(e) => {
                                            setDdoCode(e.target.value);

                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>DDO Code Name</Form.Label>
                                    {ddoCodeNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{ddoCodeNameError}</p>
                                    )}
                                    <Form.Control required type="text" placeholder="Enter Title here" value={ddoCodeName}
                                        onChange={(e) => {
                                            setDdoCodeName(e.target.value);
                                            setDdoCodeNameError("");
                                            handleChangeDDOCodeName();
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>PAN Number</Form.Label>
                                    {panError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{panError}</p>
                                    )}
                                    <Form.Control required type="text" placeholder="Enter Title here" value={pan}
                                        onChange={(e) => {
                                            setPan(e.target.value);
                                            setPanError("");
                                            handleChangePan();
                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>GST Number</Form.Label>
                                    {gstError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{gstError}</p>
                                    )}
                                    <Form.Control required type="text" placeholder="Enter Title here" value={gst}
                                        onChange={(e) => {
                                            setGst(e.target.value);
                                            setGstError("");
                                            handleChangeGst();
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Bank Account Number</Form.Label>
                                    {bankAccNoError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{bankAccNoError}</p>
                                    )}
                                    <Form.Control required type="text" placeholder="Enter Title here" value={bankAccNo}
                                        onChange={(e) => {
                                            setBankAccNo(e.target.value);
                                            setBankAccNoError("");
                                            handleChangeBankAcc();
                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Bank Name</Form.Label>
                                    {bankNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{bankNameError}</p>
                                    )}
                                    <Form.Control required type="text" placeholder="Enter Bank Name here" value={bankName}
                                        onChange={(e) => {
                                            setBankName(e.target.value);
                                            setBankNameError("");
                                            handleChangeBankName();
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Bank Address</Form.Label>
                                    {bankAddressError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{bankAddressError}</p>
                                    )}
                                    <Form.Control required type="text" placeholder="Enter Title here" value={bankAddress}
                                        onChange={(e) => {
                                            setBankAddress(e.target.value);
                                            setBankAddressError("");
                                            handleChangeBankAddress();

                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Bank IFSC</Form.Label>
                                    {bankIFSCError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{bankIFSCError}</p>
                                    )}
                                    <Form.Control required type="text" placeholder="Enter Title here" value={bankIFSC}
                                        onChange={(e) => {
                                            setBankIFSC(e.target.value);
                                            setBankIFSCError("");
                                            handleChangeBankIfsc();
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
