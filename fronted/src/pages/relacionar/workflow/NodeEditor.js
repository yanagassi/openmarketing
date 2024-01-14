import { Button, CardHeader } from "reactstrap";
import "../../../assets/css/node_editor.css";
import { MdClose } from "react-icons/md";

function NodeEditor({ node, onClose }) {
  const { data } = node;
  return (
    <div style={{ marginTop: 40 }}>
      <CardHeader>
        <div className="d-flex flex-row justify-content-between">
          <span>{data?.title}</span>

          <Button
            color="transparent"
            className="button-mid-height"
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
