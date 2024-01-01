import { useState } from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";

function CardDropdown({ title, description, children, onEdit = () => {} }) {
  const [open, setOpen] = useState(false);
  return (
    <Row className="mt-2">
      <Col xs={8}>
        <Card>
          <CardBody>
            <Row className="align-items-center">
              <Col xs={10}>
                <div>
                  <h6>
                    <b>{title}</b>
                  </h6>
                </div>
                <div className="mt-3">
                  <span className="fs-6">
                    Selecione as listas de segmentação para receber suas
                    campanhas e email.
                  </span>
                </div>
              </Col>
              <Col
                xs={2}
                onClick={() => {
                  onEdit();
                  setOpen(!open);
                }}
              >
                <center>
                  <Button color="primary">Editar</Button>
                </center>
              </Col>
            </Row>

            {open ? <div className="mt-2">{children}</div> : null}
          </CardBody>
        </Card>
      </Col>
      <Col xs={2}>{open ? <span>{description}</span> : null}</Col>
    </Row>
  );
}

export default CardDropdown;
