import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
const API = `${process.env.REACT_APP_API}Module/GetModule`;
const itemsPerPage = 10;
const defaultPage = 1;
export const ModuleTable = ({ searchText }) => {
  const [moduleData, setModuleData] = useState([]);
  const [tempModuleData, setTempModuleData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [showPreviousButton, setShowPreviousButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);
  const history = useHistory();
  async function getModules() {
    await axios.get(API).then((response) => {
      setModuleData(response.data);
      setTempModuleData(response.data);
      setTotalData(response.data.length);
    });
  }
  async function searchModule(searchText) {
    setModuleData(
      tempModuleData.filter((i) =>
        i.maduleName.toLowerCase().includes(searchText.toLowerCase()) ||
        i.moduleNameShort.toLowerCase().includes(searchText.toLowerCase())
      ))
  }
  const handleEdit = (id) => {
    history.push(`editModule?id=${id}`)
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
            `${process.env.REACT_APP_API}Module/deleteModule/${id}`
          )
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Your work has been Deleted",
              showConfirmButton: false,
              timer: 1500,
            });
            getModules();
          })
          .catch(() => {
            Swal.fire("Module not deleted.");
          });
        console.log(id, "moduleid");
      }
    });
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
    getModules();
  }, []);
  useEffect(() => {
    searchModule(searchText);
    setCurrentPage(defaultPage);
  }, [searchText])

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = moduleData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(moduleData.length / itemsPerPage);


  useEffect(() => {
    setShowPreviousButton(currentPage > 1);
    setShowNextButton(currentPage < totalPages);
  }, [currentPage, totalPages]);

  const TableRow = (props) => {
    const { moduleId, maduleName, moduleNameShort, moduleUrl, isActive } = props;
    const statusVariant = isActive ? "success" : !isActive ? "danger" : "primary";
    return (
      <tr>
        <td>
          <Card.Link className="fw-normal">
            {moduleId}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">
            {maduleName}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {moduleNameShort}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {moduleUrl}
          </span>
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
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              <Dropdown.Item onClick={() => { handleEdit(moduleId) }}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item >
              <Dropdown.Item className="text-danger" onClick={() => { handleDelete(moduleId) }}>
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
                <th className="border-bottom">Id</th>
                <th className="border-bottom">Module Name</th>
                <th className="border-bottom">Module Name Short</th>
                <th className="border-bottom">Module URL</th>
                <th className="border-bottom">Status</th>
                <th className="border-bottom">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems && currentItems.map(t => <TableRow key={`module-${t.srNo}`} {...t} />)}
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