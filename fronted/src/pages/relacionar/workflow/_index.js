import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from "reactflow";

import "reactflow/dist/style.css";
import MenuGenerical from "../../../components/MenuGenerical";
import CustomNode from "../../../components/Workflow/CustomNode";
import comum from "../../../helpers/comum";
import { Button, Col, Row } from "reactstrap";
import { MdBallot, MdOutlineStart, MdRunCircle, MdStart } from "react-icons/md";
import NodeEditor from "./NodeEditor";

const initialNodes = [
  {
    id: "1",
    type: "custom",
    position: { x: 100, y: 100 },
    data: {
      title: "Entrada",
      inputs: [{ id: "input_1", type: "source" }],
    },
  },
  {
    id: "2",
    type: "custom",
    position: { x: 200, y: 200 },
    data: {
      title: "2",
      inputs: [{ id: "target_1", type: "target" }],
    },
  },
];

const initialEdges = [
  {
    source: "1",
    sourceHandle: "input_1",
    target: "2",
    targetHandle: "target_1",
    id: comum.GenerateId(),

    // Default values
    type: "step",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#2a4f95",
    },

    style: {
      strokeWidth: 4,
      stroke: "var(--primary)",
    },
  },
];

const nodeTypes = {
  custom: CustomNode,
};

function FlowTool() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeOpen, setNodeOpen] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  useEffect(() => {
    console.log(edges);
  }, [edges]);

  function changeNode(node, drag = false) {
    if (nodeOpen === null) {
      setNodeOpen(node);
      return;
    }

    if (node.id !== nodeOpen.id) setNodeOpen(node);
  }

  return (
    <>
      <MenuGenerical title={"Worflow Beta"} onSave={() => {}}>
        <Button className="button-mid-height" color="primary">
          <MdBallot /> Rodar
        </Button>
      </MenuGenerical>

      <Row style={{ width: "101vw" }}>
        <Col xs={nodeOpen ? 9 : 12}>
          <div style={{ height: "calc(100vh - 60px)" }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              onNodeDragStart={(_, nodeActive) => {
                changeNode(nodeActive, true);
              }}
              onPaneClick={() => setNodeOpen(null)}
              onConnect={onConnect}
              fitView
            >
              <Controls />
              <Background variant="lines" />
            </ReactFlow>
          </div>
        </Col>
        {nodeOpen ? (
          <Col
            className="node-editor__container"
            style={{ padding: 0, margin: 0 }}
          >
            <NodeEditor node={nodeOpen} onClose={() => setNodeOpen(null)} />
          </Col>
        ) : null}
      </Row>
    </>
  );
}

export default FlowTool;
