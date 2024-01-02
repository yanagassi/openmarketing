import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { Button, Card, CardBody, CardFooter, Col, Row } from "reactstrap";

function CardDropdown({
  title,
  sobrescription,
  description,
  blockButton,
  children,
  success,
  onEdit = () => {},
  onEditClick = () => {},
  editFixed = false,
}) {
  const [open, setOpen] = useState(false);
  return (
    <Row className="mt-3">
      <Col xs={9}>
        <Card>
          <CardBody>
            <Row className="align-items-center">
              <Col xs={10}>
                <div>
                  <h6>
                    {success ? <FaCheck className="text-success" /> : null}{" "}
                    <b>{title}</b>
                  </h6>
                </div>
                <div className="mt-3">
                  <span className="fs-6 text-secondary">{sobrescription}</span>
                </div>
              </Col>
              <Col
                xs={2}
                onClick={() => {
                  setOpen(!open);
                  onEditClick();
                }}
              >
                {!open || editFixed ? (
                  <center>
                    <Button color="primary">Editar</Button>
                  </center>
                ) : null}
              </Col>
            </Row>

            {open && children ? <div className="mt-2">{children}</div> : null}
          </CardBody>
          {open && children ? (
            <CardFooter className="d-flex flex-row-reverse">
              <Button
                disabled={blockButton}
                onClick={() => {
                  setOpen(!open);
                  onEdit();
                }}
                color="primary"
              >
                Concluido
              </Button>
            </CardFooter>
          ) : null}
        </Card>
      </Col>
      <Col xs={3}>
        {open
          ? description?.split("\n").map((e) => (
              <div>
                <span>{e}</span>
                <br />
              </div>
            ))
          : null}
      </Col>
    </Row>
  );
}

export default CardDropdown;
