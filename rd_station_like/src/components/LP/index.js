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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
              {/* {isLoggedIn &&
                MenuItems.filter((i) => !i.hidden).map((i) => (
                  <NavItem
                    active={i.active}
                    className="menu-bar-item"
                    key={i.text}
                  >
                    <NavLink href={i.href}>{i.text}</NavLink>
                  </NavItem>
                ))} */}

              <NavItem className="menu-bar-item">
                <NavLink href="/">Inicio</NavLink>
              </NavItem>

              {isLoggedIn && (
                <Dropdown
                  className="menu-data-items"
                  nav
                  isOpen={dropdownOpen}
                  toggle={toggleDropdown}
                >
                  <DropdownToggle className="menu-data-items" nav caret>
                    Converter{" "}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem href="/landing-pages">
                      Landing Pages
                    </DropdownItem>
                    {/* <DropdownItem href="/converter/opcao2">
                      Opção 2
                    </DropdownItem> */}
                  </DropdownMenu>
                </Dropdown>
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
