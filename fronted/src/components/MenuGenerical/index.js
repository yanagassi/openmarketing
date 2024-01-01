import {
  Button,
  FormGroup,
  Input,
  Nav,
  NavItem,
  NavLink,
  Navbar,
} from "reactstrap";
import { MdArrowBack, MdSave, MdVisibility } from "react-icons/md";

function MenuGenerical({ title = "", onSave }) {
  return (
    <div>
      <Navbar
        className="menu-bar-container menu-bar-variant"
        style={{ top: 60 }}
        color="light"
        expand="md"
      >
        <div className="menu-bar-main">
          <div>
            <Nav navbar className="main-nav-bar">
              <NavItem>
                <NavLink style={{ width: "17vw" }} href="#">
                  {title}
                </NavLink>
              </NavItem>
            </Nav>
          </div>
          <div className="menu-bar-profile">
            <Button
              color="primary"
              className="button-mid-height"
              onClick={() => window.history.back()}
            >
              <MdArrowBack />
            </Button>{" "}
            <Button
              color="primary"
              className="button-mid-height"
              onClick={() => onSave()}
            >
              <MdSave /> <span>Salvar</span>
            </Button>
          </div>
        </div>
      </Navbar>
    </div>
  );
}

export default MenuGenerical;
