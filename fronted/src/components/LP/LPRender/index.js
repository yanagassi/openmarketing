import { MdAddBox } from "react-icons/md";
import "../../../assets/css/LPRender.css";
import "../../../assets/css/mainrender.css";
import configs from "../../../configs";
import Section from "./section";
import PropTypes from "prop-types";

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
  onRemove = () => {},
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
                onRemove={onRemove}
              />

              {e.id === activeId ? (
                <div className="add-section">
                  <a
                    onClick={addNewSection}
                    style={{ left: `calc(${LP_PX / 2}px - 15px)` }}
                  >
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
LPRender.propTypes = {
  script: PropTypes.object.isRequired,
  activeId: PropTypes.string.isRequired,
  readOnly: PropTypes.bool,
  isMobile: PropTypes.bool,
  handlerElement: PropTypes.func,
  onActive: PropTypes.func,
  onActiveElement: PropTypes.func,
  elementActive: PropTypes.func,
  addNewElement: PropTypes.func,
  deleteElement: PropTypes.func,
  addNewSection: PropTypes.func,
};

export default LPRender;
