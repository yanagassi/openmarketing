import React from "react";
import { Card, CardHeader, CardBody, Row, Col, Badge } from "reactstrap";
import { MdEmojiEvents } from "react-icons/md";
import { IoIosFunnel } from "react-icons/io";

import comum from "../../../../helpers/comum";
import LP_LEADS_REQUEST_TYPE from "../../../../constants/LPLeadsRequestType";

const ActivitiesSection = ({ lead = { events: [] } }) => {
  const { events } = lead;

  const panelTitle = `Atividades do Lead (${events?.length || "0"})`;

  const cardBodyStyle = {
    width: "100%",
    maxHeight: "80vh",
    overflowY: "auto",
    padding: "2%",
    paddingRight: "2%",
  };

  return (
    <Card>
      <CardHeader>
        <span className="panel-title">{panelTitle}</span>
      </CardHeader>
      <CardBody style={cardBodyStyle}>
        {events?.map((event, index) => (
          <Row className="event-list mt-1" key={index}>
            <Col xs="8">
              <div style={{ marginBottom: 10 }}>
                <div>
                  <span className="convert-event">
                    {LP_LEADS_REQUEST_TYPE.CREATED !== event.type_event ? (
                      <MdEmojiEvents color="gold" size={25} />
                    ) : (
                      <IoIosFunnel color="var(--primary)" />
                    )}{" "}
                    {LP_LEADS_REQUEST_TYPE.CREATED !== event.type_event
                      ? "Converteu no evento:"
                      : "Teve seu estágio no funil alterado para 'Lead'."}
                  </span>
                </div>
                <div
                  style={{
                    marginLeft: 30,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div>
                    <Badge>{event.type_event}</Badge>
                  </div>
                  {event.href !== "" && (
                    <span style={{ fontSize: 12 }} className="mt-2">
                      <b>Origem:</b>{" "}
                      <a target="_blank" href={event.href}>
                        {event?.lp_data?.title || event.href}
                      </a>
                    </span>
                  )}
                </div>
              </div>
            </Col>
            <Col>
              <p className="event-date">{comum.ParseDate(event.event_date)}</p>
            </Col>
            {index !== events.length - 1 && (
              <div
                className="divider"
                style={{ marginLeft: 40, width: "calc(100% - 45px)" }}
              />
            )}
          </Row>
        ))}
      </CardBody>
    </Card>
  );
};

export default ActivitiesSection;
