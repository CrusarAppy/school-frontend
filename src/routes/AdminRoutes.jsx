import React, { useState, useEffect, useRef } from "react";
import { getCookie } from "../utils/cookie/cookies";
import NavbarTitleContext from "../contexts/NavbarTitleContext";
import Sidebar from "../components/Admin/Sidebar/Sidebar";
import styles from "./AdminRoutes.module.css";
import Navbar from "../components/Admin/Navbar/Navbar";
import { Navigate } from "react-router-dom";

const AdminRoutes = ({ children, redirectTo }) => {
  const [notiNavigation] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [navbarTitle, setNavbarTitle] = useState("Home");
  const hamburgerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  return getCookie("adminToken") ? (
    <NavbarTitleContext.Provider value={{ navbarTitle, setNavbarTitle }}>
      <div className={styles.container}>
        {/* sidebar */}
        <Sidebar
          isOpen={isSidebarVisible}
          setIsOpen={setIsSidebarVisible}
          hamburgerRef={hamburgerRef}
        />
        {/* navbar */}
        <div className={styles.containerBody}>
          <Navbar
            notiNavigation={notiNavigation}
            isSidebarVisible={isSidebarVisible}
            setIsSidebarVisible={setIsSidebarVisible}
            setLoading={setLoading}
            hamburgerRef={hamburgerRef}
          />
          {children}
        </div>
      </div>
    </NavbarTitleContext.Provider>
  ) : (
    <Navigate to={redirectTo} />
  );
};

export default AdminRoutes;
