import React from "react";
import Page from "../components/page";
import { Container, Typography } from "@mui/material";

const Home = () => {
  return (
    <Page title="XDC Liquidity Portal | TradeFineX">
      <Container>
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
          Comtech Gold
        </Typography>
      </Container>
    </Page>
  );
};

export default Home;
