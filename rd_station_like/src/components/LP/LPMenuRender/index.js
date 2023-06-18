import { Button, Nav, NavItem, NavLink, Navbar } from "reactstrap";

function LPMenuRender({ title }) {
  return (
    <>
      <Navbar
        className="menu-bar-container menu-bar-variant"
        color="light"
        expand="md"
      >
        <div className="menu-bar-main">
          <div>
            <Nav navbar>
              <NavItem>
                <NavLink href="#">{title}</NavLink>
              </NavItem>
            </Nav>
          </div>
          <div className="menu-bar-profile">
            <Button color="primary" className="button-mid-height">
              Salvar
            </Button>
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default LPMenuRender;
