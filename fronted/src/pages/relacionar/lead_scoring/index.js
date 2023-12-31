import React, { useEffect, useState } from "react";
import {
  Container,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import "../../../assets/css/LPPage.css";
import leads from "../../../models/leads";
import PerfilLeadScoring from "./perfilLeadScoring";
import InteresseLeadScoring from "./interesseLeadScoring";

function LeadScoring() {
  const isLeadScoring = window.location.pathname === "/lead-scoring";
  const [my_leads, setMyLeads] = useState([]);
  const [activeTab, setActiveTab] = useState(
    isLeadScoring ? "perfil" : "interesse"
  );

  async function init() {
    const data = await leads.get_leads();
    setMyLeads(data);
  }

  useEffect(() => {
    init();
  }, []);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <Container>
      <Col className="mt-4">
        <h4 className="mb-4">
          Lead {isLeadScoring ? "Scoring" : "Tracking"}{" "}
          <span style={{ fontWeight: "200" }}>({my_leads?.length})</span>
        </h4>
      </Col>

      <Nav tabs className="mb-3">
        {isLeadScoring ? (
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "perfil" })}
              onClick={() => toggleTab("perfil")}
            >
              Perfil
            </NavLink>
          </NavItem>
        ) : (
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "interesse" })}
              onClick={() => toggleTab("interesse")}
            >
              Interesse
            </NavLink>
          </NavItem>
        )}
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="perfil">
          <PerfilLeadScoring />
        </TabPane>
        <TabPane tabId="interesse">
          <InteresseLeadScoring />
        </TabPane>
      </TabContent>
    </Container>
  );
}

export default LeadScoring;
