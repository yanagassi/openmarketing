import React, { useState } from "react";
import { MdAddBox, MdDelete } from "react-icons/md";
import "../../../assets/css/section.css";
import configs from "../../../configs";
import ComponentSwitch from "./componentSwitch";
import ModalComponentAdd from "./modalComponentAdd";
const Section = ({
  handlerElement,
  elements,
  id,
  styles,
  onActive,
  onActiveElement,
  onRemove,
  script,
  addNewSection,
  elementActive,
  deleteElement,
  addNewElement,
  activeId,
  readOnly,
  isMobile,
}) => {
  const IS_ACTIVE = activeId === id;
  const [modal, setModal] = useState(false);
  const handleDragStart = (e, elementId) => {
    onActive(id);
    onActiveElement(elementId);
    e.dataTransfer.setData("elementId", elementId);
    e.dataTransfer.setData(
      "offsetX",
      e.clientX - e.target.getBoundingClientRect().left
    );
    e.dataTransfer.setData(
      "offsetY",
      e.clientY - e.target.getBoundingClientRect().top
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    const droppedElementId = e.dataTransfer.getData("elementId");
    const offsetX = parseInt(e.dataTransfer.getData("offsetX"));
    const offsetY = parseInt(e.dataTransfer.getData("offsetY"));

    const updatedElements = elements.map((element) => {
      if (element.id === droppedElementId) {
        let newPosition = {
          x: e.clientX - e.currentTarget.getBoundingClientRect().left - offsetX,
          y: e.clientY - e.currentTarget.getBoundingClientRect().top - offsetY,
        };
        if (newPosition.x < 1) {
          newPosition = {
            ...newPosition,
            x: 0,
          };
        }
        if (newPosition.y < 1) {
          newPosition = {
            ...newPosition,
            y: 0,
          };
        }

        return { ...element, position: newPosition };
      }
      return element;
    });

    handlerElement(updatedElements, id);
  };

  const LP_PX = isMobile ? configs.LP_PX_TAM_MOBILE : configs.LP_PX_TAM;

  return (
    <div
      className="not-selectable"
      style={{ width: isMobile && !readOnly ? LP_PX + 20 : LP_PX }}
      onClick={() => onActive(id)}
    >
      {!readOnly ? (
        <div
          className={
            "card card-selection" + (IS_ACTIVE ? " section-tool-bar" : "")
          }
        >
          <a>
            <MdAddBox color="var(--blue)" onClick={() => setModal(true)} />
          </a>
          <a onClick={() => onRemove(id)}>
            <MdDelete color="var(--blue)" />
          </a>
        </div>
      ) : null}
      <div
        style={{
          position: "relative",
          width: LP_PX,
          height: `${styles?.height}px` ?? "30vh",
          opacity: styles?.sectionOpacity
            ? styles?.sectionOpacity / 100
            : undefined,
          backgroundColor: styles?.backgroundSectionColor,
          minHeight: 100,
        }}
        onClick={() => {
          onActive(id);
        }}
        onDoubleClick={() => {
          onActiveElement(null);
        }}
        onDragOver={handleDragOver}
        className={
          !readOnly ? (IS_ACTIVE ? "section-active" : "section-desactive") : ""
        }
        onDrop={handleDrop}
      >
        {elements.map((element) => (
          <ComponentSwitch
            activeId={activeId}
            element={element}
            handlerElement={handlerElement}
            type={element.type}
            script={script}
            readOnly={readOnly}
            handleDragStart={handleDragStart}
            deleteElement={deleteElement}
            onActiveElement={onActiveElement}
            elementActive={elementActive}
            addNewSection={addNewSection}
          />
        ))}
      </div>

      <ModalComponentAdd
        modalOpen={modal}
        setModalOpen={setModal}
        id={id}
        addNewElement={addNewElement}
      />
    </div>
  );
};

export default Section;
