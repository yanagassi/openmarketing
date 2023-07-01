import React, { useContext } from "react";
import { Nav, NavItem, NavLink, Navbar, Row } from "reactstrap";
import "../../assets/css/menu.css";
import MenuItems from "../../constants/menu";
import { ApiContext } from "../../context/ApiContext";

const MenuBar = () => {
  const { isLoggedIn, user, logout } = useContext(ApiContext);

  if (window?.location?.pathname?.match(/\/view\/[^&]*/)?.length > 0) {
    return null;
  }

  return (
    <div className="menu-bar">
      <Navbar className="menu-bar-container" color="dark" dark expand="md">
        <div className="menu-bar-main">
          <div>
            <Nav navbar>
              {isLoggedIn &&
                MenuItems.filter((i) => !i.hidden).map((i) => (
                  <NavItem active={i.active} className="menu-bar-item">
                    <NavLink href={i.href}>{i.text}</NavLink>
                  </NavItem>
                ))}
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
