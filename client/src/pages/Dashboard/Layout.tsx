import { Box } from "@mui/material";
import DashboardFooter from "./DashboardFooter";
import DashboardHeader from "./DashboardHeader";
import { ReactNode, useEffect, useState } from "react";
import useAuthRedirect from "../../customHooks/useAuthRedirect";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import Loading from "../../components/Loading";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  useEffect(() => {
    setLoading(!isLoggedIn);
  }, []);
  useAuthRedirect("/login");
  return loading ? (
    <Loading />
  ) : (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <DashboardHeader />
      <Box sx={{ minHeight: "80vh", width: "100%", margin: "40px 0" }}>
        {children}
      </Box>
      <DashboardFooter />
    </Box>
  );
};

export default Layout;
