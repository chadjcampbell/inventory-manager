import {
  Container,
  Typography,
  Input,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";

type ProductFormProps = {
  product;
  productImage;
  imagePreview;
  handleChange;
  handleImageChange;
  saveProduct;
};

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  handleChange,
  handleImageChange,
  saveProduct,
}) => {
  return (
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
