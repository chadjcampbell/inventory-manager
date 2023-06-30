import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const API_URL = BACKEND_URL + "/api/products";

export const createProduct = async (formData: FormData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

const productService = {
  createProduct,
};

export default productService;
