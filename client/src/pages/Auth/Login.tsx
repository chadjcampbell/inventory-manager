import { Inventory2Outlined } from "@mui/icons-material";
import {
  TextField,
  Button,
  Card,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { validEmail } from "./Register";
import { loginUser } from "../../redux/features/auth/authService";
import { toast } from "react-toastify";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import Loading from "../../components/Loading";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameIndex, setNameIndex] = useState(0);
  const [passIndex, setPassIndex] = useState(0);
  const [guestBool, setGuestBool] = useState(false);
  const guestData = { email: "chadjcampbell@gmail.com", password: "fakepass" };

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (nameIndex < guestData.email.length && guestBool) {
      timer = setTimeout(() => {
        setEmail((prev) => prev + guestData.email[nameIndex]);
        setNameIndex((nameIndex) => nameIndex + 1);
      }, 50);
    }
    if (
      passIndex < guestData.password.length &&
      nameIndex === guestData.email.length &&
      guestBool
    ) {
      timer = setTimeout(() => {
        setPassword((prev) => prev + guestData.password[passIndex]);
        setPassIndex((passIndex) => passIndex + 1);
      }, 50);
    }
    if (
      passIndex === guestData.password.length &&
      nameIndex === guestData.email.length &&
      guestBool
    ) {
      timer = setTimeout(() => {
        handleSubmit();
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [guestBool, nameIndex, passIndex]);

  const handleGuestLogin = async () => {
    setEmail("");
    setPassword("");
    setGuestBool(true);
  };

  const handleSubmit = async (e?: FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (!validEmail(email)) {
      return toast.error("Email must be valid");
    }
    const userData = { email, password };
    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      dispatch(SET_LOGIN(true));
      dispatch(SET_NAME(data.name));
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error);
      setIsLoading(false);
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
        <h1>Welcome back</h1>
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
            label="Email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            sx={{ margin: "10px" }}
            label="Password"
            value={password}
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            sx={{ margin: "30px" }}
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          <Button
            onClick={handleGuestLogin}
            sx={{ margin: "30px" }}
            variant="contained"
            color="info"
          >
            Guest Account
          </Button>
        </form>
        <Typography
          to="/forgot"
          color="primary"
          component={Link}
          sx={{ flexGrow: 1, textDecoration: "none" }}
        >
          Forgot password?
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>Don't have an account?</p>{" "}
          <Typography
            to="/register"
            color="primary"
            component={Link}
            sx={{ flexGrow: 1, padding: "5px", textDecoration: "none" }}
          >
            Sign Up!
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default Login;
