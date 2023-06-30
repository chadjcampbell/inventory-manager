import { useEffect } from "react";
import { getLoginStatus } from "../redux/features/auth/authService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const useAuthRedirect = (path: string) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const authRedirect = async () => {
      const isLoggedIn = await getLoginStatus();
      dispatch(SET_LOGIN(isLoggedIn));

      if (!isLoggedIn) {
        toast.info("Session expired, please login");
        navigate(path);
        return false;
      }
      return true;
    };
    authRedirect();
  }, [navigate, path, dispatch]);
};

export default useAuthRedirect;
