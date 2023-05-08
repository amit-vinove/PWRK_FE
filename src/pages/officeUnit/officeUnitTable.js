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
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const API = `https://localhost:5001/api/OfficeUnit/GetOfficeUnit`;
export const OfficeUnitTable = ({ searchText }) => {
    const [officeUnitData, setOfficeUnitData] = useState([]);
    const [officeUnitId, setOfficeUnitId] = useState(0);
    console.log(officeUnitData, "state Data");
    const [tempOfficeUnitData, setTempOfficeUnitData] = useState([]);
    const totalCount = officeUnitData.length;
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
                    .post(`https://localhost:5001/api/OfficeUnit/deleteOfficeUnit/${id}`)
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
                        {officeUnitData &&
                            officeUnitData.map((t) => (
                                <TableRow
                                    key={`transaction-${t.officeUnitId}`}
                                    {...t}
                                    officeUnitId={t.officeUnitId}
                                />
                            ))}
                    </tbody>
                </Table>
                <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
                    <Nav>
                        <Pagination className="mb-2 mb-lg-0">
                            <Pagination.Prev>Previous</Pagination.Prev>
                            <Pagination.Item active>1</Pagination.Item>
                            <Pagination.Item>2</Pagination.Item>
                            <Pagination.Item>3</Pagination.Item>
                            <Pagination.Item>4</Pagination.Item>
                            <Pagination.Item>5</Pagination.Item>
                            <Pagination.Next>Next</Pagination.Next>
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
