import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Util,
} from "reactstrap";
import StarRating from "../../../components/StarRating";
import { MdAdd, MdClose, MdDelete, MdPlusOne } from "react-icons/md";

import "../../../assets/css/perfil_modal_lead_scoring.css";
import comum from "../../../helpers/comum";

const OPERATION_TYPES = {
  contem: "contem",
  exato: "exato",
};

const INIT_OBEJCT = (name = "") => {
  return {
    id: comum.GenerateId(),
    name: name,
    rate: 5,
  };
};

function PerfilModalLeadScoring({ visible, toggle, onSave, data }) {
  const [operation, setOperation] = useState(
    data?.operation ?? OPERATION_TYPES.exato
  );
  const [terms, setTerms] = useState(data?.terms);
  const [nameTerm, setName] = useState(data?.name);

  useEffect(() => {
    if (data?.terms) setTerms(data?.terms);
    if (data?.operation) setOperation(data?.operation);
    if (data?.name) setName(data?.name);
  }, [visible]);

  function deleteTerm(id) {
    const final = terms.filter((e) => e.id !== id);
    setTerms(final);
  }

  function changeValue(id, key, value) {
    const final = terms?.map((e) => {
      if (e.id == id) {
        return {
          ...e,
          [key]: value,
        };
      }
      return e;
    });
    setTerms(final);
  }

  function save() {
    if (onSave) {
      onSave({ ...data, operation, terms, name: nameTerm });
    }
  }

  return (
    <Modal size="lg" toggle={toggle} isOpen={visible}>
      <ModalHeader>Propriedade Cargo de decisão</ModalHeader>
      <ModalBody>
        <div className="mb-4">
          <div className="mb-2">
            <span>Nome</span>
          </div>
          <Input
            value={nameTerm}
            onChange={({ target }) => setName(target.value)}
            className="w-100"
          />
        </div>
        <div className="mb-2">
          <span>
            <b>Método de busca do termo na propriedade</b>
          </span>
        </div>
        <div
          onClick={() => setOperation(OPERATION_TYPES.contem)}
          className="perfil-modal-lead-scoring-operation-container"
        >
          <Input type="radio" checked={operation === OPERATION_TYPES.contem} />{" "}
          <span>
            <b>Contém</b>
          </span>
          <div className="mt-2">
            <span style={{ color: "var(--gray-two)", fontSize: "small" }}>
              Exemplo: Suponha que temos o termo 'Cliente Preferencial' e
              desejamos verificar se ele está presente na propriedade, a
              condição seria satisfeita quando a propriedade estiver preenchida
              com 'Cliente Preferencial'.
            </span>
          </div>
        </div>

        <div
          onClick={() => setOperation(OPERATION_TYPES.exato)}
          className="perfil-modal-lead-scoring-operation-container mt-2"
        >
          <Input type="radio" checked={operation === OPERATION_TYPES.exato} />{" "}
          <span>
            <b>Exato (é igual)</b>
          </span>
          <div className="mt-2">
            <span style={{ color: "var(--gray-two)", fontSize: "small" }}>
              Exemplo: Para ilustrar, o termo 'Diretor' é identificado somente
              quando a propriedade é preenchida de maneira precisa e exata, por
              exemplo, com a entrada 'Diretor de Marketing'.
            </span>
          </div>
        </div>
        <div className="mt-4">
          <div className={terms?.length === 0 ? "" : "mb-2"}>
            <span>
              <b>Adicione termos e atribua uma nota para cada um deles.</b>
            </span>
          </div>
          <div className="perfil-modal-lead-scoring-terms">
            {terms?.length === 0 ? (
              <span className="perfil-modal-lead-scoring-terms-empyt">
                <b>Não há termos configurados.</b>
              </span>
            ) : null}
            {terms?.map((term) => (
              <div className="perfil-modal-lead-scoring-terms-container mb-2">
                <Button
                  onClick={() => deleteTerm(term.id)}
                  color="transparent"
                  className="perfil-modal-lead-scoring-delete"
                >
                  <MdClose color="var(--gray)" />
                </Button>

                <Input
                  value={term.name}
                  onChange={({ target }) =>
                    changeValue(term.id, "name", target.value)
                  }
                />
                <StarRating
                  initValue={term.rate}
                  onChange={(value) => changeValue(term.id, "rate", value)}
                />
              </div>
            ))}
            <div className="mt-3">
              <Button
                color="primary"
                onClick={() => setTerms([...(terms ?? []), INIT_OBEJCT()])}
              >
                <MdAdd /> Novo Termo
              </Button>
            </div>
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button onClick={() => toggle()}>Cancelar</Button>
        <Button color="primary" onClick={() => save()}>
          Salvar
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default PerfilModalLeadScoring;
