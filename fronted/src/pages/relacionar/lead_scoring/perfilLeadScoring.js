import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "reactstrap";
import "../../../assets/css/perfilLeadScoring.css";
import PerfilModalLeadScoring from "./perfilModalLeadScoring";
import { MdAdd } from "react-icons/md";
import comum from "../../../helpers/comum";
import lead_scoring from "../../../models/lead_scoring";

function PerfilLeadScoring({}) {
  const [edit, setEdit] = useState(null);
  const [perfil, setPerfil] = useState([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const data = await lead_scoring.list_perfil();
    setPerfil(data);
  }

  async function save(body) {
    const updatedPerfil = perfil.map((e) =>
      e.id === body.id ? { ...e, ...body } : e
    );

    setPerfil(updatedPerfil);
    setEdit(null);

    if (body.id) {
      await lead_scoring.edit_perfil(body);
    } else {
      await lead_scoring.save_perfil(body);
    }

    init();
  }

  async function changePeso(id, value) {
    value = parseInt(value);
    const updatedPerfil = perfil.map((e) =>
      e.id === id ? { ...e, peso: value } : e
    );
    const sums = updatedPerfil.reduce((ac, i) => ac + parseInt(i.peso ?? 0), 0);

    const diff = 100 - sums;

    const updatedPerfilDistributed = updatedPerfil.map((e) => {
      if (e.id !== id) {
        const proportionalDiff = (parseInt(e.peso ?? 0) / sums) * diff;
        return { ...e, peso: parseInt(e.peso ?? 0) + proportionalDiff };
      }
      return e;
    });

    const updatedPerfilAdjusted = updatedPerfilDistributed.map((e) => ({
      ...e,
      peso: Math.min(100, parseInt(e.peso ?? 0)),
    }));

    updatedPerfilAdjusted.sort((a, b) => (a.peso ?? 0) - (b.peso ?? 0));
    setPerfil(updatedPerfilAdjusted);

    await lead_scoring.edit_perfil({
      id,
      peso: value,
    });
  }
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
              {perfil.map((perf) => (
                <tr key={perf.id}>
                  <td>{perf.name}</td>
                  <td>
                    <div className="peso_item">
                      <input
                        className="peso_item-input perfil-lead-scoring-volume-input"
                        type="range"
                        id="volume"
                        name="volume"
                        min="0"
                        max="100"
                        value={perf.peso}
                        onChange={({ target }) =>
                          changePeso(perf.id, target.value)
                        }
                      />{" "}
                      <span className="perfil-lead-scoring-volume-text">
                        ({Math.round(perf.peso ?? 0)}%)
                      </span>
                    </div>
                  </td>
                  <td>
                    <Button color="primary" onClick={() => setEdit(perf)}>
                      <b>Editar</b>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button
            onClick={() => setEdit({ id: null, peso: 0 })}
            color="primary"
          >
            <MdAdd /> Nova propriedade
          </Button>
        </Col>
      </Row>
      <PerfilModalLeadScoring
        toggle={() => setEdit(null)}
        visible={edit !== null}
        onSave={(body) => save(body)}
        data={edit}
      />
    </div>
  );
}

export default PerfilLeadScoring;
