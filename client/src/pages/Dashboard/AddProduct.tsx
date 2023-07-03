import { Card, Box } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import Loading from "../../components/Loading";
import { useSelector } from "react-redux";
import {
  createProduct,
  selectIsLoading,
} from "../../redux/features/product/productSlice";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/ProductForm";
import { useAppDispatch } from "../../redux/store";
import { toast } from "react-toastify";

export type ProductType = {
  _id: string;
  sku: string;
  name: string;
  category: string;
  price: string;
  quantity: string;
  description: string;
};

const AddProduct = () => {
  const initialSate = {
    _id: "",
    sku: "",
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
  };

  const [product, setProduct] = useState<ProductType>(initialSate);
  const [productImage, setProductImage] = useState<File | null>(null);
  const [imagePreview, setimagePreview] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const { name, category, price, quantity, description } = product;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setProduct({ ...product, [event.target.name]: value });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setProductImage(event.target.files[0]);
      setimagePreview(URL.createObjectURL(event.target.files[0]));
    }
  };

  const generateSKU = (category: string) => {
    const letter: string = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
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

  const saveProduct = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", generateSKU(category));
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("description", description);
    productImage !== null && formData.append("image", productImage);
    if (formValid(formData)) {
      dispatch(createProduct(formData));
      navigate("/dashboard");
    }
  };

  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(220,196,246,1) 100%)",
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
          maxWidth: "650px",
          display: "flex",
          flexGrow: "1",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Add New Product</h1>
        <ProductForm
          product={product}
          productImage={productImage}
          imagePreview={imagePreview}
          handleChange={handleChange}
          handleImageChange={handleImageChange}
          saveProduct={saveProduct}
        />
      </Card>
    </Box>
  );
};

export default AddProduct;
