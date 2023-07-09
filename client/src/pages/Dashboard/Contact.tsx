import { FormEvent, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Paper,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../../redux/features/auth/authService";

export default function Contact() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const data = { subject, message };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BACKEND_URL}/api/contactUs`, data);
      setSubject("");
      setMessage("");
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Container>
      <Paper>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            minHeight: "80vh",
          }}
        >
          <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
            <Typography variant="h4" align="center" mb={2}>
              Contact Us
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                margin="normal"
                required
                multiline
                rows={4}
              />
              <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
