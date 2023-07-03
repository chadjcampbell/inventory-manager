import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../../pages/Dashboard/AddProduct";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_PRODUCTS(state, action) {
      const { products, searchTerm } = action.payload;
      const tempProducts = products.filter((product: ProductType) => {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      state.filteredProducts = tempProducts;
    },
  },
});

export const { FILTER_PRODUCTS } = filterSlice.actions;

export const selectFilteredProducts = (state: any) =>
  state.filter.filteredProducts;

export default filterSlice.reducer;
