import VisibilityIcon from "@mui/icons-material/Visibility";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box, Button, Modal, Typography } from "@mui/material";
import { ProductDataTableType } from "./ProductList";
import { useState } from "react";
import {
  deleteProduct,
  getProducts,
} from "../redux/features/product/productSlice";
import { useAppDispatch } from "../redux/store";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
  minWidth: "300px",
  maxWidth: "90%",
};

type ActionCellProps = {
  product: ProductDataTableType;
};

export const ActionCell = ({ product }: ActionCellProps) => {
  return (
    <Box display={"flex"}>
      <ViewAction product={product} />
      <EditAction product={product} />
      <DeleteAction product={product} />
    </Box>
  );
};

const ViewAction = ({ product }: ActionCellProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button sx={{ padding: "0" }} onClick={handleOpen}>
        <VisibilityIcon
          fontSize="large"
          sx={{ color: "purple", margin: "0 5px" }}
        />
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

const EditAction = ({ product }: ActionCellProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button sx={{ padding: "0" }} onClick={handleOpen}>
        <EditNoteIcon
          fontSize="large"
          sx={{ color: "green", margin: "0 5px" }}
        />
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

const DeleteAction = ({ product }: ActionCellProps) => {
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
      <Button sx={{ padding: "0" }} onClick={handleOpen}>
        <DeleteForeverIcon
          fontSize="large"
          sx={{ color: "red", margin: "0 5px" }}
        />
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
