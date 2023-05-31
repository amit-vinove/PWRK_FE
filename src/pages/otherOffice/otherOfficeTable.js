import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
const API = `${process.env.REACT_APP_API}OfficeAccountDetails/GetOfficeAccountDetails`;
export const OtherOfficeTable = ({ searchText }) => {
    const [officeAccDetailData, setOfficeAccDetailData] = useState([]);
    const [officeId, setOfficeId] = useState(0);
    const [tempOfficeAccDetailData, setTempOfficeAccDetailData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const history = useHistory();
    const [showPreviousButton, setShowPreviousButton] = useState(false);
    const [showNextButton, setShowNextButton] = useState(true);
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
    const query = new URLSearchParams(window.location.search);
    const id = query.get("id");

    const handleEdit = (id) => {
        history.push(`/editOtherOffice?id=${id}`)

    };
    const handlePrev = () => {
        setCurrentPage((prevPage) => prevPage - 1);
        setShowPreviousButton(true);
        setShowNextButton(true);

    };

    const handleNext = () => {
        setCurrentPage((prevPage) => prevPage + 1);
        setShowPreviousButton(true);
        if (currentPage + 1 === Math.ceil(officeAccDetailData.length / itemsPerPage)) {
            setShowNextButton(false);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = officeAccDetailData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(officeAccDetailData.length / itemsPerPage);

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
                        `${process.env.REACT_APP_API}OfficeAccountDetails/DeleteOfficeAccountDetails/${id}`
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
                            <Dropdown.Item onClick={() => { handleEdit(officeId) }}>
                                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                            </Dropdown.Item >
                            <Dropdown.Item className="text-danger" onClick={() => { handleDelete(officeId) }}>
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
                            {currentItems && currentItems.map(t => <TableRow key={`transaction-${t.officeId}`}{...t} officeId={t.officeId} />)}
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























// import React from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
// import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useHistory } from "react-router-dom";
// import Swal from "sweetalert2/dist/sweetalert2.js";
// import "sweetalert2/src/sweetalert2.scss";
// const API = `${process.env.REACT_APP_API}OfficeAccountDetails/GetOfficeAccountDetails`;
// // const API = `${process.env.REACT_APP_API}OtherOffice/GetOtherOffice`;
// export const OtherOfficeTable = ({ searchText }) => {
//     const [otherOfficeData, setOtherOfficeData] = useState([]);
//     const [othOffId, setothOffId] = useState(0);
//     const [tempOtherOfficeData, setTempOtherOfficeData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(10);
//     const history = useHistory();
//     const [showPreviousButton, setShowPreviousButton] = useState(false);
//     const [showNextButton, setShowNextButton] = useState(true);
//     async function getOtherOffice() {
//         await axios.get(API).then((response) => {
//             setOtherOfficeData(response.data);
//             setTempOtherOfficeData(response.data);
//         });
//     }
//     async function searchState(searchText) {
//         setOtherOfficeData(
//             tempOtherOfficeData.filter((i) =>
//                 i.stateName.toLowerCase().includes(searchText.toLowerCase())
//             ))
//     }
//     const query = new URLSearchParams(window.location.search);
//     const id = query.get("id");

//     const handleEdit = (id) => {
//         history.push(`/editOtherOffice?id=${id}`)

//     };
//     const handlePrev = () => {
//         setCurrentPage((prevPage) => prevPage - 1);
//         setShowPreviousButton(true);
//         setShowNextButton(true);

//     };

//     const handleNext = () => {
//         setCurrentPage((prevPage) => prevPage + 1);
//         setShowPreviousButton(true);
//         if (currentPage + 1 === Math.ceil(otherOfficeData.length / itemsPerPage)) {
//             setShowNextButton(false);
//         }
//     };

//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = otherOfficeData.slice(indexOfFirstItem, indexOfLastItem);
//     const totalPages = Math.ceil(otherOfficeData.length / itemsPerPage);

//     const handleDelete = (id) => {
//         Swal.fire({
//             title: "Do You Want To Delete?",
//             showCancelButton: true,
//             icon: "warning",
//             confirmButtonText: "Yes, delete it!",
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axios
//                     .post(
//                         `${process.env.REACT_APP_API}OfficeAccountDetails/DeleteOfficeAccountDetails/${id}`
                   
//                        // `${process.env.REACT_APP_API}OtherOffice/DeleteOtherOffice/${id}`
//                     )
//                     .then((res) => {
//                         Swal.fire({
//                             icon: "success",
//                             title: "Your work has been Deleted",
//                             showConfirmButton: false,
//                             timer: 1500,
//                         });
//                         getOtherOffice();
//                     })
//                     .catch(() => {
//                         Swal.fire("Other Office not deleted.");
//                     });
//             }
//         });
//     };
//     useEffect(() => {
//         getOtherOffice();
//     }, []);
//     useEffect(() => {
//         searchState(searchText);
//     }, [searchText])
//     const TableRow = (props) => {
//         const { srNo, othOffId, ddoTypeId, ddoCode, ddoCodeName, pan, gst, bankAccNo, bankName, bankAddress, bankIFSC,
//             isActive, updateBy, updateOfficeTypeId, updateOfficeId, updateon } = props;
//         const statusVariant = isActive ? "success" : !isActive ? "danger" : "primary";
//         return (
//             <tr>
//                 <td>
//                     <Card.Link className="fw-normal">
//                         {srNo}
//                     </Card.Link>
//                 </td>
//                 <td>
//                     <span className="fw-normal">
//                         {othOffId}
//                     </span>
//                 </td>
//                 <td>
//                     <span className="fw-normal">
//                         {ddoTypeId}
//                     </span>
//                 </td>
//                 <td>
//                     <span className="fw-normal">
//                         {ddoCode}
//                     </span>
//                 </td>
//                 <td>
//                     <span className="fw-normal">
//                         {ddoCodeName}
//                     </span>
//                 </td>
//                 <td>
//                     <span className="fw-normal">
//                         {pan}
//                     </span>
//                 </td>
//                 <td>
//                     <span className="fw-normal">
//                         {gst}
//                     </span>
//                 </td>
//                 <td>
//                     <span className="fw-normal">
//                         {bankAccNo}
//                     </span>
//                 </td>
//                 <td>
//                     <span className="fw-normal">
//                         {bankName}
//                     </span>
//                 </td>
//                 <td>
//                     <span className="fw-normal">
//                         {bankAddress}
//                     </span>
//                 </td>
//                 <td>
//                     <span className="fw-normal">
//                         {bankIFSC}
//                     </span>
//                 </td>
//                 <td>
//                     <span className={`fw-normal text-${statusVariant}`}>
//                         {isActive ? "Active" : !isActive ? "Inactive" : "Unknown"}
//                     </span>
//                 </td>
//                 <td>
//                     <span className="fw-normal">
//                         {updateBy}
//                     </span>
//                 </td>
//                 <td>
//                     <span className="fw-normal">
//                         {updateOfficeTypeId}
//                     </span>
//                 </td><td>
//                     <span className="fw-normal">
//                         {updateOfficeId}
//                     </span>
//                 </td>
//                 <td>
//                     <span className="fw-normal">
//                         {updateon}
//                     </span>
//                 </td>
//                 <td>
//                     <Dropdown as={ButtonGroup}>
//                         <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
//                             <span className="icon icon-sm">
//                                 <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
//                             </span>
//                         </Dropdown.Toggle>
//                         <Dropdown.Menu>
//                             <Dropdown.Item>
//                                 <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
//                             </Dropdown.Item>
//                             <Dropdown.Item onClick={() => { handleEdit(othOffId) }}>
//                                 <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
//                             </Dropdown.Item >
//                             <Dropdown.Item className="text-danger" onClick={() => { handleDelete(othOffId) }}>
//                                 <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
//                             </Dropdown.Item>
//                         </Dropdown.Menu>
//                     </Dropdown>
//                 </td>
//             </tr>
//         );
//     };
//     return (
//         <>
//             <Card border="light" className="table-wrapper table-responsive shadow-sm">
//                 <Card.Body className="pt-0">
//                     <Table hover className="user-table align-items-center">
//                         <thead>
//                             <tr>
//                                 <th className="border-bottom">Sr No</th>
//                                 <th className="border-bottom">Office Id</th>
//                                 <th className="border-bottom">Ddo Type Id</th>
//                                 <th className="border-bottom">Ddo Code</th>
//                                 <th className="border-bottom">Ddo Code Name</th>
//                                 <th className="border-bottom">PAN Number</th>
//                                 <th className="border-bottom">GST</th>
//                                 <th className="border-bottom">Bank Account Number</th>
//                                 <th className="border-bottom">Bank Name</th>
//                                 <th className="border-bottom">Bank Address</th>
//                                 <th className="border-bottom">Bank IFSC</th>
//                                 <th className="border-bottom">Status</th>
//                                 <th className="border-bottom">Updated by</th>
//                                 <th className="border-bottom">Updated Office Type Id</th>
//                                 <th className="border-bottom">updated Office Id</th>
//                                 <th className="border-bottom">Updated On</th>
//                                 <th className="border-bottom">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {currentItems && currentItems.map(t => <TableRow key={`transaction-${t.othOffId}`}{...t} othOffId={t.othOffId} />)}
//                         </tbody>
//                     </Table>
//                 </Card.Body>
//             </Card>
//             <div className="d-flex justify-content-center">
//                 <Pagination>
//                     {showPreviousButton && (
//                         <Pagination.Prev disabled={currentPage === 1} onClick={handlePrev}>
//                             Prev. Page
//                         </Pagination.Prev>
//                     )}
//                     {showNextButton && (
//                         <Pagination.Next disabled={currentPage === totalPages} onClick={handleNext}>
//                             Next Page
//                         </Pagination.Next>
//                     )}
//                 </Pagination>
//             </div>
//         </>
//     );
// };