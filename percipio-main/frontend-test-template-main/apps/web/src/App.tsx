import React from "react";
import { Container, Stack } from "@mui/material";
import { PatientHeader } from "./components/PatientHeader";
import DiscoveriesSection from "./components/DiscoveriesSection";

function App() {
  return (
    <Container sx={{ p: { xs: 2, sm: 4, md: 6 } }}>
      <Stack spacing={2}>
        <PatientHeader />
        <DiscoveriesSection />
      </Stack>
    </Container>
  );
}

export default App;
