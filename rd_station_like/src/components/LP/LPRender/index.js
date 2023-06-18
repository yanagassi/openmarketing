import { MdAddBox } from "react-icons/md";
import "../../../assets/css/LPRender.css";
import "../../../assets/css/mainrender.css";
import configs from "../../../configs";
import Section from "./section";
function LPRender({
  script,
  handlerElement,
  activeId,
  onActive,
  onActiveElement,
  elementActive,
  addNewElement,
  deleteElement,
  addNewSection,
}) {
  return (
    <div className="main-render-div">
      <div>
        {script.properties.map((e) => (
          <div
            style={{
              background: e.styles.backgroundSectionColor,
              paddingLeft: `calc(50% - ${configs.LP_PX_TAM / 2}px)`,
            }}
          >
            <div
              style={{
                width: configs.LP_PX_TAM,
                overflowY: "hidden",
              }}
            >
              <Section
                elements={e.items}
                id={e.id}
                script={script}
                handlerElement={handlerElement}
                styles={e.styles}
                activeId={activeId}
                onActive={onActive}
                elementActive={elementActive}
                deleteElement={deleteElement}
                onActiveElement={onActiveElement}
                addNewSection={addNewSection}
                addNewElement={addNewElement}
              />

              {e.id === activeId ? (
                <div className="add-section" style={{}}>
                  <a style={{}} onClick={() => addNewSection()}>
                    <MdAddBox className="md-add-icons" />
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LPRender;
