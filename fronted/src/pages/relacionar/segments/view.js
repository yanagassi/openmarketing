import { Card, Col, Row, Table } from "reactstrap";
import DynamicForm from "./DynamicForm";
import { useState } from "react";

function SegmentView() {
  const [dataView, setDataView] = useState([]);
  function get_ms(key, value) {
    try {
      const a = key?.[value];
      if (typeof a === "string") {
        return a;
      }

      return JSON.stringify(a);
    } catch {
      return "";
    }
  }
  return (
    <div
      className="mb-4 mt-4 ml-4"
      style={{ paddingLeft: "2%", paddingRight: "2%" }}
    >
      <Row>
        <Col xs={7} className="mt-8">
          <h4 className="mb-4">Segmentação de Leads</h4>
          <DynamicForm onDataChange={setDataView} />
        </Col>
        <Col xs={5}>
          <h6 className="mb-3">Leads filtrados:</h6>
          <Card>
            <div style={{ overflowX: "auto", minHeight: "70vh" }}>
              {dataView.length === 0 ? (
                <span className="m-1">Nenhum lead encontrado.</span>
              ) : null}
              <Table striped hover style={{ width: 400, overflow: "auto" }}>
                <thead>
                  <tr>
                    {dataView.length > 0 ? (
                      <>
                        <th>Name</th>
                        <th>Email</th>
                        {Object.keys(dataView[0])
                          .filter(
                            (field) => field !== "name" && field !== "email"
                          )
                          .map((field) => (
                            <th key={field}>{field}</th>
                          ))}
                      </>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {dataView.length > 0
                    ? dataView.map((product, index) => (
                        <tr key={index}>
                          <td>{get_ms(product, "name")}</td>
                          <td>{get_ms(product, "email")}</td>
                          {Object.keys(dataView[0])
                            .filter(
                              (field) => field !== "name" && field !== "email"
                            )
                            .map((field) => (
                              <td key={field}>{get_ms(product, field)}</td>
                            ))}
                        </tr>
                      ))
                    : null}
                </tbody>
              </Table>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default SegmentView;
