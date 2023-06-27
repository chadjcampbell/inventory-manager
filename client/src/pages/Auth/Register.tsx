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
import { Link } from "react-router-dom";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: Submit the form
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
