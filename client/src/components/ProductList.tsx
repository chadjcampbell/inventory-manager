import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ProductType } from "../pages/Dashboard/AddProduct";

type ProductListProps = {
  products: ProductType[];
};
interface Column {
  id: "sku" | "name" | "category" | "price" | "quantity" | "value" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "sku", label: "SKU", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "category", label: "Category", minWidth: 100 },
  {
    id: "price",
    label: "Price",
    minWidth: 50,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "quantity",
    label: "Quantity",
    minWidth: 50,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "value",
    label: "Value",
    minWidth: 50,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
  { id: "action", label: "Action", minWidth: 170 },
];

export default function ProductList({ products }: ProductListProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={product.sku}
                  >
                    {columns.map((column) => {
                      const cellValue = product[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof cellValue === "number"
                            ? column.format(cellValue)
                            : cellValue}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
