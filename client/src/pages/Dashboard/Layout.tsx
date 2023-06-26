import { Container } from "@mui/material";
import DashboardFooter from "./DashboardFooter";
import DashboardHeader from "./DashboardHeader";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <DashboardHeader />
      <Container sx={{ minHeight: "80vh" }}>{children}</Container>
      <DashboardFooter />
    </>
  );
};

export default Layout;
