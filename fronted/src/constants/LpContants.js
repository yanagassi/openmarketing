const _TEXT_ALIGNS = [
  "left",
  "right",
  "center",
  "justify",
  "initial",
  "inherit",
];

const LP_HTML_COMPONENTS_TYPE = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  span: "span",
  img: "img",
  form: "form",
  form_list: "form_list",
  square: "square",
};

const KEY_VALUE = {
  color: {
    type: "color",
    label: "Cor",
  },
  colorTilte: {
    type: "color",
    label: "Cor do Titulo",
  },
  background: {
    type: "color",
    label: "Cor de Fundo",
  },
  title: {
    type: "text",
    label: "Titulo",
  },
  src: {
    type: "text",
    label: "Source",
  },
  fontSize: {
    type: "number",
    label: "Tamanho de Fonte",
  },
  width: {
    type: "number",
    label: "Largura",
  },
  fields: {
    type: LP_HTML_COMPONENTS_TYPE.form_list,
    label: "Campos do Formuário",
  },
  textAlign: {
    type: "select",
    label: "Alinhamento do Texto",
    options: _TEXT_ALIGNS,
  },
  textAlignTitle: {
    type: "select",
    label: "Alinhamento do Titulo",
    options: _TEXT_ALIGNS,
  },
  textAlignButton: {
    type: "select",
    label: "Alinhamento do Titulo",
    options: _TEXT_ALIGNS,
  },
  fontSizeTitle: {
    type: "number",
    label: "Tamanho do Titulo",
  },
  borderRadius: {
    type: "number",
    label: "Raio da Borda",
  },
  borderRadiusButton: {
    type: "number",
    label: "Raio da Borda",
  },
  borderColorButton: {
    type: "color",
    label: "Cor da Borda",
  },
  borderColor: {
    type: "color",
    label: "Cor da Borda",
  },
  borderWidthButton: {
    type: "number",
    label: "Largura da Borda",
  },
  borderWidth: {
    type: "number",
    label: "Largura da Borda",
  },
  buttonText: {
    type: "text",
    label: "Texto do Botão",
  },
  buttonBackground: {
    type: "color",
    label: "Cor do Botão",
  },
  resizeMode: {
    type: "select",
    label: "ObjectFit",
    options: ["nenhum", "fill", "contain", "cover", "scale-down"],
  },
  fontWeight: {
    type: "select",
    label: "Espessura da Font",
    options: [
      "normal",
      "bold",
      "lighter",
      "bolder",
      ...Array.from({ length: 9 }, (_, index) => index + 1).map(
        (e) => e + "00"
      ),
    ],
  },
};

const FORM_LP_TYPES = {
  text: {
    label: "NOVO CAMPO",
    type: "text",
  },
};
const FORM_LP_EMAIL_TYPE = "email";
const FORM_LP_EMAIL_NAME_ID = "emailField";
const FORM_LP_NAME = "nameField";

const FORM_LP_INPUTS = [FORM_LP_EMAIL_NAME_ID, FORM_LP_NAME];

const FORM_LP_INPUT_TYPES = {
  operations: [
    "text",
    "checkbox",
    "date",
    FORM_LP_EMAIL_TYPE,
    "number",
    "password",
    "radio",
    "time",
  ],
};

const KEY_PROPS_DEFAULT = {
  text_type: {
    id: "",
    content: {
      text: "texto",
      color: "#FFFFFF",
      fontSize: undefined,
      width: 100,
      fontWeight: "bold",
      textAlign: "",
    },
    position: { x: 20, y: 20 },
  },
  image_type: {
    id: "",
    content: {
      src: "https://img.freepik.com/free-photo/couple-love-looking-each-other-with-love-smiling-pink-wall_197531-23575.jpg?w=1800&t=st=1686839539~exp=1686840139~hmac=dbc9614efdf04df2075d67c709bc70ebf62e8f14ead521b835c4cb1e51027c77",
      width: 200,
      height: 150,
      resizeMode: "cover",
    },
    position: { x: 20, y: 20 },
  },
  shapes: {
    id: "",
    content: {
      width: 200,
      height: 150,
      background: "#ffffff",
      borderRadius: 5,
      borderWidth: 0,
      borderColor: "#ffffff",
    },
    position: { x: 20, y: 20 },
  },
};

const KEY_TYPES = [
  {
    type: LP_HTML_COMPONENTS_TYPE.h1,
    label: "Cabeçalho 1",
    ...KEY_PROPS_DEFAULT.text_type,
  },
  {
    type: LP_HTML_COMPONENTS_TYPE.h2,
    label: "Cabeçalho 2",
    ...KEY_PROPS_DEFAULT.text_type,
  },
  {
    type: LP_HTML_COMPONENTS_TYPE.h3,
    label: "Cabeçalho 3",
    ...KEY_PROPS_DEFAULT.text_type,
  },
  {
    type: LP_HTML_COMPONENTS_TYPE.span,
    label: "Texto Simples",
    ...KEY_PROPS_DEFAULT.text_type,
  },
  {
    type: LP_HTML_COMPONENTS_TYPE.img,
    label: "Imagem",
    ...KEY_PROPS_DEFAULT.image_type,
  },
  {
    type: LP_HTML_COMPONENTS_TYPE.square,
    label: "Quadrado",
    ...KEY_PROPS_DEFAULT.shapes,
  },
];

export {
  FORM_LP_INPUT_TYPES,
  FORM_LP_TYPES,
  KEY_TYPES,
  FORM_LP_EMAIL_TYPE,
  KEY_VALUE,
  LP_HTML_COMPONENTS_TYPE,
  FORM_LP_EMAIL_NAME_ID,
  FORM_LP_INPUTS,
};
