import { Button, Typography, Modal, Box } from "@mui/material";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ActionCellProps, modalStyle } from "./ActionCell";
import ViewActionDisplay from "./ViewActionDisplay";
import CloseIcon from "@mui/icons-material/Close";

export const ViewAction = ({ product }: ActionCellProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        sx={{
          padding: "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={handleOpen}
      >
        <VisibilityIcon
          fontSize="medium"
          sx={{ color: "purple", margin: "0 5px" }}
        />
        <Typography color="purple" variant="caption">
          View
        </Typography>
      </Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={modalStyle}>
          <Button
            sx={{ position: "absolute", right: "0" }}
            onClick={handleClose}
          >
            <CloseIcon />
          </Button>
          <ViewActionDisplay product={product} />
        </Box>
      </Modal>
    </div>
  );
};
