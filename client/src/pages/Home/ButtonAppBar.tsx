import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Inventory2Outlined } from "@mui/icons-material";

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
          <Button variant="outlined" color="inherit">
            Login
          </Button>
          <Button color="inherit">Sign Up</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
