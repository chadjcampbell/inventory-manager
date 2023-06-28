import { Container } from "@mui/material";
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
      <Container sx={{ minHeight: "80vh" }}>{children}</Container>
      <DashboardFooter />
    </>
  );
};

export default Layout;
