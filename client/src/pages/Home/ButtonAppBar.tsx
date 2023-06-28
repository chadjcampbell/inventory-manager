import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Inventory2Outlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";

export default function ButtonAppBar() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
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
          {!isLoggedIn && (
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              color="inherit"
            >
              Login
            </Button>
          )}

          {!isLoggedIn && (
            <Button component={Link} to="/register" color="inherit">
              Sign Up
            </Button>
          )}

          {isLoggedIn && (
            <Button
              component={Link}
              to="/dashboard"
              color="inherit"
              variant="outlined"
            >
              Dashboard
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
