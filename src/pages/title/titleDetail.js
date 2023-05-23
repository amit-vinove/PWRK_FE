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
  const [titleId, setTitleId] = useState(0);
  const [titleName, setTitleName] = useState("");
  const [titleNameError, setTitleNameError] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [ipAddress, setipAddress] = useState("");
  const [ipAddressErorr, setipAddressError] = useState("");
  const [updateby, setupdateby] = useState(0);
  const [formValid, setFormValid] = useState(false);
  const jsonData = { updateby: "123" };
  const [updateon, setupdateon] = useState(new Date());
  const handleCancel = () => {
    history.push("/title")
  }
  const fetchIp = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    console.log(res.data.IPv4);
    setipAddress(res.data.IPv4)
  }
  useEffect(() => {
    fetchIp();
  }, [])
  useEffect(() => {
    handleChangeTitleName();
  }, [titleName])
  const handleChangeTitleName = () => {
    if (!titleName) return;
    if (titleName.length > 50) {
      setTitleNameError("Title Name must be less 50 words");
      setFormValid(false)
    } else {
      setTitleNameError("");
      setFormValid(true)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (titleName === "") {
      setTitleNameError("Title is Required");
    }
    else if (titleName.length > 50) {
      setTitleNameError("title Name must be less 50 words");
    }
    if (formValid) {
      const payload = {
        titleId: titleId,
        titleName: titleName,
        isActive: isActive,
        updateby: updateby,
        updateon: updateon,
        ipAddress: ipAddress,
      };
      console.log(titleId, "titleId");
      Axios.post(
        `${process.env.REACT_APP_API}Title/SetTitle`,
        payload
      )
        .then((response) => {
          console.log(response.data);
          Swal.fire("Save", "Title Saved Sucessfully", "success");
          history.push("/title")
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
          <h4>Title Details</h4>
        </div>
      </div>
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">General information</h5>
          <Form>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Title Name</Form.Label>
                  {titleNameError && (
                    <p style={{ color: "red", fontSize: "15px" }}>*{titleNameError}</p>
                  )}
                  <Form.Control required type="text" placeholder="Enter Title here" value={titleName}
                    onChange={(e) => {
                      setTitleName(e.target.value);
                      setTitleNameError("");
                      handleChangeTitleName()
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
