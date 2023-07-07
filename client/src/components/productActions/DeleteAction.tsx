import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button, Typography, Modal, Box } from "@mui/material";
import { useState } from "react";

import { useAppDispatch } from "../../redux/store";
import { ActionCellProps, modalStyle } from "./ActionCell";
import {
  deleteProduct,
  getProducts,
} from "../../redux/features/product/productSlice";

export const DeleteAction = ({ product }: ActionCellProps) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async (id: string) => {
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
    handleClose();
  };

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
        <DeleteForeverIcon
          fontSize="medium"
          sx={{ color: "red", margin: "0 5px" }}
        />
        <Typography color="red" variant="caption">
          Delete
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
            Delete Product
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this product?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button color="error" onClick={() => handleDelete(product._id)}>
              Delete
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
