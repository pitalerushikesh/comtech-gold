import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Footer from "../components/Footer";
import MainNavbar from "../components/MainNavbar";

const MainLayout = () => {
  return (
    <>
      <MainNavbar />
      <Box sx={{ position: "relative", flex: "1" }}>
        <Outlet />
        <Footer />
      </Box>
    </>
  );
};

export default MainLayout;
