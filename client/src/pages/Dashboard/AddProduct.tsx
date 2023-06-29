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

const AddProduct = () => {
  const initialSate = {
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialSate);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setFormData({ ...formData, [event.target.name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    console.log(formData);
    setFormData(initialSate);
    setIsLoading(false);
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
            <Input type="file" />
          </Container>
          <TextField
            fullWidth
            sx={{ margin: "10px" }}
            label="Product Name"
            value={formData.name}
            name="name"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            sx={{ margin: "10px" }}
            label="Product Category"
            value={formData.category}
            name="category"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            sx={{ margin: "10px" }}
            label="Product Price"
            value={formData.price}
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
            value={formData.quantity}
            name="quantity"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Product Description"
            multiline
            rows={4}
            value={formData.description}
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
