import { Box } from "@mui/material";
import DashboardFooter from "./DashboardFooter";
import DashboardHeader from "./DashboardHeader";
import { ReactNode } from "react";
import useAuthRedirect from "../../customHooks/useAuthRedirect";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  useAuthRedirect("/login");
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <DashboardHeader />
      <Box sx={{ minHeight: "80vh", width: "100vw", margin: "40px 0" }}>
        {children}
      </Box>
      <DashboardFooter />
    </Box>
  );
};

export default Layout;
