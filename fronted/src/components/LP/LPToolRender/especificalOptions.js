import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { LP_HTML_COMPONENTS_TYPE } from "../../../constants/LpContants";
import comum from "../../../helpers/comum";
import FormOptions from "./formOptions";
import textConstants from "../../../constants/textConstants";

function EspecificalOptions({
  activeElementValues,
  updateItemByKey,
  elementActive,
}) {
  const renderFormOrInput = (inputKey, inputType, inputValue) => {
    const inputData = comum.GetLabelData(inputKey);

    if (LP_HTML_COMPONENTS_TYPE.form_list === inputData.type) {
      return (
        <FormOptions
          activeElementValues={activeElementValues}
          updateItemByKey={updateItemByKey}
          elementActive={elementActive}
          className="mt-4 mb-4"
        />
      );
    }

    return (
      <div key={inputKey} className="mt-2">
        <Label for="exampleEmail">{inputData.label}</Label>
        <Input
          value={inputValue}
          type={inputData.type}
          onChange={({ target }) => {
            updateItemByKey(elementActive, inputKey, target.value);
          }}
        >
          {inputData?.options?.map((option) => (
            <option key={option} value={option}>
              {textConstants.translate_type(option)}
            </option>
          ))}
        </Input>
      </div>
    );
  };

  return (
    <div className="mt-2">
      {Object.entries(activeElementValues?.content ?? {}).map(
        ([key, value]) => {
          return renderFormOrInput(key, "text", value);
        }
      )}

      <FormGroup className="mt-2">
        <Label>Distância Vertical</Label>
        <Input
          value={activeElementValues?.position?.x?.toFixed(0)}
          type="number"
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
          type="number"
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
    </div>
  );
}

export default EspecificalOptions;
