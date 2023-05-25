import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
const API = `${process.env.REACT_APP_API}UserProfile/GetUserProfile`;
export const UserTable = ({ searchText }) => {
    const [userData, setUserData] = useState([]);
    const [tempUserData, setTempUserData] = useState([]);
    const totalCount = userData.length;
    async function getUser() {
        await axios.get(API).then((response) => {
            setUserData(response.data);
            setTempUserData(response.data);
        });
    }
    async function searchUser(searchText) {
        setUserData(
            tempUserData.filter((i) =>
                i.userName.toLowerCase().includes(searchText.toLowerCase())
            ))
    }
    const handleDelete = (id) => {
        Swal.fire({
            title: "Do You Want To Delete?",
            showCancelButton: true,
            icon: "warning",
            confirmButtonText: "Yes, delete it!",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post(
                        `${process.env.REACT_APP_API}UserProfile/deleteUserProfile/${id}`
                    )
                    .then((res) => {
                        Swal.fire({
                            icon: "success",
                            title: "Your work has been Deleted",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        getUser();
                    })
                    .catch(() => {
                        Swal.fire("User not deleted.");
                    });
                console.log(id, "UserId");
            }
        });
    };
    useEffect(() => {
        getUser();
    }, []);
    useEffect(() => {
        searchUser(searchText);
    }, [searchText])
    const TableRow = (props) => {
        const { srNo, userId, employeeId, officeTypeId, titleName, userName, designationName, mobileNo1, mobileNo2, emailId,
            resiAdd, stateId, roleId, disttId, pinCode, loginId, password, invalidLoginCount, loginLockedDate,
            lastLoginDateTime, isActive, updateby, updateOfficeTypeId, updateOfficeId, updateon } = props;
        const statusVariant = isActive ? "success" : !isActive ? "danger" : "primary";
        return (
            <tr>
                <td>
                    <Card.Link className="fw-normal">
                        {srNo}
                    </Card.Link>
                </td>
                <td>
                    <Card.Link className="fw-normal">
                        {employeeId}
                    </Card.Link>
                </td>
                <td>
                    <Card.Link className="fw-normal">
                        {officeTypeId}
                    </Card.Link>
                </td>
                <td>
                    <Card.Link className="fw-normal">
                        {titleName}
                    </Card.Link>
                </td>
                <td>
                    <Card.Link className="fw-normal">
                        {userName}
                    </Card.Link>
                </td>
                <td>
                    <Card.Link className="fw-normal">
                        {designationName}
                    </Card.Link>
                </td>
                <td>
                    <Card.Link className="fw-normal">
                        {mobileNo1}
                    </Card.Link>
                </td>
                <td>
                    <Card.Link className="fw-normal">
                        {mobileNo2}
                    </Card.Link>
                </td>
                <td>
                    <Card.Link className="fw-normal">
                        {emailId}
                    </Card.Link>
                </td>
                <td>
                    <Card.Link className="fw-normal">
                        {resiAdd}
                    </Card.Link>
                </td>
                <td>
                    <Card.Link className="fw-normal">
                        {stateId}
                    </Card.Link>
                </td>
                <td>
                    <Card.Link className="fw-normal">
                        {roleId}
                    </Card.Link>
                </td>
                <td>
                    <Card.Link className="fw-normal">
                        {disttId}
                    </Card.Link>
                </td>
                <td>
                    <Card.Link className="fw-normal">
                        {pinCode}
                    </Card.Link>
                </td>
                <td>
                    <Card.Link className="fw-normal">
                        {loginId}
                    </Card.Link>
                </td>
                <td>
                    <Card.Link className="fw-normal">
                        {invalidLoginCount}
                    </Card.Link>
                </td>
                <td>
                    <Card.Link className="fw-normal">
                        {loginLockedDate}
                    </Card.Link>
                </td>
                <td>
                    <Card.Link className="fw-normal">
                        {lastLoginDateTime}
                    </Card.Link>
                </td>
                <td>
                    <span className={`fw-normal text-${statusVariant}`}>
                        {isActive ? "Active" : !isActive ? "Inactive" : "Unknown"}
                    </span>
                </td>
                <td>
                    <Card.Link className="fw-normal">
                        {updateOfficeTypeId}
                    </Card.Link>
                </td>
                <td>
                    <Card.Link className="fw-normal">
                        {updateOfficeId}
                    </Card.Link>
                </td>

                <td>
                    <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                            <span className="icon icon-sm">
                                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                            </span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                            </Dropdown.Item>
                            <Dropdown.Item className="text-danger" onClick={() => { handleDelete(userId) }}>
                                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
        );
    };
    return (
        <Card border="light" className="table-wrapper table-responsive shadow-sm">
            <Card.Body className="pt-0">
                <Table hover className="user-table align-items-center">
                    <thead>
                        <tr>
                            <th className="border-bottom">sr No</th>
                            <th className="border-bottom">employee Id</th>
                            <th className="border-bottom">office Type Id</th>
                            <th className="border-bottom">title Name</th>
                            <th className="border-bottom">user Name</th>
                            <th className="border-bottom">designation Name</th>
                            <th className="border-bottom">mobile No 1</th>
                            <th className="border-bottom">mobile No 2</th>
                            <th className="border-bottom">email Id</th>
                            <th className="border-bottom">resi Add</th>
                            <th className="border-bottom">state Id</th>
                            <th className="border-bottom">role Id</th>
                            <th className="border-bottom">distt Id</th>
                            <th className="border-bottom">pin Code</th>
                            <th className="border-bottom">login Id</th>
                            <th className="border-bottom">invalidLogin Count</th>
                            <th className="border-bottom">login Locked Date</th>
                            <th className="border-bottom">last Login Date Time</th>
                            <th className="border-bottom">Status</th>
                            <th className="border-bottom">update Office Type Id</th>
                            <th className="border-bottom">update Office Id</th>
                            <th className="border-bottom">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData && userData.map(t => <TableRow key={`transaction-${t.srNo}`} {...t} />)}
                    </tbody>
                </Table>
                <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
                    <Nav>
                        <Pagination className="mb-2 mb-lg-0">
                            <Pagination.Prev>
                                Previous
                            </Pagination.Prev>
                            <Pagination.Item active>1</Pagination.Item>
                            <Pagination.Item>2</Pagination.Item>
                            <Pagination.Item>3</Pagination.Item>
                            <Pagination.Item>4</Pagination.Item>
                            <Pagination.Item>5</Pagination.Item>
                            <Pagination.Next>
                                Next
                            </Pagination.Next>
                        </Pagination>
                    </Nav>
                    <small className="fw-bold">
                        Showing <b>{totalCount}</b> out of <b>{totalCount}</b> entries
                    </small>
                </Card.Footer>
            </Card.Body>
        </Card>
    );
};