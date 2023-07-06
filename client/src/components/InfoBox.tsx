import { Box, Container, Paper, Typography } from "@mui/material";
import { ReactNode } from "react";

type InfoBoxProps = {
  bgColor: string;
  title: string;
  count: number | string;
  icon: ReactNode;
};

const InfoBox = ({ bgColor, title, count, icon }: InfoBoxProps) => {
  return (
    <Paper
      sx={{
        backgroundColor: bgColor,
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        margin: "8px",
        width: "270px",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>{icon}</Box>
        <Container>
          <Typography>{title}</Typography>
          <Typography>{count}</Typography>
        </Container>
      </Container>
    </Paper>
  );
};

export default InfoBox;
