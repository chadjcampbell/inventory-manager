import { AppBar, Typography } from "@mui/material";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <AppBar
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
      <Typography pt={2} pb={2} color="white" variant="subtitle1">
        {`Made with ❤️ by Chad J Campbell | ${year}`}
      </Typography>
    </AppBar>
  );
};

export default Footer;
