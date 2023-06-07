import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faEllipsisH,
    faEye,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
    Card,
    Table,
    Dropdown,
    Button,
    ButtonGroup,
    Pagination,
} from "@themesberg/react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const API = `${process.env.REACT_APP_API}Role/GetRole`;

export const RoleTable = ({ searchText }) => {
    const [roleData, setRoleData] = useState([]);
    const [tempRoleData, setTempRoleData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const history = useHistory();
    const [totalData, setTotalData] = useState(0);
    const [showPreviousButton, setShowPreviousButton] = useState(false);
    const [showNextButton, setShowNextButton] = useState(true);
    const getRole = () => {
        axios.get(API).then((response) => {
            setRoleData(response.data);
            setTempRoleData(response.data);
            setTotalData(response.data.length);
        });
    };

    const searchState = (searchText) => {
        setRoleData(
            tempRoleData.filter((i) =>
                i.roleName.toLowerCase().includes(searchText.toLowerCase())
            )
        );
    };
    const handleEdit = (id) => {
        history.push(`/editRole?id=${id}`)
    }
    const handlePrev = () => {
        setCurrentPage((prevPage) => prevPage - 1);
        setShowPreviousButton(true);
        setShowNextButton(true);
    };

    const handleNext = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        setShowPreviousButton(true);
        setShowNextButton(nextPage !== totalPages);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = roleData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(roleData.length / itemsPerPage);

    useEffect(() => {
        setShowPreviousButton(currentPage > 1);
        setShowNextButton(currentPage < totalPages);
    }, [currentPage, totalPages]);


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
                    .post(`${process.env.REACT_APP_API}Role/DeleteRole/${id}`)
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
    }, [searchText, tempRoleData]);

    const TableRow = (props) => {
        const { id, roleName, isActive } = props;
        const statusVariant = isActive ? "success" : !isActive ? "danger" : "primary";

        return (
            <tr>

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
                            <Dropdown.Item onClick={() => {
                                handleEdit(id);
                            }}>
                                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                                className="text-danger"
                                onClick={() => {
                                    handleDelete(id);
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
        <>
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    <Table hover className="user-table align-items-center">
                        <thead>
                            <tr>
                                <th className="border-bottom">Role Name</th>
                                <th className="border-bottom">Status</th>
                                <th className="border-bottom">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems &&
                                currentItems.map((t) => (
                                    <TableRow
                                        key={`transaction-${t.id}`}
                                        {...t}
                                        id={t.id}
                                    />
                                ))}
                        </tbody>
                    </Table>

                </Card.Body>
            </Card>
            <div className="d-flex justify-content-between align-items-center">
                <div className="text-center mb-3">
                    <h6>Total Data: {totalData}</h6> {/* Display the total data count */}
                </div>
                <div>
                    Showing page {currentPage} of {totalPages}
                </div>
                <Pagination>
                    {showPreviousButton && (
                        <Pagination.Prev
                            disabled={currentPage === 1}
                            onClick={handlePrev}
                        >
                            Prev. Page
                        </Pagination.Prev>
                    )}
                    {showNextButton && (
                        <Pagination.Next
                            disabled={currentPage === totalPages}
                            onClick={handleNext}
                        >
                            Next Page
                        </Pagination.Next>
                    )}
                </Pagination>
            </div>

        </>
    );
};
