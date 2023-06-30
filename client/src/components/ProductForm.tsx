import {
  Container,
  Typography,
  Input,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import { ProductType } from "../pages/Dashboard/AddProduct";
import { ChangeEvent } from "react";

type ProductFormProps = {
  product: ProductType;
  productImage: File | null;
  imagePreview: string | null;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  saveProduct: (event: any) => Promise<void>;
};

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  handleChange,
  handleImageChange,
  saveProduct,
}: ProductFormProps) => {
  return (
    <form
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
      }}
      onSubmit={saveProduct}
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
        <Container style={{ display: "flex", justifyContent: "center" }}>
          {productImage ? (
            <img
              style={{ width: "200px", aspectRatio: "auto" }}
              alt={product.name}
              src={imagePreview!}
            />
          ) : (
            <p>No image set for this product</p>
          )}
        </Container>
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
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
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
  );
};

export default ProductForm;
