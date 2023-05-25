import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";


const API = `${process.env.REACT_APP_API}DDOType/getDDOType`;
const itemsPerPage = 10;
const defaultPage = 1;
export const DDOTypeTable = ({ searchText }) => {
    const [ddoTypeData, setDDOTypeData] = useState([]);
    const [tempDDoTypeData, setTempDDoTypeData] = useState([]);
    const [currentPage, setCurrentPage] = useState(defaultPage);
    const [showPreviousButton, setShowPreviousButton] = useState(false);
    const [showNextButton, setShowNextButton] = useState(true);
    const history = useHistory();
    async function getDDOType() {
        await axios.get(API).then((response) => {
            setDDOTypeData(response.data);
            setTempDDoTypeData(response.data);
        });
    }
    async function searchDDOType(searchText) {
        setDDOTypeData(
            tempDDoTypeData.filter((i) =>
                i.districtName.toLowerCase().includes(searchText.toLowerCase())
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
                        `${process.env.REACT_APP_API}DDOType/deleteDDOType/${id}`
                    )
                    .then((res) => {
                        Swal.fire({
                            icon: "success",
                            title: "Your work has been Deleted",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        getDDOType();
                    })
                    .catch(() => {
                        Swal.fire("DDO type not deleted.");
                    });
                console.log(id, "DDO");
            }
        });
    };
    const handleEdit = (id) => {
        history.push(`/editDdoType?id=${id}`)
    }
    const handlePrev = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNext = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };
    useEffect(() => {
        getDDOType();
    }, []);
    useEffect(() => {
        searchDDOType(searchText);
        setCurrentPage(defaultPage);
    }, [searchText])

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = ddoTypeData.slice(
        indexOfFirstItem,
        indexOfLastItem
    );
    const totalPages = Math.ceil(ddoTypeData.length / itemsPerPage);

    useEffect(() => {
        setShowPreviousButton(currentPage > 1);
        setShowNextButton(currentPage < totalPages);
    }, [currentPage, totalPages]);

    const TableRow = (props) => {
        const { srNo, ddoTypeId, ddoType, isActive } = props;
        const statusVariant = isActive ? "success" : !isActive ? "danger" : "primary";
        return (
            <tr>
                <td>
                    <Card.Link className="fw-normal">
                        {srNo}
                    </Card.Link>
                </td>
                <td>
                    <span className="fw-normal">
                        {ddoType}
                    </span>
                </td>
                <td>
                    <span className={`fw-normal text-${statusVariant}`}>
                        {isActive ? "Active" : !isActive ? "Inactive" : "Unknown"}
                    </span>
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
                            <Dropdown.Item onClick={() => { handleEdit(ddoTypeId) }}>
                                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                            </Dropdown.Item>
                            <Dropdown.Item className="text-danger" onClick={() => { handleDelete(ddoTypeId) }}>
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
                                <th className="border-bottom">DDO Type</th>
                                <th className="border-bottom">Status</th>
                                <th className="border-bottom">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems && currentItems.map(t => <TableRow key={`transaction-${t.srNo}`} {...t} />)}
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