import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Sidebar from "./Sidebar";
import { logoutUser } from "../../redux/features/auth/authService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SET_LOGIN, selectName } from "../../redux/features/auth/authSlice";
import Loading from "../../components/Loading";

const DashboardHeader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);

  const logout = async () => {
    setIsLoading(true);
    await logoutUser();
    dispatch(SET_LOGIN(false));
    navigate("/login");
    setIsLoading(false);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      {isLoading && <Loading />}
      <AppBar
        component={"header"}
        sx={{ backgroundColor: "primary.main" }}
        position="static"
      >
        <Toolbar>
          <Sidebar />
          <Typography variant="h6">Hello,</Typography>{" "}
          <Typography
            variant="h6"
            color="yellow"
            sx={{ flexGrow: 1, padding: "5px" }}
          >
            {name}
          </Typography>
          <Button onClick={logout} variant="outlined" color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default DashboardHeader;
