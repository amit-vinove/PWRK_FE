import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useHistory } from "react-router-dom";
const API = `${process.env.REACT_APP_API}Office/GetOffice`;
export const OfficeTable = ({ searchText }) => {
    const [officeData, setOfficeData] = useState([]);
    const [tempOfficeData, setTempOfficeData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const history = useHistory();
    const [totalData, setTotalData] = useState(0);
    const [showPreviousButton, setShowPreviousButton] = useState(false);
    const [showNextButton, setShowNextButton] = useState(true);
    async function getOffice() {
        await axios.get(API).then((response) => {
            setOfficeData(response.data);
            setTempOfficeData(response.data);
            setTotalData(response.data.length);

        });
    }
    const handleEdit = (id) => {
        history.push(`editOffice?id=${id}`);
    }
    const handleView = (id) => {
        history.push(`viewOffice?id=${id}`);
    }

    async function searchOffice(searchText) {
        setOfficeData(
            tempOfficeData.filter((i) =>
                i.officeName.toLowerCase().includes(searchText.toLowerCase()) ||
                i.officeNameHindi.toLowerCase().includes(searchText.toLowerCase()) ||
                i.address.toLowerCase().includes(searchText.toLowerCase()) ||
                // i.officeName.toLowerCase().includes(searchText.toLowerCase()) ||
                // i.officeName.toLowerCase().includes(searchText.toLowerCase()) ||
                // i.officeName.toLowerCase().includes(searchText.toLowerCase()) ||
                // i.officeName.toLowerCase().includes(searchText.toLowerCase()) ||
                // i.officeName.toLowerCase().includes(searchText.toLowerCase()) ||
                (i.isActive && searchText.toLowerCase() === 'active') ||
                (!i.isActive && searchText.toLowerCase() === 'inactive')
                //     (i.isVisible && searchText.toLowerCase() === 'active') ||
                // (!i.isVisible && searchText.toLowerCase() === 'inactive')
            ))
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
    const currentItems = officeData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(officeData.length / itemsPerPage);

    useEffect(() => {
        setShowPreviousButton(currentPage > 1);
        setShowNextButton(currentPage < totalPages);
    }, [currentPage, totalPages]);

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
                    .post(
                        `${process.env.REACT_APP_API}Office/deleteOffice/${id}`
                    )
                    .then((res) => {
                        Swal.fire({
                            icon: "success",
                            title: "Your work has been Inactive",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        getOffice();
                    })
                    .catch(() => {
                        Swal.fire("office not Inactive.");
                    });
            }
        });
    };
    useEffect(() => {
        getOffice();
    }, []);
    useEffect(() => {
        searchOffice(searchText);
    }, [searchText])
    const TableRow = (props) => {
        const { srNo, officeId, officeTypeId, officeName, officeNameHindi, officeCode, address, stateId, disttId, pinCode, stdCode,
            contactNo, emailId, longitude, latitude, parentId1, parentId1WEF, parentId2, parentId2WEF, parentId3, parentId3WEF, parentId4, parentId4WEF,
            designationId, officeLevelId, rtiDesigId, rtiJuris, jurisdiction, comment, seqId, isVisible, updateOfficeTypeId,
            updateOfficeId, isActive } = props;
        const statusVariant = isActive ? "success" : !isActive ? "danger" : "primary";
        const statusVariant2 = isVisible ? "success" : !isVisible ? "danger" : "primary";
        return (
            <tr>
                <td>
                    <Card.Link className="fw-normal">
                        {srNo}
                    </Card.Link>
                </td>
                <td>
                    <span className="fw-normal">
                        {officeId}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {officeTypeId}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {officeName}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {officeNameHindi}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {officeCode}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {address}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {stateId}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {disttId}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {pinCode}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {stdCode}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {contactNo}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {emailId}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {longitude}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {latitude}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {parentId1}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {parentId1WEF}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {parentId2}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {parentId2WEF}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {parentId3}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {parentId3WEF}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {parentId4}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {parentId4WEF}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {designationId}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {officeLevelId}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {rtiDesigId}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {rtiJuris}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {jurisdiction}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {comment}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {seqId}
                    </span>
                </td>
                <td>
                    <span className={`fw-normal text-${statusVariant}`}>
                        {isActive ? "Active" : !isActive ? "Inactive" : "Unknown"}
                    </span>
                </td>
                <td>
                    <span className={`fw-normal text-${statusVariant2}`}>
                        {isVisible ? "Active" : !isVisible ? "Inactive" : "Unknown"}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {updateOfficeTypeId}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {updateOfficeId}
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
                            <Dropdown.Item onClick={() => { handleView(officeId) }}>
                                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => { handleEdit(officeId) }}>
                                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                            </Dropdown.Item>
                            <Dropdown.Item className="text-danger" onClick={() => { handleDelete(officeId) }}>
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
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
                <Card.Body className="pt-0">
                    <Table hover className="user-table align-items-center">
                        <thead>
                            <tr>
                                <th className="border-bottom">Sr No</th>
                                <th className="border-bottom">Office Id</th>
                                <th className="border-bottom">Office Type Id</th>
                                <th className="border-bottom">Office Name</th>
                                <th className="border-bottom">Office Name Hindi</th>
                                <th className="border-bottom">Office Code</th>
                                <th className="border-bottom">Address</th>
                                <th className="border-bottom">State Id</th>
                                <th className="border-bottom">District Id</th>
                                <th className="border-bottom">Pin Code</th>
                                <th className="border-bottom">Std Code</th>
                                <th className="border-bottom">Contact Number</th>
                                <th className="border-bottom">Email id</th>
                                <th className="border-bottom">Longitude</th>
                                <th className="border-bottom">Latitude</th>
                                <th className="border-bottom">Parent Id 1</th>
                                <th className="border-bottom">Parent Id 1 WEF</th>
                                <th className="border-bottom">Parent Id 2</th>
                                <th className="border-bottom">Parent Id 2 WEF</th>
                                <th className="border-bottom">Parent Id 3</th>
                                <th className="border-bottom">Parent Id 3 WEF</th>
                                <th className="border-bottom">Parent Id 4</th>
                                <th className="border-bottom">Parent Id 4 WEF</th>
                                <th className="border-bottom">Designation Id</th>
                                <th className="border-bottom">Office Level Id</th>
                                <th className="border-bottom">RTI Designetion Id</th>
                                <th className="border-bottom">Rti Juris</th>
                                <th className="border-bottom">Juris Diction</th>
                                <th className="border-bottom">Comment</th>
                                <th className="border-bottom">Seq Id</th>
                                <th className="border-bottom">Status</th>
                                <th className="border-bottom">Is Visible</th>
                                <th className="border-bottom">Update Office Type Id</th>
                                <th className="border-bottom">Updated On</th>
                                <th className="border-bottom">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems && currentItems.map(t => <TableRow key={`transaction-${t.srNo}`} {...t} />)}
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