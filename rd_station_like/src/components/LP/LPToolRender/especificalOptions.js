import { FormGroup, Input, Label } from "reactstrap";
import { LP_HTML_COMPONENTS_TYPE } from "../../../constants/LpContants";
import comum from "../../../helpers/comum";
import FormOptions from "./formOptions";

function EspecificalOptions({
  activeElementValues,
  updateItemByKey,
  elementActive,
}) {
  return (
    <>
      {Object.keys(activeElementValues?.content ?? {}).map((i) => {
        const inputData = comum.GetLabelData(i);
        if (LP_HTML_COMPONENTS_TYPE.form_list === inputData.type) {
          return (
            <FormOptions
              activeElementValues={activeElementValues}
              updateItemByKey={updateItemByKey}
              elementActive={elementActive}
            />
          );
        }
        return (
          <FormGroup>
            <Label for="exampleEmail">{inputData.label}</Label>
            <Input
              value={activeElementValues?.content?.[i]}
              type={inputData.type}
              onChange={({ target }) => {
                updateItemByKey(elementActive, i, target.value);
              }}
            >
              {inputData?.options?.map((e) => (
                <option value={e}>{e}</option>
              ))}
            </Input>
          </FormGroup>
        );
      })}

      <FormGroup>
        <Label>Distância Vertical</Label>

        <Input
          value={activeElementValues?.position?.x?.toFixed(0)}
          onChange={({ target }) => {
            updateItemByKey(
              elementActive,
              "x",
              parseInt(target.value ?? "0"),
              true
            );
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label>Distância Horizontal</Label>
        <Input
          value={activeElementValues?.position?.y?.toFixed(0)}
          onChange={({ target }) => {
            updateItemByKey(
              elementActive,
              "y",
              parseInt(target.value ?? "0"),
              true
            );
          }}
        />
      </FormGroup>
    </>
  );
}

export default EspecificalOptions;
