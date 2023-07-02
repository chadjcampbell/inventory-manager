import { useSelector } from "react-redux";
import useAuthRedirect from "../../customHooks/useAuthRedirect";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { useEffect } from "react";
import { getProducts } from "../../redux/features/product/productSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import { Box } from "@mui/material";
import ProductSummary from "../../components/ProductSummary";
import ProductList from "../../components/ProductList";
import Loading from "../../components/Loading";

const Dashboard = () => {
  useAuthRedirect("/login");
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading, isError, message } = useSelector(
    (state: RootState) => state.product
  );

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
    <Box>
      {isLoading && <Loading />}
      <ProductSummary />
      <ProductList products={products} />
    </Box>
  );
};

export default Dashboard;
