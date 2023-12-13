// LeadData.js
import React, { useState } from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { MdArrowDropDown } from "react-icons/md";

const LeadData = ({ lead }) => {
  const [active, setActive] = useState(false);

  return (
    <Card className="mt-2">
      <CardHeader
        style={{ border: !active ? "none" : "", cursor: "pointer" }}
        onClick={() => setActive(!active)}
      >
        <Row>
          <Col>
            <h6 className="panel-title">Outros Dados</h6>
          </Col>
          <Col xs="2">
            <MdArrowDropDown size={20} style={{ marginTop: -10 }} />
          </Col>
        </Row>
      </CardHeader>
      {active ? (
        <CardBody>
          {Object.entries(lead?.data ?? {})?.map(([label, value]) => (
            <div>
              <span>
                <b>{label}</b>: {value}
              </span>
            </div>
          ))}
        </CardBody>
      ) : null}
    </Card>
  );
};

export default LeadData;
