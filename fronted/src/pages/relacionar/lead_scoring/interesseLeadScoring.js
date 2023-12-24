import { useState } from "react";
import { Button, Col, Row, Table } from "reactstrap";

function InteresseLeadScoring({}) {
  const [interesses, setInteresses] = useState([
    {
      id: "asdmlaskmd2",
      name: "Participantes do Evento",
      pts: 10,
    },
    {
      id: "23121312r5d2",
      name: "Download E-book",
      pts: 30,
    },

    {
      id: "d21e1d12d`1",
      name: "Comprou",
      pts: 50,
    },

    {
      id: "d21e1d12d`1",
      name: "Black List",
      pts: -150,
    },
  ]);

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
                    <Button color="primary">
                      <b>Editar</b>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}

export default InteresseLeadScoring;
