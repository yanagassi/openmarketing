import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "reactstrap";
import "../../../assets/css/perfilLeadScoring.css";
import PerfilModalLeadScoring from "./perfilModalLeadScoring";
import { MdAdd, MdEqualizer } from "react-icons/md";
import comum from "../../../helpers/comum";
import lead_scoring from "../../../models/lead_scoring";

function PerfilLeadScoring({}) {
  const [edit, setEdit] = useState(null);
  const [perfil, setPerfil] = useState([
    // {
    //   id: "o2eon1o2eno12oino",
    //   name: "Propriedade 2",
    //   peso: 25,
    //   terms: [],
    //   operation: "exato",
    // },
    // {
    //   id: "2EJO1J2J1OJ12IJO",
    //   name: "Propriedade 1",
    //   peso: 12,
    //   terms: [],
    //   operation: "contem",
    // },
  ]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const data = await lead_scoring.list_perfil();
    setPerfil(data);
  }

  async function save(body) {
    const final = perfil.map((e) => {
      if (e.id === body.id) {
        return {
          ...e,
          ...body,
        };
      }
      return e;
    });
    setPerfil(final);
    setEdit(null);
    if (body.id) {
      await lead_scoring.edit_perfil(body);
    } else {
      await lead_scoring.save_perfil(body);
    }
    init();
  }

  async function changePeso(id, value) {
    console.log(perfil);
    value = parseInt(value);
    const sums = perfil.reduce((ac, i) => ac + parseInt(i.peso ?? 0));
    console.log(sums + value);
    if (sums + value > 100) {
      return null;
    }

    const final = perfil.map((e) => {
      if (e.id === id) {
        return {
          ...e,
          peso: value,
        };
      }
      return e;
    });
    setPerfil(final);

    await lead_scoring.edit_perfil({
      id,
      peso: value,
    });
  }

  async function equalizeWeights() {
    const numProperties = perfil.length;
    const equalWeight = Math.floor(100 / numProperties);

    const equalizedPerfil = perfil.map((e) => ({
      ...e,
      peso: equalWeight,
    }));

    setPerfil(equalizedPerfil);

    // Atualiza os pesos no backend
    await Promise.all(
      equalizedPerfil.map((prop) =>
        lead_scoring.edit_perfil({
          id: prop.id,
          peso: equalWeight,
        })
      )
    );
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
                <tr>
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
                        ({perf.peso}%)
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
          <div>
            <Button
              onClick={() => setEdit({ id: null, peso: 0 })}
              color="primary"
            >
              <MdAdd /> Nova propriedade
            </Button>{" "}
            <Button onClick={() => equalizeWeights()} color="primary">
              <MdEqualizer /> Equalizar Pesos
            </Button>
          </div>
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
