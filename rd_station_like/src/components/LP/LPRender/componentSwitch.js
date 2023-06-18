import { MdDelete } from "react-icons/md";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { LP_HTML_COMPONENTS_TYPE } from "../../../constants/LpContants";

function ComponentSwitch({
  element,
  type,
  handleDragStart,
  elementActive,
  onActiveElement,
  deleteElement,
  activeId,
  script,
}) {
  const getObject = () => {
    const fin = {
      key: element.id,
      draggable: true,
      onDragStart: (e) => handleDragStart(e, element.id),
      onClick: (e) => onActiveElement(element.id),
      src: element?.content?.src,
      style: {
        position: "absolute",
        left: `${element.position.x}px`,
        top: `${element.position.y}px`,
        cursor: "move",
        borderRadius: `${element?.content?.borderRadius}px`,
        objectFit: element?.content?.resizeMode,
        color: element?.content?.color,
        zIndex: 10,
        fontWeight: element?.content?.fontWeight,
        width: `${element?.content?.width}px`,
        height: `${element?.content?.height}px`,
        textAlign: element?.content?.textAlign,
        background: element?.content?.background,
        borderColor: element?.content?.borderColor,
        borderWidth: `${element?.content?.borderWidth}px`,
        borderStyle: element?.content?.borderWidth ? "solid" : undefined,
        fontSize: element?.content?.fontSize
          ? `${element?.content?.fontSize}px`
          : undefined,
      },
      className: elementActive === element.id ? "section-active-variant" : "",
      // ...element?.content,
    };
    switch (type) {
      case LP_HTML_COMPONENTS_TYPE.h1:
        return <h1 {...fin}>{element?.content?.text}</h1>;
      case LP_HTML_COMPONENTS_TYPE.h2:
        return <h2 {...fin}>{element?.content?.text}</h2>;
      case LP_HTML_COMPONENTS_TYPE.h3:
        return <h3 {...fin}>{element?.content?.text}</h3>;
      case LP_HTML_COMPONENTS_TYPE.span:
        return <span {...fin}>{element?.content?.text}</span>;
      case LP_HTML_COMPONENTS_TYPE.square:
        return <div {...fin}></div>;
      case LP_HTML_COMPONENTS_TYPE.img:
        return <img {...fin} />;
      case LP_HTML_COMPONENTS_TYPE.form:
        return (
          <form
            {...fin}
            className="card form-landing-page"
            onSubmit={(e) => console.log(e)}
          >
            <span
              style={{
                color: element?.content?.colorTilte,
                textAlign: element?.content?.textAlignTitle,
                fontSize: `${element?.content?.fontSizeTitle}px`,
              }}
            >
              {element?.content?.title}{" "}
            </span>
            {element?.content?.fields?.map((e) => (
              <FormGroup className="input-form-lp">
                <Label style={{ color: e.color }}>{e.label}: </Label>{" "}
                <Input type={e.type} />
              </FormGroup>
            ))}

            <Button
              className="lp-form-button"
              type="submit"
              style={{
                backgroundColor: element?.content?.buttonBackground,
                textAlign: element?.content?.textAlignButton,
                borderColor: element?.content?.borderColorButton,
                borderWidth: `${element?.content?.borderWidthButton}px`,
                borderRadius: `${element?.content?.borderRadiusButton}px`,
              }}
            >
              {!element?.content?.buttonText ||
              element?.content?.buttonText === ""
                ? "Vamos Lá!"
                : element?.content?.buttonText}
            </Button>
          </form>
        );
    }
  };

  // DPS PASSAR PARA CSS

  return (
    <>
      <div onKeyDownCapture={(e) => {}}>
        {elementActive === element.id ? (
          <div
            style={{
              width: element.position.x,
              height: element.position.y,
              borderBottom: "thin solid",
              borderStyle: "dotted",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "thin solid",
              borderColor: "var(--blue-light)",
              zIndex: 1,
            }}
          >
            <span
              style={{
                position: "relative",
                top: element.position.y,
                width: element?.content?.width,
                left: "calc(100% - 30px)",
                fontSize: 10,
                color: "#9b9997",
                zIndex: 99,
                zIndex: 1,
              }}
            >
              {element.position.x.toFixed(0)}px
            </span>
            <span
              style={{
                position: "absolute",
                top:
                  element.position.y > 10
                    ? element.position.y / 2
                    : element.position.y,
                left: element.position.x + 10,
                color: "#9b9997",
                fontSize: 10,
                zIndex: 2,
              }}
            >
              {element.position.y.toFixed(0)}px
            </span>
          </div>
        ) : null}
        <div style={{ width: element?.content?.width }}>{getObject()}</div>
        <div
          style={{
            position: "absolute",
            left: element.position.x - 20,
            top: element.position.y + 25,
            borderRadius: 2,
            zIndex: 1,
          }}
        >
          {elementActive === element.id &&
          element.type != LP_HTML_COMPONENTS_TYPE.form ? (
            <a
              href="#"
              style={{ color: "white", zIndex: 10 }}
              onClick={() => deleteElement(activeId, element.id, element)}
            >
              <MdDelete />
            </a>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default ComponentSwitch;
