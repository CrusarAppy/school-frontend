import cx from "classnames";
import React, { useContext, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavbarTitleContext from "../../../contexts/NavbarTitleContext";
import styles from "./Navbar.module.css";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";
import { List, House, Person, Bell } from "react-bootstrap-icons";

function Navbar({
  notiNavigation,
  isSidebarVisible,
  setIsSidebarVisible,
  setLoading,
  hamburgerRef,
}) {
  const profileDropdownRef = useRef(null);
  const [isProfileActive, setIsProfileActive] = useState(false);

  const notificationRef = useRef(null);
  const [isNotificationActive, setIsNotificationActive] = useState(false);

  const { navbarTitle } = useContext(NavbarTitleContext);

  const handleProfile = () => {
    setIsProfileActive(!isProfileActive);
  };

  const handleNotification = () => {
    setIsNotificationActive(!isNotificationActive);
  };

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.menuIcon} ref={hamburgerRef}>
        <List
          size="40px"
          className={styles.icons}
          onClick={() => {
            setIsSidebarVisible((prev) => !prev);
          }}
        />
      </div>
      <div className={styles.navbarTitle}>{navbarTitle}</div>
      <ul className={styles.listItems}>
        <li className={styles.listElements}>
          <House
            className={cx(
              styles.icons,
              location.pathname === "/" ? styles.clickActive : null
            )}
            size="30px"
            onClick={() => navigate("/admin/dashboard/")}
          />
        </li>
        <li className={styles.listElements} ref={notificationRef}>
          <Bell
            className={cx(
              styles.icons,
              isNotificationActive ? styles.clickActive : null
            )}
            size="30px"
            onClick={handleNotification}
          />
          <div className={styles.notify}>{notiNavigation.length}</div>
          <NotificationDropdown
            notiNavigation={notiNavigation}
            notificationRef={notificationRef}
            isNotificationActive={isNotificationActive}
            setIsNotificationActive={setIsNotificationActive}
          />
        </li>
        <li className={styles.listElements} ref={profileDropdownRef}>
          <Person
            className={cx(
              styles.icons,
              isProfileActive ? styles.clickActive : null
            )}
            size="35px"
            onClick={handleProfile}
          />
          <ProfileDropdown
            profileDropdownRef={profileDropdownRef}
            isProfileActive={isProfileActive}
            setIsProfileActive={setIsProfileActive}
            setLoading={setLoading}
          />
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
