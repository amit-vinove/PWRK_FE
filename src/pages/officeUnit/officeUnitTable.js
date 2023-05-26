import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
    Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar,
    Pagination, ButtonGroup
} from "@themesberg/react-bootstrap";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
const API = `${process.env.REACT_APP_API}OfficeUnit/GetOfficeUnit`;
export const OfficeUnitTable = ({ searchText }) => {
    const [officeUnitData, setOfficeUnitData] = useState([]);
    const [officeUnitId, setOfficeUnitId] = useState(0);
    const [tempOfficeUnitData, setTempOfficeUnitData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const history = useHistory();
    const [showPreviousButton, setShowPreviousButton] = useState(false);
    const [showNextButton, setShowNextButton] = useState(true);
    async function getOfficeUnit() {
        await axios.get(API).then((response) => {
            setOfficeUnitData(response.data);
            setTempOfficeUnitData(response.data);
        });
    }
    async function searchState(searchText) {
        setOfficeUnitData(
            tempOfficeUnitData.filter((i) =>
                i.unitName.toLowerCase().includes(searchText.toLowerCase())
            )
        );
    }
    const handlePrev = () => {
        setCurrentPage((prevPage) => prevPage - 1);
        setShowPreviousButton(true);
        setShowNextButton(true);

    };

    const handleNext = () => {
        setCurrentPage((prevPage) => prevPage + 1);
        setShowPreviousButton(true);
        if (currentPage + 1 === Math.ceil(officeUnitData.length / itemsPerPage)) {
            setShowNextButton(false);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = officeUnitData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(officeUnitData.length / itemsPerPage);

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
                    .post(`${process.env.REACT_APP_API}OfficeUnit/deleteOfficeUnit/${id}`)
                    .then((res) => {
                        Swal.fire({
                            icon: "success",
                            title: "Your work has been Deleted",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        getOfficeUnit();
                    })
                    .catch(() => {
                        Swal.fire("Office Unit not deleted.");
                    });
            }
        });
    };
    useEffect(() => {
        getOfficeUnit();
    }, []);
    useEffect(() => {
        searchState(searchText);
    }, [searchText]);
    const TableRow = (props) => {
        const { srNo, officeUnitId, designationId, unitName, unitAddress, emailId, contactNo, longitude, latitude, comment, seqId,
            officeId } = props;
        // const statusVariant = isActive
        //     ? "success"
        //     : !isActive
        //         ? "danger"
        //         : "primary";
        console.log(officeUnitId);
        return (
            <tr>
                <td>
                    <Card.Link className="fw-normal">{srNo}</Card.Link>
                </td>
                <td>
                    <span className="fw-normal">{officeUnitId}</span>
                </td>
                <td>
                    <span className="fw-normal">{officeId}</span>
                </td>
                <td>
                    <span className="fw-normal">{designationId}</span>
                </td>
                <td>
                    <span className="fw-normal">{unitName}</span>
                </td>
                <td>
                    <span className="fw-normal">{unitAddress}</span>
                </td>
                <td>
                    <span className="fw-normal">{emailId}</span>
                </td>
                <td>
                    <span className="fw-normal">{contactNo}</span>
                </td>
                <td>
                    <span className="fw-normal">{longitude}</span>
                </td>
                <td>
                    <span className="fw-normal">{latitude}</span>
                </td>
                <td>
                    <span className="fw-normal">{comment}</span>
                </td>
                <td>
                    <span className="fw-normal">{seqId}</span>
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
                                    setOfficeUnitId(props.officeUnitId);
                                    handleDelete(officeUnitId);
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
                                <th className="border-bottom">Sr No</th>
                                <th className="border-bottom">Office Unit Id</th>
                                <th className="border-bottom">Office</th>
                                <th className="border-bottom">Desigantion</th>
                                <th className="border-bottom">Unit Name</th>
                                <th className="border-bottom">Unit Address</th>
                                <th className="border-bottom">Email Id</th>
                                <th className="border-bottom">Contact Number</th>
                                <th className="border-bottom">Longitude</th>
                                <th className="border-bottom">Latitude</th>
                                <th className="border-bottom">Comment</th>
                                <th className="border-bottom">Seq Id</th>
                                <th className="border-bottom">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems &&
                                currentItems.map((t) => (
                                    <TableRow
                                        key={`transaction-${t.officeUnitId}`}
                                        {...t}
                                        officeUnitId={t.officeUnitId}
                                    />
                                ))}
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
