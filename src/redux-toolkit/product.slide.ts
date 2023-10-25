import { ProductType } from '@/@types/product';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from '@/utils/http';
import { CategoryType, SubCategoryType } from '@/@types/category';
import { BrandType } from '@/@types/brand';

interface inittialType {
  productList: ProductType[];
  categorylist: CategoryType[];
  subCategoryList: SubCategoryType[];
  brandList: BrandType[];
  parentCategoryList: CategoryType[];
}

const initialState: inittialType = {
  productList: [],
  categorylist: [],
  subCategoryList: [],
  brandList: [],
  parentCategoryList: []
};

// Create thunk // _page=1&_limit=8
export const getProductList = createAsyncThunk('product/getProductList', async (_, thunkAPI) => {
  const response = await http.get<ProductType[]>('products', { signal: thunkAPI.signal });
  return response.data;
});
export const getCategories = createAsyncThunk('product/getCategories', async (_, thunkAPI) => {
  const response = await http.get<ProductType[]>('categories', { signal: thunkAPI.signal });
  return response.data;
});
export const getSubCategories = createAsyncThunk('product/getSubCategories', async (_, thunkAPI) => {
  const response = await http.get<SubCategoryType[]>('subCategories', { signal: thunkAPI.signal });
  return response.data;
});
export const getBrands = createAsyncThunk('product/getBrands', async (_, thunkAPI) => {
  const response = await http.get<BrandType[]>('brands', { signal: thunkAPI.signal });
  return response.data;
});
export const getParentCategory = createAsyncThunk('product/getParentCategory', async (_, thunkAPI) => {
  const response = await http.get<CategoryType[]>('categories', { signal: thunkAPI.signal });
  return response.data;
});

getParentCategory;
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductList.fulfilled, (state, action) => {
        state.productList = action.payload;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categorylist = action.payload;
      })
      .addCase(getSubCategories.fulfilled, (state, action) => {
        state.subCategoryList = action.payload;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.brandList = action.payload;
      })
      .addCase(getParentCategory.fulfilled, (state, action) => {
        state.parentCategoryList = action.payload;
      });
    getParentCategory;
  }
});
export default productSlice.reducer;
