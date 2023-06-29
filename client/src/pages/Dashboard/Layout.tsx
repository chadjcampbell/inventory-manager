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
    <>
      <DashboardHeader />
      <Box sx={{ minHeight: "80vh", width: "100vw" }}>{children}</Box>
      <DashboardFooter />
    </>
  );
};

export default Layout;
