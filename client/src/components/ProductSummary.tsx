import { Box, Container } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { ProductType } from "../pages/Dashboard/AddProduct";
import InfoBox from "./InfoBox";

const earningIcon = <MonetizationOnOutlinedIcon fontSize="large" />;
const productIcon = <ShoppingCartOutlinedIcon fontSize="large" />;
const categoryIcon = <CategoryOutlinedIcon fontSize="large" />;
const outOfStockIcon = <RemoveShoppingCartOutlinedIcon fontSize="large" />;

type ProductSummaryProps = {
  products: ProductType[];
};

const ProductSummary = ({ products }: ProductSummaryProps) => {
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
          count={0}
          icon={earningIcon}
        />

        <InfoBox
          bgColor="red"
          title="Out of Stock"
          count={0}
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
