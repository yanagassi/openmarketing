import { Col, Row, Table } from "reactstrap";
import products from "./products.json";
import DynamicForm from "./DynamicForm";

function SegmentView() {
  return (
    <div
      className="mb-4 mt-4 ml-4"
      style={{ paddingLeft: "2%", paddingRight: "2%" }}
    >
      <Row>
        <Col xs={8} className="mt-8">
          <h4 className="mb-4">Filtros</h4>
          <DynamicForm />
        </Col>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                {Object.keys(products[0]).map((field) => (
                  <th key={field}>{field}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  {Object.keys(products[0]).map((field) => (
                    <td key={field}>{product[field]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}

export default SegmentView;
