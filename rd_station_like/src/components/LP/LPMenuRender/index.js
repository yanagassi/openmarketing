import { AiOutlineLaptop, AiOutlineMobile } from "react-icons/ai";
import {
  Button,
  FormGroup,
  Input,
  Nav,
  NavItem,
  NavLink,
  Navbar,
} from "reactstrap";
function LPMenuRender({
  title = "Nova LandingPage",
  handleScript,
  isMobile,
  body,
}) {
  function salvar() {
    console.log(body);
  }
  return (
    <>
      <Navbar
        className="menu-bar-container menu-bar-variant"
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
              </NavItem>{" "}
              <div className="menu-bar-switch" onClick={() => handleScript()}>
                <AiOutlineLaptop color={!isMobile ? "var(--primary)" : ""} />
                <FormGroup switch>
                  <Input
                    // onChange={() => handleScript()}
                    checked={isMobile}
                    type="switch"
                    role="switch"
                  />
                </FormGroup>
                <AiOutlineMobile color={isMobile ? "var(--primary)" : ""} />
              </div>
            </Nav>
          </div>
          <div className="menu-bar-profile">
            <Button
              color="primary"
              className="button-mid-height"
              onClick={() => salvar()}
            >
              Salvar
            </Button>
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default LPMenuRender;
