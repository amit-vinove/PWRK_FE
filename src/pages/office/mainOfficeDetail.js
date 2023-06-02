import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
    Col,
    Row,
    Card,
    Form,
    Button,
    InputGroup,
} from "@themesberg/react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import axios from "axios";
import Select from "react-select";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
export default () => {
    const history = useHistory();
    const [officeId, setofficeId] = useState(0);
    const [officeTypeId, setofficeTypeId] = useState("");
    const [officeTypeDropdownData, setOfficeTypeDropdownData] = useState([]);
    const [officeError, setofficeError] = useState("");
    const [officeName, setOfficeName] = useState("");
    const [officeNameError, setofficeNameError] = useState("");
    const [officeNameHindi, setOfficeNameHindi] = useState("");
    const [officeNameHindiError, setOfficeNameHindiError] = useState("");
    const [officeCode, setOfficeCode] = useState("");
    const [address, setAddress] = useState("");
    const [stateId, setStateId] = useState("");
    const [stateDData, setStateDData] = useState([]);
    const [disttId, setDisttId] = useState("");
    const [disttDData, setDisttDData] = useState([]);
    const [pinCode, setPinCode] = useState("");
    const [stdCode, setStdCode] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [emailId, setEmailId] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [parentId1, setParentId1] = useState(0);
    const [parentId1WEF, setParentId1WEF] = useState(new Date());
    const [parentId2, setParentId2] = useState(0);
    const [parentId2WEF, setParentId2WEF] = useState(new Date());
    const [parentId3, setParentId3] = useState(0);
    const [parentId3WEF, setParentId3WEF] = useState(new Date());
    const [parentId4, setParentId4] = useState(0);
    const [parentId4WEF, setParentId4WEF] = useState(new Date());
    const [designationId, setdesignationId] = useState(0);
    const [designationDData, setdesignationDData] = useState([]);
    const [officeLevelId, setOfficeLevelId] = useState(null);
    const [officeLevelDData, setOfficeLevelDData] = useState([]);
    const [rtiDesigId, setRtiDesigId] = useState(0);
    const [rtiDesigDData, setRtiDesigDData] = useState([]);
    const [rtiJuris, setRtiJuris] = useState("");
    const [jurisdiction, setJurisDiction] = useState("");
    const [comment, setComment] = useState("");
    const [seqId, setSeqId] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [isVisible, setIsVisible] = useState(true);
    const [updateOfficeTypeId, setUpdateOfficeTypeId] = useState(0);
    const [updateOfficeId, setUpdateOfficeId] = useState(0);
    const [ipAddress, setipAddress] = useState(0);
    const [updateby, setupdateby] = useState(0);
    const jsonData = { updateby: "123" };
    const [updateon, setupdateon] = useState(new Date());
    const [formValid, setFormValid] = useState(false);

    const handleCancel = () => {
        history.push("/office");
    };
    const fetchIp = async () => {
        const res = await axios.get("https://geolocation-db.com/json/");
        console.log(res.data.IPv4);
        setipAddress(res.data.IPv4);
    };
    const handleOfficeTypeChange = (selectedOption) => {
        setofficeTypeId(selectedOption.value);
    };

    const getAllOfficeType = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API}OfficeType/GetOfficeType`);
            const formattedData = result.data.map((officeType) => ({
                value: officeType.officeTypeId,
                label: officeType.officeTypeName,
            }));
            setOfficeTypeDropdownData(formattedData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleStateChange = (selectedOption) => {
        setStateId(selectedOption.value);
    };

    const getAllState = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API}State/GetState`);
            const formattedData = result.data.map((state) => ({
                value: state.stateId,
                label: state.stateName,
            }));
            setStateDData(formattedData);
        } catch (error) {
            console.error(error);
        }
    };




    const handleDistrictChange = (selectedOption) => {
        setDisttId(selectedOption.value);
    };

    const getAllDistrict = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API}District/GetDistrict`);
            const formattedData = result.data.map((district) => ({
                value: district.disttId,
                label: district.distName,
            }));
            setDisttDData(formattedData);
        } catch (error) {
            console.error(error);
        }
    };






    const handleOfficeLevelChange = (selectedOption) => {
        setOfficeLevelId(selectedOption.value);
    };

    const getAllOfficeLevel = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API}OfficeLevel/GetOfficeLevel`);
            const formattedData = result.data.map((officeLevel) => ({
                value: officeLevel.officeLevelId,
                label: officeLevel.officeLevel,
            }));
            setOfficeLevelDData(formattedData);
        } catch (error) {
            console.error(error);
        }
    };







    const handleDesignationChange = (selectedOption) => {
        setdesignationId(selectedOption.value);
    };

    const getAllDesignation = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API}Designation/GetDesignation`);
            const formattedData = result.data.map((designation) => ({
                value: designation.designationId,
                label: designation.designationName,
            }));
            setdesignationDData(formattedData);
        } catch (error) {
            console.error(error);
        }
    };


    const handleRTIDesignationChange = (selectedOption) => {
        setRtiDesigId(selectedOption.value);
    };

    const getAllRTIDesignation = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API}RTIDesignation/GetRTIDesignation`);
            const formattedData = result.data.map((rtidesignation) => ({
                value: rtidesignation.rtiDesigId,
                label: rtidesignation.rtiDesignation,
            }));
            setRtiDesigDData(formattedData);
        } catch (error) {
            console.error(error);
        }
    };



    useEffect(() => {
        getAllState();
        getAllDistrict();
        getAllOfficeType();
        getAllOfficeLevel();
        getAllDesignation();
        getAllRTIDesignation();
        fetchIp();
    }, []);
    useEffect(() => {
        handleChangeOffice();
    }, [officeName]);
    const handleChangeOffice = () => {
        if (!officeName) return;
        if (officeName.length > 50 && officeName.length < 2) {
            setofficeNameError("Office  Name must be less 50 words");
            setFormValid(false);
        } else {
            setofficeNameError("");
            setFormValid(true);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (officeName === "") {
            setofficeNameError("Office Name is Required");
        } else if (officeNameHindi.length > 50) {
            setOfficeNameHindiError("Office name hindi Name must be less 50 words");
        }
        if (formValid) {
            let UserID = localStorage.getItem("UserId");
            const payload = {
                officeId: officeId,
                officeTypeId: officeTypeId,
                officeName: officeName,
                officeNameHindi: officeNameHindi,
                officeCode: officeCode,
                address: address,
                stateId: stateId,
                disttId: disttId,
                pinCode: pinCode,
                stdCode: stdCode,
                contactNo: contactNo,
                emailId: emailId,
                longitude: longitude,
                latitude: latitude,
                parentId1: parentId1,
                parentId1WEF: parentId1WEF,
                parentId2: parentId2,
                parentId2WEF: parentId2WEF,
                parentId3: parentId3,
                parentId3WEF: parentId3WEF,
                parentId4: parentId4,
                parentId4WEF: parentId4WEF,
                designationId: designationId,
                officeId: officeId,
                officeLevelId: officeLevelId,
                rtiDesigId: rtiDesigId,
                rtiJuris: rtiJuris,
                jurisdiction: jurisdiction,
                comment: comment,
                seqId: seqId,
                isActive: isActive,
                isVisible: isVisible,
                updateby: UserID,
                updateOfficeTypeId: updateOfficeTypeId,
                updateOfficeId: updateOfficeId,
                updateon: updateon,
                ipAddress: ipAddress,
            };
            Axios.post(`${process.env.REACT_APP_API}Office/SetOffice`, payload)
                .then((response) => {
                    console.log(response.data);
                    Swal.fire("Save", "Office Saved Sucessfully", "success");

                    history.push("/office");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <h4>Office Details</h4>
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
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Office Name</Form.Label>
                                    {officeNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>
                                            *{officeNameError}
                                        </p>
                                    )}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={officeName}
                                        onChange={(e) => {
                                            setOfficeName(e.target.value);
                                            setofficeNameError("");
                                            //handleChangeDisstName()
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Office Name Hindi</Form.Label>
                                    {/* {officetype && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
                                    )} */}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={officeNameHindi}
                                        onChange={(e) => {
                                            setOfficeNameHindi(e.target.value);
                                            //setStateNameError("");
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Office Code</Form.Label>
                                    {/* {distNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{distNameError}</p>
                                    )} */}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={officeCode}
                                        onChange={(e) => {
                                            setOfficeCode(e.target.value);
                                            //setDistNameError("");
                                            //handleChangeDisstName()
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Address</Form.Label>
                                    {/* {officetype && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
                                    )} */}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={address}
                                        onChange={(e) => {
                                            setAddress(e.target.value);
                                            //setStateNameError("");
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="officeTypeId">
                                    <Form.Label>State Name</Form.Label>
                                    {/* {officeTypeError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{officeTypeError}</p>
                                    )} */}
                                    <Select
                                        value={stateDData.find((option) => option.value === stateId)}
                                        options={stateDData}
                                        onChange={handleStateChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>District Name</Form.Label>
                                    <Form.Select
                                        onChange={handleDistrictChange}
                                        disablePortal
                                        id="combo-box-demo"
                                        sx={{ width: 600 }}
                                        defaultValue="" // Set the default value to an empty string
                                    >
                                        <option value="" disabled>
                                            Choose district name....
                                        </option>
                                        {disttDData.map((s) => (
                                            <option key={s.disttId} value={s.disttId}>
                                                {s.distName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>PIN Code</Form.Label>
                                    {/* {distNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{distNameError}</p>
                                    )} */}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={pinCode}
                                        onChange={(e) => {
                                            setPinCode(e.target.value);
                                            //setDistNameError("");
                                            //handleChangeDisstName()
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>STD Code</Form.Label>
                                    {/* {officetype && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
                                    )} */}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={stdCode}
                                        onChange={(e) => {
                                            setStdCode(e.target.value);
                                            //setStateNameError("");
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Contact Number</Form.Label>
                                    {/* {distNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{distNameError}</p>
                                    )} */}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={contactNo}
                                        onChange={(e) => {
                                            setContactNo(e.target.value);
                                            //setDistNameError("");
                                            //handleChangeDisstName()
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Email Id</Form.Label>
                                    {/* {officetype && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
                                    )} */}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={emailId}
                                        onChange={(e) => {
                                            setEmailId(e.target.value);
                                            //setStateNameError("");
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Longitude</Form.Label>
                                    {/* {distNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{distNameError}</p>
                                    )} */}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={longitude}
                                        onChange={(e) => {
                                            setLongitude(e.target.value);
                                            //setDistNameError("");
                                            //handleChangeDisstName()
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Latitude</Form.Label>
                                    {/* {distNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{distNameError}</p>
                                    )} */}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={latitude}
                                        onChange={(e) => {
                                            setLatitude(e.target.value);
                                            //setDistNameError("");
                                            //handleChangeDisstName()
                                        }}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Parent Id 1</Form.Label>
                                    {/* {officetype && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
                                    )} */}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={parentId1}
                                        onChange={(e) => {
                                            setParentId1(e.target.value);
                                            //setStateNameError("");
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Parent Id 1 WEF</Form.Label>
                                    {/* {distNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{distNameError}</p>
                                    )} */}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={parentId1WEF}
                                        onChange={(e) => {
                                            setParentId1WEF(e.target.value);
                                            //setDistNameError("");
                                            //handleChangeDisstName()
                                        }}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Parent Id 2</Form.Label>
                                    {/* {officetype && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
                                    )} */}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={parentId2}
                                        onChange={(e) => {
                                            setParentId2(e.target.value);
                                            //setStateNameError("");
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Parent Id 2 WEF</Form.Label>
                                    {/* {distNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{distNameError}</p>
                                    )} */}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={parentId2WEF}
                                        onChange={(e) => {
                                            setParentId2WEF(e.target.value);
                                            //setDistNameError("");
                                            //handleChangeDisstName()
                                        }}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Parent Id 3</Form.Label>
                                    {/* {officetype && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
                                    )} */}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={parentId3}
                                        onChange={(e) => {
                                            setParentId3(e.target.value);
                                            //setStateNameError("");
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Parent Id 3 WEF</Form.Label>
                                    {/* {distNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{distNameError}</p>
                                    )} */}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={parentId3WEF}
                                        onChange={(e) => {
                                            setParentId3WEF(e.target.value);
                                            //setDistNameError("");
                                            //handleChangeDisstName()
                                        }}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Parent Id 4</Form.Label>
                                    {/* {officetype && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
                                    )} */}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={parentId4}
                                        onChange={(e) => {
                                            setParentId4(e.target.value);
                                            //setStateNameError("");
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Parent Id 4 WEF</Form.Label>
                                    {/* {distNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{distNameError}</p>
                                    )} */}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={parentId4WEF}
                                        onChange={(e) => {
                                            setParentId4WEF(e.target.value);
                                            //setDistNameError("");
                                            //handleChangeDisstName()
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Designation</Form.Label>
                                    <Form.Select
                                        onChange={handleDesignationChange}
                                        disablePortal
                                        id="combo-box-demo"
                                        sx={{ width: 600 }}
                                        defaultValue="" // Set the default value to an empty string
                                    >
                                        <option value="" disabled>
                                            Choose designation....
                                        </option>
                                        {designationDData.map((s) => (
                                            <option key={s.designationId} value={s.designationId}>
                                                {s.designationName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Office Level</Form.Label>
                                    <Form.Select
                                        onChange={handleOfficeLevelChange}
                                        disablePortal
                                        id="combo-box-demo"
                                        sx={{ width: 600 }}
                                        defaultValue="" // Set the default value to an empty string
                                    >
                                        <option value="" disabled>
                                            Choose office level....
                                        </option>
                                        {officeLevelDData.map((s) => (
                                            <option key={s.officeLevelId} value={s.officeLevelId}>
                                                {s.officeLevel}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>RTI Designation</Form.Label>
                                    <Form.Select
                                        onChange={handleRTIDesignationChange}
                                        disablePortal
                                        id="combo-box-demo"
                                        sx={{ width: 600 }}
                                        defaultValue="" // Set the default value to an empty string
                                    >
                                        <option value="" disabled>
                                            Choose RTI designation....
                                        </option>
                                        {rtiDesigDData.map((s) => (
                                            <option key={s.rtiDesigId} value={s.rtiDesigId}>
                                                {s.rtiDesignation}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>RTI Juris</Form.Label>
                                    {/* {officetype && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
                                    )} */}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={rtiJuris}
                                        onChange={(e) => {
                                            setRtiJuris(e.target.value);
                                            //setStateNameError("");
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Juris Diction</Form.Label>
                                    {/* {distNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{distNameError}</p>
                                    )} */}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={jurisdiction}
                                        onChange={(e) => {
                                            setJurisDiction(e.target.value);
                                            //setDistNameError("");
                                            //handleChangeDisstName()
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Comment</Form.Label>
                                    {/* {officetype && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
                                    )} */}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={comment}
                                        onChange={(e) => {
                                            setComment(e.target.value);
                                            //setStateNameError("");
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Seq Id</Form.Label>
                                    {/* {distNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{distNameError}</p>
                                    )} */}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={seqId}
                                        onChange={(e) => {
                                            setSeqId(e.target.value);
                                            //setDistNameError("");
                                            //handleChangeDisstName()
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Row>
                                    <Form.Label>
                                        {" "}
                                        <br />{" "}
                                    </Form.Label>
                                    <Col md={1} className="mb-1">
                                        {" "}
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            checked={isActive}
                                            onChange={(e) => {
                                                setIsActive(e.target.checked);
                                            }}
                                            value={isActive}
                                            id="defaultCheck1"
                                        />
                                    </Col>
                                    <Col md={5} className="mb-2">
                                        <Form.Label>Status</Form.Label>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Row>
                                    <Form.Label>
                                        {" "}
                                        <br />{" "}
                                    </Form.Label>
                                    <Col md={1} className="mb-1">
                                        {" "}
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            checked={isVisible}
                                            onChange={(e) => {
                                                setIsVisible(e.target.checked);
                                            }}
                                            value={isActive}
                                            id="defaultCheck1"
                                        />
                                    </Col>
                                    <Col md={5} className="mb-2">
                                        <Form.Label>Is Visible</Form.Label>
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
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={updateOfficeTypeId}
                                        onChange={(e) => {
                                            setUpdateOfficeTypeId(e.target.value);
                                            //setStateNameError("");
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Update Office Id</Form.Label>
                                    {/* {distNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{distNameError}</p>
                                    )} */}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={updateOfficeId}
                                        onChange={(e) => {
                                            setUpdateOfficeId(e.target.value);
                                            //setDistNameError("");
                                            //handleChangeDisstName()
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="mt-3">
                            <Button variant="primary" type="submit" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                                style={{ marginLeft: 10 }}
                                onClick={handleSubmit}
                            >
                                Save All
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};
