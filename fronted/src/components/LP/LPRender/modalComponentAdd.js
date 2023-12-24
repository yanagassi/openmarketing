import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { KEY_TYPES } from "../../../constants/LpContants";

const ModalComponentAdd = ({ modalOpen, setModalOpen, addNewElement, id }) => {
  const [select, setSelect] = useState(null);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  function add() {
    addNewElement(id, !select || select == "" ? "h1" : select);
    toggleModal();
  }

  return (
    <Modal isOpen={modalOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Novo Componente</ModalHeader>
      <ModalBody>
        <Input type="select" onChange={({ target }) => setSelect(target.value)}>
          {KEY_TYPES.map((e) => {
            return <option value={e.type}>{e.label}</option>;
          })}
        </Input>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggleModal}>
          Fechar
        </Button>{" "}
        <Button color="primary" onClick={() => add()}>
          Adicionar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalComponentAdd;
