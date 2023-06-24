import { Box, Button, Grid, Stack, Typography } from "@mui/material";

const Landing = () => {
  return (
    <Grid
      minHeight="90vh"
      container
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Stack
        sx={{ borderRadius: 5, overflow: "hidden" }}
        bgcolor="primary"
        px={5}
        gap={3}
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Typography variant="h4" component="h1">
          inStock Inventory Manager
        </Typography>
        <Typography variant="h6" component="h2">
          Inventory management made easy!
        </Typography>
        <Button variant="outlined">Get Started</Button>
      </Stack>
      <Box mx={3} sx={{ borderRadius: 5, overflow: "hidden" }}>
        <img src="/landing.webp" alt="Inventory Stock Photo" loading="lazy" />
      </Box>
    </Grid>
  );
};

export default Landing;
