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
import { Container, Typography } from "@mui/material";

import { useSelector } from "react-redux";
import { selectFilteredProducts } from "../redux/features/product/filterSlice";
import { ActionCell } from "./productActions/ActionCell";

interface Column {
  id: "sku" | "name" | "category" | "price" | "quantity" | "value" | "action";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "sku", label: "SKU", minWidth: 120 },
  { id: "name", label: "Name", minWidth: 150 },
  { id: "category", label: "Category", minWidth: 75 },
  {
    id: "price",
    label: "Price",
    minWidth: 50,
    align: "right",
    format: (value: number) => `$${value.toFixed(2)}`,
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
    format: (value: number) => {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
  },
  { id: "action", label: "Action", minWidth: 170, align: "center" },
];

type ProductListProps = {
  products: ProductType[];
};

export type ProductDataTableType = {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: string;
  description: string;
  sku: string;
  value: number;
  action?: string;
  image?: {
    public_id: string;
    fileName: string;
    filePath: string;
    fileType: string;
    fileSize: string;
  };
};

export default function ProductList({ products }: ProductListProps) {
  const filteredProducts = useSelector(selectFilteredProducts);
  const productsData: ProductDataTableType[] = filteredProducts.map(
    (product: ProductType) => {
      return {
        ...product,
        price: Number(product.price),
        value: Number(product.price) * Number(product.quantity),
      };
    }
  );
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return productsData.length <= 0 ? (
    <Container
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5">No products found</Typography>
    </Container>
  ) : (
    <Container sx={{ marginBottom: "50px" }}>
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
              {productsData
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
                            {column.id === "action" ? (
                              <ActionCell product={product} />
                            ) : column.format &&
                              typeof cellValue === "number" ? (
                              column.format(cellValue)
                            ) : (
                              cellValue
                            )}
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
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
}
