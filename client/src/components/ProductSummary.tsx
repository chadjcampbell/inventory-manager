import { Box, Container } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { ProductType } from "../pages/Dashboard/AddProduct";
import InfoBox from "./InfoBox";
import { useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import {
  CALC_OUTOFSTOCK,
  CALC_STORE_VALUE,
  selectOutOfStock,
  selectTotalStoreValue,
} from "../redux/features/product/productSlice";
import { useEffect } from "react";

const earningIcon = <MonetizationOnOutlinedIcon fontSize="large" />;
const productIcon = <ShoppingCartOutlinedIcon fontSize="large" />;
const categoryIcon = <CategoryOutlinedIcon fontSize="large" />;
const outOfStockIcon = <RemoveShoppingCartOutlinedIcon fontSize="large" />;

type ProductSummaryProps = {
  products: ProductType[];
};

const ProductSummary = ({ products }: ProductSummaryProps) => {
  const dispatch = useAppDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const outOfStock = useSelector(selectOutOfStock);

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALC_OUTOFSTOCK(products));
  }, [dispatch, products]);

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <InfoBox
          bgColor="purple"
          title="Total Products"
          count={products.length}
          icon={productIcon}
        />

        <InfoBox
          bgColor="green"
          title="Total Store Value"
          count={"$" + totalStoreValue.toFixed(2)}
          icon={earningIcon}
        />

        <InfoBox
          bgColor="red"
          title="Out of Stock"
          count={outOfStock}
          icon={outOfStockIcon}
        />

        <InfoBox
          bgColor="blue"
          title="All Categories"
          count={0}
          icon={categoryIcon}
        />
      </Box>
    </Container>
  );
};

export default ProductSummary;
