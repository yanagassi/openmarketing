import { Button, Col, Row } from "reactstrap";
import comum from "../../../helpers/comum";

function LandingPages() {
  return (
    <>
      <Row>
        <Col md={10}>
          <h4>Landing Pages</h4>
        </Col>
        <Col>
          <Button
            onClick={() => comum.Redirect("/landing-pages/create")}
            color="dark"
          >
            Criar Landing Page
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default LandingPages;
