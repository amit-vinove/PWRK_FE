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
import Select from "react-select";
import { Title } from "@material-ui/icons";
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
  const [designationId, setdesignationId] = useState(0);
  const [designationDropdownData, setDesignationDropdownData] = useState([]);
  const [designationError, setDesignationError] = useState("");
  const [mobileNo1, setmobileNo1] = useState(0);
  const [mobileNo1Error, setMobileNo1Error] = useState("");
  const [mobileNo2, setmobileNo2] = useState(0);
  const [mobileNo2Error, setMobileNo2Error] = useState("");
  const [emailId, setemailId] = useState("");
  const [resiAdd, setresiAdd] = useState("");
  const [resiAddError, setresiAddError] = useState("");
  const [stateId, setstateId] = useState(0);
  const [stateNameError, setStateNameError] = useState("")
  const [stateDropdownData, setStateDropdownData] = useState([]);
  const [disttId, setdisttId] = useState(0);
  const [disttIdError, setdisttIdError] = useState("");
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
  const [loginLockedDate, setloginLockedDate] = useState(new Date());
  const [lastLoginDateTime, setlastLoginDateTime] = useState(new Date());
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
  const query = new URLSearchParams(window.location.search);
  const id = query.get("id");

  const handleOfficeTypeChange = (selectedOption) => {
    setofficeTypeId(selectedOption.value);
    setOfficeTypeError("");
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


  const handleTitleChange = (selectedOption) => {
    settitleId(selectedOption.value);
    setTitleError("");
  };


  const getAllTitle = async () => {
    try {
      const result = await Axios.get(`${process.env.REACT_APP_API}Title/GetTitle`);
      const formattedData = result.data.map((title) => ({
        value: title.titleId,
        label: (
          <span style={{ color: title.isActive ? "green" : "red" }}>
            {title.titleName}
            {/* {" -- "}
                  {officeType.isActive ? "Active" : "Inactive"} */}
          </span>
        ),
      }));
      setTitleDropdownData(formattedData);
    } catch (error) {
      console.error(error);
    }
  };





  const handleDesignationChange = (selectedOption) => {
    setdesignationId(selectedOption.value);
    setDesignationError("");
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
      setDesignationDropdownData(formattedData);
    } catch (error) {
      console.error(error);
    }
  };



  const handleStateChange = (selectedOption) => {
    setstateId(selectedOption.value);
    setStateNameError("");
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
      setStateDropdownData(formattedData);
    } catch (error) {
      console.error(error);
    }
  };



  const handleDistrictChange = (selectedOption) => {
    setdisttId(selectedOption.value);
    setdisttIdError("");
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
      setDisttDropdownData(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllOfficeType();
    getAllTitle();
    getAllState();
    getAllDistrict();
    getAllDesignation();
    fetchIp();
  }, []);



  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API}UserProfile/Get/${id}`
      ).then((res) => {
        setUserId(res.data.userId);
        setempId(res.data.empId);
        setofficeTypeId(res.data.officeTypeId);
        settitleId(res.data.titleId);
        setuserName(res.data.userName);
        setdesignationId(res.data.designationId);
        setmobileNo1(res.data.mobileNo1);
        setmobileNo2(res.data.mobileNo2);
        setemailId(res.data.emailId);
        setresiAdd(res.data.resiAdd);
        setstateId(res.data.stateId);
        setdisttId(res.data.disttId);
        setpinCode(res.data.pinCode);
        setloginId(res.data.loginId);
        setisActive(res.data.isActive);
        setpassword(res.data.password);
        setinvalidLoginCount(res.data.invalidLoginCount);
        setupdateOfficeTypeId(res.data.updateOfficeTypeId);
        setupdateOfficeId(res.data.updateOfficeId);
        setloginLockedDate(res.data.loginLockedDate);
        setlastLoginDateTime(res.data.lastLoginDateTime);
        setupdateon(res.data.updateon);
        console.log(res, "res")
      }).catch(() => {

      })

  }, []);



  useEffect(() => {
    handleMobile2Change();
  }, [mobileNo2])
  const handleMobile2Change = () => {
    if (mobileNo2.length >= 11) {
      setMobileNo2Error("Mobile Number  must be of 10 letter");
    } else {
      setMobileNo2Error("");
    }
  }

  useEffect(() => {
    handleMobile1Change();
  }, [mobileNo1])
  const handleMobile1Change = () => {
    if (mobileNo1.length >= 11) {
      setMobileNo1Error("Mobile Number must be of 10 letter");
    } else {
      setMobileNo1Error("");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (titleId === 0 || titleId === null) {
      setTitleError("Title is Required");
    } else {
      setTitleError("");
    }
    if (officeTypeId === 0 || officeTypeId === null) {
      setOfficeTypeError("Office Type is Required");
    } else {
      setOfficeTypeError("");
    }
    if (empId === 0 || empId == null || empId === "") {
      setEmpIDError("Employee Id is Required");
    } else {
      setEmpIDError("");
    }

    if (userName === "") {
      setUserNameError("userName is Required");
    } else if (userName.length <= 3 && userName.length >= 100) {
      setUserNameError("User Name must be between 3 and 100 Characters");
    } else {
      setUserNameError("");
    }

    if (designationId === 0 || designationId === null) {
      setDesignationError("Designation is Required");
    } else {
      setDesignationError("");
    }
    if (stateId === 0 || stateId === null) {
      setStateNameError("State Name is Required");
    } else {
      setStateNameError("");
    }
    if (disttId === 0 || disttId === null) {
      setdisttIdError("District Name is Required");
    } else {
      setdisttIdError("");
    }

    if (mobileNo1 === 0 || mobileNo1 === null) {
      setMobileNo1Error("Mobile Number is Required");
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
        `${process.env.REACT_APP_API}UserProfile/UpdateUserProfile`,
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
                  <Form.Control required type="text" placeholder="Enter value here" value={empId}
                    onChange={(e) => {
                      setempId(e.target.value);
                      setEmpIDError("");
                    }} />
                </Form.Group>
              </Col>

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
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="officeTypeId">
                  <Form.Label>Title</Form.Label>
                  {titleError && (
                    <p style={{ color: "red", fontSize: "15px" }}>*{titleError}</p>
                  )}
                  <Select
                    value={titleDropdownData.find((option) => option.value === titleId)}
                    options={titleDropdownData}
                    onChange={handleTitleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>User Name</Form.Label>
                  {userNameError && (
                    <p style={{ color: "red", fontSize: "15px" }}>*{userNameError}</p>
                  )}
                  <Form.Control required type="text" placeholder="Enter value here" value={userName}
                    onChange={(e) => {
                      setuserName(e.target.value);
                      setUserNameError("");
                    }} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="officeTypeId">
                  <Form.Label>Designation Name</Form.Label>
                  {designationError && (
                    <p style={{ color: "red", fontSize: "15px" }}>*{designationError}</p>
                  )}
                  <Select
                    value={designationDropdownData.find((option) => option.value === designationId)}
                    options={designationDropdownData}
                    onChange={handleDesignationChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Mobile Number 1</Form.Label>
                  {mobileNo1Error && (
                    <p style={{ color: "red", fontSize: "15px" }}>*{mobileNo1Error}</p>
                  )}
                  <Form.Control required type="text" placeholder="Enter value here" value={mobileNo1}
                    disabled
                    onChange={(e) => {
                      setmobileNo1(e.target.value);
                      setMobileNo1Error("");
                      handleMobile1Change();
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
                  <Form.Control required type="text" placeholder="Enter value here" value={mobileNo2}
                    onChange={(e) => {
                      setmobileNo2(e.target.value);
                      setMobileNo2Error("");
                      handleMobile2Change();
                    }} />
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Email Id</Form.Label>
                  {/* {officeTypeError && (
                    <p style={{ color: "red", fontSize: "15px" }}>*{officeTypeError}</p>
                  )} */}
                  <Form.Control required type="text" placeholder="Enter value here" value={emailId}
                    disabled
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
                  <Form.Control required type="text" placeholder="Enter value here" value={resiAdd}
                    onChange={(e) => {
                      setresiAdd(e.target.value);
                      setresiAddError("");
                    }} />
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group id="officeTypeId">
                  <Form.Label>State Name</Form.Label>
                  {stateNameError && (
                    <p style={{ color: "red", fontSize: "15px" }}>*{stateNameError}</p>
                  )}
                  <Select
                    value={stateDropdownData.find((option) => option.value === stateId)}
                    options={stateDropdownData}
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
                    value={disttDropdownData.find((option) => option.value === disttId)}
                    options={disttDropdownData}
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
                  <Form.Control required type="text" placeholder="Enter value here" value={pinCode}
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
                  <Form.Control required type="text" placeholder="Enter value here" value={loginId}
                    disabled
                    onChange={(e) => {
                      setloginId(e.target.value);
                      //setEmpIDError("");
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
