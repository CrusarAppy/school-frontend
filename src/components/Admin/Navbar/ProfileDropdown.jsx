import cx from "classnames";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../utils/api/adminAuth";
import { clearCookie } from "../../../utils/cookie/cookies";
import styles from "./Navbar.module.css";

function ProfileDropdown({
  profileDropdownRef,
  isProfileActive,
  setIsProfileActive,
  setLoading,
}) {
  useEffect(() => {
    const pageClickEvent = (e) => {
      if (
        profileDropdownRef.current !== null &&
        !profileDropdownRef.current.contains(e.target)
      ) {
        setIsProfileActive(!isProfileActive);
      }
    };
    if (isProfileActive) {
      window.addEventListener("click", pageClickEvent);
    }

    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [isProfileActive, profileDropdownRef, setIsProfileActive]);
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    if (path === "/logout/") {
      setLoading(true);
      logout()
        .then((res) => {
          clearCookie("adminToken");
          navigate("/admin/");
          setLoading(false);
        })
        .catch((err) => {
          clearCookie("adminToken");
          setLoading(false);
          navigate("/admin/");
        });
      clearCookie("adminToken");
    } else if (path === "/profile/") {
      navigate("/admin/profile/");
    }
    setIsProfileActive(false);
  };

  return (
    <nav
      className={cx(isProfileActive ? styles.active : "inactive", styles.menu)}
    >
      <ul>
        <li onClick={() => handleNavigation("/profile/")}>Profile</li>
        <li onClick={() => handleNavigation("/logout/")}>Logout</li>
      </ul>
    </nav>
  );
}

export default ProfileDropdown;
