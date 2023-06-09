import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faEdit, faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Card, Table, Dropdown, ButtonGroup, Pagination } from "@themesberg/react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { useHistory } from "react-router-dom";

const API = `${process.env.REACT_APP_API}State/GetState`;

export const StateTable = ({ searchText }) => {
    const [stateData, setStateData] = useState([]);
    const [stateId, setStateId] = useState(0);
    const [totalData, setTotalData] = useState(0);
    const history = useHistory();
    const [tempStateData, setTempStateData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [showPreviousButton, setShowPreviousButton] = useState(false);
    const [showNextButton, setShowNextButton] = useState(true);

    useEffect(() => {
        getState();
    }, []);

    useEffect(() => {
        searchState(searchText);
    }, [searchText]);



    const getState = async () => {
        try {
            const response = await axios.get(API);
            setStateData(response.data);
            setTempStateData(response.data);
            setTotalData(response.data.length);
        } catch (error) {
            console.log(error);
        }
    };

    const searchState = (searchText) => {
        setStateData(
            tempStateData.filter((i) => {
                const isActive = i.isActive ? "active" : "inactive";
                const searchTextLower = searchText.toLowerCase();
                return (
                    i.stateName.toLowerCase().includes(searchTextLower) ||
                    i.country.toLowerCase().includes(searchTextLower) ||
                    (i.isActive && searchText.toLowerCase() === 'active') ||
                    (!i.isActive && searchText.toLowerCase() === 'inactive')
                );
            })
        );
    };
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

    const handleDelete = (id) => {
        Swal.fire({
            title: "Do You Want To Inactive?",
            showCancelButton: true,
            icon: "warning",
            confirmButtonText: "Yes, Inactive it!",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .post(`${process.env.REACT_APP_API}State/deleteState/${id}`)
                    .then((res) => {
                        Swal.fire({
                            icon: "success",
                            title: "Your work has been Inactive",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        getState();
                    })
                    .catch(() => {
                        Swal.fire("State not Inactive.");
                    });
            }
        });
    };
    const handleView = (id) => {
        history.push(`/viewState?id=${id}`);
    };

    const handleEdit = (id) => {
        history.push(`/editState?id=${id}`);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = stateData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(stateData.length / itemsPerPage);

    useEffect(() => {
        setShowPreviousButton(currentPage > 1);
        setShowNextButton(currentPage < totalPages);
    }, [currentPage, totalPages]);

    const TableRow = (props) => {
        const { srNo, stateId, country, stateName, isActive } = props;
        const statusVariant = isActive ? "success" : !isActive ? "danger" : "primary";

        return (
            <tr>
                <td>
                    <Card.Link className="fw-normal">{srNo}</Card.Link>
                </td>
                <td>
                    <span className="fw-normal">{country}</span>
                </td>
                <td>
                    <span className="fw-normal">{stateName}</span>
                </td>
                <td>
                    <span className={`fw-normal text-${statusVariant}`}>
                        {isActive ? "Active" : !isActive ? "Inactive" : "Unknown"}
                    </span>
                </td>
                <td>
                    <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle as={Card.Link} split variant="link" className="text-dark m-0 p-0">
                            <span className="icon icon-sm">
                                <FontAwesomeIcon icon={faEllipsisH} />
                            </span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleView(stateId)}>
                                <FontAwesomeIcon icon={faEye} className="me-2" /> View
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleEdit(stateId)}>
                                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                            </Dropdown.Item>

                            <Dropdown.Item onClick={() => handleDelete(stateId)}>
                                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Update Status
                            </Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
        );
    };

    return (
        <>
            <Card border="light" className="shadow-sm">
                <Card.Body className="pt-0">
                    <div className="table-responsive">
                        <Table hover className="user-table align-items-center">
                            <thead>
                                <tr>
                                    <th className="border-bottom">Sr. No.</th>
                                    <th className="border-bottom">Country</th>
                                    <th className="border-bottom">State Name</th>
                                    <th className="border-bottom">Status</th>
                                    <th className="border-bottom">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item, index) => (
                                    <TableRow
                                        key={item.stateId}
                                        srNo={index + 1}
                                        stateId={item.stateId}
                                        country={item.country}
                                        stateName={item.stateName}
                                        isActive={item.isActive}
                                    />
                                ))}
                            </tbody>
                        </Table>
                    </div>
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
