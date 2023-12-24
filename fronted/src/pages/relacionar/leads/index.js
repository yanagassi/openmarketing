import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Container, Input, Row, Table } from "reactstrap";
import comum from "../../../helpers/comum";
import "../../../assets/css/LPPage.css";
import landing_pages from "../../../models/landing_pages";
import { MdVisibility, MdCopyAll } from "react-icons/md";
import leads from "../../../models/leads";

function Leads() {
  const [my_leads, setmy_leads] = useState([]);

  async function init() {
    const data = await leads.get_leads();
    setmy_leads(data);
    console.log(data);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <Container>
      <Col className="mt-4">
        <h4 className="mb-4">
          Leads <span style={{ fontWeight: "200" }}>({my_leads?.length})</span>
        </h4>
        <div className="sm-1">
          <Col md={2}>
            <Input type="text" placeholder="Buscar Lead" className="mb-2" />
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
              {/* <th>
                <div role="button" tabIndex="0" className="table-header">
                  Nº Interações
                </div>
              </th> */}
              <th>
                <div role="button" tabIndex="0" className="table-header">
                  Data de Alteração
                </div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {my_leads?.map((e) => (
              <tr>
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
                      {e?.name && e?.name != "" ? e.name : e.email}
                    </a>
                    <Badge className="status">Ativo</Badge>
                  </div>
                </td>
                {/* <td className="col-1">
                  <center>{e.data_len ?? "0"}</center>
                </td> */}
                <td className="col-3">
                  <div className="date">
                    <p>{comum.ParseDate(e.updated_at ?? e.created_at)}</p>
                  </div>
                </td>

                <td className="col-1">
                  <center>
                    <Button
                      type="button"
                      className="statistics-button"
                      onClick={() => comum.Redirect(`/view/${e._id}`, true)}
                    >
                      <MdVisibility /> <span>Ver</span>
                    </Button>{" "}
                  </center>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Container>
  );
}

export default Leads;
