import {
  PayloadAction,
  ThunkAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import productService from "./productService";
import { ToastContent, toast } from "react-toastify";
import { ProductType } from "../../../pages/Dashboard/AddProduct";
import { Action } from "@remix-run/router";

type ProductSateType = {
  product: null | object;
  products: [];
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
};

export const createProduct = createAsyncThunk(
  "products/create",
  async (formData: FormData, thunkAPI) => {
    try {
      return await productService.createProduct(formData);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
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
      console.log(action.payload);
      state.products.push(action.payload as ProductType);
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
