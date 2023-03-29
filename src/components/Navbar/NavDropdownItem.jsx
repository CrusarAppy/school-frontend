import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import cx from "classnames";
import useWindowDimensions from "../../custom_hooks/useWindowDimensions";
import { useTranslation } from "react-i18next";

const NavDropdownItem = ({ item, onItemClick }) => {
  const { width } = useWindowDimensions();
  const dropdownShow = width > 992 ? { show: true } : {};
  const [showDropdown, setShowDropdown] = useState(false);
  const { t } = useTranslation("navbar");
  return (
    <NavDropdown
      title={t(item.title)}
      id="collasible-nav-dropdown"
      onMouseEnter={() => {
        setShowDropdown(true);
      }}
      onMouseLeave={() => {
        setShowDropdown(false);
      }}
      {...dropdownShow}
      onSelect={(e) => {
        console.log(e);
      }}
    >
      {showDropdown &&
        item.dropdown.map((dropdownElement, dropdownIndex) => {
          return (
            <NavLink
              className={cx("nav-link nav-dropdown-item")}
              key={dropdownIndex}
              to={dropdownElement.path}
              onClick={() => {
                onItemClick();
                window.scrollTo(0, 0);
              }}
            >
              {t(dropdownElement.title)}
            </NavLink>
          );
        })}
    </NavDropdown>
  );
};

export default NavDropdownItem;
