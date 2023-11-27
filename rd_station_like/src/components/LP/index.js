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

  const toggleDropdown1 = () => {
    setDropdownOpen1(!dropdownOpen1);
  };

  const toggleDropdown2 = () => {
    setDropdownOpen2(!dropdownOpen2);
  };

  if (window?.location?.pathname?.match(/\/view\/[^&]*/)?.length > 0) {
    return null;
  }

  return (
    <div className="menu-bar">
      <Navbar className="menu-bar-container" color="dark" dark expand="md">
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
                    className="menu-data-items"
                    nav
                    isOpen={dropdownOpen1}
                    toggle={toggleDropdown1}
                  >
                    <DropdownToggle className="menu-data-items" nav caret>
                      Relacionar{" "}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem href="/leads">Base de Leads</DropdownItem>
                      <DropdownItem href="/leads">Leads Scoring</DropdownItem>
                      <DropdownItem href="/leads">
                        Segmentação de Leads
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
                </>
              )}
            </Nav>
          </div>
          {isLoggedIn && (
            <div style={{ flexDirection: "row", display: "flex" }}>
              <div className="menu-bar-profile">
                <span style={{ color: "white" }}>{user?.name}</span>
              </div>
              <div
                className="menu-bar-profile"
                style={{ cursor: "pointer" }}
                onClick={() => logout()}
              >
                <span style={{ color: "white" }}>Sair</span>
              </div>
            </div>
          )}
        </div>
      </Navbar>
    </div>
  );
};

export default MenuBar;
