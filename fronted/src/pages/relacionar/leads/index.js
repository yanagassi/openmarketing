import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Container, Input, Row, Table } from "reactstrap";
import comum from "../../../helpers/comum";
import "../../../assets/css/LPPage.css";
import landing_pages from "../../../models/landing_pages";
import {
  MdVisibility,
  MdCopyAll,
  MdDelete,
  MdOpenInFull,
  MdAdd,
  MdPerson,
  MdPersonOff,
} from "react-icons/md";
import leads from "../../../models/leads";

function Leads() {
  const [myLeads, setMyLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage] = useState(10);

  async function init() {
    const data = await leads.get_leads();
    setMyLeads(data);
  }

  useEffect(() => {
    init();
  }, []);

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = myLeads.slice(indexOfFirstLead, indexOfLastLead);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filterLeads = () => {
    return currentLeads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <Container>
      <Col className="mt-4">
        <h4 className="mb-4">
          Leads <span style={{ fontWeight: "200" }}>({myLeads?.length})</span>
        </h4>
        <div className="sm-1">
          <Col md={2}>
            <Input
              type="text"
              placeholder="Buscar Lead"
              className="mb-2"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
        </div>

        <Table
          className="mt-1 table-press-lp"
          bordered
          responsive
          striped
          summary="Lista de Leads"
        >
          <thead>
            <tr>
              <th>
                <div role="button" tabIndex="0" className="table-header">
                  Nome
                </div>
              </th>
              <th>
                <div role="button" tabIndex="0" className="table-header">
                  Data de Alteração
                </div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filterLeads()?.map((e) => (
              <tr key={e.id}>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <a
                      aria-disabled="false"
                      href={`/leads/${e?.id}`}
                      tabIndex="0"
                      className="landing-page-link"
                    >
                      {e?.name && e?.name !== "" ? e.name : e.email}
                    </a>
                    {!e?.deleted_date ? (
                      <Badge color="success" style={{ paddingTop: 5 }}>
                        Ativo
                      </Badge>
                    ) : (
                      <Badge color="danger" style={{ paddingTop: 5 }}>
                        Inativo
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="col-3">
                  <div className="date">
                    <p>{comum.ParseDate(e.updated_at ?? e.created_at)}</p>
                  </div>
                </td>

                <td className="col-1">
                  <center>
                    {e?.deleted_date ? (
                      <Button color="danger" title="Reativar Lead">
                        <MdPerson />
                      </Button>
                    ) : (
                      <Button color="danger" title="Inativar Lead">
                        <MdPersonOff />
                      </Button>
                    )}{" "}
                    <Button
                      color="primary"
                      type="button"
                      className="statistics-button"
                      onClick={() => comum.Redirect(`/leads/${e.id}`, true)}
                    >
                      <MdVisibility />
                    </Button>{" "}
                  </center>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Row className="pagination-container p-2">
          <ul className="pagination">
            {Array.from({
              length: Math.ceil(myLeads.length / leadsPerPage),
            }).map((item, index) => (
              <li key={index} className="page-item">
                <Button
                  className="page-link"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Button>
              </li>
            ))}
          </ul>
        </Row>
      </Col>
    </Container>
  );
}

export default Leads;
