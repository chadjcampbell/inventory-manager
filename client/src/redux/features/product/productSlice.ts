import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";
import { ToastContent, toast } from "react-toastify";
import { ProductType } from "../../../pages/Dashboard/AddProduct";

type ProductStateType = {
  product: null | ProductType;
  products: ProductType[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};

const initialState = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
} as ProductStateType;

export const createProduct = createAsyncThunk(
  "products/create",
  async (formData: FormData) => {
    try {
      const data = await productService.createProduct(formData);
      return data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      console.log("store vlaue", state, action);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products.push(action.payload);
      toast.success("Product created successfully");
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload as string;
      toast.error(action.payload as ToastContent);
    });
  },
});

export const { CALC_STORE_VALUE } = productSlice.actions;

export const selectIsLoading = (state: any) => state.product.isLoading;

export default productSlice.reducer;
