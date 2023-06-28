import {
  Button,
  Divider,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BugReportIcon from "@mui/icons-material/BugReport";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

type Anchor = "top" | "left" | "bottom" | "right";

const Sidebar = () => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  return (
    <>
      <Button
        startIcon={<MenuIcon sx={{ color: "white" }} />}
        variant="outlined"
        sx={{ borderColor: "white", margin: "5px", marginRight: "10px" }}
        onClick={toggleDrawer("left", true)}
      >
        <Typography color="white" component="div" sx={{ flexGrow: 1 }}>
          Menu
        </Typography>
      </Button>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        <Link
          style={{ textDecoration: "none", color: "#673AB7" }}
          to={"/dashboard"}
          onClick={toggleDrawer("left", false)}
        >
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon color="primary" />
              </ListItemIcon>
              <Typography fontSize="20px">Dashboard</Typography>
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link
          style={{ textDecoration: "none", color: "#673AB7" }}
          to={"/add-product"}
          onClick={toggleDrawer("left", false)}
        >
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <AddPhotoAlternateIcon color="primary" />
              </ListItemIcon>
              <Typography fontSize="20px">Add Product</Typography>
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link
          style={{ textDecoration: "none", color: "#673AB7" }}
          to={"/profile"}
          onClick={toggleDrawer("left", false)}
        >
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <ManageAccountsIcon color="primary" />
              </ListItemIcon>
              <Typography fontSize="20px">Profile</Typography>
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link
          style={{ textDecoration: "none", color: "#673AB7" }}
          to={"/report-bug"}
          onClick={toggleDrawer("left", false)}
        >
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <BugReportIcon color="primary" />
              </ListItemIcon>
              <Typography fontSize="20px">Report Bug</Typography>
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider />
        <Link
          style={{
            textDecoration: "none",
            color: "#673AB7",
            marginTop: "auto",
          }}
          to={"/"}
          onClick={toggleDrawer("left", false)}
        >
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon color="primary" />
              </ListItemIcon>
              <Typography fontSize="20px">Home Page</Typography>
            </ListItemButton>
          </ListItem>
        </Link>
      </Drawer>
    </>
  );
};

export default Sidebar;
