import cx from "classnames";
import { useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import NavbarTitleContext from "../../../contexts/NavbarTitleContext";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { menuItems } from "./menuItems";
import styles from "./Sidebar.module.css";
import SidebarItem from "./SidebarItem";
import { ArrowLeft } from "react-bootstrap-icons";

const getTitle = (menuItems, pathname) => {
  for (let menu of menuItems) {
    if (menu.subNav) {
      for (let submenu of menu.subNav) {
        if (submenu.path === pathname) return submenu.title;
      }
    } else {
      if (menu.path === pathname) return menu.title;
    }
  }
  return "";
};

function Sidebar({ isOpen, setIsOpen, hamburgerRef }) {
  const location = useLocation();
  const { width } = useWindowDimensions();
  const { setNavbarTitle } = useContext(NavbarTitleContext);

  const sidebarRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    if (width >= 1200 && mounted) {
      setIsOpen(true);
    }
    return () => {
      mounted = false;
    };
  }, [width, setIsOpen]);

  useEffect(() => {
    let mounted1 = true;
    setNavbarTitle(getTitle(menuItems, location.pathname));
    if (width >= 1200 && mounted1) {
    }
    return () => {
      mounted1 = false;
    };
  }, [location, setNavbarTitle, width]);

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (
        width < 1200 &&
        sidebarRef.current !== null &&
        hamburgerRef.current !== null &&
        !(
          sidebarRef.current.contains(e.target) ||
          hamburgerRef.current.contains(e.target)
        )
      ) {
        setIsOpen(!isOpen);
      }
    };
    if (isOpen) {
      window.addEventListener("click", pageClickEvent);
    }

    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [isOpen, sidebarRef, setIsOpen, width, hamburgerRef.current]);

  return (
    <div
      className={cx(styles.sidebar)}
      ref={sidebarRef}
      style={
        isOpen
          ? { display: "block" }
          : {
              transform: "translate(-300px,0)",
              width: 0,
              transition: "all 750ms ease-in-out",
            }
      }
    >
      <div className={styles.titleContainer}>
        <div className={styles.spacing}></div>
        <div className={styles.title}>Admin Panel</div>
        <ArrowLeft
          style={width <= 1200 ? { display: "block" } : { display: "none" }}
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
          className={styles.icons}
        />
      </div>
      <div className={styles.sidebarItems}>
        <ul className={styles.itemsList}>
          {menuItems.map((item, key) => (
            <SidebarItem item={item} key={key} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
