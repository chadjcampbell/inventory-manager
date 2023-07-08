import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ProfileData } from "./Profile";
import {
  Container,
  Paper,
  Typography,
  Button,
  TextField,
  Input,
  Box,
} from "@mui/material";

import Loading from "../../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser);
  const [profile, setProfile] = useState<ProfileData>(user);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const { email } = user;

  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setProfile({ ...profile, [event.target.name]: value });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProfileImage(event.target.files[0]);
    }
  };

  const saveProfile = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      // handle image upload to cloudinary
      let imageURL;
      if (
        profileImage &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png" ||
          profileImage.type === "image/webp")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", "duu3fdfk0");
        image.append("upload_preset", "zx0zcbpv");

        // save to cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/duu3fdfk0/image/upload",
          { method: "post", body: image }
        );
        const imageData = await response.json();
        imageURL = imageData.url.toString();

        // TODO - send all data to mongoDB
        toast.success("Profile updated successfully");
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <Container>
      {isLoading && <Loading />}
      <Paper sx={{ marginBottom: "50px" }}>
        <form onSubmit={saveProfile}>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Container
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                margin: "50px",
                width: "auto",
              }}
            >
              <img
                style={{ maxWidth: "300px" }}
                src={profile.photo}
                alt={profile.name}
              />
            </Container>
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "auto",
                margin: "50px",
              }}
            >
              <TextField
                fullWidth
                sx={{ margin: "10px" }}
                label="Name"
                value={profile.name}
                name="name"
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                sx={{ margin: "10px" }}
                label="Email"
                value={profile.email}
                name="email"
                onChange={handleInputChange}
                disabled
              />
              <code style={{ alignSelf: "flex-start", marginBottom: "10px" }}>
                *Email cannot be changed
              </code>
              <TextField
                fullWidth
                sx={{ margin: "10px" }}
                label="Phone number"
                value={profile.phone}
                name="phone"
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                sx={{ margin: "10px" }}
                label="Bio"
                value={profile.bio}
                name="bio"
                onChange={handleInputChange}
                multiline
                rows={4}
              />
              <Container
                sx={{
                  padding: "5px",
                  display: "flex",
                  border: "1px solid lightgrey",
                  borderRadius: "5px",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Typography>Profile Image:</Typography>
                <Typography variant="subtitle2">
                  Supported formats: jpg, jpeg, png, webp
                </Typography>
                <Input name="image" onChange={handleImageChange} type="file" />
              </Container>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  sx={{ marginTop: "20px" }}
                  variant="contained"
                  type="submit"
                >
                  Save Changes
                </Button>
                <Button
                  color="error"
                  sx={{ marginTop: "20px" }}
                  component={Link}
                  to="/profile"
                >
                  Cancel
                </Button>
              </Box>
            </Container>
          </Container>
        </form>
      </Paper>
    </Container>
  );
};

export default EditProfile;
