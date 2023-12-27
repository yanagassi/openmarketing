// LeadDetails.js
import React from "react";
import { Col, Card, CardHeader, CardBody } from "reactstrap";

const LeadDetails = ({ lead }) => {
  return (
    <Card id="lead-details">
      <CardHeader>
        <span className="panel-title">Detalhes do Lead</span>
      </CardHeader>
      <CardBody className="list-group list-group-info" style={{ padding: 0 }}>
        <div
          className="list-group-item"
          style={{
            borderRadius: 0,
            borderBottomWidth: 1,
            borderWidth: 0,
            paddingBottom: 0,
          }}
        >
          <small>Email</small>
          <p>
            <a href={"mailto:" + lead?.email}>{lead?.email}</a>
          </p>
        </div>

        {/* <div className="list-group-item">
                      {JSON.stringify(lead.data)}
                    </div> */}

        <div className="list-group-item">
          <a
            target="_blank"
            className="evergage-lead-reference-linkedin"
            href={`http://www.linkedin.com/search/results/people/?keywords="${lead?.name}"`}
          >
            <i className="xicon-linkedin2"></i> Procurar Lead no LinkedIn
          </a>
        </div>
        <div className="list-group-item">
          <a
            target="_blank"
            href={`https://www.google.com.br/search?q="${lead?.name}"`}
          >
            <i className="xicon-google"></i>Procurar Lead no Google
          </a>
        </div>
      </CardBody>
    </Card>
  );
};

export default LeadDetails;
