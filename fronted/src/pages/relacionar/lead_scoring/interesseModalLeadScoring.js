import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Util,
} from "reactstrap";

import "../../../assets/css/perfil_modal_lead_scoring.css";
import comum from "../../../helpers/comum";
import lead_scoring from "../../../models/lead_scoring";
import events from "../../../models/events";

function InteresseModalLeadScoring({ visible, toggle, data, onSave }) {
  const [editData, setEditData] = useState(data);
  const [flowList, setFlowList] = useState([]);

  useEffect(() => {
    if (!data) return;
    setEditData(data);
  }, [toggle]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const data = await events.list_all();
    setFlowList(data);
  }

  function changeValue(key, value = "") {
    setEditData({ ...editData, [key]: value });
  }

  function addActivity() {
    const final = editData?.events ?? [];
    const newObject = [...final, { id: comum.GenerateId(), eventId: "" }];

    changeValue("events", newObject);
  }

  function updateActivity(id, value) {
    console.log(id, value);
    const final = editData?.events.map((e) => {
      if (e.id === id) {
        return { ...e, eventId: value };
      }
      return e;
    });

    changeValue("events", final);
  }

  return (
    <Modal size="lg" toggle={toggle} isOpen={visible}>
      <ModalHeader>Propriedade Cargo de decisão</ModalHeader>
      <ModalBody>
        <div className="p-2">
          <Row>
            <Col>
              <Label>Nome do Grupo</Label>
              <Input
                onChange={({ target }) => changeValue("name", target.value)}
                value={editData?.name}
              />
            </Col>
            <Col xs={4}>
              <Label>Pontuação</Label>
              <Input
                onChange={({ target }) => changeValue("pts", target.value)}
                type="number"
                value={editData?.pts}
              />
            </Col>
          </Row>
        </div>
        <div className="mt-4 p-2">
          <div>
            <span>
              Atidade de <b>Fluxos de automação</b>
            </span>
            <div className="mt-1">
              <span className="small">
                Entrada e finalização de fluxos de automação, abertua de emails
                de fluxo, clique em links de email de fluxo.
              </span>
            </div>
          </div>

          <div className="mt-4">
            <span className="small">Lista de atividades do grupo</span>
          </div>

          <div className="mt-2">
            {editData?.events?.map((e) => (
              <div className="mt-2">
                <select
                  value={e.eventId}
                  className="w-100"
                  onChange={({ target }) => updateActivity(e.id, target.value)}
                >
                  {flowList.map((e) => (
                    <option value={e}>{e}</option>
                  ))}
                </select>
              </div>
            ))}
            <div className="mt-4">
              <Button onClick={() => addActivity()}>Adicionar Atividade</Button>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="interesse-modal-footer">
          <div>
            <Button color="danger">Remover</Button>
          </div>
          <div className="interesse-modal-footer-action-two">
            <Button onClick={() => toggle()}>Cancelar</Button>
            <Button
              color="primary"
              onClick={() => {
                onSave(editData.id, editData);
                toggle();
              }}
            >
              Salvar
            </Button>
          </div>
        </div>
      </ModalFooter>
    </Modal>
  );
}

export default InteresseModalLeadScoring;
