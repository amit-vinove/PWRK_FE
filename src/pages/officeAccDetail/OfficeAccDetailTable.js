import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
const API = `https://localhost:5001/api/OfficeAccountDetails/GetOfficeAccountDetails`;


export const OfficeAccDetailTable = ({ searchText }) => {

    const [officeAccDetailData, setOfficeAccDetailData] = useState([]);
    const [officeAccDetailId, setOfficeAccDetailId] = useState(0);
    console.log(officeAccDetailData, "officeAccDetailData")
    const [tempOfficeAccDetailData, setTempOfficeAccDetailData] = useState([]);

    const totalCount = officeAccDetailData.length;
    async function getOfficeAccountDetail() {
        await axios.get(API).then((response) => {
            setOfficeAccDetailData(response.data);
            setTempOfficeAccDetailData(response.data);
        });
    }

    async function searchState(searchText) {
        setOfficeAccDetailData(
            tempOfficeAccDetailData.filter((i) =>
                i.stateName.toLowerCase().includes(searchText.toLowerCase())
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
                        `https://localhost:5001/api/OfficeAccountDetail/deleteOfficeAccountDetail/${id}`
                    )
                    .then((res) => {
                        Swal.fire({
                            icon: "success",
                            title: "Your work has been Deleted",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        getOfficeAccountDetail();
                    })
                    .catch(() => {
                        Swal.fire("State not deleted.");
                    });
            }
        });
    };

    useEffect(() => {
        getOfficeAccountDetail();
    }, []);

    useEffect(() => {
        searchState(searchText);
    }, [searchText])

    const TableRow = (props) => {

        const { srNo, officeId, ddoTypeId, ddoCode, ddoCodeName, pan, gst, bankAccNo, bankName, bankAddress, bankIFSC,
            isActive, updateBy, updateOfficeTypeId, updateOfficeId, updateon } = props;
        const statusVariant = isActive ? "success" : !isActive ? "danger" : "primary";

        console.log(officeAccDetailId)

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
                        {ddoTypeId}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {ddoCode}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {ddoCodeName}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {pan}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {gst}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {bankAccNo}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {bankName}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {bankAddress}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {bankIFSC}
                    </span>
                </td>
                <td>
                    <span className={`fw-normal text-${statusVariant}`}>
                        {isActive ? "Active" : !isActive ? "Inactive" : "Unknown"}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {updateBy}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {updateOfficeTypeId}
                    </span>
                </td><td>
                    <span className="fw-normal">
                        {updateOfficeId}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {updateon}
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
                                setOfficeAccDetailId(props.officeAccDetailId)
                                handleDelete(officeAccDetailId)
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
                            <th className="border-bottom">Office Id</th>
                            <th className="border-bottom">Ddo Type Id</th>
                            <th className="border-bottom">Ddo Code</th>
                            <th className="border-bottom">Ddo Code Name</th>
                            <th className="border-bottom">PAN Number</th>
                            <th className="border-bottom">GST</th>
                            <th className="border-bottom">Bank Account Number</th>
                            <th className="border-bottom">Bank Name</th>
                            <th className="border-bottom">Bank Address</th>
                            <th className="border-bottom">Bank IFSC</th>
                            <th className="border-bottom">Status</th>
                            <th className="border-bottom">Updated by</th>
                            <th className="border-bottom">Updated Office Type Id</th>
                            <th className="border-bottom">updated Office Id</th>
                            <th className="border-bottom">Updated On</th>
                            <th className="border-bottom">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {officeAccDetailData && officeAccDetailData.map(t => <TableRow key={`transaction-${t.officeAccDetailId}`}{...t} officeAccDetailId={t.officeAccDetailId} />)}
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