import comum from "../helpers/comum";

const TestTemplate = () => {
  return {
    id: comum.GenerateId(),
    name: "LandingPage Test",
    properties: [
      {
        id: comum.GenerateId(),
        styles: {
          backgroundSectionColor: "#F3EFE6",
          sectionOpacity: 100,
          height: 1000,
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
              x: 530,
              y: 20,
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
              width: "100%",
              height: "auto",
              fontWeight: "bold",
              textAlign: "center",
            },
            position: {
              x: 45,
              y: 45,
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
              x: 45,
              y: 100,
            },
          },
        ],
      },
    ],
  };
};

export default TestTemplate;
