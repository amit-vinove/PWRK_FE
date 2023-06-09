import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faEdit,
  faEye,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  Table,
  Dropdown,
  Pagination,
  Button,
  ButtonGroup,
} from "@themesberg/react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";

const API = `${process.env.REACT_APP_API}Designation/GetDesignation`;
const defaultPage = 1;

export const DesignationTable = ({ searchText }) => {
  const [designationData, setDesignationData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState([]);
  const history = useHistory();
  const [totalData, setTotalData] = useState(0);
  const [showPreviousButton, setShowPreviousButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);

  const handleEdit = (id) => {
    history.push(`/editDesignations?id=${id}`);
  };
  const handleView = (id) => {
    history.push(`/viewDesignations?id=${id}`);
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Do You Want To InActive?",
      showCancelButton: true,
      icon: "warning",
      confirmButtonText: "Yes, InActive it!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            `${process.env.REACT_APP_API}Designation/deleteDesignation/${id}`
          )
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Your work has been InActive",
              showConfirmButton: false,
              timer: 1500,
            });
            getDesignation();
          })
          .catch(() => {
            Swal.fire("Designation not InActive.");
          });
        console.log(id, "titleId");
      }
    });
  };

  useEffect(() => {
    getDesignation();
  }, []);

  const getDesignation = async () => {
    try {
      const response = await axios.get(API);
      setDesignationData(response.data);
      setTotalData(response.data.length);
    } catch (error) {
      console.error("Error retrieving designation data:", error);
    }
  };

  const searchDesignation = (searchText) => {
    const filteredData = designationData.filter((item) => {
      const lowercaseSearchText = searchText.toLowerCase();
      const lowercaseDesignationName = item.designationName.toLowerCase();
      const lowercaseDesignationShort = item.designationShort.toLowerCase();
      const isActiveText = item.isActive ? "active" : "inactive";

      return (
        lowercaseDesignationName.includes(lowercaseSearchText) ||
        lowercaseDesignationShort.includes(lowercaseSearchText) ||
        (item.isActive && searchText.toLowerCase() === 'active') ||
        (!item.isActive && searchText.toLowerCase() === 'inactive')
      );
    });

    setFilteredData(filteredData);
    setTotalData(filteredData.length);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    setShowPreviousButton(true);
    setShowNextButton(true);
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    setShowPreviousButton(true);
    if (currentPage + 1 === Math.ceil(totalData.length / itemsPerPage)) {
      setShowNextButton(false);
    }
  };

  useEffect(() => {
    if (searchText) {
      searchDesignation(searchText);
      setCurrentPage(defaultPage);
      setShowPreviousButton(false);
      setShowNextButton(true);
    } else {
      setFilteredData(designationData);
      setTotalData(designationData.length);
    }
  }, [searchText, designationData]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    setShowPreviousButton(currentPage > 1);
    setShowNextButton(currentPage < totalPages);
  }, [currentPage, totalPages]);

  const TableRow = (props) => {
    const {
      designationId,
      designationName,
      designationOrderId,
      designationShort,
      ipAddress,
      isActive,
    } = props;
    const statusVariant = isActive ? "success" : !isActive ? "danger" : "primary";
    return (
      <tr>
        <td>
          <Card.Link className="fw-normal">{designationId}</Card.Link>
        </td>
        <td>
          <span className="fw-normal">{designationName}</span>
        </td>
        <td>
          <span className="fw-normal">{designationOrderId}</span>
        </td>
        <td>
          <span className="fw-normal">{designationShort}</span>
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
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleView(designationId)}>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleEdit(designationId)}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item
                className="text-danger"
                onClick={() => handleDelete(designationId)}
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
                <th className="border-bottom">Designation Name</th>
                <th className="border-bottom">Designation Order Id</th>
                <th className="border-bottom">Designation Short</th>
                <th className="border-bottom">Status</th>
                <th className="border-bottom">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((t) => (
                <TableRow key={`transaction-${t.srNo}`} {...t} />
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-between align-items-center">
        <div className="text-center mb-3">
          <h6>Total Data: {totalData}</h6>
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
