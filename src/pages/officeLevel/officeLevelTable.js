import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
const API = `${process.env.REACT_APP_API}OfficeLevel/GetOfficeLevel`;
export const OfficeLevelTable = ({ searchText }) => {
    const [officeLevelData, setOfficeLevelData] = useState([]);
    const [officeLevelId, setOfficeLevelId] = useState(0);
    console.log(officeLevelData, "officeLevelData")
    const [tempOfficeLevelData, setTempOfficeLevelData] = useState([]);
    const totalCount = officeLevelData.length;
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
                        `http://122.176.101.76:8085/api/OfficeLevel/deleteOfficeLevel/${id}`
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
    }, [searchText])
    const TableRow = (props) => {
        const { srNo, officeTypeid, officeLevelId, officeLevel } = props;
        //const statusVariant = isActive ? "success" : !isActive ? "danger" : "primary";
        console.log(officeLevelId)
        return (
            <tr>
                <td>
                    <Card.Link className="fw-normal">
                        {srNo}
                    </Card.Link>
                </td>
                <td>
                    <span className="fw-normal">
                        {officeTypeid}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {officeLevelId}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {officeLevel}
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
                            <Dropdown.Item>
                                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                            </Dropdown.Item>
                            <Dropdown.Item className="text-danger" onClick={() => {
                                setOfficeLevelId(props.officeLevelId)
                                handleDelete(officeLevelId)
                            }
                            }>
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
                            <th className="border-bottom">Office Type Id</th>
                            <th className="border-bottom">Office level Id</th>
                            <th className="border-bottom">Office Level</th>

                            <th className="border-bottom">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {officeLevelData && officeLevelData.map(t => <TableRow key={`transaction-${t.officeLevelId}`}{...t} officeLevelId={t.officeLevelId} />)}
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