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
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../redux/features/auth/authService";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";
import Loading from "../../components/Loading";

export const validEmail = (email: string): boolean => {
  const regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  return regex.test(email);
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords must match");
    }
    if (!validEmail(email)) {
      return toast.error("Email must be valid");
    }
    const userData = { name, email, password };
    setIsLoading(true);
    try {
      const data = await registerUser(userData);
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
        <h1>Register</h1>
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
            label="Name"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
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
          <TextField
            sx={{ margin: "10px" }}
            label="Confirm password"
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
            Sign Up
          </Button>
        </form>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>Already have an account?</p>{" "}
          <Typography
            to="/login"
            color="primary"
            component={Link}
            sx={{ flexGrow: 1, padding: "5px", textDecoration: "none" }}
          >
            Login
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default Register;
