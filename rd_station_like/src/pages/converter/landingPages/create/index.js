import { useEffect, useState } from "react";
import "../../../../assets/css/mainCreateRender.css";
import LPMenuRender from "../../../../components/LP/LPMenuRender";
import LPRender from "../../../../components/LP/LPRender";
import LPToolRender from "../../../../components/LP/LPToolRender";
import { KEY_TYPES } from "../../../../constants/LpContants";
import comum from "../../../../helpers/comum";

// TODO: PARSE TO CSS ALL STYLES INLINE

const INIT_STATE = {
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
              },
              {
                id: "nameField",
                label: "Nome",
                type: "text",
                color: "#523E32",
              },
              {
                id: "passwordField",
                label: "1 + 1",
                type: "number",
                color: "#523E32",
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

function CreateLandingPage() {
  //Main State
  const [script, setScript] = useState(INIT_STATE);
  const [sectionActive, setSectionActive] = useState(null); //ID
  const [elementActive, setElementActive] = useState(null); //ID
  const [activeSectionValues, setActiveSectionValues] = useState(null);
  const [activeElementValues, setActiveElementsValues] = useState(null);

  useEffect(() => {
    setActiveSectionValues(getValueSectionActive());
    setActiveElementsValues(getValueElementActive());
  }, [script, elementActive, sectionActive]);

  useEffect(() => {
    console.log(JSON.stringify(script));
  }, [script]);

  function getValueElementActive() {
    if (!elementActive) return;
    const activeSec = getValueSectionActive();
    const finl = activeSec.items.filter((e) => {
      if (e.id == elementActive) {
        return e;
      }
    });
    return finl[0];
  }

  function addNewSection() {
    const newoj = {
      id: comum.GenerateId().toString(),
      styles: {
        backgroundSectionColor: "#006bb3",
        sectionOpacity: 100,
        height: 200,
      },
      items: [],
    };

    setScript({
      ...script,
      properties: [...script.properties, newoj],
    });
  }

  function updateProperties(newProp, id) {
    setScript({
      ...script,
      properties: script.properties.map((i) => {
        if (id === i.id) {
          return {
            ...i,
            items: newProp,
          };
        }
        return i;
      }),
    });
  }

  function deleteElement(propId, elementId) {
    setScript({
      ...script,
      properties: script.properties.map((i) => {
        if (propId === i.id) {
          return {
            ...i,
            items: i.items.filter((e) => {
              if (elementId != e.id) {
                return e;
              }
            }),
          };
        }
        return i;
      }),
    });
  }

  function updateSectionStyles(key, value) {
    setScript({
      ...script,
      properties: script.properties.map((i) => {
        if (sectionActive === i.id) {
          return {
            ...i,
            styles: {
              ...i.styles,
              [key]: value,
            },
          };
        }
        return i;
      }),
    });
  }

  function getValueSectionActive() {
    if (!sectionActive) return;
    const f = script.properties.filter((i) => {
      if (sectionActive === i.id) {
        return i;
      }
    });
    return f[0];
  }

  const updateItemByKey = (itemId, key, value, is_position = false) => {
    const activeSc = getValueSectionActive();
    const updatedItems = activeSc?.items?.map((item) => {
      if (item.id === itemId) {
        let updatedItem = {};
        if (!is_position) {
          const updatedContent = { ...item.content, [key]: value };
          updatedItem = { ...item, content: updatedContent };
        } else {
          const updatedContent = { ...item.position, [key]: value };
          updatedItem = { ...item, position: updatedContent };
        }

        return updatedItem;
      }
      return item;
    });

    setScript({
      ...script,
      properties: script.properties.map((e) => {
        if (e.id === activeSc.id) {
          return {
            ...activeSc,
            items: updatedItems,
          };
        }
        return e;
      }),
    });
  };

  function addNewElement(propId, elementType) {
    setScript({
      ...script,
      properties: script.properties.map((i) => {
        if (propId === i.id) {
          const elementAdd = KEY_TYPES.filter((e) => {
            if (e.type === elementType) {
              e.id = comum.GenerateId(10).toString();
              return e;
            }
          });
          return {
            ...i,
            items: [...i.items, ...elementAdd],
          };
        }
        return i;
      }),
    });
    setTimeout(() => {
      console.log(script);
    }, 1000);
  }

  return (
    <div className="main-create-render">
      <LPMenuRender title={script.name} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          overflow: "hidden",
          paddingTop: 40,
        }}
      >
        <div
          style={{
            borderRight: "1px solid var(--gray)",
            height: "100vh",
            width: "25vw",
          }}
        >
          <LPToolRender
            activeId={sectionActive}
            script={script}
            updateSectionStyles={updateSectionStyles}
            activeSectionValues={activeSectionValues}
            elementActive={elementActive}
            activeElementValues={activeElementValues}
            updateItemByKey={updateItemByKey}
            onActiveElement={setElementActive}
            handlerElement={updateProperties}
            deleteElement={deleteElement}
            onActive={setSectionActive}
          />
        </div>
        {/* <Col className="col-not-padding"> */}
        <div style={{ width: "75vw", overflowX: "auto" }}>
          <LPRender
            script={script}
            handlerElement={updateProperties}
            activeId={sectionActive}
            deleteElement={deleteElement}
            onActive={setSectionActive}
            elementActive={elementActive}
            addNewSection={addNewSection}
            onActiveElement={setElementActive}
            addNewElement={addNewElement}
          />
        </div>
        {/* </Col> */}
      </div>
    </div>
  );
}

export default CreateLandingPage;
