import { Button, CardHeader } from "reactstrap";
import "../../../assets/css/node_editor.css";
import { MdClose } from "react-icons/md";

function NodeEditor({ node, onClose }) {
  const { data } = node;
  return (
    <div style={{ marginTop: 40 }} className="node-editor__main">
      <CardHeader>
        <div className="d-flex flex-row justify-content-between p-0">
          <span>{data?.title}</span>

          <Button
            color="transparent"
            className="button-mid-height p-0"
            onClick={() => onClose()}
          >
            <MdClose size={14} />
          </Button>
        </div>
      </CardHeader>

      <div className="p-2">
        <span>{JSON.stringify(data)}</span>
      </div>
    </div>
  );
}

export default NodeEditor;
