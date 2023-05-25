import React from 'react'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import { UserTable } from './userTable';
export default () => {
    const history = useHistory();
    const [Search, setSearch] = useState("");
    const createUser = () => {
        history.push("/userDetail")
    }
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <h4>User Dashboard</h4>
                </div>
                {/* <div className="btn-toolbar mb-2 mb-md-0">
                    <ButtonGroup>
                        <Button variant="outline-primary" size="sm">Share</Button>
                        <Button variant="outline-primary" size="sm">Export</Button>
                    </ButtonGroup>
                </div> */}
            </div>
            <div className="table-settings mb-4">
                <Row className="justify-content-between align-items-center">
                    <Col>
                        <div className="btn-toolbar mb-2 mb-md-0">
                            <ButtonGroup>
                                <Button variant="outline-primary" size="sm" onClick={createUser}>Create User</Button>
                            </ButtonGroup>
                        </div>
                    </Col>
                    <Col xs={6} md={6} lg={3} xl={4}>
                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faSearch} />
                            </InputGroup.Text>
                            <Form.Control type="text" placeholder="Search by title name" onChange={(e) => setSearch(e.target.value)} />
                        </InputGroup>
                    </Col>
                    {/* <Col style={{ maxWidth: "10%", marginTop: 112, marginLeft: -1857 }}>
                        <Button variant="primary" type="submit" className="w-100">
                            Create Title
                        </Button>
                    </Col> */}
                    <Col xs={6} md={2} xl={1} className="ps-md-0 text-end">
                        <Dropdown as={ButtonGroup}>
                            <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
                                <span className="icon icon-sm icon-gray">
                                    <FontAwesomeIcon icon={faCog} />
                                </span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
                                <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
                                <Dropdown.Item className="d-flex fw-bold">
                                    10 <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
                                </Dropdown.Item>
                                <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                                <Dropdown.Item className="fw-bold">30</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
            </div>
            <UserTable searchText={Search} />
        </>
    )
}

