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
    const history = useHistory();
    const [tempStateData, setTempStateData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

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
        } catch (error) {
            console.log(error);
        }
    };

    const searchState = (searchText) => {
        setStateData(
            tempStateData.filter((i) =>
                i.stateName.toLowerCase().includes(searchText.toLowerCase())
            )
        );
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
                    .post(`${process.env.REACT_APP_API}State/deleteState/${id}`)
                    .then((res) => {
                        Swal.fire({
                            icon: "success",
                            title: "Your work has been Deleted",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        getState();
                    })
                    .catch(() => {
                        Swal.fire("State not deleted.");
                    });
            }
        });
    };

    const handleEdit = (id) => {
        history.push(`/editState?id=${id}`);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = stateData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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
                            <Dropdown.Item onClick={() => handleEdit(stateId)}>
                                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleDelete(stateId)}>
                                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Delete
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <FontAwesomeIcon icon={faEye} className="me-2" /> View
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

            <div className="d-flex justify-content-center">
                <Pagination>
                    <Pagination.Prev
                        disabled={currentPage === 1}
                        onClick={() => paginate(currentPage - 1)}
                    />
                    {stateData.length > itemsPerPage && (
                        <>
                            {Array.from({ length: Math.ceil(stateData.length / itemsPerPage) }).map((_, index) => (
                                <Pagination.Item
                                    key={index}
                                    active={index + 1 === currentPage}
                                    onClick={() => paginate(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                        </>
                    )}
                    <Pagination.Next
                        disabled={currentPage === Math.ceil(stateData.length / itemsPerPage)}
                        onClick={() => paginate(currentPage + 1)}
                    />
                </Pagination>
            </div>
        </>
    );
};
