import {
  AiOutlineLaptop,
  AiOutlineMobile,
  AiOutlineReload,
} from "react-icons/ai";
import {
  Button,
  FormGroup,
  Input,
  Nav,
  NavItem,
  NavLink,
  Navbar,
} from "reactstrap";
import landing_pages from "../../../models/landing_pages";
import comum from "../../../helpers/comum";
import { MdArrowBack, MdSave, MdVisibility } from "react-icons/md";

function LPMenuRender({
  title = "Nova LandingPage",
  handleScript,
  isMobile,
  body,
  id_lp = null,
  renewMobile,
}) {
  async function salvar() {
    const { data } = await landing_pages.save(body);
  }

  return (
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
            {isMobile ? (
              <div style={{ paddingTop: 2 }}>
                <Button color="default" onClick={() => renewMobile()}>
                  <AiOutlineReload size={15} />
                </Button>
              </div>
            ) : null}
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
          {id_lp ? (
            <Button
              color="primary"
              className="button-mid-height"
              onClick={() => comum.Redirect("/view/" + id_lp, true)}
            >
              <MdVisibility />
            </Button>
          ) : null}{" "}
          <Button
            color="primary"
            className="button-mid-height"
            onClick={() => salvar()}
          >
            <MdSave /> Salvar
          </Button>
        </div>
      </div>
    </Navbar>
  );
}

export default LPMenuRender;
