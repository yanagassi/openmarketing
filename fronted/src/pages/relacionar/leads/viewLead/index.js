import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import "../../../../assets/css/lead.css";
import leads from "../../../../models/leads";
import TagsSection from "./TagsSection";
import LeadDetails from "./LeadDetails";
import NotesSection from "./NotesSection";
import ActivitiesSection from "./ActivitiesSection";
import LeadData from "./LeadData";

const ViewLead = () => {
  const [lead, setLead] = useState(null);
  const { id_lead } = useParams();

  async function init() {
    const data = await leads.get_lead_by_id(id_lead);
    setLead(data);
  }

  useEffect(() => {
    init();
  }, []);

  if (!lead) return <></>;
  return (
    <Container className="main-content-view-leads mb-4">
      <Row className="mt-4">
        <Col xs="12">
          <div className="card">
            <div className="card-header" id="lead-header">
              <Row>
                <Col xs="2">
                  <img
                    data-src="https://secure.gravatar.com/avatar/b7fddc094c3875e0068ad5f8f2329115?s=210&amp;d=https://d3ndvx6e67vt0s.cloudfront.net/assets/avatar_-cc48418c0a3578157a08a9059b137c08e4c6b8de59ca931995b402e9c5a21fa8.png"
                    className="img-thumbnail mb-1"
                    alt={lead?.name}
                    src="https://secure.gravatar.com/avatar/b7fddc094c3875e0068ad5f8f2329115?s=210&amp;d=https://d3ndvx6e67vt0s.cloudfront.net/assets/avatar_-cc48418c0a3578157a08a9059b137c08e4c6b8de59ca931995b402e9c5a21fa8.png"
                  />
                </Col>
                <Col xs="4">
                  <h4 id="lead-name">{lead?.name}</h4>
                  <div id="lead-lifecycle-stage">
                    <i className="lead-icon xicon-filter"></i>{" "}
                    <strong>Estágio do funil:</strong>{" "}
                    <span id="stage_name">-</span>
                  </div>
                  <div id="lead-owner" className="js-lead-owner">
                    <i className="lead-icon xicon-user"></i>{" "}
                    <strong>Dono do Lead:</strong>
                    <span>
                      <span> Sem dono</span>
                    </span>
                  </div>
                </Col>
                <Col xs="2" className="text-right">
                  {/* Conteúdo da coluna direita ... */}
                  {/* {JSON.stringify(lead?.data)} */}
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs="12" className="mt-3">
          <div id="lead-body">
            <Row>
              <Col xs="4">
                <LeadDetails lead={lead} />

                <TagsSection lead={lead} />
                <NotesSection lead={lead} />
                <LeadData lead={lead} />
              </Col>

              <Col xs="8">
                <ActivitiesSection lead={lead} />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewLead;
