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
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const API = `${process.env.REACT_APP_API}OfficeLevel/GetOfficeLevel`;

export const OfficeLevelTable = ({ searchText }) => {
    const [officeLevelData, setOfficeLevelData] = useState([]);
    const [tempOfficeLevelData, setTempOfficeLevelData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [showPreviousButton, setShowPreviousButton] = useState(false);
    const [showNextButton, setShowNextButton] = useState(true);

    const history = useHistory();

    async function getOfficeLevel() {
        await axios.get(API).then((response) => {
            setOfficeLevelData(response.data);
            setTempOfficeLevelData(response.data);
        });
    }

    async function searchState(searchText) {
        setOfficeLevelData(
            tempOfficeLevelData.filter((i) =>
                i.officeLevel.toLowerCase().includes(searchText.toLowerCase())
            )
        );
    }

    const handlePrev = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNext = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handleEdit = (id) => {
        history.push(`/editOfficeLevel?id=${id}`);
    };

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
                        `${process.env.REACT_APP_API}OfficeLevel/deleteOfficeLevel/${id}`
                    )
                    .then((res) => {
                        Swal.fire({
                            icon: "success",
                            title: "Your work has been Deleted",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        getOfficeLevel();
                    })
                    .catch(() => {
                        Swal.fire("Office Level not deleted.");
                    });
            }
        });
    };

    useEffect(() => {
        getOfficeLevel();
    }, []);

    useEffect(() => {
        searchState(searchText);
    }, [searchText]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = officeLevelData.slice(
        indexOfFirstItem,
        indexOfLastItem
    );
    const totalPages = Math.ceil(officeLevelData.length / itemsPerPage);

    const TableRow = ({ srNo, id, officeTypeId, officeLevelId, officeLevel }) => {
        return (
            <tr>
                <td>
                    <Card.Link className="fw-normal">{srNo}</Card.Link>
                </td>
                <td>
                    <span className="fw-normal">{officeTypeId}</span>
                </td>
                <td>
                    <span className="fw-normal">{officeLevelId}</span>
                </td>
                <td>
                    <span className="fw-normal">{officeLevel}</span>
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
                                <FontAwesomeIcon
                                    icon={faEllipsisH}
                                    className="icon-dark"
                                />
                            </span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleEdit(id)}>
                                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                                className="text-danger"
                                onClick={() => handleDelete(id)}
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
                                <th className="border-bottom">Sr No</th>
                                <th className="border-bottom">Office Type Id</th>
                                <th className="border-bottom">Office level Id</th>
                                <th className="border-bottom">Office Level</th>
                                <th className="border-bottom">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((t, index) => (
                                <TableRow
                                    key={index}
                                    srNo={index + 1}
                                    id={t.id}
                                    officeTypeId={t.officeTypeid}
                                    officeLevelId={t.officeLevelId}
                                    officeLevel={t.officeLevel}
                                />
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <div className="d-flex justify-content-center">
                <Pagination>
                    <Pagination.Prev
                        disabled={currentPage === 1}
                        onClick={handlePrev}
                    >
                        Prev. Page
                    </Pagination.Prev>
                    <Pagination.Next
                        disabled={currentPage === totalPages}
                        onClick={handleNext}
                    >
                        Next Page
                    </Pagination.Next>
                </Pagination>
            </div>
        </>
    );
};
