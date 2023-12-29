import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { useParams } from "react-router-dom";
import LP_LEADS_REQUEST_TYPE from "../../../constants/LPLeadsRequestType";
import cookiesHelper from "../../../helpers/cookiesHelper";
import {
  FORM_LP_EMAIL_TYPE,
  FORM_LP_INPUT_TYPES,
} from "../../../constants/LpContants";
import leads_events from "../../../models/leads_events";
import lead_scoring from "../../../models/lead_scoring";
import comum from "../../../helpers/comum";

function FormDefaultLp({ readOnly, fin, element, organization_id }) {
  const [form, setForm] = useState({});
  const { route_lp_view_id } = useParams();
  const [perfisOptions, setPefisOptions] = useState([]);

  const EMAIL_FIELD = element.content.fields.filter(
    (e) => e.type === FORM_LP_EMAIL_TYPE
  );

  useEffect(() => {
    getPerfilOptions();
  }, []);

  const getPerfilOptions = async () => {
    const data = await lead_scoring.list_perfil(organization_id);
    setPefisOptions(data);
  };

  function validateForm() {
    const nonEmptyFormValues = Object.keys(form).filter(
      (key) => form[key] && form[key] !== ""
    );

    const requiredElementIds = element?.content?.fields
      ?.filter((field) => field.required)
      .map((field) => field.id);

    const allRequiredFieldsFilled = requiredElementIds.map((value) =>
      nonEmptyFormValues.includes(value)
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
    console.log(readOnly, validateForm(), form);
    if (!readOnly || !validateForm()) {
      alert("Erro de validação de formulário");
      return;
    }

    const objectForm = {
      data: { ...form, lp_id: route_lp_view_id },
      lp_id: route_lp_view_id,
      href: window.location.href,
      type: LP_LEADS_REQUEST_TYPE.SUBMIT_FORM,
      cookies: document.cookie,
    };

    cookiesHelper.addOrUpdateCookie(EMAIL_FIELD[0].id, form[EMAIL_FIELD[0].id]);

    const response = await leads_events.send_event(objectForm);
    alert(response);
  }

  return (
    <form
      {...fin}
      className={`card form-landing-page ${fin.className}`}
      onSubmit={submitForm}
    >
      <span
        style={{
          color: element?.content?.colorTilte,
          textAlign: element?.content?.textAlignTitle,
          fontSize: `${element?.content?.fontSizeTitle}px`,
        }}
      >
        {element?.content?.title}{" "}
      </span>
      {element?.content?.fields?.map((field) => {
        const isModify =
          comum.VerifyTypeForm(FORM_LP_INPUT_TYPES.operations, field.type)
            .type === "modify";
        const mod_key = comum.VerifyTypeForm(
          FORM_LP_INPUT_TYPES.operations,
          field.type
        ).key;

        return (
          <FormGroup key={field.id} className="input-form-lp">
            <Label style={{ color: field.color }}>{field.label}: </Label>{" "}
            <Input
              onChange={({ target }) => onChangeForm(target)}
              name={isModify ? field.type : field.id}
              required={field.required}
              id={field.id}
              type={mod_key}
            >
              {field?.operations?.map((op, index) => (
                <option key={index} value={op}>
                  {op}
                </option>
              ))}
              {isModify ? (
                <>
                  <option />
                  {perfisOptions.map((perf) => {
                    if (perf.id !== field.type) return null;
                    return perf.terms.map(({ name, id }) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ));
                  })}
                </>
              ) : null}
            </Input>
          </FormGroup>
        );
      })}

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
