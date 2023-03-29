import React from "react";

const NavbarTitleContext = React.createContext({
  navbarTitle: "",
  setNavbarTitle: () => {},
});

export default NavbarTitleContext;
