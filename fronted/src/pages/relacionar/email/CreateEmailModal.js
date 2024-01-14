import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import email from "../../../models/email";
import { useParams } from "react-router-dom";

const CreateEmailModal = ({ isOpen, toggle }) => {
  const [form, setForm] = useState({ name: "" });

  async function submit(e) {
    e.preventDefault();
    const data = await email.create_email(form);
    if (data) {
      toggle();
    }
  }

  return (
    <Modal size="md" isOpen={isOpen} toggle={toggle}>
      <Form onSubmit={submit}>
        <ModalHeader>Criar email</ModalHeader>
        <ModalBody>
          <div>
            <Label>Nome</Label>
            <Input
              value={form?.name}
              required={true}
              onChange={({ target }) =>
                setForm({ ...form, name: target.value })
              }
            />
          </div>
          <div className="mt-2 w-100">
            <span className="text-secondary text-justify">
              Usando um nome para identificar o email, facilita na memorização.
              Ele será utilizado como identificado do email em outras partes da
              plataforma.
            </span>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => toggle()}>Cancelar</Button>
          <Button color="primary" type="submit">
            Criar email
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};
export default CreateEmailModal;
