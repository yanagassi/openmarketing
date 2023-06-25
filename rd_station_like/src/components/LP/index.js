import React from "react";
import { Nav, NavItem, NavLink, Navbar } from "reactstrap";
import "../../assets/css/menu.css";
import MenuItems from "../../constants/menu";

const MenuBar = () => {
  if (window?.location?.pathname?.match(/\/view\/[^&]*/)?.length > 0) {
    return null;
  }
  return (
    <div className="menu-bar">
      <Navbar className="menu-bar-container" color="dark" dark expand="md">
        <div className="menu-bar-main">
          <div>
            <Nav navbar>
              {MenuItems.filter((i) => !i.hidden).map((i) => (
                <NavItem active={i.active} className="menu-bar-item">
                  <NavLink href={i.href}>{i.text}</NavLink>
                </NavItem>
              ))}
            </Nav>
          </div>
          <div className="menu-bar-profile">
            <span style={{ color: "white" }}>Profile</span>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default MenuBar;
