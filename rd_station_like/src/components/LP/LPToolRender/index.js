import { useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import "../../../assets/css/LPToolRender.css";
import DefaultOptions from "./defaultOptions";
import EspecificalOptions from "./especificalOptions";

function LPToolRender({
  updateSectionStyles,
  activeSectionValues,
  elementActive,
  updateItemByKey,
  activeElementValues,
  handlerElement,
  script,
  onActiveElement,
  activeId,
  onActive,
}) {
  const [activeTab, setActiveTab] = useState("tab1");
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    init();
  }, [script, activeElementValues, activeId]);

  function init() {
    document.onkeydown = (e) => {
      switch (e.keyCode) {
        case 37:
          e.preventDefault();
          updateHeight("TOP");
          break;
        case 38:
          e.preventDefault();
          updateHeight("LEFT");
          break;
        case 39:
          e.preventDefault();
          updateHeight("DOWN");
          break;
        case 40:
          e.preventDefault();
          updateHeight("RIGHT");
          break;
        case 27:
          e.preventDefault();
          escClick();
          break;
        case 8:
        case 46:
          // deleteElement(activeId, elementActive);
          break;
      }
    };
  }

  function escClick() {
    onActiveElement(null);
    onActive(null);
  }

  function updateHeight(event) {
    const updatedElements = activeSectionValues?.items?.map((element) => {
      if (element.id === activeElementValues?.id) {
        let final = {};

        switch (event) {
          case "TOP":
            final = {
              x: element.position.x - 1,
              y: element.position.y,
            };
            break;

          case "DOWN":
            final = {
              x: element.position.x + 1,
              y: element.position.y,
            };
            break;

          case "LEFT":
            final = {
              x: element.position.x,
              y: element.position.y - 1,
            };
            break;

          case "RIGHT":
            final = {
              x: element.position.x,
              y: element.position.y + 1,
            };
            break;
        }

        if (final.x < 1) {
          final = {
            ...final,
            x: 0,
          };
        }
        if (final.y < 1) {
          final = {
            ...final,
            y: 0,
          };
        }

        return {
          ...element,
          position: final,
        };
      }
      return element;
    });

    handlerElement(updatedElements, activeSectionValues?.id);
  }

  return (
    <div
      style={{
        width: "100%",
        paddingTop: 5,
      }}
    >
      <Nav tabs style={{ width: "100%", position: "fixed" }}>
        <NavItem>
          <NavLink
            className={activeTab === "tab1" ? "active" : ""}
            onClick={() => toggleTab("tab1")}
          >
            Geral
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === "tab2" ? "active" : ""}
            onClick={() => toggleTab("tab2")}
          >
            Elemento
          </NavLink>
        </NavItem>
      </Nav>

      <div
        style={{
          overflowY: "auto",
          height: "100vh",
          position: "fixed",
          marginTop: 40,
          width: "25vw",
        }}
      >
        <TabContent activeTab={activeTab}>
          <TabPane tabId="tab1" className="lp-render-tab-options">
            <DefaultOptions
              updateSectionStyles={updateSectionStyles}
              activeSectionValues={activeSectionValues}
            />
          </TabPane>

          <TabPane tabId="tab2" className="lp-render-tab-options">
            <EspecificalOptions
              activeElementValues={activeElementValues}
              updateItemByKey={updateItemByKey}
              activeSectionValues={activeSectionValues}
              elementActive={elementActive}
            />
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
}

export default LPToolRender;
