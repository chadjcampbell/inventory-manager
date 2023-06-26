import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardHeader = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: "primary.main" }} position="static">
        <Toolbar>
          <Sidebar />
          <Typography variant="h6">Hello,</Typography>{" "}
          <Typography
            variant="h6"
            color="yellow"
            sx={{ flexGrow: 1, padding: "5px" }}
          >
            Chad
          </Typography>
          <Button
            component={Link}
            to="/logout"
            variant="outlined"
            color="inherit"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default DashboardHeader;
