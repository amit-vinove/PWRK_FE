
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCog, faEnvelopeOpen, faSearch, faSignOutAlt, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { Row, Col, Nav, Form, Image, Navbar, Dropdown, Container, ListGroup, InputGroup } from '@themesberg/react-bootstrap';
import { Routes } from "../routes";
import { Link, useHistory } from "react-router-dom";
import NOTIFICATIONS_DATA from "../data/notifications";
import Profile4 from "../assets/img/team/profile-picture-4.jpg";
import Swal from "sweetalert2";


export default (props) => {
  const history = useHistory();

  const [userName, setUserName] = useState("");
  useEffect(() => {
    const userName = localStorage.getItem("UserName");
    setUserName(userName);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: 'Do you want to end this seassion ? Please click on Yes !',
      showCancelButton: true,
      icon: "error",
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        Swal.fire({
          title: 'Logout Successfully',
          icon: "success",
          showConfirmButton: false,
          timer: 2100
        });
      }
      history.push(Routes.Signin.path);
    })
  }


  const handleProfile = () => {
    let userId = localStorage.getItem("UserId")
    history.push(Routes.UserDetail.path + `?id=${userId}`);
  }
  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
            <Form className="navbar-search">
              <Form.Group id="topbarSearch">
                <InputGroup className="input-group-merge search-bar">
                  <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                  <Form.Control type="text" placeholder="Search" />
                </InputGroup>
              </Form.Group>
            </Form>
          </div>
          <Nav className="align-items-center">

            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <Image src={Profile4} className="user-avatar md-avatar rounded-circle" />
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold">{userName}</span>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                <Dropdown.Item className="fw-bold" onClick={handleProfile}>
                  <FontAwesomeIcon icon={faUserCircle} className="me-2" /> My Profile
                </Dropdown.Item>
                {/* <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faCog} className="me-2" /> Settings
                </Dropdown.Item> */}
                <Dropdown.Item className="fw-bold" as={Link} onClick={() => {
                }} to={Routes.ChangePassword.path}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-2" /> Change Password
                </Dropdown.Item>
                {/* <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faUserShield} className="me-2" /> Support
                </Dropdown.Item> */}

                <Dropdown.Divider />

                <Dropdown.Item className="fw-bold" onClick={() => { handleLogout() }} >
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
