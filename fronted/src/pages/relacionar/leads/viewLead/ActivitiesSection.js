// ActivitiesSection.js
import React from "react";
import { Card, CardHeader, CardBody, Row, Col, Badge } from "reactstrap";
import { MdEmojiEvents } from "react-icons/md";
import { IoIosFunnel } from "react-icons/io";

import comum from "../../../../helpers/comum";
import LP_LEADS_REQUEST_TYPE from "../../../../constants/LPLeadsRequestType";

const ActivitiesSection = ({ lead = { events: [] } }) => {
  return (
    <Card>
      <CardHeader>
        <h6 className="panel-title">
          Atividades do Lead ({lead?.events?.length ?? "0"})
        </h6>
      </CardHeader>
      <CardBody
        style={{
          width: "100%",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        {lead.events?.sort(comum.CompareDateToSortDesc).map((e) => (
          <Row className="event-list mt-1">
            <Col xs="8">
              <div style={{ marginBottom: 10 }}>
                <div>
                  <span className="convert-event">
                    {LP_LEADS_REQUEST_TYPE.CREATED != e.type_event ? (
                      <MdEmojiEvents color="gold" size={25} />
                    ) : (
                      <IoIosFunnel color="var(--primary)" />
                    )}{" "}
                    {
                      /// Aqui eu coloquei mais como um exemplo, depois tenho que voltar a justar a nomeclatura padrão de eventos, retornando um texto por evento, e um generio caso não exista.
                    }
                    {LP_LEADS_REQUEST_TYPE.CREATED != e.type_event
                      ? "Converteu no evento:"
                      : "Teve seu estágio no funil alterado para 'Lead'."}
                  </span>
                </div>
                <div style={{ marginLeft: 30 }} className="mt-1">
                  <Badge>{e.type_event}</Badge>
                  <p className="mt-1">Origem: Desconhecida</p>
                </div>
              </div>
            </Col>
            <Col>
              <p className="event-date">{comum.ParseDate(e.event_date)}</p>
            </Col>
            <div
              className="divider"
              style={{ marginLeft: 40, width: "calc(100% - 45px)" }}
            ></div>
          </Row>
        ))}
      </CardBody>
    </Card>
  );
};

export default ActivitiesSection;
