import { useSelector } from "react-redux";
import useAuthRedirect from "../../customHooks/useAuthRedirect";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import { getProducts } from "../../redux/features/product/productSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import { Container } from "@mui/material";
import ProductSummary from "../../components/ProductSummary";
import ProductList from "../../components/ProductList";
import Loading from "../../components/Loading";
import Search from "../../components/Search";

const Dashboard = () => {
  useAuthRedirect("/login");
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading, isError, message } = useSelector(
    (state: RootState) => state.product
  );

  const [searchTerm, setSearchTerm] = useState("");

  //TODO figure out this type
  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

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
    <Container>
      {isLoading && <Loading />}
      <ProductSummary />
      <Search searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <ProductList products={products} />
    </Container>
  );
};

export default Dashboard;
