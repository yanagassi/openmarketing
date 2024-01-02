import React, { useContext, useState } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Navbar,
  Row,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "../../assets/css/menu.css";
import MenuItems from "../../constants/menu";
import { ApiContext } from "../../context/ApiContext";

const MenuBar = () => {
  const { isLoggedIn, user, logout } = useContext(ApiContext);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [dropdownOpen3, setDropdownOpen3] = useState(false);
  const [dropdownOpen4, setDropdownOpen4] = useState(false);

  const toggleDropdown1 = () => {
    setDropdownOpen1(!dropdownOpen1);
  };

  const toggleDropdown2 = () => {
    setDropdownOpen2(!dropdownOpen2);
  };

  const toggleDropdown3 = () => {
    setDropdownOpen3(!dropdownOpen3);
  };

  const toggleDropdown4 = () => {
    setDropdownOpen4(!dropdownOpen4);
  };

  if (window?.location?.pathname?.match(/\/view\/[^&]*/)?.length > 0) {
    return null;
  }

  return (
    <div className="menu-bar">
      <Navbar
        className="menu-bar-container"
        color="dark"
        dark
        expand="md"
        style={{ zIndex: 99 }}
      >
        <div className="menu-bar-main">
          <div>
            <Nav navbar>
              <img
                src="https://cdn.custom-cursor.com/cursors/stonks_meme_1254.png"
                height={45}
                style={{ transform: "scaleX(-1)" }}
                className="image-logo"
                width={100}
              />
              <NavItem className="menu-bar-item">
                <NavLink href="/">Inicio</NavLink>
              </NavItem>

              {isLoggedIn && (
                <>
                  <Dropdown
                    className="menu-data-items "
                    nav
                    isOpen={dropdownOpen4}
                    toggle={toggleDropdown4}
                  >
                    <DropdownToggle className="menu-data-items" nav caret>
                      Atrair{" "}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem href="/otimizacao-seo">
                        Otimização de Páginas (SEO)
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Dropdown
                    className="menu-data-items"
                    nav
                    isOpen={dropdownOpen2}
                    toggle={toggleDropdown2}
                  >
                    <DropdownToggle className="menu-data-items" nav caret>
                      Converter{" "}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem href="/landing-pages">
                        Landing Pages
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Dropdown
                    className="menu-data-items "
                    nav
                    isOpen={dropdownOpen1}
                    toggle={toggleDropdown1}
                  >
                    <DropdownToggle className="menu-data-items" nav caret>
                      Relacionar{" "}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem href="/leads">Base de Leads</DropdownItem>
                      <DropdownItem href="/lead-scoring">
                        Lead Tracker
                      </DropdownItem>
                      <DropdownItem href="/lead-tracking">
                        Lead Scoring
                      </DropdownItem>
                      <DropdownItem href="/segments">
                        Segmentação de Leads
                      </DropdownItem>
                      <DropdownItem href="/email">Email</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </>
              )}
            </Nav>
          </div>
          {isLoggedIn && (
            <div style={{ flexDirection: "row", display: "flex" }}>
              <Dropdown
                className="menu-data-items"
                isOpen={dropdownOpen3}
                toggle={toggleDropdown3}
              >
                <DropdownToggle className="menu-data-items" nav caret>
                  {user?.name}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => logout()} href="/leads">
                    Sair
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )}
        </div>
      </Navbar>
    </div>
  );
};

export default MenuBar;
