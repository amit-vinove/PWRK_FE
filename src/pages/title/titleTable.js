import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEllipsisH, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Card, Button, Table, Dropdown, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import axios from 'axios';

const API = `${process.env.REACT_APP_API}Title/GetTitle`;
const itemsPerPage = 10;
const defaultPage = 1;

export const TitleTable = ({ searchText }) => {
    const [titleData, setTitleData] = useState([]);
    const [currentPage, setCurrentPage] = useState(defaultPage);
    const [showPreviousButton, setShowPreviousButton] = useState(false);
    const [showNextButton, setShowNextButton] = useState(true);
    const history = useHistory();

    const getTitle = async () => {
        try {
            const response = await axios.get(API);
            setTitleData(response.data);
        } catch (error) {
            console.error("Error retrieving title data:", error);
        }
    };

    const searchTitle = (searchText) => {
        setTitleData(
            titleData.filter((item) =>
                item.titleName.toLowerCase().includes(searchText.toLowerCase())
            )
        );
    };
    const searchStatus = (searchText) => {
        setTitleData(
            titleData.filter((item) =>
                item.isActive.toString().toLowerCase().includes(searchText.toLowerCase())
            )
        );
    };

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Do You Want To Delete?",
                showCancelButton: true,
                icon: "warning",
                confirmButtonText: "Yes, delete it!",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
            });

            if (result.isConfirmed) {
                await axios.post(`${process.env.REACT_APP_API}Title/deleteTitle/${id}`);
                Swal.fire({
                    icon: "success",
                    title: "Your work has been Deleted",
                    showConfirmButton: false,
                    timer: 1500,
                });
                getTitle();
            }
        } catch (error) {
            console.error("Error deleting title:", error);
            Swal.fire("Title not deleted.");
        }
    };

    const handleView = (id) => {
        history.push(`/titleView?id=${id}`);
    };

    const handleEdit = (id) => {
        history.push(`/editTitle?id=${id}`);
    };

    const handlePrev = () => {
        setCurrentPage((prevPage) => prevPage - 1);
        setShowPreviousButton(true);
        setShowNextButton(true);
    };

    const handleNext = () => {
        setCurrentPage((prevPage) => prevPage + 1);
        setShowPreviousButton(true);
        if (currentPage + 1 === Math.ceil(titleData.length / itemsPerPage)) {
            setShowNextButton(false);
        }
    };

    useEffect(() => {
        getTitle();
    }, []);

    useEffect(() => {
        searchTitle(searchText);
        setCurrentPage(defaultPage);
        searchStatus(searchText);
        setShowPreviousButton(false);
        setShowNextButton(true);
    }, [searchText]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = titleData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(titleData.length / itemsPerPage);

    const TableRow = ({ srNo, titleId, titleName, isActive }) => {
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
                        {titleName}
                    </Card.Link>
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
                            <Dropdown.Item onClick={() => handleView(titleId)}>
                                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleEdit(titleId)}>
                                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                            </Dropdown.Item>
                            <Dropdown.Item className="text-danger" onClick={() => handleDelete(titleId)}>
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
                                <th className="border-bottom">sr No</th>
                                <th className="border-bottom">title Name</th>
                                <th className="border-bottom">Status</th>
                                <th className="border-bottom">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((t) => <TableRow key={`transaction-${t.srNo}`} {...t} />)}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <div className="d-flex justify-content-center">
                <Pagination>
                    {showPreviousButton && (
                        <Pagination.Prev disabled={currentPage === 1} onClick={handlePrev}>
                            Prev. Page
                        </Pagination.Prev>
                    )}
                    {showNextButton && (
                        <Pagination.Next disabled={currentPage === totalPages} onClick={handleNext}>
                            Next Page
                        </Pagination.Next>
                    )}
                </Pagination>
            </div>
        </>
    );
};
