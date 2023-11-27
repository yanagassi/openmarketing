import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardHeader,
  Badge,
} from "reactstrap";
import { useParams } from "react-router-dom";
import "../../../../assets/css/lead.css";
import leads from "../../../../models/leads";
import comum from "../../../../helpers/comum";
import { MdEmojiEvents, MdTimeline, MdWineBar } from "react-icons/md";
import { IoIosFunnel } from "react-icons/io";
import LP_LEADS_REQUEST_TYPE from "../../../../constants/LPLeadsRequestType";

const ViewLead = () => {
  const [lead, setLead] = useState(null);
  const { id_lead } = useParams();

  async function init() {
    const data = await leads.get_lead_by_id(id_lead);
    setLead(data);
    console.log(data);
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
                <Card id="lead-details">
                  <CardHeader>
                    <h6 className="panel-title">Detalhes do Lead</h6>
                  </CardHeader>
                  <CardBody
                    className="list-group list-group-info"
                    style={{ padding: 0 }}
                  >
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
                        <i className="xicon-linkedin2"></i> Procurar Lead no
                        LinkedIn
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

                <Card className="mt-2">
                  <CardHeader>
                    <h6 className="panel-title">Tags</h6>
                  </CardHeader>
                  <CardBody>
                    <p>
                      <small>Este Lead não possui tags.</small>
                    </p>

                    <div className="panel-footer">
                      <Button
                        className="btn btn-default btn-sm"
                        role="button"
                        data-toggle="modal"
                        href="#add_tags"
                      >
                        Adicionar
                      </Button>
                    </div>
                  </CardBody>
                </Card>

                <Card className="mt-2">
                  <CardHeader>
                    <h6 className="panel-title">Anotações</h6>
                  </CardHeader>
                  <form
                    className="loading-container"
                    id="new_lead"
                    action="/leads/3322090933/notes"
                    accept-charset="UTF-8"
                    data-remote="true"
                    method="post"
                  >
                    <input
                      name="utf8"
                      type="hidden"
                      value="✓"
                      autocomplete="off"
                    />
                    <input
                      type="hidden"
                      name="_method"
                      value="patch"
                      autocomplete="off"
                    />
                    <CardBody>
                      <div
                        className="form-group"
                        style={{ position: "relative" }}
                      >
                        <textarea
                          rows="3"
                          className="form-control"
                          style={{ maxWidth: "100%" }}
                          name="lead[bio]"
                          id="lead_bio"
                        ></textarea>
                      </div>

                      <Button
                        name="note_submit"
                        type="submit"
                        className="btn btn-default btn-sm mt-2"
                      >
                        Salvar
                      </Button>
                    </CardBody>
                  </form>
                </Card>
              </Col>

              <Col xs="8">
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
                    {lead.events.sort(comum.CompareDateToSortDesc).map((e) => (
                      <Row className="event-list">
                        <Col xs="8">
                          <div style={{ marginBottom: 10 }}>
                            <div>
                              <span>
                                {LP_LEADS_REQUEST_TYPE.CREATED !=
                                e.type_event ? (
                                  <MdEmojiEvents color="gold" size={25} />
                                ) : (
                                  <IoIosFunnel color="var(--primary)" />
                                )}{" "}
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
                          <p className="event-date">
                            {comum.ParseDate(e.event_date)}
                          </p>
                        </Col>
                      </Row>
                    ))}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewLead;
