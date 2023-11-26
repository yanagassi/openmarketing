import React from "react";
import { Button, Col, Row } from "reactstrap";
import comum from "../../../helpers/comum";
import "../../../assets/css/LPPage.css";

function LandingPages() {
  return (
    <Row className="justify-content-center align-items-center mt-6 main-lp">
      <Col xs={12} md={10} className="text-center">
        <h4 className="mb-4">Landing Pages</h4>
        <img
          src="https://img.freepik.com/free-vector/cartoon-exhausted-woman-sitting-table-working_74855-6943.jpg?w=1380&t=st=1701005983~exp=1701006583~hmac=04e70f8236f191ca816b60eeaba26bcbadb9d8a335d12c5e9bea10cbeb1cacd1"
          alt="Imagem ilustrativa de landing pages"
          className="img-fluid"
          style={{ maxWidth: 450 }}
        />
        <p className="mt-4">Comece a converter Leads!</p>
        <p>
          Crie facilmente páginas de conversão para conseguir os dados dos seus
          visitantes em troca de conteúdos relevantes.
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
}

export default LandingPages;
