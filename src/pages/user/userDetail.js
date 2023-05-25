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
  const [pageMode, setPageMode] = useState("create");
  const [userId, setUserId] = useState(0);
  const [empId, setempId] = useState(0);
  const [empIDError, setEmpIDError] = useState("");
  const [officeTypeId, setofficeTypeId] = useState(0);
  const [officeTypeError, setOfficeTypeError] = useState("");
  const [officeTypeDropdownData, setOfficeTypeDropdownData] = useState([]);
  const [titleId, settitleId] = useState(0);
  const [titleDropdownData, setTitleDropdownData] = useState([]);
  const [titleError, setTitleError] = useState("");
  const [userName, setuserName] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [designationId, setdesignationId] = useState("");
  const [designationDropdownData, setDesignationDropdownData] = useState([]);
  const [designationError, setDesignationError] = useState("");
  const [mobileNo1, setmobileNo1] = useState(0);
  const [mobileNo2, setmobileNo2] = useState(0);
  const [mobileNo2Error, setMobileNo2Error] = useState("");
  const [emailId, setemailId] = useState("");
  const [resiAdd, setresiAdd] = useState("");
  const [resiAddError, setresiAddError] = useState("");
  const [stateId, setstateId] = useState(0);
  const [stateDropdownData, setStateDropdownData] = useState([]);
  const [disttId, setdisttId] = useState(0);
  const [disttDropdownData, setDisttDropdownData] = useState([]);
  const [pinCode, setpinCode] = useState(0);
  const [pinCodeError, setPinCodeError] = useState("");
  const [loginId, setloginId] = useState("");
  const [password, setpassword] = useState("");
  const [invalidLoginCount, setinvalidLoginCount] = useState("");
  const [updateOfficeTypeId, setupdateOfficeTypeId] = useState("");
  const [updateOfficeId, setupdateOfficeId] = useState("");
  const [isActive, setisActive] = useState(true);
  const [ipAddress, setIpAddress] = useState("");
  const [updateby, setupdateby] = useState("");
  const [loginLockedDate, setloginLockedDate] = useState(null);
  const [lastLoginDateTime, setlastLoginDateTime] = useState(null);
  const [value, setValue] = useState("0");
  const jsonData = {
    updateby: "123",
  };
  const [updateon, setupdateon] = useState(new Date());
  const handleCancel = () => {
    history.push("/user")
  }
  const fetchIp = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    console.log(res.data.IPv4);
    setIpAddress(res.data.IPv4)
  }
  useEffect(() => {
    fetchIp();
  }, [])

  useEffect(() => {
    handleChange();
  }, [mobileNo2])
  const handleChange = () => {
    if (mobileNo2.length >= 9) {
      setMobileNo2Error("Mobile Number  must be of 10 letter");
    } else {
      setMobileNo2Error("");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (empId === "") {
      setEmpIDError("Employee Id is Required");
    } else {
      setEmpIDError("");
    }
    if (officeTypeId === 0 || officeTypeId == null) {
      setOfficeTypeError("Office Type Id is Required");
    } else {
      setOfficeTypeError("");
    }
    if (userName === "") {
      setUserNameError("userName is Required");
    } else if (userName.length <= 3 && userName.length >= 100) {
      setUserNameError("User Name must be between 3 and 100 Characters");
    } else {
      setUserNameError("");
    }
    if (titleId === "") {
      setTitleError("Title is Required");
    } else {
      setTitleError("");
    }
    if (designationId === "") {
      setDesignationError("Designation is Required");
    } else {
      setDesignationError("");
    }

    if (true) {
      let UserID = localStorage.getItem("UserId")
      const payload = {
        userId: userId,
        empId: empId,
        officeTypeId: officeTypeId,
        titleId: titleId,
        userName: userName,
        designationId: designationId,
        mobileNo1: mobileNo1,
        mobileNo2: mobileNo2,
        emailId: emailId,
        resiAdd: resiAdd,
        stateId: stateId,
        disttId: disttId,
        pinCode: pinCode,
        loginId: loginId,
        password: password,
        invalidLoginCount: invalidLoginCount,
        loginLockedDate: loginLockedDate,
        lastLoginDateTime: lastLoginDateTime,
        isActive: isActive,
        updateon: updateon,
        updateOfficeTypeId: updateOfficeTypeId,
        updateOfficeId: updateOfficeId,
        ipAddress: ipAddress,
        updateby: UserID,
      };
      Axios.post(
        `${process.env.REACT_APP_API}User/SetUser`,
        payload
      )
        .then((response) => {
          console.log(response.data);
          Swal.fire("Save", "User Saved Sucessfully", "success");
          history.push("/user")
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
          <h4>User Details</h4>
        </div>
      </div>
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">General information</h5>
          <Form>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Employee Id</Form.Label>
                  {empIDError && (
                    <p style={{ color: "red", fontSize: "15px" }}>*{empIDError}</p>
                  )}
                  <Form.Control required type="text" placeholder="Enter Title here" value={empId}
                    onChange={(e) => {
                      setempId(e.target.value);
                      setEmpIDError("");
                    }} />
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Office Type Id</Form.Label>
                  {officeTypeError && (
                    <p style={{ color: "red", fontSize: "15px" }}>*{officeTypeError}</p>
                  )}
                  <Form.Control required type="text" placeholder="Enter Title here" value={officeTypeId}
                    onChange={(e) => {
                      setofficeTypeId(e.target.value);
                      setOfficeTypeError("");
                    }} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Title Name</Form.Label>
                  {titleError && (
                    <p style={{ color: "red", fontSize: "15px" }}>*{titleError}</p>
                  )}
                  <Form.Control required type="text" placeholder="Enter Title here" value={titleId}
                    onChange={(e) => {
                      settitleId(e.target.value);
                      setTitleError("");
                    }} />
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>User Name</Form.Label>
                  {userNameError && (
                    <p style={{ color: "red", fontSize: "15px" }}>*{userNameError}</p>
                  )}
                  <Form.Control required type="text" placeholder="Enter Title here" value={userName}
                    onChange={(e) => {
                      setuserName(e.target.value);
                      setUserNameError("");
                    }} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Designation Name</Form.Label>
                  {designationError && (
                    <p style={{ color: "red", fontSize: "15px" }}>*{designationError}</p>
                  )}
                  <Form.Control required type="text" placeholder="Enter Title here" value={designationId}
                    onChange={(e) => {
                      setdesignationId(e.target.value);
                      setDesignationError("");
                    }} />
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Mobile Number 1</Form.Label>
                  {/* {mobi && (
                    <p style={{ color: "red", fontSize: "15px" }}>*{officeTypeError}</p>
                  )} */}
                  <Form.Control required type="text" placeholder="Enter Title here" value={mobileNo1}
                    onChange={(e) => {
                      setmobileNo1(e.target.value);
                      // setOfficeTypeError("");
                    }} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Mobile Number 2</Form.Label>
                  {mobileNo2Error && (
                    <p style={{ color: "red", fontSize: "15px" }}>*{mobileNo2Error}</p>
                  )}
                  <Form.Control required type="text" placeholder="Enter Title here" value={mobileNo2}
                    onChange={(e) => {
                      setmobileNo2(e.target.value);
                      setMobileNo2Error("");
                      handleChange();
                    }} />
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Email Id</Form.Label>
                  {/* {officeTypeError && (
                    <p style={{ color: "red", fontSize: "15px" }}>*{officeTypeError}</p>
                  )} */}
                  <Form.Control required type="text" placeholder="Enter Title here" value={emailId}
                    onChange={(e) => {
                      setemailId(e.target.value);
                      //setOfficeTypeError("");
                    }} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Residence Address</Form.Label>
                  {resiAddError && (
                    <p style={{ color: "red", fontSize: "15px" }}>*{resiAddError}</p>
                  )}
                  <Form.Control required type="text" placeholder="Enter Title here" value={resiAdd}
                    onChange={(e) => {
                      setresiAdd(e.target.value);
                      setresiAddError("");
                    }} />
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>State Name</Form.Label>
                  {/* {state && (
                    <p style={{ color: "red", fontSize: "15px" }}>*{officeTypeError}</p>
                  )} */}
                  <Form.Control required type="text" placeholder="Enter Title here" value={stateId}
                    onChange={(e) => {
                      setstateId(e.target.value);
                      //setOfficeTypeError("");
                    }} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>District name</Form.Label>
                  {/* {role && (
                    <p style={{ color: "red", fontSize: "15px" }}>*{empIDError}</p>
                  )} */}
                  <Form.Control required type="text" placeholder="Enter Title here" value={disttId}
                    onChange={(e) => {
                      setdisttId(e.target.value);
                      //setEmpIDError("");
                    }} />
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>PIN Code</Form.Label>
                  {pinCodeError && (
                    <p style={{ color: "red", fontSize: "15px" }}>*{pinCodeError}</p>
                  )}
                  <Form.Control required type="text" placeholder="Enter Title here" value={pinCode}
                    onChange={(e) => {
                      setpinCode(e.target.value);
                      setPinCodeError("");
                    }} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Login Id</Form.Label>
                  {/* {empIDError && (
                    <p style={{ color: "red", fontSize: "15px" }}>*{login}</p>
                  )} */}
                  <Form.Control required type="text" placeholder="Enter Title here" value={loginId}
                    onChange={(e) => {
                      setloginId(e.target.value);
                      //setEmpIDError("");
                    }} />
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Invalid Login Count</Form.Label>
                  {/* {officeTypeError && (
                    <p style={{ color: "red", fontSize: "15px" }}>*{officeTypeError}</p>
                  )} */}
                  <Form.Control required type="text" placeholder="Enter Title here" value={invalidLoginCount}
                    onChange={(e) => {
                      setinvalidLoginCount(e.target.value);
                      //setOfficeTypeError("");
                    }} />
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
                      setisActive(e.target.checked);
                    }}
                    value={isActive}
                    id="defaultCheck1"
                  /></Col>
                  <Col md={5} className="mb-2" >
                    <Form.Label>Status</Form.Label>
                  </Col>
                </Row>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Update Office Type Id</Form.Label>
                  {/* {officeTypeError && (
                    <p style={{ color: "red", fontSize: "15px" }}>*{officeTypeError}</p>
                  )} */}
                  <Form.Control required type="text" placeholder="Enter Title here" value={updateOfficeTypeId}
                    onChange={(e) => {
                      setupdateOfficeTypeId(e.target.value);
                      //setOfficeTypeError("");
                    }} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Update Office Id</Form.Label>
                  {/* {empIDError && (
                    <p style={{ color: "red", fontSize: "15px" }}>*{empIDError}</p>
                  )} */}
                  <Form.Control required type="text" placeholder="Enter Title here" value={updateOfficeId}
                    onChange={(e) => {
                      setupdateOfficeId(e.target.value);
                      // setEmpIDError("");
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
