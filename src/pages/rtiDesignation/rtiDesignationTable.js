import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const API = `${process.env.REACT_APP_API}RTIDesignation/GetRTIDesignation`;
const itemsPerPage = 10;
const defaultPage = 1;

export const RTIDesignationTable = () => {
  const [rtiDesignationData, setDesignationData] = useState([]);
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [totalData, setTotalData] = useState(0);
  const [showPreviousButton, setShowPreviousButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);
  const [searchText, setSearchText] = useState(''); // Updated: Moved searchText state to RTIDesignationTable component
  const history = useHistory();

  async function getRtiDesignation() {
    await axios.get(API).then((response) => {
      setDesignationData(response.data);
      setTotalData(response.data.length);
    });
  }

  async function searchDesignation(searchText) {
    if (searchText.trim() === '') {
      setDesignationData(rtiDesignationData); // Reset designation data if search text is empty
    } else {
      const filteredData = rtiDesignationData.filter((i) =>
        i.rtiDesignation.toLowerCase().includes(searchText.toLowerCase()) ||
        (i.isActive && 'active' === searchText.toLowerCase()) ||
        (!i.isActive && 'inactive' === searchText.toLowerCase())
      );
      setDesignationData(filteredData);
    }
  }

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
            `${process.env.REACT_APP_API}deleteRTIDesignation/${id}` // Updated: Removed duplicate API URL segment
          )
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Your work has been Inactive",
              showConfirmButton: false,
              timer: 1500,
            });
            getRtiDesignation();
          })
          .catch(() => {
            Swal.fire("RTI Designation not Inactive.");
          });
      }
    });
  };

  const handleEdit = (id) => {
    history.push(`/editRtiDesignations?id=${id}`);
  };
  const handleView = (id) => {
    history.push(`/viewRtiDesignations?id=${id}`);
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

  useEffect(() => {
    getRtiDesignation();
  }, []);

  useEffect(() => {
    searchDesignation(searchText); // Updated: Call searchDesignation directly in the useEffect hook
    setCurrentPage(defaultPage);
  }, [searchText]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rtiDesignationData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(rtiDesignationData.length / itemsPerPage);

  useEffect(() => {
    setShowPreviousButton(currentPage > 1);
    setShowNextButton(currentPage < totalPages);
  }, [currentPage, totalPages]);

  const TableRow = (props) => {
    const { rtiDesigId, rtiDesignation, ipAddress, isActive } = props;
    const statusVariant = isActive
      ? "success"
      : !isActive
        ? "danger"
        : "primary";
    return (
      <tr>
        <td>
          <Card.Link className="fw-normal">{rtiDesigId}</Card.Link>
        </td>
        <td>
          <span className="fw-normal">{rtiDesignation}</span>
        </td>
        <td>
          <span className={`fw-normal text-${statusVariant}`}>
            {isActive ? "Active" : !isActive ? "Inactive" : "Unknown"}
          </span>
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
                <FontAwesomeIcon
                  icon={faEllipsisH}
                  className="icon-dark"
                />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleView(rtiDesigId)}>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleEdit(rtiDesigId)}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item
                className="text-danger"
                onClick={() => handleDelete(rtiDesigId)}
              >
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
                <th className="border-bottom">Id</th>
                <th className="border-bottom">Rti Designation Name</th>
                <th className="border-bottom">Status</th>
                <th className="border-bottom">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems &&
                currentItems.map((t) => (
                  <TableRow key={`transaction-${t.srNo}`} {...t} />
                ))}
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
