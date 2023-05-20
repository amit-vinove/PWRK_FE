import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Captcha from "../auth/Captcha";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import BgImage from "../../assets/img/illustrations/signin.svg";
import { Link, useHistory } from "react-router-dom";
import Routes from '../../routes.js';
import { Facebook } from "@material-ui/icons";
const Login = (props) => {
  const [captcha, setCaptcha] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loginId, setLoginId] = useState("");
  // const validateEmail = (email) => {
  //   return email.match(
  //     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //   );
  // };
  const [passwordShown, setPasswordShown] = useState(true);
  const [loading, setLoading] = useState(false);
  let captchaVerified;
  const history = useHistory();
  useEffect(() => {
    const loginToken = localStorage.getItem("token");
    if (loginToken) {
      history.push("/dashboard")
    }
  }, [])
  // handle button click of login form
  const handleLogin = async (e) => {
    e.preventDefault();
    let payload = {
      loginId: loginId,
      password: password,
    };
    if (password !== "" && loginId !== "") {
      let result = await axios
        .post(`http://122.176.101.76:8085/api/Account/SignIn`, payload)
        .then((res) => {
          //console.log(res, "res");
          if (res.data.message != null) {
            Swal.fire(
              {
                text: 'LoginId / Password is incorrect.',
                icon: 'error',
              }
            ); console.log(res.data.message, "message")
          }
          if (res.data && res.data.token) {
            const { token, RoleId, loginId, userName, resiAdd, address } = res.data;
            let userId = res.data.userID;
            localStorage.setItem("token", token.accessToken);
            localStorage.setItem("UserId", userId);
            localStorage.setItem("UserName", userName);
            localStorage.setItem("RoleId", RoleId);
            localStorage.setItem("ResiAdd", resiAdd);
            localStorage.setItem("Address", address);
            localStorage.setItem("LoginId", loginId);
            history.push(Routes.DashboardOverview.path);
          }
        })
        .catch((err) => {
          setError(err.message);
        });
    }
    else {
      if (userName === "") {
        setError("Please Enter LoginId");
        Swal.fire({
          icon: 'error',
          text: 'Please Eneter LoginId',
        }
        );
      }
      else if (password === "") {
        setError("Please Enter your Password");
        Swal.fire({
          icon: 'error',
          text: 'Please enter your Password',
        });
      }
      else if (!captchaVerified) {
        setError("Please Verify Captcha");
      }
      else {
        Swal.fire({
          text: "Please Enter LoginId and Password",
          icon: 'error',
        }
        );
        setError("Please Enter LoginId and Password");
      }
    }
  };
  const getCapchaVerified = (isVerified) => {
    console.log(isVerified, "verified function");
    captchaVerified = isVerified;
  };
  // const togglePassword = () => {
  //   setPasswordShown(!passwordShown);
  // };
  return (
    <div>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link as={Link} to={Routes.DASHBOARD} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
            </Card.Link>
          </p>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
                </div>
                <Form onSubmit={handleLogin} className="mt-4">
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Login Id</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="LoginId" onChange={(e) => setLoginId(e.target.value)} />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control required type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                      </InputGroup>
                    </Form.Group>
                    <Form.Group>
                      <label>Captcha</label>
                      <div className="form-group ">
                        <Captcha
                          userCaptcha={captcha}
                          setUserCaptcha={setCaptcha}
                          getCapchaVerified={getCapchaVerified}
                        />
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <Form.Check type="checkbox">
                          <FormCheck.Input id="defaultCheck5" className="me-2" />
                          <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                        </Form.Check>
                        <Card.Link onClick={() => history.push("/auth/forgot-password")} className="small text-end">Lost password?</Card.Link>
                      </div>
                    </Form.Group>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Sign in
                  </Button>
                </Form>
                {/* <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or login with</span>
                </div> */}
                <div className="d-flex justify-content-center my-4">
                  <a href="https://www.facebook.com/">
                    <Button variant="outline-light" className="btn-icon-only btn-pill text-facebook me-2" color="inherit">
                      <FontAwesomeIcon icon={faFacebookF} />
                    </Button></a>
                  <a href="https://twitter.com/">
                    <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter me-2">
                      <FontAwesomeIcon icon={faTwitter} />
                    </Button></a>
                  <a href="https://github.com/">
                    <Button variant="outline-light" className="btn-icon-only btn-pil text-dark">
                      <FontAwesomeIcon icon={faGithub} />
                    </Button></a>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?
                    <Card.Link as={Link} to={Routes.Signup.path} className="fw-bold">
                      {` Create account `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};
export default Login;





