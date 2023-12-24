import React, { useState } from "react";
import { Button, Card, CardBody, Col, Row, Table } from "reactstrap";
import "../../../assets/css/perfilLeadScoring.css";
import PerfilModalLeadScoring from "./perfilModalLeadScoring";

function PerfilLeadScoring({}) {
  const [edit, setEdit] = useState(null);
  return (
    <div>
      <Row>
        <Col xs={3}>
          <div className="perfil-lead-scoring-text">
            <span className="perfil-lead-scoring-text-1">
              Ao definir notas (de 1 a 10) para os termos mais eficazes das
              principais propriedades dos Leads, sua base será automaticamente
              dividida em quatro grupos: A. B. C e D. sendo os Leads do grupo
              "A" aqueles com melhor perfil para vendas.
            </span>
          </div>
        </Col>
        <Col>
          <Table
            className="mt-1 table-press-lp"
            bordered
            responsive
            striped
            summary="Lista de Leads"
          >
            <thead>
              <tr>
                <th> Propriedade</th>
                <th className="w-25">Peso</th>
                <th className="perfil_lead-action"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Propriedade 1</td>
                <td>
                  <div className="peso_item">
                    <input
                      className="peso_item-input perfil-lead-scoring-volume-input"
                      type="range"
                      id="volume"
                      name="volume"
                      min="0"
                      max="100"
                      value={10}
                    />{" "}
                    <span className="perfil-lead-scoring-volume-text">
                      {" "}
                      (10)
                    </span>
                  </div>
                </td>
                <td>
                  <Button color="primary" onClick={() => setEdit({})}>
                    <b>Editar</b>
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <PerfilModalLeadScoring
        toggle={() => setEdit(null)}
        visible={edit !== null}
      />
    </div>
  );
}

export default PerfilLeadScoring;
