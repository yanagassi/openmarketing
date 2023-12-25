import { useState } from "react";
import { Button, Col, Row, Table } from "reactstrap";
import InteresseModalLeadScoring from "./interesseModalLeadScoring";
import comum from "../../../helpers/comum";
import lead_scoring from "../../../models/lead_scoring";
import { MdAdd } from "react-icons/md";

function InteresseLeadScoring({}) {
  const [edit, setEdit] = useState(null);
  const [interesses, setInteresses] = useState([
    {
      id: comum.GenerateId(),
      name: "Participantes do Evento",
      pts: 10,
      events: [],
    },
    {
      id: comum.GenerateId(),
      name: "Download E-book",
      pts: 30,
      events: [],
    },

    {
      id: comum.GenerateId(),
      name: "Comprou",
      pts: 50,
      events: [],
    },

    {
      id: comum.GenerateId(),
      name: "Black List",
      pts: -150,
      events: [],
    },
  ]);

  async function onSave(id, edit) {
    const final = interesses.map((e) => {
      if (e.id === id) {
        return edit;
      }
      return e;
    });
    setInteresses(final);
    await lead_scoring.save_interesse(final.filter((e) => e.id === id)[0]);
    setEdit(null);
  }

  return (
    <div>
      <Row>
        <Col xs={3}>
          <div className="perfil-lead-scoring-text">
            <span className="perfil-lead-scoring-text-1">
              Cada vez que um Lead realiza ações específicas, como fazer o
              download de conteúdo, abrir uma campanha de e-mail ou concluir um
              fluxo de automação, é possível atribuir um valor ao seu score.
              Isso possibilita a avaliação do nível de interesse desse Lead em
              relação aos seus produtos ou serviços. Organize essas ações em
              grupos, associando o mesmo valor a materiais de conversão,
              campanhas ou fluxos de automação semelhantes.
              <br />
              <br />
              Cada vez que o Lead realiza uma dessas atividades no grupo, o
              valor correspondente é adicionado à sua pontuação de interesse.
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
                <th>Grupos de Atividades</th>
                <th className="w-25"></th>
                <th className="perfil_lead-action"></th>
              </tr>
            </thead>
            <tbody>
              {interesses.map((e) => (
                <tr>
                  <td>{e.name}</td>
                  <td>
                    <span className="fs-5">{e.pts}</span> <span>pontos</span>
                  </td>
                  <td>
                    <Button color="primary" onClick={() => setEdit(e)}>
                      <b>Editar</b>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button
            onClick={() => setEdit({ id: comum.GenerateId() })}
            color="primary"
          >
            <MdAdd /> Nova propriedade
          </Button>
        </Col>
      </Row>

      <InteresseModalLeadScoring
        visible={edit !== null}
        toggle={() => setEdit(null)}
        data={edit}
        onSave={onSave}
      />
    </div>
  );
}

export default InteresseLeadScoring;
