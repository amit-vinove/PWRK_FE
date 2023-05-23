import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
    Col,
    Row,
    Nav,
    Card,
    Image,
    Button,
    Table,
    Dropdown,
    ProgressBar,
    Pagination,
    ButtonGroup,
} from "@themesberg/react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
const API = `${process.env.REACT_APP_API}Role/GetRole`;
export const RoleTable = ({ searchText }) => {
    const [roleData, setRoleData] = useState([]);
    const [roleId, setRoleId] = useState(0);
    console.log(roleData, "state Data");
    const [tempRoleData, setTempRoleData] = useState([]);
    const totalCount = roleData.length;
    async function getRole() {
        await axios.get(API).then((response) => {
            setRoleData(response.data);
            setTempRoleData(response.data);
        });
    }
    async function searchState(searchText) {
        setRoleData(
            tempRoleData.filter((i) =>
                i.roleName.toLowerCase().includes(searchText.toLowerCase())
            )
        );
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
                    .post(`${process.env.REACT_APP_API}Role/deleteRole/${id}`)
                    .then((res) => {
                        Swal.fire({
                            icon: "success",
                            title: "Your work has been Deleted",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        getRole();
                    })
                    .catch(() => {
                        Swal.fire("Role not deleted.");
                    });
            }
        });
    };
    useEffect(() => {
        getRole();
    }, []);
    useEffect(() => {
        searchState(searchText);
    }, [searchText]);
    const TableRow = (props) => {
        const { srNo, roleId, roleName, isActive } = props;
        const statusVariant = isActive
            ? "success"
            : !isActive
                ? "danger"
                : "primary";
        console.log(roleId);
        return (
            <tr>
                <td>
                    <Card.Link className="fw-normal">{srNo}</Card.Link>
                </td>
                <td>
                    <span className="fw-normal">{roleName}</span>
                </td>
                <td>
                    <span className={`fw-normal text-${statusVariant}`}>
                        {isActive ? "Active" : !isActive ? "Inactive" : "Unknown"}
                    </span>
                </td>
                <td>
                    <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle
                            as={Button}
                            split
                            variant="link"
                            className="text-dark m-0 p-0"
                        >
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
                            <Dropdown.Item
                                className="text-danger"
                                onClick={() => {
                                    handleDelete(roleId);
                                }}
                            >
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
                            <th className="border-bottom">Sr No</th>
                            <th className="border-bottom">Role Name</th>
                            <th className="border-bottom">Status</th>
                            <th className="border-bottom">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roleData &&
                            roleData.map((t) => (
                                <TableRow
                                    key={`transaction-${t.roleId}`}
                                    {...t}
                                    roleId={t.roleId}
                                />
                            ))}
                    </tbody>
                </Table>
                <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
                    <Nav>
                        <Pagination className="mb-2 mb-lg-0">
                            <Pagination.Prev>Previous</Pagination.Prev>
                            <Pagination.Item active>1</Pagination.Item>
                            <Pagination.Item>2</Pagination.Item>
                            <Pagination.Item>3</Pagination.Item>
                            <Pagination.Item>4</Pagination.Item>
                            <Pagination.Item>5</Pagination.Item>
                            <Pagination.Next>Next</Pagination.Next>
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
