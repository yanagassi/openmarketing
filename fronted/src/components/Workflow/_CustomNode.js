import React, { memo } from "react";
import { Handle, useReactFlow, useStoreApi, Position } from "reactflow";
import "../../assets/css/custom_node.css";
import { Card, CardBody, CardHeader } from "reactstrap";
import { FaPlus } from "react-icons/fa";

function Select({ value, handleId, nodeId }) {
  const { setNodes } = useReactFlow();
  const store = useStoreApi();

  const onChange = (evt) => {
    const { nodeInternals } = store.getState();
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            selects: {
              ...node.data.selects,
              [handleId]: evt.target.value,
            },
          };
        }

        return node;
      })
    );
  };

  return (
    <div className="custom-node__select">
      <div>Edge Type</div>
      <select className="nodrag" onChange={onChange} value={value}></select>
    </div>
  );
}

function CustomNode({ id, data }) {
  const { inputs = [] } = data;

  return (
    <Card className="custm-node__main">
      <CardHeader className="custom-node__header">
        <span>{data?.title}</span>
      </CardHeader>
      <CardBody>
        <span style={{ fontSize: 10 }}>{JSON.stringify(data)}</span>
      </CardBody>

      <div className="custom-node__body">
        {inputs.map((inpt) => (
          <Handle
            type={inpt.type}
            position={inpt.type == "source" ? Position.Right : Position.Left}
            id={inpt.id}
            // onClick={() => alert("ssssss")}
            style={{
              background: "var(--primary)",
              marginLeft: -8,
              marginRight: -8,
              width: 20,
              height: 20,
            }}
          >
            {/* {inpt.type === "source" ? (
              <FaPlus
                color="var(--white)"
                fontSize={10}
                style={{ marginTop: -8, marginLeft: 4, zIndex: 0 }}
              />
            ) : null} */}
          </Handle>
        ))}
      </div>
      <div>Plus</div>
    </Card>
  );
}

export default memo(CustomNode);
