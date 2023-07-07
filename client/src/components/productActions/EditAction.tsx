import EditNoteIcon from "@mui/icons-material/EditNote";
import { Button, Typography, Modal, Box } from "@mui/material";
import { useState } from "react";
import { ActionCellProps, modalStyle } from "./ActionCell";

export const EditAction = ({ product }: ActionCellProps) => {
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
        <EditNoteIcon
          fontSize="medium"
          sx={{ color: "green", margin: "0 5px" }}
        />
        <Typography color="green" variant="caption">
          Edit
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
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
