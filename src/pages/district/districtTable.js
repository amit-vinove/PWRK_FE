import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
const API = `https://localhost:5001/api/District/GetDistrict`;


export const DistrictTable = ({ searchText }) => {

  const [districtData, setDistrictData] = useState([]);
  const [tempDistrictData, setTempDistrictData] = useState([]);

  const totalCount = districtData.length;
  async function getDistrict() {
    await axios.get(API).then((response) => {
      setDistrictData(response.data);
      setTempDistrictData(response.data);
    });
  }

  async function searchDistrict(searchText) {
    setDistrictData(
      tempDistrictData.filter((i) =>
        i.districtName.toLowerCase().includes(searchText.toLowerCase())
      ))
  }

  useEffect(() => {
    getDistrict();
  }, []);

  useEffect(() => {
    searchDistrict(searchText);
  }, [searchText])

  const TableRow = (props) => {
    const { srNo, stateId, distName, distShortName, isActive } = props;
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
            {stateId}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {distName}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {distShortName}
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
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
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
              <th className="border-bottom">State</th>
              <th className="border-bottom">District Name</th>
              <th className="border-bottom">District Short Name</th>
              <th className="border-bottom">Status</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {districtData && districtData.map(t => <TableRow key={`transaction-${t.srNo}`} {...t} />)}
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