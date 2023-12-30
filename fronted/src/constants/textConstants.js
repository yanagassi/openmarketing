import { FORM_LP_NAME, FORM_LP_EMAIL_TYPE } from "./LpContants";

const TEXT_TYPE_TRANSLATE = {
  [FORM_LP_EMAIL_TYPE]: "Email",
  [FORM_LP_NAME]: "Nome",
  text: "Texto",
  number: "Numérico",
  date: "Data",
  time: "Hora",
  checkbox: "Checkbox",
  radio: "Radio Box",
  password: "Senha",
  center: "Centralizado",
  left: "Esqueda",
  right: "Direita",
  center: "Centralizado",
  justify: "Justificado",
  initial: "Inicial",
  inherit: "Inherit",
};

///
/// Traduz os campos do formlário.
///
function translate_type(value) {
  return TEXT_TYPE_TRANSLATE?.[value] ?? value;
}

export default { translate_type };
