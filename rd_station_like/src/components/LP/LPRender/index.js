import { MdAddBox } from "react-icons/md";
import "../../../assets/css/LPRender.css";
import "../../../assets/css/mainrender.css";
import configs from "../../../configs";
import Section from "./section";

function LPRender({
  script,
  activeId,
  readOnly = false,
  isMobile = false,
  // Estão iniciadas assim, pq no readonly=true não é necessário.
  handlerElement = () => {},
  onActive = () => {},
  onActiveElement = () => {},
  elementActive = () => {},
  addNewElement = () => {},
  deleteElement = () => {},
  addNewSection = () => {},
}) {
  const LP_PX = isMobile ? configs.LP_PX_TAM_MOBILE : configs.LP_PX_TAM;
  return (
    <div className="main-render-div">
      <div>
        {script.properties.map((e) => (
          <div
            style={{
              background: e.styles.backgroundSectionColor,
              paddingLeft: `calc(50% - ${LP_PX / 2}px)`,
            }}
          >
            <div
              style={{
                // width: LP_PX,
                overflowY: "hidden",
              }}
            >
              <Section
                elements={e.items}
                id={e.id}
                script={script}
                readOnly={readOnly}
                isMobile={isMobile}
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
                <div className="add-section">
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
