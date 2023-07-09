import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { changePassword } from "../../redux/features/auth/authService";
import { useNavigate } from "react-router-dom";

const initialState = {
  oldPassword: "",
  password: "",
  password2: "",
};

export type PasswordUpdateData = {
  oldPassword: string;
  password: string;
};

const ChangePassword = () => {
  const [formData, setFormData] = useState(initialState);
  const { oldPassword, password, password2 } = formData;
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setFormData({ ...formData, [event.target.name]: value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (password !== password2) {
      toast.error("New passwords must match");
    }

    const formData = {
      oldPassword,
      password,
    };
    try {
      const data = await changePassword(formData);
      toast.success(data);
      navigate("/profile");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "300px",
          padding: "20px",
          marginBottom: "50px",
          border: "3px red solid",
          borderRadius: "5px",
        }}
        onSubmit={handleSubmit}
      >
        {" "}
        <h2>Change Password</h2>
        <TextField
          fullWidth
          type="password"
          label="Old Password"
          value={oldPassword}
          name="oldPassword"
          onChange={handleInputChange}
          margin="normal"
          required
        ></TextField>
        <TextField
          fullWidth
          type="password"
          label="New Password"
          name="password"
          value={password}
          onChange={handleInputChange}
          margin="normal"
          required
        ></TextField>
        <TextField
          fullWidth
          type="password"
          label="Confirm New Password"
          name="password2"
          value={password2}
          onChange={handleInputChange}
          margin="normal"
          required
        ></TextField>
        <Button sx={{ marginTop: "20px" }} variant="contained" type="submit">
          Change Password
        </Button>
      </form>
    </Box>
  );
};

export default ChangePassword;
