import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { getUser } from "../../redux/features/auth/authService";
import { SET_NAME, SET_USER } from "../../redux/features/auth/authSlice";

const Profile = () => {
  const dispatch = useAppDispatch();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
  return <h1>profile</h1>;
};

export default Profile;
