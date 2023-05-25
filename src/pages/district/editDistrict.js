import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import MenuItem from '@material-ui/core/MenuItem';
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
export default () => {
    const history = useHistory();
    const [disttId, setDisstId] = useState(0);
    const [stateId, setStateId] = useState(0);
    const [stateDropdownData, setStateDropdownData] = useState([]);
    const [stateNameError, setStateNameError] = useState("");
    const [distName, setDistName] = useState("");
    const [distNameError, setDistNameError] = useState("");
    const [distShortName, setDistShortName] = useState("");
    const [distShortNameError, setDistShortNameError] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [ipAddress, setipAddress] = useState(0);
    const [ipAddressErorr, setipAddressError] = useState("");
    const [updateby, setupdateby] = useState(0);
    const [formValid, setFormValid] = useState(false);
    const jsonData = { updateby: "123" };
    const [updateon, setupdateon] = useState(new Date());
    const handleCancel = () => {
        history.push("/district")
    }
    const fetchIp = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        console.log(res.data.IPv4);
        setipAddress(res.data.IPv4)
    }
    const handleStateChange = (event) => {
        setStateId(event.target.value);

        //setUserNameError("");
    };
    const query = new URLSearchParams(window.location.search);
    const id = query.get("id");

    useEffect(() => {

        axios
            .get(
                `${process.env.REACT_APP_API}District/GetDistrict/${id}`
            )
            .then((res) => {
                setDisstId(res.data.disttId);
                setStateId(res.data.stateId);
                setDistName(res.data.distName);
                setDistShortName(res.data.distShortName);
                setIsActive(res.data.isActive);
            })
            .catch((err) => {
                console.log(err);
            })

    }, [])




    const getAllState = async () => {
        let result = await Axios.get(`${process.env.REACT_APP_API}State/GetState`);
        setStateDropdownData(result.data);
    };
    console.log(stateDropdownData, "statedropdown");
    useEffect(() => {
        getAllState();
        fetchIp();
    }, []);
    useEffect(() => {
        handleChangeDistName();
    }, [distName])
    const handleChangeDistName = () => {
        if (!distName) return;
        if (distName.length <= 2 || distName.length >= 150) {
            setDistNameError("District Name must be between 3 to 150 words");
            setFormValid(false)
        } else {
            setDistNameError("");
            setFormValid(true)
        }
    }
    useEffect(() => {
        handleChangeDistShortName();
    }, [distShortName])
    const handleChangeDistShortName = () => {
        if (!distShortName) return;
        if (distShortName.length <= 2 || distShortName.length >= 50) {
            setDistShortNameError("District Name must be between 3 to 50 words");
            setFormValid(false)
        } else {
            setDistShortNameError("");
            setFormValid(true)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (distName === "") {
            setDistNameError("District name is Required");
        }
        else if (distName.length <= 2 || distName.length >= 150) {
            setDistNameError("District Name must be between 3 to 150 words");
        }
        else {
            setDistNameError("");
        }
        if (distShortName === "") {
            setDistShortNameError("District short name is Required");
        } else if (distShortName.length <= 2 || distShortName.length >= 50) {
            setDistShortNameError("District Name must be between 3 to 50 words");
        }
        else {
            setDistShortNameError("");
        }
        if (ipAddress === "") {
            setipAddressError("ipAddress is Required");
        }
        else {
            setipAddressError("");
        }
        if (formValid) {
            const payload = {
                disttId: disttId,
                stateId: stateId,
                distName: distName,
                distShortName: distShortName,
                isActive: isActive,
                updateby: updateby,
                updateon: updateon,
                ipAddress: ipAddress
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
                            `http://122.176.101.76:8085/api/District/UpdateDistrict`,
                            payload
                        )
                            .then((res) => {
                                Swal.fire({
                                    icon: "success",
                                    title: "Your work has been successfully update",
                                    showConfirmButton: false,
                                    timer: 1500,
                                });
                                history.push("/district")
                            })
                            .catch(() => {
                                Swal.fire("district not Update.");
                            });
                    }
                });
        }
    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <h4>District Details</h4>
                </div>
            </div>
            <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Body>
                    <h5 className="mb-4">General information</h5>
                    <Form>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>State Name</Form.Label>
                                    {stateNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
                                    )}
                                    <Form.Select
                                        onChange={handleStateChange}
                                        value={stateId}
                                        disablePortal
                                        id="combo-box-demo"
                                        sx={{ width: 600 }}
                                        defaultValue="" // Set the default value to an empty string
                                    >
                                        <option value="" disabled>
                                            Choose state name....
                                        </option>
                                        {stateDropdownData.map((s) => (
                                            <option key={s.stateId} value={s.stateId}>
                                                {s.stateName}
                                            </option>
                                        ))}
                                        {/* Add other menu items here */}
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>District Name</Form.Label>
                                    {distNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{distNameError}</p>
                                    )}
                                    <Form.Control required type="text" placeholder="Enter district name here" value={distName}
                                        onChange={(e) => {
                                            setDistName(e.target.value);
                                            setDistNameError("");
                                            handleChangeDistName()
                                        }} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group id="firstName">
                                    <Form.Label>District Short Name</Form.Label>
                                    {distShortNameError && (
                                        <p style={{ color: "red", fontSize: "15px" }}>*{distShortNameError}</p>
                                    )}
                                    <Form.Control required type="text" placeholder="Enter district short name here" value={distShortName}
                                        onChange={(e) => {
                                            setDistShortName(e.target.value);
                                            setDistShortNameError("");
                                            handleChangeDistShortName()
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