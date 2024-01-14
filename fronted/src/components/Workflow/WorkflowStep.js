import "../../assets/css/workflow_step.css";
import CustomNode from "./CustomNode";
import { FaPlus } from "react-icons/fa";

function WorkflowStep({
  nodes = [],
  onNodeClick,
  onAddClick,
  onRemoveNode,
  onPaneDoubleClick,
}) {
  return (
    <div
      className="workflow-step__main"
      onDoubleClick={() => onPaneDoubleClick()}
    >
      {nodes?.map((node) => (
        <div className="workflow-step__node">
          <CustomNode
            node={node}
            onClick={onNodeClick}
            onRemoveNode={() => onRemoveNode(node)}
          />
          <div>
            <div
              className="workdlow-step__btn"
              onClick={() => onAddClick(node)}
            >
              <FaPlus size={13} />
            </div>

            {/* <div
              className="workdlow-step__btn"
              onClick={() => onAddClick(node)}
            >
              <FaPlus />
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default WorkflowStep;
