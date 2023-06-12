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
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
export default () => {
    const history = useHistory();
    const [officeId, setofficeId] = useState(0);
    const [officeTypeId, setofficeTypeId] = useState(0);
    const [officeTypeError, setOfficeTypeError] = useState("");
    const [officeTypeDropdownData, setOfficeTypeDropdownData] = useState([]);
    const [officeName, setOfficeName] = useState("");
    const [officeNameError, setofficeNameError] = useState("");
    const [officeNameHindi, setOfficeNameHindi] = useState("");
    const [officeNameHindiError, setOfficeNameHindiError] = useState("");
    const [officeCode, setOfficeCode] = useState("");
    const [officeCodeerror, setOfficeCodeError] = useState("");
    const [address, setAddress] = useState("");
    const [addressError, setAddressError] = useState("");
    const [stateId, setStateId] = useState("");
    const [stateIdError, setStateIdError] = useState("");
    const [stateDData, setStateDData] = useState([]);
    const [disttId, setDisttId] = useState("");
    const [disttIdError, setDisttIdError] = useState("");
    const [disttDData, setDisttDData] = useState([]);
    const [pinCode, setPinCode] = useState("");
    const [pinCodeError, setPinCodeError] = useState("");
    const [stdCode, setStdCode] = useState("");
    const [stdCodeError, setStdCodeError] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [emailId, setEmailId] = useState("");
    const [emailIdError, setEmailIdError] = useState("");
    const [longitude, setLongitude] = useState("");
    const [longitudeError, setLongitudeError] = useState("");
    const [latitude, setLatitude] = useState("");
    const [latitudeError, setLatitudeError] = useState("");
    const [parentId1, setParentId1] = useState(0);
    const [parentId1Error, setParentId1Error] = useState("");
    const [parentId1WEF, setParentId1WEF] = useState(new Date());
    const [parentId1WEFError, setParentId1WEFError] = useState("");
    const [parentId2, setParentId2] = useState(0);
    const [parentId2WEF, setParentId2WEF] = useState(new Date());
    const [parentId3, setParentId3] = useState(0);
    const [parentId3WEF, setParentId3WEF] = useState(new Date());
    const [parentId4, setParentId4] = useState(0);
    const [parentId4WEF, setParentId4WEF] = useState(new Date());
    const [designationId, setdesignationId] = useState(0);
    const [designationError, setdesignationError] = useState("");
    const [designationDData, setdesignationDData] = useState([]);
    const [officeLevelId, setOfficeLevelId] = useState(0);
    const [officeLevelError, setOfficeLevelError] = useState("");
    const [officeLevelDData, setOfficeLevelDData] = useState([]);
    const [rtiDesigId, setRtiDesigId] = useState(0);
    const [rtiDesigError, setRtiDesigError] = useState("");
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

    const query = new URLSearchParams(window.location.search);
    const id = query.get("id");


    const validateEmail = (emailId) => {
        return emailId.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

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

    const handleStateChange = (selectedOption) => {
        setStateId(selectedOption.value);
    };
    const getAllState = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API}State/GetState`);
            const formattedData = result.data.map((state) => ({
                value: state.stateId,
                label: (
                    <span style={{ color: state.isActive ? "green" : "red" }}>
                        {state.stateName}
                        {/* {" -- "}
                        {state.isActive ? "Active" : "Inactive"} */}
                    </span>
                ),
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
                label: (
                    <span style={{ color: district.isActive ? "green" : "red" }}>
                        {district.distName}
                        {/* {" -- "}
                        {district.isActive ? "Active" : "Inactive"} */}
                    </span>
                ),
            }));
            setDisttDData(formattedData);
        } catch (error) {
            console.error(error);
        }
    };



    const handleOfficeLevelChange = (selectedOption) => {
        setOfficeLevelId(selectedOption.value);
        if (selectedOption.value === 0 || selectedOption.value === null) {
            setOfficeLevelError(" Office Level is required")
        } else {
            setOfficeLevelError("")
        }
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

    // const getAllOfficeLevel = async () => {
    //     try {
    //         const result = await Axios.get(`${process.env.REACT_APP_API}OfficeLevel/GetOfficeLevel`);
    //         const formattedData = result.data.map((officeLevel) => ({
    //             value: officeLevel.officeLevelId,
    //             label: (
    //                 <span style={{ color: officeLevel.isActive ? "green" : "red" }}>
    //                     {officeLevel.officeLevel}
    //                     {" -- "}
    //                     {officeLevel.isActive ? "Active" : "Inactive"}
    //                 </span>
    //             ),
    //         }));
    //         setOfficeLevelDData(formattedData);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };


    const handleDesignationChange = (selectedOption) => {
        setdesignationId(selectedOption.value);
        if (selectedOption.value === 0 || selectedOption.value === null) {
            setdesignationError(" Designation is required")
        } else {
            setdesignationError("")
        }
    };
    const getAllDesignation = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API}Designation/GetDesignation`);
            const formattedData = result.data.map((designation) => ({
                value: designation.designationId,
                label: (
                    <span style={{ color: designation.isActive ? "green" : "red" }}>
                        {designation.designationName}
                        {/* {" -- "}
                        {designation.isActive ? "Active" : "Inactive"} */}
                    </span>
                ),
            }));
            setdesignationDData(formattedData);
        } catch (error) {
            console.error(error);
        }
    };


    const handleRTIDesignationChange = (selectedOption) => {
        setRtiDesigId(selectedOption.value);
        if (selectedOption.value === 0 || selectedOption.value === null) {
            setRtiDesigError("RTI Designation is required")
        } else {
            setRtiDesigError("")
        }
    };
    const getAllRTIDesignation = async () => {
        try {
            const result = await Axios.get(`${process.env.REACT_APP_API}RTIDesignation/GetRTIDesignation`);
            const formattedData = result.data.map((rtidesignation) => ({
                value: rtidesignation.rtiDesigId,
                label: (
                    <span style={{ color: rtidesignation.isActive ? "green" : "red" }}>
                        {rtidesignation.rtiDesignation}
                        {/* {" -- "}
                        {rtidesignation.isActive ? "Active" : "Inactive"} */}
                    </span>
                ),
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
        axios
            .get(
                `${process.env.REACT_APP_API}Office/GetOffice/${id}`
            ).then((res) => {
                setofficeId(res.data.officeId);
                setofficeTypeId(res.data.officeTypeId);
                setOfficeName(res.data.officeName);
                setOfficeNameHindi(res.data.officeNameHindi);
                setOfficeCode(res.data.officeCode);
                setAddress(res.data.address);
                setStateId(res.data.stateId);
                setDisttId(res.data.disttId);
                setPinCode(res.data.pinCode);
                setStdCode(res.data.stdCode);
                setContactNo(res.data.contactNo);
                setEmailId(res.data.emailId);
                setLongitude(res.data.longitude);
                setLatitude(res.data.latitude);
                setParentId1(res.data.parentId1);
                setParentId1WEF(res.data.parentId1WEF);
                setParentId2(res.data.parentId2);
                setParentId2WEF(res.data.parentId2WEF);
                setParentId3(res.data.parentId3);
                setParentId3WEF(res.data.parentId3WEF);
                setParentId4(res.data.parentId4);
                setParentId4WEF(res.data.parentId4WEF);
                setdesignationId(res.data.designationName);
                setOfficeLevelId(res.data.officeLevel);
                setRtiDesigId(res.data.rtiDesignation);
                setRtiJuris(res.data.rtiJuris);
                setJurisDiction(res.data.jurisdiction);
                setComment(res.data.comment);
                setSeqId(res.data.seqId);
                setIsActive(res.data.isActive);
                setIsVisible(res.data.isVisible);
                setUpdateOfficeTypeId(res.data.updateOfficeTypeId);
                setUpdateOfficeId(res.data.updateOfficeId);

            }).catch((err) => {
                console.log(err);
            })

    }, [])


    useEffect(() => {
        handleChangeOffice();
    }, [officeName]);
    const handleChangeOffice = () => {
        if (!officeName) return;
        if (officeName.length < 3 || officeName.length > 200) {
            setofficeNameError("Office Name must be betwen 3 to 200 words");
            setFormValid(false);
        } else {
            setofficeNameError("");
            setFormValid(true);
        }
    };

    useEffect(() => {
        handleChangeOfficeNameHindi();
    }, [officeNameHindi]);
    const handleChangeOfficeNameHindi = () => {
        if (!officeNameHindi) return;
        if (officeNameHindi.length < 3 || officeNameHindi.length > 200) {
            setOfficeNameHindiError("Office Name hindi must be betwen 3 to 200 words");
            setFormValid(false);
        } else {
            setOfficeNameHindiError("");
            setFormValid(true);
        }
    };
    useEffect(() => {
        handleChangeOfficeCode();
    }, [officeCode]);
    const handleChangeOfficeCode = () => {
        if (!officeCode) return;
        if (officeCode.length > 50) {
            setOfficeCodeError("Office code must be less than 50 letter");
            setFormValid(false);
        } else {
            setOfficeCodeError("");
            setFormValid(true);
        }
    };
    useEffect(() => {
        handleChangeSTDCode();
    }, [stdCode]);
    const handleChangeSTDCode = () => {
        if (!stdCode) return;
        if (stdCode.length > 10) {
            setStdCodeError("Std code must be less than 10 letter");
            setFormValid(false);
        } else {
            setStdCodeError("");
            setFormValid(true);
        }
    };

    useEffect(() => {
        handleChangeAddress();
    }, [address]);
    const handleChangeAddress = () => {
        if (!address) return;
        if (address.length > 500) {
            setAddressError("Address must be less than 500 letter");
            setFormValid(false);
        } else {
            setAddressError("");
            setFormValid(true);
        }
    };

    useEffect(() => {
        handleChangeLongitude();
    }, [longitude]);
    const handleChangeLongitude = () => {
        if (!longitude) return;
        if (longitude.length > 150) {
            setLongitudeError("Longitude must be less than 150 letter");
            setFormValid(false);
        } else {
            setLongitudeError("");
            setFormValid(true);
        }
    };

    useEffect(() => {
        handleChangeLatitude();
    }, [latitude]);
    const handleChangeLatitude = () => {
        if (!latitude) return;
        if (latitude.length > 150) {
            setLatitudeError("Latitude must be less than 150 letter");
            setFormValid(false);
        } else {
            setLatitudeError("");
            setFormValid(true);
        }
    };

    useEffect(() => {
        handleChangeParentId1();
    }, [parentId1]);
    const handleChangeParentId1 = () => {

        if (parentId1 === null || parentId1 === "") {
            setParentId1Error("Parent Id 1 is required");
        } else {
            setParentId1Error("");
        }
    };



    useEffect(() => {
        handleChangeEmail();
    }, [emailId]);
    const handleChangeEmail = () => {
        if (!emailId) {
            setEmailIdError('');
            setFormValid(false);
            return;
        }
        if (!validateEmail(emailId)) {
            setEmailIdError('Please enter a valid email format');
            setFormValid(false);
        } else if (emailId.length > 100) {
            setEmailIdError('Email must be less than 100 characters');
            setFormValid(false);
        } else {
            setEmailIdError('');
            setFormValid(true);
        }
    };





    const handleSubmit = (e) => {
        e.preventDefault();
        if (emailId === "" || emailId === null) {
            setEmailIdError('Please enter email ');
            setFormValid(false);
        }
        else if (!validateEmail(emailId)) {
            setEmailIdError('Please enter a valid email format');
            setFormValid(false);
        } else if (emailId.length > 100) {
            setEmailIdError('Email must be less than 100 characters');
            setFormValid(false);
        } else {
            setEmailIdError('');
            setFormValid(true);
        }

        if (officeName === null || officeName === "") {
            setofficeNameError("Office Name is required");
        } else if (officeName.length < 3 || officeName.length > 200) {
            setofficeNameError("Office Name hindi must be betwen 3 to 200 letter");
        } else {
            setofficeNameError("");
        }

        if (officeTypeId === null || officeTypeId === 0) {
            setOfficeTypeError("Office Type is required");
        } else {
            setOfficeTypeError("");
        }

        if (officeNameHindi === null || officeNameHindi === "") {
            setOfficeNameHindiError("Office Name is required");
        } else if (officeNameHindi.length < 3 || officeNameHindi.length > 200) {
            setOfficeNameHindiError("Office Name hindi must be betwen 3 to 200 letter");
        } else {
            setOfficeNameHindiError("");
        }

        if (officeCode === null || officeCode === "") {
            setOfficeCodeError("Office code is required");
        } else if (officeCode.length > 50) {
            setOfficeCodeError("Office code must be less than 50 letter");
        } else {
            setOfficeCodeError("");
        }
        if (address === null || address === "") {
            setAddressError("Address code is required");
        } else if (officeCode.length > 500) {
            setAddressError("Address must be less than 500 letter");
        } else {
            setAddressError("");
        }
        if (stateId === null || stateId === "") {
            setStateIdError("State is required");
        } else {
            setStateIdError("");
        }
        if (disttId === null || disttId === "") {
            setDisttIdError("District is required");
        } else {
            setDisttIdError("");
        }
        if (pinCode === null || pinCode === "") {
            setPinCodeError("PIN Code is required");
        } else {
            setPinCodeError("");
        }
        if (parentId1 === null || parentId1 === "") {
            setParentId1Error("Parent Id 1 is required");
        } else {
            setParentId1Error("");
        }
        if (parentId1WEF === null || parentId1WEF === "") {
            setParentId1WEFError("Parent Id 1 WEF is required");
        } else {
            setParentId1WEFError("");
        }
        if (designationId === null || designationId === 0) {
            setdesignationError("Designation is required");
        } else {
            setdesignationError("");
        }
        if (officeLevelId === null || officeLevelId === 0) {
            setOfficeLevelError("Office level is required");
        } else {
            setOfficeLevelError("");
        }
        if (rtiDesigId === null || rtiDesigId === 0) {
            setRtiDesigError("RTI designation is required");
        } else {
            setRtiDesigError("");
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
                            `${process.env.REACT_APP_API}Office/UpdateOffice`,
                            payload
                        )
                            .then((res) => {
                                Swal.fire({
                                    icon: "success",
                                    title: "Your work has been successfully update",
                                    showConfirmButton: false,
                                    timer: 1500,
                                });
                                history.push("/office")
                            })
                            .catch(() => {
                                Swal.fire("Office not Update.");
                            });
                    }
                });
        }
    }
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
                                    {officeTypeError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{officeTypeError}</p>
                                    )}
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
                                    {officeNameHindiError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{officeNameHindiError}</p>
                                    )}
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
                                    {officeCodeerror && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{officeCodeerror}</p>
                                    )}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={officeCode}
                                        onChange={(e) => {
                                            setOfficeCode(e.target.value);
                                            setOfficeCodeError("");
                                            handleChangeOfficeCode()
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Address</Form.Label>
                                    {addressError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{addressError}</p>
                                    )}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={address}
                                        onChange={(e) => {
                                            setAddress(e.target.value);
                                            handleChangeAddress();
                                            setAddressError("");
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="officeTypeId">
                                    <Form.Label>State Name</Form.Label>
                                    {stateIdError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{stateIdError}</p>
                                    )}
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
                                <Form.Group id="officeTypeId">
                                    <Form.Label>District Name</Form.Label>
                                    {disttIdError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{disttIdError}</p>
                                    )}
                                    <Select
                                        value={disttDData.find((option) => option.value === disttId)}
                                        options={disttDData}
                                        onChange={handleDistrictChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>PIN Code</Form.Label>
                                    {pinCodeError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{pinCodeError}</p>
                                    )}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={pinCode}
                                        onChange={(e) => {
                                            setPinCode(e.target.value);
                                            setPinCodeError("");
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>STD Code</Form.Label>
                                    {stdCodeError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{stdCodeError}</p>
                                    )}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={stdCode}
                                        onChange={(e) => {
                                            setStdCode(e.target.value);
                                            setStdCodeError("");
                                            handleChangeSTDCode();
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
                                    {emailIdError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{emailIdError}</p>
                                    )}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={emailId}
                                        onChange={(e) => {
                                            setEmailId(e.target.value);
                                            setEmailIdError("");
                                            handleChangeEmail();
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Longitude</Form.Label>
                                    {longitudeError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{longitudeError}</p>
                                    )}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={longitude}
                                        onChange={(e) => {
                                            setLongitude(e.target.value);
                                            setLongitudeError("");
                                            handleChangeLongitude();

                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Latitude</Form.Label>
                                    {latitudeError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{latitudeError}</p>
                                    )}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={latitude}
                                        onChange={(e) => {
                                            setLatitude(e.target.value);
                                            setLatitudeError();
                                            handleChangeLatitude();
                                        }}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Parent Id 1</Form.Label>
                                    {parentId1Error && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{parentId1Error}</p>
                                    )}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={parentId1}
                                        onChange={(e) => {
                                            setParentId1(e.target.value);
                                            setParentId1Error("");
                                            handleChangeParentId1();
                                        }}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>Parent Id 1 WEF</Form.Label>
                                    {parentId1WEFError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{parentId1WEFError}</p>
                                    )}
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter value here"
                                        value={parentId1WEF}
                                        onChange={(e) => {
                                            setParentId1WEF(e.target.value);
                                            setParentId1WEFError("");
                                            handleChangeParentId1();
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
                                <Form.Group id="officeTypeId">
                                    <Form.Label>Designation Name</Form.Label>
                                    {designationError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{designationError}</p>
                                    )}
                                    <Select
                                        value={designationDData.find((option) => option.value === designationId)}
                                        options={designationDData}
                                        onChange={handleDesignationChange}

                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="officeTypeId">
                                    <Form.Label>Office Level</Form.Label>
                                    {officeLevelError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{officeLevelError}</p>
                                    )}
                                    <Select
                                        value={officeLevelDData.find((option) => option.value === officeLevelId)}
                                        options={officeLevelDData}
                                        onChange={handleOfficeLevelChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group id="officeTypeId">
                                    <Form.Label>RTI Designation</Form.Label>
                                    {rtiDesigError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{rtiDesigError}</p>
                                    )}
                                    <Select
                                        value={rtiDesigDData.find((option) => option.value === rtiDesigId)}
                                        options={rtiDesigDData}
                                        onChange={handleRTIDesignationChange}
                                    />
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
