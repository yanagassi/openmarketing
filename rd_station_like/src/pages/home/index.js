import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";

function HomeScreen() {
  return (
    <Container>
      <Row className="mt-4">
        <h6>Geral:</h6>
        <Col>
          <Card role="button" aria-pressed="true" tabIndex="0">
            <CardBody>
              <CardTitle tag="h5">Visitantes</CardTitle>
              <CardText>-</CardText>
              <CardText>0,00% (0)</CardText>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card role="button" aria-pressed="false" tabIndex="0">
            <CardBody>
              <CardTitle tag="h5">Leads</CardTitle>
              <CardText>-</CardText>
              <CardText>0,00% (0)</CardText>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card role="button" aria-pressed="false" tabIndex="0">
            <CardBody>
              <CardTitle tag="h5">Oportunidades</CardTitle>
              <CardText>-</CardText>
              <CardText>0</CardText>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card role="button" aria-pressed="false" tabIndex="0">
            <CardBody>
              <CardTitle tag="h5">Vendas</CardTitle>
              <CardText>-</CardText>
              <CardText>0</CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <h6>Oportunidades:</h6>
        <Col>
          <Card>
            <CardBody>
              <center>
                <img
                  height="200px"
                  src="https://img.freepik.com/free-vector/coach-speaking-before-audience-mentor-presenting-charts-reports-employees-meeting-business-training-seminar-conference-vector-illustration-presentation-lecture-education_74855-8294.jpg"
                  alt="Landing Page"
                />
              </center>
              <p>Landing Page</p>
              <p>
                Converta visitantes em oportunidades! Aumente significativamente
                a taxa de conversão para a sua campanha de marketing ao criar
                Landing Pages impressionantes!
              </p>
              <center>
                <Button
                  href="/landing-pages/nova"
                  rel="noopener noreferrer"
                  color="primary"
                >
                  Criar Landing Page
                </Button>
              </center>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardBody>
              <center>
                <img
                  height="200px"
                  style={{ padding: 10 }}
                  src="https://img.freepik.com/free-vector/tiny-women-getting-mail-from-mailbox-flat-vector-illustration-cartoon-people-reading-newsletter-social-news-marketing-mail-service-business-concept_74855-10176.jpg"
                  alt="Email Marketing"
                />
              </center>
              <p>Último Email Marketing</p>
              <p>
                Desenvolva jornadas personalizadas para seus clientes,
                aumentando as vendas com comunicações por email direcionadas e
                oportunas. Transforme contatos em clientes fiéis ao proporcionar
                uma boa experiência.
              </p>
              <center>
                {" "}
                <Button
                  href="/email/modelo"
                  rel="noopener noreferrer"
                  color="primary"
                >
                  Criar meu primeiro Email Marketing
                </Button>
              </center>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HomeScreen;
