import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faArrowDown,
  faArrowUp,
  faEdit,
  faEllipsisH,
  faExternalLinkAlt,
  faEye,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Nav,
  Card,
  Image,
  Button,
  Table,
  Dropdown,
  ProgressBar,
  Pagination,
  ButtonGroup,
} from "@themesberg/react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const API = `${process.env.REACT_APP_API}District/GetDistrict`;

export const DistrictTable = ({ searchText }) => {
  const history = useHistory();
  const [districtData, setDistrictData] = useState([]);
  const [tempDistrictData, setTempDistrictData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [itemsPerPage] = useState(10);
  const [showPreviousButton, setShowPreviousButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);

  async function getDistrict() {
    await axios.get(API).then((response) => {
      setDistrictData(response.data);
      setTempDistrictData(response.data);
      setTotalData(response.data.length);
    });
  }

  async function searchDistrict(searchText) {
    setDistrictData(
      tempDistrictData.filter(
        (i) =>
          i.districtName.toLowerCase().includes(searchText.toLowerCase()) ||
          i.districtShortName.toLowerCase().includes(searchText.toLowerCase())
      )
    ); setFilteredData(filteredData);
    setTotalData(filteredData.length);
  }

  const handleEdit = (id) => {
    history.push(`/editDistrict?id=${id}`);
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
    getDistrict();
  }, []);

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
          .post(`${process.env.REACT_APP_API}District/deleteDistrict/${id}`)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Your work has been InActive",
              showConfirmButton: false,
              timer: 1500,
            });
            getDistrict();
          })
          .catch(() => {
            Swal.fire("district not InActive.");
          });
        console.log(id, "districtId");
      }
    });
  };
  useEffect(() => {
    searchDistrict(searchText);
  }, [searchText]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = districtData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(districtData.length / itemsPerPage);

  useEffect(() => {
    setShowPreviousButton(currentPage > 1);
    setShowNextButton(currentPage < totalPages);
  }, [currentPage, totalPages]);


  const TableRow = (props) => {
    const { srNo, stateId, disttId, distName, distShortName, isActive } = props;
    const statusVariant = isActive
      ? "success"
      : !isActive
        ? "danger"
        : "primary";
    return (
      <tr>
        <td>
          <Card.Link className="fw-normal">{srNo}</Card.Link>
        </td>
        <td>
          <span className="fw-normal">{stateId}</span>
        </td>
        <td>
          <span className="fw-normal">{distName}</span>
        </td>
        <td>
          <span className="fw-normal">{distShortName}</span>
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
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleEdit(disttId)}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item
                className="text-danger"
                onClick={() => handleDelete(disttId)}
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
                <th className="border-bottom">State</th>
                <th className="border-bottom">District Name</th>
                <th className="border-bottom">District Short Name</th>
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
