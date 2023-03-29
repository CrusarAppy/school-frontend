import cx from "classnames";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarTitleContext from "../../../contexts/NavbarTitleContext";
import styles from "./Sidebar.module.css";
import { ChevronDown } from "react-bootstrap-icons";

function SidebarItem({ item }) {
  const { setNavbarTitle } = useContext(NavbarTitleContext);
  const [subNavOpen, setSubNavOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const toggleSubNav = () => setSubNavOpen((prev) => !prev);

  useEffect(() => {
    if (
      item.subNav &&
      item.subNav.some((subItem) => subItem.path === location.pathname)
    ) {
      setSubNavOpen(true);
    }
  }, [item, location]); //submenu active subemnu open

  return (
    <div>
      <li
        style={{ padding: "1em" }}
        className={location.pathname === item.path ? styles.active : null}
        onClick={() => {
          if (item.subNav) toggleSubNav();
          else {
            navigate(item.path);
            setNavbarTitle(item.title);
          }
        }}
      >
        <div className={styles.icon}>{item.icon}</div>
        <div className={styles.itemTitle}>{item.title}</div>
        <ChevronDown
          className={
            item.subNav && subNavOpen
              ? styles.open
              : item.subNav
              ? styles.close
              : styles.none
          }
        />
      </li>
      {subNavOpen &&
        item.subNav.map((item, index) => (
          <div
            onClick={() => {
              navigate(item.path);
              setNavbarTitle(item.title);
            }}
            key={index}
            className={cx(
              styles.submenu,
              location.pathname === item.path ? styles.active : null
            )}
          >
            <div className={styles.spacing}></div>
            <div className={styles.submenuIcons}> {item.icon}</div>
            <div className={styles.submenuTitle}>{item.title}</div>
          </div>
        ))}
    </div>
  );
}

export default SidebarItem;
