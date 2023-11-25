import comum from "../helpers/comum";

const TestTemplateMobile = () => {
  return {
    id: "64a75d1de2af721fb2eec308",
    name: "LandingPage Test",
    organization_id: "65624415edf29e3513a7c5a7",

    properties: [
      {
        id: comum.GenerateId(),
        styles: {
          backgroundSectionColor: "#F3EFE6",
          sectionOpacity: 100,
          height: 850,
        },
        items: [
          {
            id: comum.GenerateId(),
            content: {
              width: 350,
              title: "Adote Agora",
              colorTilte: "#523E32",
              fontSizeTitle: 24,
              textAlignTitle: "center",
              background: "#FFFFFF",
              borderRadius: 3,
              buttonText: "Cadastrar",
              buttonBackground: "#523E32",
              textAlignButton: "center",
              borderColorButton: "#523E32",
              borderWidthButton: 2,
              borderRadiusButton: 5,
              fields: [
                {
                  id: "emailField",
                  label: "Email",
                  type: "email",
                  color: "#523E32",
                  required: true,
                },
                {
                  id: "nameField",
                  label: "Nome",
                  type: "text",
                  color: "#523E32",
                  required: true,
                },
                {
                  id: "dasmdsankjdnsakj",
                  label: "1 + 1",
                  type: "number",
                  color: "#523E32",
                  required: true,
                },
              ],
            },
            position: {
              x: 28,
              y: 190,
            },
            type: "form",
          },
          {
            type: "h1",
            label: "Cabeçalho 1",
            id: comum.GenerateId(),
            content: {
              text: "Animais de Estimação",
              color: "#523E32",
              fontSize: 36,
              height: "auto",
              width: 400,
              fontWeight: "bold",
              textAlign: "center",
            },
            position: {
              x: 0,
              y: 20,
            },
          },
          {
            type: "span",
            label: "Descrição",
            id: comum.GenerateId(),
            content: {
              text: "Descubra mais sobre diferentes animais de estimação. Saiba como cuidar deles e escolher o animal perfeito para sua família.",
              color: "#523E32",
              width: 400,
              height: "auto",
              fontWeight: "normal",
              textAlign: "center",
            },
            position: {
              x: 6,
              y: 80,
            },
          },
        ],
      },
    ],
  };
};
export default TestTemplateMobile;
