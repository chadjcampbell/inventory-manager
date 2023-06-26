import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Grid
      minHeight="90vh"
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
      sx={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(220,196,246,1) 100%)",
      }}
    >
      <Stack
        sx={{ borderRadius: 5, overflow: "hidden" }}
        px={5}
        gap={3}
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Typography color="primary" variant="h4" component="h1">
          inStock Inventory Manager
        </Typography>
        <Typography variant="h6" component="h2">
          Inventory management made easy!
        </Typography>
        <Button component={Link} to="/dashboard" variant="outlined">
          Get Started
        </Button>
      </Stack>
      <Box mx={3} sx={{ borderRadius: 5, overflow: "hidden" }}>
        <img src="/landing.webp" alt="Inventory Stock Photo" loading="lazy" />
      </Box>
    </Grid>
  );
};

export default Landing;
