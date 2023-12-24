import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from "reactstrap";
import segments from "../../../models/segments";
import comum from "../../../helpers/comum";

function NewSegmentModal({ modal, setModal }) {
  const toggle = () => setModal(!modal);

  const [body, setBody] = useState({ segment_name: "" });

  async function save() {
    const data = await segments.create_segment({
      name: body.segment_name,
    });

    if (data) {
      comum.Redirect(`/segments/${data.id}`);
    }
  }

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Segmentação de Leads</ModalHeader>
        <ModalBody>
          <Label>Nome do segmentação:</Label>
          <Input
            value={body.segment_name}
            name="segment_name"
            onChange={({ target }) => {
              setBody({
                ...body,
                segment_name: target.value,
              });
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => toggle()}>
            Cancelar
          </Button>{" "}
          <Button color="primary" onClick={() => save()}>
            Criar Segmento
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default NewSegmentModal;
