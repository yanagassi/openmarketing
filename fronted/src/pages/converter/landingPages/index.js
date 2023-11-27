import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Container, Input, Row, Table } from "reactstrap";
import comum from "../../../helpers/comum";
import "../../../assets/css/LPPage.css";
import landing_pages from "../../../models/landing_pages";
import { MdVisibility, MdCopyAll } from "react-icons/md";

function LandingPages() {
  const [lps, setLps] = useState([]);

  async function init() {
    const data = await landing_pages.get_lps_by_organization();
    setLps(data);
    console.log(data);
  }

  useEffect(() => {
    init();
  }, []);

  if (lps.length == 0)
    return (
      <Row className="justify-content-center align-items-center mt-6 main-lp">
        <Col xs={12} md={10} className="text-center">
          <h4 className="mb-4">Landing Pages</h4>
          <img
            src="https://img.freepik.com/free-vector/cartoon-exhausted-woman-sitting-table-working_74855-6943.jpg"
            alt="Imagem ilustrativa de landing pages"
            className="img-fluid"
            style={{ maxWidth: 450 }}
          />
          <p className="mt-4">Comece a converter Leads!</p>
          <p>
            Crie facilmente páginas de conversão para conseguir os dados dos
            seus visitantes em troca de conteúdos relevantes.
          </p>
          <div className="mt-5">
            <Button
              color="dark"
              href="/landing-pages/create"
              target="_blank"
              disabled={true}
              tabIndex="0"
              className="mr-2"
            >
              Veja como fazer
            </Button>{" "}
            <Button color="dark" href="/landing-pages/create" tabIndex="0">
              Criar Landing Page
            </Button>
          </div>
        </Col>
      </Row>
    );

  return (
    <Container>
      <Col className="mt-4">
        <h4 className="mb-4">Landing Pages</h4>
        <div className="sm-1">
          <Col md={2}>
            <Input
              type="text"
              placeholder="Buscar Landing Page"
              className="mb-2"
            />
          </Col>
        </div>

        <Table
          className="mt-1 table-press-lp"
          bordered
          responsive
          striped
          summary="Lista de landing pages"
        >
          <thead>
            <tr>
              <th>
                <div role="button" tabIndex="0" className="table-header">
                  Nome da Landing Page
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
            {lps?.map((e) => (
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
                      href={`/landing-pages/edit/${e.id}`}
                      tabIndex="0"
                      className="landing-page-link"
                    >
                      {e.title}
                    </a>
                    <Badge className="status">Publicada</Badge>
                  </div>
                </td>
                <td className="col-3">
                  <div className="date">
                    <p>{comum.ParseDate(e.updated_at ?? e.created_at)}</p>
                  </div>
                </td>
                <td className="col-2">
                  <center>
                    <Button
                      type="button"
                      className="statistics-button"
                      onClick={() => comum.Redirect(`/view/${e.id}`, true)}
                    >
                      <MdVisibility /> <span>Ver</span>
                    </Button>{" "}
                    <Button type="button" className="statistics-button">
                      <MdCopyAll /> <span>Copiar link</span>
                    </Button>
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

export default LandingPages;
