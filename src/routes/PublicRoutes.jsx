import Footer from "../components/Footer/Footer";
import GoTop from "../components/GoTop";
import HeaderNavbar from "../components/Navbar/HeaderNavbar";
import Topnav from "../components/Topnav/Topnav";

const PublicRoutes = ({ children }) => {
  return (
    <>
      <Topnav />
      <HeaderNavbar />
      {children}
      <GoTop />
      <Footer />
    </>
  );
};

export default PublicRoutes;
