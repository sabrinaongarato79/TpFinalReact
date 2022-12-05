import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import services from "../services/index";

const initialState = {
  products: { fetchError: false, isLoading: false, data: [] },
  categories: { fetchError: false, isLoading: false, data: [] },
  searchProductText: "",
  user: { token: "", info: {} },
  cart: [],
  pendingCartActualization: false,
};

export const fetchProducts = createAsyncThunk(
  "general/fetchProducts",
  async (category) => {
    try {
      const { data } = await services.getProducts(category);
      return data.products;
    } catch (e) {
      throw e;
    }
  }
);

export const fetchCategory = createAsyncThunk(
  "general/fetchCategory",
  async () => {
    try {
      const { data } = await services.getCategory();
      return data.categories;
    } catch (e) {
      throw e;
    }
  }
);

export const fetchCart = createAsyncThunk(
  "general/fetchCart",
  async (token) => {
    try {
      const { data } = await services.getCart(token);

      if (!data) return [];

      return data.cart.products;
    } catch (e) {
      throw e;
    }
  }
);

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    changeSearchProductText: (state, action) => {
      const searchText = action.payload;
      state.searchProductText = searchText;
    },
    setUser: (state, action) => {
      state.user = { token: action.payload.token, info: action.payload.info };
    },
    setPendingCartActualization: (state, action) => {
      state.pendingCartActualization = action.payload;
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.products.isLoading = true;
      state.products.fetchError = false;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.products.isLoading = false;
      state.products.fetchError = false;

      state.products.data = action.payload;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.products.isLoading = false;
      state.products.fetchError = true;
      console.log(action.error.stack);
    },

    [fetchCategory.pending]: (state, action) => {
      state.categories.isLoading = true;
      state.categories.fetchError = false;
    },
    [fetchCategory.fulfilled]: (state, action) => {
      state.categories.isLoading = false;
      state.categories.fetchError = false;

      state.categories.data = action.payload;
    },
    [fetchCategory.rejected]: (state, action) => {
      state.categories.isLoading = false;
      state.categories.fetchError = true;
      console.log(action.error.stack);
    },

    [fetchCart.fulfilled]: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { changeSearchProductText, setUser, setPendingCartActualization } =
  generalSlice.actions;

export const selectProducts = ({ general }) => general.products;
export const selectSearchProductText = ({ general }) =>
  general.searchProductText;
export const selectCategories = ({ general }) => general.categories;
export const selectUser = ({ general }) => general.user;
export const selectCart = ({ general }) => general.cart;
export const selectPendingCartActualization = ({ general }) =>
  general.pendingCartActualization;

export default generalSlice.reducer;
