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
        history.push("/otherOffice")
    }
    const fetchIp = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        console.log(res.data.IPv4);
        setIpAddress(res.data.IPv4)
    }
    const [formValid, setFormValid] = useState(false);
    useEffect(() => {
        handleChangeOfficeAcc();
    }, [ddoCodeName])

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
                        {" -- "}
                        {ddoType.isActive ? "Active" : "Inactive"}
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
            console.log(UserID, "UserId");
            Axios.post(
                `${process.env.REACT_APP_API}OfficeAccountDetails/SetOfficeAccountDetails`,
                payload
            )
                .then((response) => {
                    console.log(response.data);
                    Swal.fire("Save", "Office Account Saved Sucessfully", "success");

                    history.push("/otherOffice")
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
                                    {/* {ddo && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{officeTypeError}</p>
                                    )} */}
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






















// import React, { useState, useEffect } from "react";
// import moment from "moment-timezone";
// import Datetime from "react-datetime";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
// import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
// import { Link, useHistory } from "react-router-dom";
// import Axios from "axios";
// import axios from "axios";
// import Swal from "sweetalert2/dist/sweetalert2.js";
// import "sweetalert2/src/sweetalert2.scss";
// export default () => {
//     const history = useHistory();
//     const [pageMode, setPageMode] = useState("create");
//     const [othOffId, setOthOffId] = useState(0);
//     const [officeDData, setOfficeDData] = useState([]);
//     const [ddoTypeId, setDdoTypeId] = useState(0);
//     const [ddoTypeDData, setDdoTypeDData] = useState([]);
//     const [ddoCode, setDdoCode] = useState("");
//     const [ddoCodeName, setDdoCodeName] = useState("");
//     const [ddoCodeNameError, setDdoCodeNameError] = useState("");
//     const [pan, setPan] = useState("");
//     const [panError, setPanError] = useState("");
//     const [gst, setGst] = useState("");
//     const [bankAccNo, setBankAccNo] = useState("");
//     const [bankName, setBankName] = useState("");
//     const [bankAddress, setBankAddress] = useState("");
//     const [bankIFSC, setBankIFSC] = useState("");
//     const [isActive, setIsActive] = useState(true);
//     const [updateBy, setUpdateBy] = useState(0);
//     const [updateOfficeTypeId, setUpdateOfficeTypeId] = useState(0);
//     const [updateOfficeId, setUpdateOfficeId] = useState(0);
//     const [updateon, setUpdateOn] = useState(new Date());
//     const [ipAddress, setIpAddress] = useState(0);
//     const jsonData = {
//         updateby: "123",
//     };
//     const handleCancel = () => {
//         history.push("/otherOffice")
//     }
//     const fetchIp = async () => {
//         const res = await axios.get('https://geolocation-db.com/json/')
//         console.log(res.data.IPv4);
//         setIpAddress(res.data.IPv4)
//     }
//     const [formValid, setFormValid] = useState(false);
//     useEffect(() => {
//         fetchIp();
//     }, [])
//     useEffect(() => {
//         handleChangeOfficeAcc();
//     }, [ddoCodeName])
//     const handleChangeOfficeAcc = () => {
//         if (!ddoCodeName) return;
//         if (ddoCodeName.length > 50 && ddoCodeName.length < 2) {
//             setDdoCodeNameError("DDo code  Name must be less 50 words");
//             setFormValid(false)
//         } else {
//             setDdoCodeNameError("");
//             setFormValid(true)
//         }
//     }
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (ddoCodeName === "") {
//             setDdoCodeNameError("ddo code Name is Required");
//         }
//         else if (pan.length > 50) {
//             setPanError("Pan must be less 50 words");
//         }
//         if (formValid) {
//             let UserID = localStorage.getItem("UserId")
//             const payload = {
//                 othOffId: othOffId,
//                 ddoTypeId: ddoTypeId,
//                 ddoCode: ddoCode,
//                 ddoCodeName: ddoCodeName,
//                 pan: pan,
//                 gst: gst,
//                 bankAccNo: bankAccNo,
//                 bankName: bankName,
//                 bankAddress: bankAddress,
//                 bankIFSC: bankIFSC,
//                 isActive: isActive,
//                 updateBy: UserID,
//                 updateOfficeTypeId: updateOfficeTypeId,
//                 updateOfficeId: updateOfficeId,
//                 updateon: updateon,
//                 ipAddress: ipAddress,
//             };
//             Axios.post(
//                 `${process.env.REACT_APP_API}OfficeAccountDetails/SetOfficeAccountDetails`,
//                 //`${process.env.REACT_APP_API}OtherOffice/SetOtherOffice`,
//                 payload
//             )
//                 .then((response) => {
//                     console.log(response.data);
//                     Swal.fire("Save", "Other Office  Saved Sucessfully", "success");

//                     history.push("/otherOffice")
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 });
//         };
//     }
//     return (
//         <>
//             <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
//                 <div className="d-block mb-4 mb-md-0">
//                     <h4>Other Office Details</h4>
//                 </div>
//             </div>
//             <Card border="light" className="bg-white shadow-sm mb-4">
//                 <Card.Body>
//                     <h5 className="mb-4">General information</h5>
//                     <Form>
//                         <Row>
//                             <Col md={6} className="mb-3">
//                                 <Form.Group id="firstName">
//                                     <Form.Label>Ddo Type Id</Form.Label>
//                                     {/* {officetype && (
//                                         <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
//                                     )} */}
//                                     <Form.Control required type="text" placeholder="Enter Title here" value={ddoTypeId}
//                                         onChange={(e) => {
//                                             setDdoTypeId(e.target.value);
//                                             //setStateNameError("");
//                                         }} />
//                                 </Form.Group>
//                             </Col>
//                             <Col md={6} className="mb-3">
//                                 <Form.Group id="firstName">
//                                     <Form.Label>DDO Code</Form.Label>
//                                     {/* {officeNameError && (
//                                         <p style={{ color: "red", fontSize: "15px" }}>*{officeNameError}</p>
//                                     )} */}
//                                     <Form.Control required type="text" placeholder="Enter Title here" value={ddoCode}
//                                         onChange={(e) => {
//                                             setDdoCode(e.target.value);
//                                             //setofficeNameError("");
//                                             //handleChangeDisstName()
//                                         }} />
//                                 </Form.Group>
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col md={6} className="mb-3">
//                                 <Form.Group id="firstName">
//                                     <Form.Label>DDO Code Name</Form.Label>
//                                     {/* {officetype && (
//                                         <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
//                                     )} */}
//                                     <Form.Control required type="text" placeholder="Enter Title here" value={ddoCodeName}
//                                         onChange={(e) => {
//                                             setDdoCodeName(e.target.value);
//                                             //setStateNameError("");
//                                         }} />
//                                 </Form.Group>
//                             </Col>
//                             <Col md={6} className="mb-3">
//                                 <Form.Group id="firstName">
//                                     <Form.Label>PAN Number</Form.Label>
//                                     {/* {distNameError && (
//                                         <p style={{ color: "red", fontSize: "15px" }}>*{distNameError}</p>
//                                     )} */}
//                                     <Form.Control required type="text" placeholder="Enter Title here" value={pan}
//                                         onChange={(e) => {
//                                             setPan(e.target.value);
//                                             //setDistNameError("");
//                                             //handleChangeDisstName()
//                                         }} />
//                                 </Form.Group>
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col md={6} className="mb-3">
//                                 <Form.Group id="firstName">
//                                     <Form.Label>GST Number</Form.Label>
//                                     {/* {officetype && (
//                                         <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
//                                     )} */}
//                                     <Form.Control required type="text" placeholder="Enter Title here" value={gst}
//                                         onChange={(e) => {
//                                             setGst(e.target.value);
//                                             //setStateNameError("");
//                                         }} />
//                                 </Form.Group>
//                             </Col>
//                             <Col md={6} className="mb-3">
//                                 <Form.Group id="firstName">
//                                     <Form.Label>Bank Account Number</Form.Label>
//                                     {/* {distNameError && (
//                                         <p style={{ color: "red", fontSize: "15px" }}>*{distNameError}</p>
//                                     )} */}
//                                     <Form.Control required type="text" placeholder="Enter Title here" value={bankAccNo}
//                                         onChange={(e) => {
//                                             setBankAccNo(e.target.value);
//                                             //setDistNameError("");
//                                             //handleChangeDisstName()
//                                         }} />
//                                 </Form.Group>
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col md={6} className="mb-3">
//                                 <Form.Group id="firstName">
//                                     <Form.Label>Bank Name</Form.Label>
//                                     {/* {officetype && (
//                                         <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
//                                     )} */}
//                                     <Form.Control required type="text" placeholder="Enter Title here" value={bankName}
//                                         onChange={(e) => {
//                                             setBankName(e.target.value);
//                                             //setStateNameError("");
//                                         }} />
//                                 </Form.Group>
//                             </Col>
//                             <Col md={6} className="mb-3">
//                                 <Form.Group id="firstName">
//                                     <Form.Label>Bank Address</Form.Label>
//                                     {/* {distNameError && (
//                                         <p style={{ color: "red", fontSize: "15px" }}>*{distNameError}</p>
//                                     )} */}
//                                     <Form.Control required type="text" placeholder="Enter Title here" value={bankAddress}
//                                         onChange={(e) => {
//                                             setBankAddress(e.target.value);
//                                             //setDistNameError("");
//                                             //handleChangeDisstName()
//                                         }} />
//                                 </Form.Group>
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col md={6} className="mb-3">
//                                 <Form.Group id="firstName">
//                                     <Form.Label>Bank IFSC</Form.Label>
//                                     {/* {officetype && (
//                                         <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
//                                     )} */}
//                                     <Form.Control required type="text" placeholder="Enter Title here" value={bankIFSC}
//                                         onChange={(e) => {
//                                             setBankIFSC(e.target.value);
//                                             //setStateNameError("");
//                                         }} />
//                                 </Form.Group>
//                             </Col>
//                             <Col md={6} className="mb-3" >
//                                 <Row >
//                                     <Form.Label> <br /> </Form.Label>
//                                     <Col md={1} className="mb-1" >   <input
//                                         class="form-check-input" type="checkbox"
//                                         checked={isActive}
//                                         onChange={(e) => {
//                                             setIsActive(e.target.checked);
//                                         }}
//                                         value={isActive}
//                                         id="defaultCheck1"
//                                     /></Col>
//                                     <Col md={5} className="mb-2" >
//                                         <Form.Label>Status</Form.Label>
//                                     </Col>
//                                 </Row>
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col md={6} className="mb-3">
//                                 <Form.Group id="firstName">
//                                     <Form.Label>Update Office Type Id</Form.Label>
//                                     {/* {officetype && (
//                                         <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
//                                     )} */}
//                                     <Form.Control required type="text" placeholder="Enter Title here" value={updateOfficeTypeId}
//                                         onChange={(e) => {
//                                             setUpdateOfficeTypeId(e.target.value);
//                                             //setStateNameError("");
//                                         }} />
//                                 </Form.Group>
//                             </Col>
//                             <Col md={6} className="mb-3">
//                                 <Form.Group id="firstName">
//                                     <Form.Label>Update Office Id</Form.Label>
//                                     {/* {distNameError && (
//                                         <p style={{ color: "red", fontSize: "15px" }}>*{distNameError}</p>
//                                     )} */}
//                                     <Form.Control required type="text" placeholder="Enter Title here" value={updateOfficeId}
//                                         onChange={(e) => {
//                                             setUpdateOfficeId(e.target.value);
//                                             //setDistNameError("");
//                                             //handleChangeDisstName()
//                                         }} />
//                                 </Form.Group>
//                             </Col>
//                         </Row>
//                         <div className="mt-3">
//                             <Button variant="primary" type="submit" onClick={handleCancel} >Cancel</Button>
//                             <Button variant="primary" type="submit" style={{ marginLeft: 10 }} onClick={handleSubmit}>Save All</Button>
//                         </div>
//                     </Form>
//                 </Card.Body>
//             </Card>
//         </>
//     );
// };
