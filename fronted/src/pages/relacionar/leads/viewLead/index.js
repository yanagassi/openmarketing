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
import {
  MdShoppingCart,
  MdShoppingCartCheckout,
  MdStar,
  MdStarOutline,
} from "react-icons/md";

import leads_events from "../../../../models/leads_events";
import LP_LEADS_REQUEST_TYPE from "../../../../constants/LPLeadsRequestType";
import comum from "../../../../helpers/comum";

const ViewLead = () => {
  const [lead, setLead] = useState(null);
  const { id_lead } = useParams();

  const [funilStages, setFunilStages] = useState({
    [LP_LEADS_REQUEST_TYPE.OPPORTUNITY]: false,
    [LP_LEADS_REQUEST_TYPE.SALE]: false,
  });

  async function send_event(type_event) {
    const data = await leads_events.send_event({
      email: lead.email,
      lead_id: id_lead,
      data: {},
      type: type_event,
    });
    if (data) {
      init();
      setFunilStages({
        ...funilStages,
        [type_event]: !lead[type_event],
      });
    }
  }

  async function cancel_event(type_event, evnt_id) {
    if (!type_event || !evnt_id) return;

    const data = await leads_events.delete_event(evnt_id);
    if (data) {
      init();
      setFunilStages({
        ...funilStages,
        [type_event]: !lead[type_event],
      });
    }
  }

  async function init() {
    const data = await leads.get_lead_by_id(id_lead);
    setLead(data);

    setFunilStages({
      ...funilStages,
      ...{
        [LP_LEADS_REQUEST_TYPE.OPPORTUNITY]:
          data[LP_LEADS_REQUEST_TYPE.OPPORTUNITY] ?? false,
        [LP_LEADS_REQUEST_TYPE.SALE]: data[LP_LEADS_REQUEST_TYPE.SALE] ?? false,
      },
    });
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
                <Col
                  xs={
                    funilStages[LP_LEADS_REQUEST_TYPE.OPPORTUNITY] ||
                    funilStages[LP_LEADS_REQUEST_TYPE.SALE]
                      ? "4"
                      : "5"
                  }
                >
                  <h4 id="lead-name">{lead?.name}</h4>
                  <div
                    id="lead-lifecycle-stage"
                    className="lead-lifecycle-stage"
                  >
                    <i className="lead-icon xicon-filter"></i>{" "}
                    <strong>Estágio do funil:</strong>{" "}
                    <span id="stage_name">{comum.FunilStageCalc(lead)}</span>
                  </div>

                  <div id="lead-owner" className="js-lead-owner">
                    <i className="lead-icon xicon-user"></i>{" "}
                    <strong>Dono do Lead:</strong>
                    <span>
                      <span> Sem dono</span>
                    </span>
                  </div>
                  <div
                    id="lead-lifecycle-stage"
                    className="lead-lifecycle-stage"
                  >
                    <i className="lead-icon xicon-filter"></i>{" "}
                    <strong>Lead Score:</strong>{" "}
                    <span id="stage_name">
                      {`${lead.lead_scoring_interesse?.toFixed(1)}`.replace(
                        ".",
                        ","
                      )}
                    </span>
                  </div>
                  <div
                    className="lead-lifecycle-stage"
                    style={{ display: "flex", alignContent: "center" }}
                  >
                    <span>
                      {" "}
                      {`${lead.lead_scoring_perfil?.toFixed(1)}`.replace(
                        ".",
                        ","
                      )}{" "}
                    </span>
                    <MdStar size={18} color="var(--yellow)" />
                  </div>
                </Col>
                <Col className="text-right mt-auto">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingLeft: "10%",
                    }}
                  >
                    {funilStages[LP_LEADS_REQUEST_TYPE.SALE] ? (
                      <a
                        className={"text-success option-lead-item"}
                        onClick={() =>
                          cancel_event(
                            LP_LEADS_REQUEST_TYPE.SALE,
                            lead[`${LP_LEADS_REQUEST_TYPE.SALE}_ID`]?.id
                          )
                        }
                      >
                        <MdShoppingCart /> Desmarcar Venda{" "}
                      </a>
                    ) : (
                      <a
                        className={"text-primary option-lead-item"}
                        onClick={() => send_event(LP_LEADS_REQUEST_TYPE.SALE)}
                      >
                        <MdShoppingCartCheckout /> Marcar Venda{" "}
                      </a>
                    )}{" "}
                    {funilStages[LP_LEADS_REQUEST_TYPE.OPPORTUNITY] ? (
                      <a
                        className="text-gold option-lead-item"
                        style={{ color: "gold" }}
                        onClick={() =>
                          cancel_event(
                            LP_LEADS_REQUEST_TYPE.OPPORTUNITY,
                            lead[`${LP_LEADS_REQUEST_TYPE.OPPORTUNITY}_ID`]?.id
                          )
                        }
                      >
                        <MdStar /> Desmarcar uma Oportunidade{" "}
                      </a>
                    ) : (
                      <a
                        className="text-primary option-lead-item"
                        onClick={() =>
                          send_event(LP_LEADS_REQUEST_TYPE.OPPORTUNITY)
                        }
                      >
                        <MdStarOutline /> Marcar uma Oportunidade{" "}
                      </a>
                    )}
                  </div>
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
