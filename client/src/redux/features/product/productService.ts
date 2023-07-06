import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;
const API_URL = BACKEND_URL + "/api/products/";

export const createProduct = async (formData: FormData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

const productService = {
  createProduct,
  getProducts,
  deleteProduct,
};

export default productService;
