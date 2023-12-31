import { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "reactstrap";
import InteresseModalLeadScoring from "./interesseModalLeadScoring";
import comum from "../../../helpers/comum";
import lead_scoring from "../../../models/lead_scoring";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";

function InteresseLeadScoring({}) {
  const [edit, setEdit] = useState(null);
  const [interesses, setInteresses] = useState([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const data = await lead_scoring.list_interesse();
    setInteresses(data);
  }

  async function onSave(id, edit) {
    const final = interesses.map((e) => {
      if (e.id === id) {
        return edit;
      }
      return e;
    });
    setInteresses(final);
    if (!edit.id) {
      await lead_scoring.save_interesse(edit);
    } else {
      await lead_scoring.edit_interesse(edit);
    }

    setEdit(null);
    init();
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
                <th style={{ width: "15%" }}></th>
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
                    <Row>
                      <center>
                        <Button color="danger" onClick={() => setEdit(e)}>
                          <MdDelete />
                        </Button>{" "}
                        <Button color="primary" onClick={() => setEdit(e)}>
                          <MdEdit />
                        </Button>
                      </center>
                    </Row>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button
            onClick={() => setEdit({ id: null, events: [] })}
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
