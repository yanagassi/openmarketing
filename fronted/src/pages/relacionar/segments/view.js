import React, { useState } from "react";
import { Card, Col, Row } from "reactstrap";
import DynamicForm from "./DynamicForm";
import FilteredLeadsTable from "./FilteredLeadsTable";

function SegmentView() {
  const [dataView, setDataView] = useState([]);

  return (
    <>
      <div
        className="mb-4  ml-4"
        style={{ paddingLeft: "2%", paddingRight: "2%" }}
      >
        <Row>
          <Col xs={7}>
            <DynamicForm onDataChange={setDataView} />
          </Col>
          <Col xs={5}>
            <div className="dynamic-result">
              <h6 className="mb-3">Leads filtrados:</h6>
              <Card>
                <div style={{ overflowX: "auto", minHeight: "70vh" }}>
                  {dataView.length === 0 ? (
                    <span className="m-1">Nenhum lead encontrado.</span>
                  ) : null}
                  <FilteredLeadsTable dataView={dataView} />
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default SegmentView;
