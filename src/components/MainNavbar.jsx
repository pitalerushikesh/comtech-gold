import { AppBar, Box, Container } from "@mui/material";
import logo from "../assets/img/logo.png";

const MainNavbar = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#fff",
        height: "3.8rem",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Container
        sx={{
          backgroundColor: "#fff",
          height: "3.8rem",
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* <Toolbar> */}
        <Box
          component="img"
          src={logo}
          sx={{ height: "2.6rem" }}
          alt="Comtech Gold"
        />

        <Box sx={{ flexGrow: 1.2 }} />
      </Container>
    </AppBar>
  );
};

export default MainNavbar;
