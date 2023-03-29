import React, { useEffect } from "react";
import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import NavDropdownItem from "./NavDropdownItem";
import useWindowDimensions from "../../custom_hooks/useWindowDimensions";
import { navItems } from "./navItems";
import { useTranslation } from "react-i18next";
const HeaderNavbar = () => {
  const [expanded, setExpanded] = useState(false);
  const { width } = useWindowDimensions();

  const collapseNavbar = () => {
    if (width <= 992) {
      setExpanded(!expanded);
    }
  };

  const { t } = useTranslation("navbar");

  useEffect(() => {
    let elementId = document.getElementById("navbar");
    // document.addEventListener("scroll", () => {
    //   if (window.scrollY > 270) {
    //     elementId.classList.add("navbar-sticky");
    //     elementId.classList.remove("navbar-absolute");
    //   } else {
    //     elementId.classList.remove("navbar-sticky");
    //     elementId.classList.add("navbar-absolute");
    //   }
    // });
  }, []);

  return (
    <Navbar
      id="navbar"
      collapseOnSelect
      expand="lg"
      variant="dark"
      className="navbar-absolute"
      style={{ zIndex: "200" }}
      expanded={expanded}
    >
      <Container id="navbar-container">
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={collapseNavbar}
        />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {navItems.map((element, index) => {
              if (element.dropdown) {
                return (
                  <NavDropdownItem
                    item={element}
                    key={index}
                    onItemClick={collapseNavbar}
                    className="nav-link"
                  />
                );
              } else {
                return (
                  <NavLink
                    className="nav-link"
                    key={index}
                    to={element.path}
                    onClick={() => {
                      collapseNavbar();
                      window.scrollTo(0, 0);
                    }}
                  >
                    {t(element.title)}
                  </NavLink>
                );
              }
            })}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Brand>
          <NavLink
            to="/login/"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            className="nav-link"
          >
            {t("logIn")}
          </NavLink>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default HeaderNavbar;
