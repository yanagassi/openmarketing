import { MdAddBox, MdDelete } from "react-icons/md";
import { FormGroup, Input, Label } from "reactstrap";
import {
  FORM_LP_INPUT_TYPES,
  FORM_LP_TYPES,
} from "../../../constants/LpContants";
import comum from "../../../helpers/comum";

function FormOptions({ activeElementValues, updateItemByKey, elementActive }) {
  function removeElementForm(id) {
    if (!id) return;
    const final = activeElementValues?.content?.fields?.filter((e) => {
      if (e.id != id) {
        return e;
      }
    });
    updateItemByKey(elementActive, "fields", final);
  }

  function addElementForm() {
    const final = [
      ...(activeElementValues?.content?.fields ?? []),
      { ...FORM_LP_TYPES.text, id: comum.GenerateId().toString() },
    ];
    updateItemByKey(elementActive, "fields", final);
  }

  function changeElementForm(id, key, value) {
    if (!id) return;
    debugger;
    const final = activeElementValues?.content?.fields?.map((e) => {
      if (e.id === id) {
        return {
          ...e,
          [key]: value,
        };
      }
      return e;
    });

    updateItemByKey(elementActive, "fields", final);
  }

  return (
    <div style={{ marginTop: 30 }}>
      <span>Formulário:</span>
      {activeElementValues?.content?.fields?.map((e, i) => (
        <FormGroup className="form-edit-input-group">
          <Label>Campo {i + 1}</Label>
          <div className="form-edit-lp-input">
            <div className="form-edit-lp-inputs-container">
              <Input
                onChange={({ target }) =>
                  changeElementForm(e.id, "label", target.value)
                }
                value={e.label}
              >
                {e.content?.options?.map((e) => (
                  <option value={e}>{e}</option>
                ))}
              </Input>

              <Input
                onChange={({ target }) =>
                  changeElementForm(e.id, "color", target.value)
                }
                value={e.color}
                type="color"
              >
                {e.content?.options?.map((e) => (
                  <option value={e}>{e}</option>
                ))}
              </Input>

              <Input
                onChange={({ target }) =>
                  changeElementForm(e.id, "type", target.value)
                }
                value={e.type ?? "text"}
                type="select"
              >
                {FORM_LP_INPUT_TYPES.operations.map((e) => (
                  <option value={e}>{e}</option>
                ))}
              </Input>
            </div>
            <div className="lp-form-icons-action">
              <div
                className="lp-form-delete-icon"
                onClick={({}) => removeElementForm(e.id)}
              >
                <MdDelete />
              </div>
              <div
                className="lp-form-delete-icon"
                onClick={({}) => addElementForm()}
              >
                <MdAddBox />
              </div>
            </div>
          </div>
        </FormGroup>
      ))}
    </div>
  );
}

export default FormOptions;
