import { Box, Container, Typography } from "@mui/material";
import { ProductDataTableType } from "../ProductList";

type ViewActionDisplayProps = {
  product: ProductDataTableType;
};

const ViewActionDisplay = ({ product }: ViewActionDisplayProps) => {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Container sx={{ width: "300px", margin: "10px" }}>
        <img src={product.image?.filePath || "/noImage.webp"} />
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ marginRight: "5px", fontWeight: "bold" }}>
            Product Availability:{" "}
          </Typography>
          <Typography color={Number(product.quantity) > 0 ? "green" : "red"}>
            {Number(product.quantity) > 0 ? "In Stock" : "Out of Stock"}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ marginRight: "5px", fontWeight: "bold" }}>
            Product Name:{" "}
          </Typography>
          <Typography>{product.name}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ marginRight: "5px", fontWeight: "bold" }}>
            SKU:{" "}
          </Typography>
          <Typography>{product.sku}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ marginRight: "5px", fontWeight: "bold" }}>
            Category:{" "}
          </Typography>
          <Typography>{product.category}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ marginRight: "5px", fontWeight: "bold" }}>
            Price:{" "}
          </Typography>
          <Typography>
            {product.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ marginRight: "5px", fontWeight: "bold" }}>
            Quantity:{" "}
          </Typography>
          <Typography>{product.quantity}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ marginRight: "5px", fontWeight: "bold" }}>
            Value:{" "}
          </Typography>
          <Typography>
            {(Number(product.price) * Number(product.quantity)).toLocaleString(
              "en-US",
              {
                style: "currency",
                currency: "USD",
              }
            )}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ marginRight: "5px", fontWeight: "bold" }}>
            Description:{" "}
          </Typography>
          <Typography>{product.description}</Typography>
        </Box>
      </Container>
    </Container>
  );
};

export default ViewActionDisplay;
