import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link, useLocation, useParams, useHistory } from 'react-router-dom';
import axios from "axios";
import { Alert } from "react-bootstrap";
import validator from "validator";
import { Routes } from "../../routes";
export default () => {
 
  const location = useLocation();
  const { userId, resetKey } = useParams();
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Password and Confirm Password should match!");
      return;
    }

    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("Password is not strong enough.");
      return;
    }

    try {
      const payload = {
        Password: password,
        UserID: Number.parseInt(userId),
        PasswordResetKey: resetKey,
      };

      const response = await axios.post(`${process.env.REACT_APP_API}Account/ResetPassword`, payload);

      if (typeof response.data === "string") {
        if (response.data === "Password updated successfully") {
          setSuccessMessage(response.data);
          setTimeout(() => {
            history.push("/");
          }, 2000);
        } else {
          setErrorMessage(response.data);
        }
      } else if (response.data && response.data.token) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        history.push("/");
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setErrorMessage("");
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  const passwordInputType = passwordShown ? "text" : "password";
  const confirmPasswordInputType = confirmPasswordShown ? "text" : "password";

  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  return (
    <main>
      <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center">
            <p className="text-center">
              <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700">
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to sign in
              </Card.Link>
            </p>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3 className="mb-4">Reset password</h3>
                <Form onSubmit={handlePassword}>
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Your Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type={passwordInputType}
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                      <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                        {passwordShown ? "Hide" : "Show"}
                      </Button>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="confirmPassword" className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type={confirmPasswordInputType}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                      />
                      <Button variant="outline-secondary" onClick={toggleConfirmPasswordVisibility}>
                        {confirmPasswordShown ? "Hide" : "Show"}
                      </Button>
                    </InputGroup>
                  </Form.Group>
                  {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                  {successMessage && <Alert variant="success">{successMessage}</Alert>}
                  <Button variant="primary" type="submit" className="w-100">
                    Reset password
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

































//old code-----------------------------------------------------------------------------------------------------------------------


// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
// import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
// import { Link } from 'react-router-dom';

// import { Routes } from "../../routes";


// export default () => {
  
//   return (
//     <main>
//       <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
//         <Container>
//           <Row className="justify-content-center">
//             <p className="text-center">
//               <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700">
//                 <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to sign in
//               </Card.Link>
//             </p>
//             <Col xs={12} className="d-flex align-items-center justify-content-center">
//               <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
//                 <h3 className="mb-4">Reset password</h3>
//                 <Form>
//                   <Form.Group id="email" className="mb-4">
//                     <Form.Label>Your Email</Form.Label>
//                     <InputGroup>
//                       <InputGroup.Text>
//                         <FontAwesomeIcon icon={faEnvelope} />
//                       </InputGroup.Text>
//                       <Form.Control autoFocus required type="email" placeholder="example@company.com" />
//                     </InputGroup>
//                   </Form.Group>
//                   <Form.Group id="password" className="mb-4">
//                     <Form.Label>Your Password</Form.Label>
//                     <InputGroup>
//                       <InputGroup.Text>
//                         <FontAwesomeIcon icon={faUnlockAlt} />
//                       </InputGroup.Text>
//                       <Form.Control required type="password" placeholder="Password" />
//                     </InputGroup>
//                   </Form.Group>
//                   <Form.Group id="confirmPassword" className="mb-4">
//                     <Form.Label>Confirm Password</Form.Label>
//                     <InputGroup>
//                       <InputGroup.Text>
//                         <FontAwesomeIcon icon={faUnlockAlt} />
//                       </InputGroup.Text>
//                       <Form.Control required type="password" placeholder="Confirm Password" />
//                     </InputGroup>
//                   </Form.Group>
//                   <Button variant="primary" type="submit" className="w-100">
//                     Reset password
//                   </Button>
//                 </Form>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </main>
//   );
// };
