import { Box } from "@mui/material";
import { ProductDataTableType } from "../ProductList";

import { ViewAction } from "./ViewAction";
import { EditAction } from "./EditAction";
import { DeleteAction } from "./DeleteAction";

export const modalStyle = {
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

export type ActionCellProps = {
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
