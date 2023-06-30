import { Inventory2Outlined } from "@mui/icons-material";
import {
  TextField,
  Button,
  Card,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import { resetPassword } from "../../redux/features/auth/authService";
import Loading from "../../components/Loading";

const Reset = () => {
  const { resetToken } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords must match");
    }
    const userData = { password };
    if (resetToken) {
      setIsLoading(true);
      try {
        const data = await resetPassword(userData, resetToken);
        dispatch(SET_LOGIN(true));
        dispatch(SET_NAME(data.name));
        navigate("/dashboard");
        setIsLoading(false);
      } catch (error: any) {
        toast.error(error);
        setIsLoading(false);
      }
    }
  };

  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(220,196,246,1) 100%)",
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isLoading && <Loading />}
      <Card
        sx={{
          padding: "20px",
          maxWidth: "350px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "80%",
            borderRadius: "5px",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            component={Link}
            to="/"
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Inventory2Outlined />
          </IconButton>
          <Typography
            color="primary"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            inStock
          </Typography>
        </Box>
        <h1>Reset password</h1>
        <form
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
          onSubmit={(e) => handleSubmit(e)}
        >
          <TextField
            sx={{ margin: "10px" }}
            label="New password"
            value={password}
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            sx={{ margin: "10px" }}
            label="Confirm new password"
            value={confirmPassword}
            name="confirmPassword"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            sx={{ margin: "30px" }}
            variant="contained"
            color="primary"
          >
            Reset Password
          </Button>
        </form>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            to="/login"
            color="primary"
            component={Link}
            sx={{ flexGrow: 1, padding: "5px", textDecoration: "none" }}
          >
            Login
          </Typography>{" "}
          -
          <Typography
            to="/register"
            color="primary"
            component={Link}
            sx={{ flexGrow: 1, padding: "5px", textDecoration: "none" }}
          >
            Register
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default Reset;
