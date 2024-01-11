import { Button, Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import { useEffect, useState } from "react";
import email from "../../../models/email";

function EmailVariables({ isOpen, toggle, onChange = ({ key, value }) => {} }) {
  const [variables, setVariables] = useState([]);

  async function init() {
    const data = await email.list_all_variables();
    setVariables(data);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <Modal size="lg" isOpen={isOpen} toggle={toggle}>
      <ModalHeader>Adicionar Variável</ModalHeader>
      <ModalBody>
        <span>
          Você pode adicionar variáveis no texto do email clicando sobre o nome
          da variável.
        </span>

        <div className="mt-4">
          <Input placeholder="Buscar variável" />
        </div>

        <div className="mt-4">
          {variables.map((e) => (
            <Button
              className="mb-1 w-100 text-start"
              color="none"
              onClick={() => onChange(e)}
            >
              <span>{e.key}</span>
              <br />
              <span>{e.value}</span>
            </Button>
          ))}
        </div>
      </ModalBody>
    </Modal>
  );
}

export default EmailVariables;
