import { AppBar, Typography } from "@mui/material";

const DashboardFooter = () => {
  const year = new Date().getFullYear();

  return (
    <AppBar
      component={"footer"}
      position="fixed"
      sx={{
        backgroundColor: "primary.main",
        top: "auto",
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography pt={2} pb={2} color="white" variant="subtitle1" component="p">
        {`Made with ❤️ by Chad J Campbell | ${year}`}
      </Typography>
    </AppBar>
  );
};

export default DashboardFooter;
