import React, { useCallback, useEffect, useState } from "react";
import { MdAdd, MdAddBox, MdDelete, MdMicNone } from "react-icons/md";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import {
  FORM_LP_INPUTS,
  FORM_LP_INPUT_TYPES,
  FORM_LP_TYPES,
} from "../../../constants/LpContants";
import comum from "../../../helpers/comum";
import lead_scoring from "../../../models/lead_scoring";
import textConstants from "../../../constants/textConstants";

function FormOptions({
  activeElementValues,
  updateItemByKey,
  elementActive,
  className = "",
}) {
  const [perfisOptions, setPefisOptions] = useState([]);

  const removeElementForm = (id) => {
    if (!id) return;
    const updatedFields = activeElementValues?.content?.fields?.filter(
      (field) => field.id !== id
    );
    updateItemByKey(elementActive, "fields", updatedFields);
  };

  const addElementForm = () => {
    const newField = {
      ...FORM_LP_TYPES.text,
      id: comum.GenerateId().toString(),
    };
    const updatedFields = [
      ...(activeElementValues?.content?.fields ?? []),
      newField,
    ];
    updateItemByKey(elementActive, "fields", updatedFields);
  };

  const changeElementForm = (id, key, value, optionForm = false) => {
    if (!id) return;
    const updatedFields = (activeElementValues?.content?.fields ?? []).map(
      (field) => {
        let finalVi = { ...field, [key]: value };

        if (optionForm && FORM_LP_INPUTS.indexOf(value) !== -1) {
          finalVi = { ...field, [key]: value, id: value };
        }
        return field.id === id ? finalVi : field;
      }
    );

    updateItemByKey(elementActive, "fields", updatedFields);
  };

  useEffect(() => {
    getPerfilOptions();
  }, []);

  const getPerfilOptions = async () => {
    const data = await lead_scoring.list_perfil();
    setPefisOptions(data);
  };

  return (
    <div className={className}>
      <span>Formulário:</span>
      <div style={{ padding: 10 }}>
        {activeElementValues?.content?.fields?.map((field, index) => (
          <FormGroup className="form-edit-input-group mb-4" key={field.id}>
            <div className="form-edit-lp-input">
              <div className="form-edit-lp-inputs-container">
                {/* <Label>{`Campo ${index + 1}`}</Label> */}
                <Input
                  onChange={({ target }) =>
                    changeElementForm(field.id, "label", target.value)
                  }
                  value={field.label}
                >
                  {field.content?.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Input>

                <Input
                  onChange={({ target }) =>
                    changeElementForm(field.id, "color", target.value)
                  }
                  value={field.color}
                  type="color"
                >
                  {field.content?.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Input>

                <div className="form-edit-inputgroup">
                  <Input
                    className="form-edit-inputgroup-input"
                    onChange={({ target }) =>
                      changeElementForm(field.id, "type", target.value, true)
                    }
                    value={field.type ?? "text"}
                    type="select"
                  >
                    {perfisOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        <span style={{ fontSize: 10 }}>[Lead Scoring]</span>{" "}
                        <span style={{ color: "red" }}>{option.name}</span>
                      </option>
                    ))}

                    {FORM_LP_INPUT_TYPES.operations.map((operation) => (
                      <option key={operation} value={operation}>
                        {textConstants.translate_type(operation)}
                      </option>
                    ))}
                  </Input>

                  <div xs={1}>
                    <Button
                      color="danger"
                      className="form-edit-inputgroup-btn"
                      onClick={() => removeElementForm(field.id)}
                    >
                      <MdDelete />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </FormGroup>
        ))}
        <div>
          <Button color="primary" onClick={addElementForm}>
            <MdAdd /> Novo Campo
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FormOptions;
