import { Button, Col, Row } from "reactstrap";
import MenuGenerical from "../../../components/MenuGenerical";
import { MdBallot } from "react-icons/md";
import WorkflowStep from "../../../components/Workflow/WorkflowStep";
import { useState } from "react";

import comum from "../../../helpers/comum";
import NodeEditor from "./NodeEditor";

const nodestes = { id: "dasdass", data: { title: "ENTRADA 1" } };
const initalNodes = [{ ...nodestes, fixed: true }];

function FlowTool({}) {
  const [nodeOpen, setNodeOpen] = useState(null);
  const [nodes, setNodes] = useState(initalNodes);

  function changeNode(node, drag = false) {
    if (nodeOpen === null) {
      setNodeOpen(node);
      return;
    }

    if (node.id !== nodeOpen?.id) setNodeOpen(node);
  }

  function removeNode(node) {
    const filtered = nodes.filter((e) => e.id !== node.id);
    setNodes(filtered);
    setNodeOpen(null);
  }

  function addNode(node) {
    const index = nodes
      .map(function (e) {
        return e.id;
      })
      .indexOf(node.id);

    let newNode = [...nodes];

    newNode.splice(index + 1, 0, {
      ...nodestes,
      id: comum.GenerateId(),
      data: { title: comum.GenerateId() },
    });
    setNodes(newNode);
  }

  return (
    <div>
      <MenuGenerical title={"Worflow Beta"} onSave={() => {}}>
        <Button className="button-mid-height" color="primary">
          <MdBallot /> Rodar
        </Button>
      </MenuGenerical>

      <Row style={{ width: "100vw", margin: 0, padding: 0 }}>
        <Col xs={nodeOpen ? 9 : 12} style={{ paddingRight: 0, paddingLeft: 0 }}>
          <WorkflowStep
            nodes={nodes}
            onNodeClick={(e) => changeNode(e)}
            onRemoveNode={(e) => removeNode(e)}
            onAddClick={(e) => addNode(e)}
            onPaneDoubleClick={() => setNodeOpen(null)}
          />
        </Col>
        {nodeOpen ? (
          <Col
            className="node-editor__container"
            style={{ padding: 0, margin: 0, paddingRight: 0, paddingLeft: 0 }}
          >
            <NodeEditor node={nodeOpen} onClose={() => setNodeOpen(null)} />
          </Col>
        ) : null}
      </Row>
    </div>
  );
}

export default FlowTool;
