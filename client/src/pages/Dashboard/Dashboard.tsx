import { useSelector } from "react-redux";
import useAuthRedirect from "../../customHooks/useAuthRedirect";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import { getProducts } from "../../redux/features/product/productSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import { Box } from "@mui/material";
import ProductSummary from "../../components/ProductSummary";
import ProductList from "../../components/ProductList";
import Loading from "../../components/Loading";
import Search from "../../components/Search";
import { FILTER_PRODUCTS } from "../../redux/features/product/filterSlice";

const Dashboard = () => {
  useAuthRedirect("/login");
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading, isError, message } = useSelector(
    (state: RootState) => state.product
  );

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchTerm(event.currentTarget.value);
  };

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, searchTerm }));
  }, [products, searchTerm]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getProducts());
    }
    console.log(products);
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(220,196,246,1) 100%)",
        width: "auto",
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Dashboard</h1>
      {isLoading && <Loading />}
      <ProductSummary products={products} />
      <Search searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <ProductList products={products} />
    </Box>
  );
};

export default Dashboard;
