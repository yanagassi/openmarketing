import React, { useEffect, useState } from "react";
import { Button, Col, Container, Input, Row, Table } from "reactstrap";
import comum from "../../../helpers/comum";
import "../../../assets/css/LPPage.css";
import { MdDelete, MdEdit, MdVisibility } from "react-icons/md";
import segments from "../../../models/segments";
import { FaPlus } from "react-icons/fa";
import NewSegmentModal from "./NewSegmentModal";

function Segments() {
  const [my_segments, setmy_segments] = useState([]);
  const [modal, setModal] = useState(false);

  async function init() {
    const data = await segments.get_segments();
    setmy_segments(data);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <Container>
      <Col className="mt-4">
        <Row>
          <Col xs={10}>
            <h4 className="mb-4">
              Segmentação de Leads{" "}
              <span style={{ fontWeight: "200" }}>({my_segments?.length})</span>
            </h4>
          </Col>

          <Col xs={2}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div></div>
              <Button color="primary" onClick={() => setModal(!modal)}>
                <FaPlus /> Novo
              </Button>
            </div>
          </Col>
        </Row>
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
          summary="Segmentação de Leads"
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
            {my_segments?.map((e) => (
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
                      href={`/segments/${e?.id}`}
                      tabIndex="0"
                      className="landing-page-link"
                    >
                      {e?.name}
                    </a>
                  </div>
                </td>

                <td className="col-3">
                  <div className="date">
                    <p>{comum.ParseDate(e.updated_at ?? e.created_at)}</p>
                  </div>
                </td>

                <td className="col-1">
                  <center>
                    <Button color="danger">
                      <MdDelete />
                    </Button>{" "}
                    <Button type="button" color="primary">
                      <MdEdit />
                    </Button>
                  </center>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
      <NewSegmentModal modal={modal} setModal={setModal} />
    </Container>
  );
}

export default Segments;
