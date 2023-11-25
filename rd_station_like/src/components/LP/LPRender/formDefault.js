import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { useParams } from "react-router-dom";
import LP_LEADS_REQUEST_TYPE from "../../../constants/LPLeadsRequestType";
import cookiesHelper from "../../../helpers/cookiesHelper";
import { FORM_LP_EMAIL_TYPE } from "../../../constants/LpContants";
import leads_events from "../../../models/leads_events";

function FormDefaultLp({ readOnly, fin, element }) {
  const [form, setForm] = useState({});
  const { route_lp_view_id } = useParams();
  const EMAIL_FIELD = element.content.fields.filter(
    (e) => e.type === FORM_LP_EMAIL_TYPE
  );

  function validateForm() {
    const nonEmptyFormValues = Object.keys(form).filter(
      (key) => form[key] && form[key] !== ""
    );
    const requiredElementIds = element?.content?.fields
      ?.filter((field) => field.required)
      .map((field) => field.id);
    const allRequiredFieldsFilled = nonEmptyFormValues.every((value) =>
      requiredElementIds.includes(value)
    );

    return allRequiredFieldsFilled;
  }

  function onChangeForm({ name, value }) {
    setForm({
      ...form,
      [name]: value,
    });
  }

  async function submitForm(e) {
    e.preventDefault();

    if (!readOnly || !validateForm()) {
      alert("Erro de validação de formulário");
      return;
    }

    const objectForm = {
      data: form,
      lp_id: route_lp_view_id,
      href: window.location.href,
      type: LP_LEADS_REQUEST_TYPE.SUBSCRIPTION_FORM,
      cookies: document.cookie,
    };

    cookiesHelper.addOrUpdateCookie(EMAIL_FIELD[0].id, form[EMAIL_FIELD[0].id]);

    const response = await leads_events.subscription_form(objectForm);
    alert(response);
  }

  return (
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
      {element?.content?.fields?.map((field) => (
        <FormGroup key={field.id} className="input-form-lp">
          <Label style={{ color: field.color }}>{field.label}: </Label>{" "}
          <Input
            onChange={({ target }) => onChangeForm(target)}
            name={field.id}
            required={field.required}
            id={field.id}
            type={field.type}
          >
            {field?.operations?.map((op, index) => (
              <option key={index} value={op}>
                {op}
              </option>
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
  );
}

export default FormDefaultLp;
