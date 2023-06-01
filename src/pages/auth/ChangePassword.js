import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
// import Captcha from "../Captcha/Captcha";
import validator from 'validator';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import BgImage from "../../assets/img/illustrations/signin.svg";
import { Link, useHistory } from "react-router-dom";
//import {  } from "react-router";
// import Routes from "../../routes";
import Routes from '../../routes.js';
const ChangePassword = () => {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // const [passwordError, setPasswordError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successClass, setSuccessClass] = useState("");
    const [validationError, setValidationError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // const validateEmail = (email) => {
    //   return email.match(
    //     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //   );
    // };
    let userID = localStorage.getItem("UserId");
    const history = useHistory();

    const validate = (value) => {
        if (
            validator.isStrongPassword(value, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })
        ) {
            setSuccessMessage("Is Strong Password");
            setErrorMessage("");
        } else {
            if (value === "") {
                setErrorMessage("");
                setSuccessMessage("");
            } else {
                setErrorMessage(
                    "Is Not Strong Password(Must contain min 8 letter,Upper letter,any Symbol,Number)"
                );
                setSuccessMessage("");

            }
        }
    };
    const comparePassword = (value) => {
        if (newPassword === value) {
            setValidationError("");
            return true;
        }
        setValidationError("New password and confirm password must be same")
        return false;

    }

    // handle button click of login form
    const handleSubmit = async (e) => {
        e.preventDefault();
        let payload = {
            userID: userID,
            passwordResetKey: oldPassword,
            password: newPassword,

            // loginId: loginId
        };
        if (!errorMessage) {
            if (comparePassword) {
                // console.log(oldPassword, "oldPassword");
                if (newPassword === confirmPassword) {
                    let result = await axios
                        .post(`${process.env.REACT_APP_API}Account/SetPassword`, payload)
                        .then((res) => {
                            let userId = res.data.userID;
                            let loginId = res.data.loginId;
                            let Password = res.data.Password;

                            localStorage.setItem("UserId", userId);
                            localStorage.setItem("LoginId", loginId);
                            localStorage.setItem("Password", Password);
                            Swal.fire({
                                icon: "success",
                                title: "Password successfull change",
                                showConfirmButton: "false",
                                timer: 1500
                            });
                            history.push(Routes.DashboardOverview.path)

                        }
                        )
                        .catch((err) => {
                            Swal.fire({
                                icon: "error",
                                confirmButtonColor: '#3085d6',
                                title: "Old Password doesn't match",
                                showConfirmButton: "ok",
                            });
                        })
                }
            }
            else {
                setValidationError("All fields are required")
            }
        }
    };

    return (
        <div>
            <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container>
                    <p className="text-center">
                        <Card.Link as={Link} to={Routes.DashboardOverview.path} className="text-gray-700">
                            <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
                        </Card.Link>
                    </p>
                    <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                <div className="text-center text-md-center mb-4 mt-md-0">
                                    <h3 className="mb-0">Change Password</h3>
                                </div>
                                <Form onSubmit={handleSubmit} className="mt-4">
                                    <Form.Group id="email" className="mb-4">
                                        <Form.Label>Old Password</Form.Label>

                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faEnvelope} />
                                            </InputGroup.Text>
                                            <Form.Control autoFocus required type="password" placeholder="old password" onChange={(e) => setOldPassword(e.target.value)} />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Group id="password" className="mb-4">
                                            <Form.Label className="mb-0"> New Password</Form.Label>
                                            {errorMessage && <p className="text-danger fs-6 m-0 p-0">{errorMessage}</p>}
                                            {successMessage && <p className="text-success fs-6 m-0 p-0">{successMessage}</p>}
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <FontAwesomeIcon icon={faUnlockAlt} />
                                                </InputGroup.Text>
                                                <Form.Control required type="password" placeholder="Password" onChange={(e) => { setNewPassword(e.target.value); validate(e.target.value) }} />
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Group id="password" className="mb-4">
                                            <Form.Label> Confirm Password</Form.Label>
                                            {validationError && <p className="text-danger fs-6 m-0 p-0">{validationError}</p>}

                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <FontAwesomeIcon icon={faUnlockAlt} />
                                                </InputGroup.Text>
                                                <Form.Control required type="password" placeholder="Password" onChange={(e) => { setConfirmPassword(e.target.value); comparePassword(e.target.value); }} />
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100">
                                        Change Password
                                    </Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default ChangePassword;





