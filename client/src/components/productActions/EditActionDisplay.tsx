import { Card, Box } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import Loading from "../../components/Loading";
import { useSelector } from "react-redux";
import {
  getProducts,
  selectIsLoading,
  updateProduct,
} from "../../redux/features/product/productSlice";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/ProductForm";
import { useAppDispatch } from "../../redux/store";
import { toast } from "react-toastify";
import { ProductType } from "../../pages/Dashboard/AddProduct";
import { ProductDataTableType } from "../ProductList";

type EditActionDisplayProps = {
  initialProduct: ProductDataTableType;
  handleClose: () => void;
};

const EditActionDisplay = ({
  initialProduct,
  handleClose,
}: EditActionDisplayProps) => {
  const initialSate = {
    _id: initialProduct._id,
    sku: initialProduct.sku,
    name: initialProduct.name,
    category: initialProduct.category,
    price: initialProduct.price.toString(),
    quantity: initialProduct.quantity,
    description: initialProduct.description,
    image: initialProduct.image,
  };

  const [product, setProduct] = useState<ProductType>(initialSate);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const { name, category, price, quantity, description } = product;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setProduct({ ...product, [event.target.name]: value });
  };

  const formValid = (data: FormData): boolean => {
    const name = data.get("name");
    const category = data.get("category");
    const price = data.get("price");
    const quantity = data.get("quantity");
    const description = data.get("description");
    if (!name || !category || !price || !quantity || !description) {
      toast.error("All fields are required");
      return false;
    }
    const priceCheck = new RegExp(/^\d+(?:\.\d{1,2})?$/);
    const quantityCheck = new RegExp(/^\d+$/);
    if (!priceCheck.test(price as string)) {
      toast.error("Price must be valid");
      return false;
    }
    if (!quantityCheck.test(quantity as string)) {
      toast.error("Quantity must be valid");
      return false;
    }

    return true;
  };

  const saveChanges = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("description", description);
    if (formValid(formData)) {
      const id = product._id;
      await dispatch(updateProduct({ id, formData }));
      await dispatch(getProducts());
      navigate("/dashboard");
      handleClose();
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {isLoading && <Loading />}
      <Card
        sx={{
          padding: "20px",
          display: "flex",
          flexGrow: "1",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Edit Product</h1>
        <ProductForm
          product={product}
          handleChange={handleChange}
          saveProduct={saveChanges}
          isEdit={true}
        />
      </Card>
    </Box>
  );
};

export default EditActionDisplay;
