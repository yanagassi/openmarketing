import { useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";

function FormDefaultLp({ readOnly, fin, element }) {
  const [form, setForm] = useState({});

  function validateForm() {
    const nonEmptyFormValues = Object.keys(form).filter(
      (e) => form[e] && form[e] !== ""
    );
    const requiredElementIds = element?.content?.fields?.map((e) =>
      e.required ? e.id : undefined
    );
    const allRequiredFieldsFilled = nonEmptyFormValues.every((v) =>
      requiredElementIds.includes(v)
    );

    return allRequiredFieldsFilled;
  }

  function onChangeForm({ name, value }) {
    setForm({
      ...form,
      [name]: value,
    });
  }

  function submitForm(e) {
    e.preventDefault();
    //Para não deixar submitar o form quando estiver em readOnly.
    if (!readOnly) return;

    if (!validateForm()) {
      /// Algum dia melhoro isso.
      alert("Erro de validação de formulário");
      return;
    }

    console.log(form);
  }

  return (
    <>
      <form {...fin} className="card form-landing-page" onSubmit={submitForm}>
        <span
          style={{
            color: element?.content?.colorTilte,
            textAlign: element?.content?.textAlignTitle,
            fontSize: `${element?.content?.fontSizeTitle}px`,
          }}
        >
          {element?.content?.title}{" "}
        </span>
        {element?.content?.fields?.map((e) => (
          <FormGroup className="input-form-lp">
            <Label style={{ color: e.color }}>{e.label}: </Label>{" "}
            <Input
              onChange={({ target }) => onChangeForm(target)}
              name={e.id}
              required={e.required}
              id={e.id}
              type={e.type}
            >
              {e?.operations?.map((e) => (
                <option value={e}>{e}</option>
              ))}
            </Input>
          </FormGroup>
        ))}

        <Button
          className="lp-form-button"
          type="submit"
          style={{
            backgroundColor: element?.content?.buttonBackground,
            textAlign: element?.content?.textAlignButton,
            borderColor: element?.content?.borderColorButton,
            borderWidth: `${element?.content?.borderWidthButton}px`,
            borderRadius: `${element?.content?.borderRadiusButton}px`,
          }}
        >
          {!element?.content?.buttonText || element?.content?.buttonText === ""
            ? "Vamos Lá!"
            : element?.content?.buttonText}
        </Button>
      </form>
    </>
  );
}

export default FormDefaultLp;
