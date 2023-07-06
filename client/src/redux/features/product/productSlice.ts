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
  totalStoreValue: number;
  outOfStock: number;
  category: string[];
};

const initialState = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
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

export const getProducts = createAsyncThunk("products/getAll", async () => {
  try {
    const data = await productService.getProducts();
    return data;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      const products = action.payload;
      const arr: number[] = products.map((item: ProductType) => {
        const { price, quantity } = item;
        return Number(price) * Number(quantity);
      });
      const totalValue = arr.reduce((a, b) => a + b, 0);
      state.totalStoreValue = totalValue;
    },
    CALC_OUTOFSTOCK(state, action) {
      const products = action.payload;
      let count = 0;
      products.forEach((item: ProductType) => {
        if (item.quantity === "0") {
          count++;
        }
      });
      state.outOfStock = count;
    },
    CALC_CATEGORY(state, action) {
      const products = action.payload;
      const catArr: string[] = products.map((item: ProductType) => {
        return item.category;
      });

      state.category = [...new Set(catArr)];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products.push(action.payload);
        toast.success("Product created successfully");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        toast.error(action.payload as ToastContent);
      })
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        toast.error(action.payload as ToastContent);
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product deleted successfully");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        toast.error(action.payload as ToastContent);
      });
  },
});

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: string, thunkAPI) => {
    try {
      const data = await productService.deleteProduct(id);
      return data;
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

export const { CALC_STORE_VALUE, CALC_OUTOFSTOCK, CALC_CATEGORY } =
  productSlice.actions;

export const selectIsLoading = (state: any) => state.product.isLoading;
export const selectTotalStoreValue = (state: any) =>
  state.product.totalStoreValue;
export const selectOutOfStock = (state: any) => state.product.outOfStock;
export const selectCategory = (state: any) => state.product.category;

export default productSlice.reducer;
