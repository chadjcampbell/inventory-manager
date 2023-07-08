import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { getUser } from "../../redux/features/auth/authService";
import { SET_NAME, SET_USER } from "../../redux/features/auth/authSlice";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import Loading from "../../components/Loading";
import { useTheme } from "@emotion/react";
import { MyTheme } from "../../main";
import { Link } from "react-router-dom";

type ProfileData = {
  name: string;
  phone: string;
  photo: string;
  email: string;
  bio: string;
};

const Profile = () => {
  const dispatch = useAppDispatch();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const theme: MyTheme = useTheme();

  useEffect(() => {
    setIsLoading(true);
    async function getUserData() {
      const data = await getUser();
      console.log(data);
      setProfile(data);
      setIsLoading(false);
      dispatch(SET_USER(data));
      dispatch(SET_NAME(data.name));
    }
    getUserData();
  }, [dispatch]);
  return (
    <Container>
      {isLoading && <Loading />}
      <Paper>
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
              src={profile?.photo}
              alt={profile?.name}
            />
          </Container>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              width: "auto",
              margin: "50px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Typography sx={{ marginRight: "5px", fontWeight: "bold" }}>
                Name:{" "}
              </Typography>
              <Typography>{profile?.name}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Typography sx={{ marginRight: "5px", fontWeight: "bold" }}>
                Email:{" "}
              </Typography>
              <Typography color={theme.palette?.primary.main}>
                {profile?.email}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Typography sx={{ marginRight: "5px", fontWeight: "bold" }}>
                Phone number:{" "}
              </Typography>
              <Typography>{profile?.phone}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ marginRight: "5px", fontWeight: "bold" }}>
                Bio:{" "}
              </Typography>
              <Typography>{profile?.bio}</Typography>
            </Box>
            <Button
              sx={{ marginTop: "20px" }}
              variant="contained"
              component={Link}
              to="/edit-profile"
            >
              Edit Profile
            </Button>
          </Container>
        </Container>
      </Paper>
    </Container>
  );
};

export default Profile;
