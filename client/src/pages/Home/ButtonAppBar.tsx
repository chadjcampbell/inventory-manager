import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Inventory2Outlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: "primary.main" }} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Inventory2Outlined />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            inStock
          </Typography>
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            color="inherit"
          >
            Login
          </Button>
          <Button component={Link} to="/register" color="inherit">
            Sign Up
          </Button>
          <Button
            component={Link}
            to="/dashboard"
            color="inherit"
            variant="outlined"
          >
            Dashboard
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
