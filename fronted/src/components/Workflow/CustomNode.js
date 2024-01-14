import { Button, Card, CardBody, CardHeader } from "reactstrap";
import "../../assets/css/custom_node.css";
import { MdClose } from "react-icons/md";

function CustomNode({ node, onClick, onRemoveNode }) {
  const { data, fixed = false } = node;
  return (
    <div>
      <Card className="custom-node__main">
        <CardHeader>
          <div className="d-flex justify-content-between align-items-center">
            <span onClick={() => onClick(node)}>{data?.title}</span>
            {!fixed ? (
              <Button
                color="trasnparent p-0"
                onClick={() => onRemoveNode(node)}
              >
                <MdClose />
              </Button>
            ) : null}
          </div>
        </CardHeader>
        <CardBody onClick={() => onClick(node)}>
          <span>{JSON.stringify(data)}</span>
        </CardBody>
      </Card>
    </div>
  );
}

export default CustomNode;
