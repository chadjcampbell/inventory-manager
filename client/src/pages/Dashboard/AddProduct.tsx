import {
  TextField,
  Button,
  Card,
  Box,
  Input,
  Container,
  Typography,
  InputAdornment,
} from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";

import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  selectIsLoading,
} from "../../redux/features/product/productSlice";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const initialSate = {
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
  };

  const [product, setProduct] = useState(initialSate);
  const [productImage, setProductImage] = useState<File | null>(null);
  const [imagePreview, setimagePreview] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const { name, category, price, quantity, description } = product;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setProduct({ ...product, [event.target.name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(product);
    setProduct(initialSate);
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

  const saveProduct = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", generateSKU(category));
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("description", description);
    productImage !== null && formData.append("image", productImage);
    console.log(...formData);
    await dispatch(createProduct(formData));
    navigate("/dashboard");
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
        <form
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
          }}
          onSubmit={(e) => handleSubmit(e)}
        >
          <Container
            sx={{
              padding: "5px",
              display: "flex",
              border: "1px solid lightgrey",
              borderRadius: "5px",
              justifyContent: "center",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Typography>Product Image:</Typography>
            <Typography variant="subtitle2">
              Supported formats: jpg, jpeg, png
            </Typography>
            <Input onChange={handleImageChange} type="file" />
          </Container>
          <TextField
            fullWidth
            sx={{ margin: "10px" }}
            label="Product Name"
            value={product.name}
            name="name"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            sx={{ margin: "10px" }}
            label="Product Category"
            value={product.category}
            name="category"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            sx={{ margin: "10px" }}
            label="Product Price"
            value={product.price}
            name="price"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            sx={{ margin: "10px" }}
            label="Product Quantity"
            value={product.quantity}
            name="quantity"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Product Description"
            multiline
            rows={4}
            value={product.description}
            name="description"
            onChange={handleChange}
          />
          <Button
            type="submit"
            sx={{ margin: "30px" }}
            variant="contained"
            color="primary"
          >
            Add Product
          </Button>
        </form>
      </Card>
    </Box>
  );
};

export default AddProduct;
