import { FilterType } from '@/@types/filter';
import { ProductType } from '@/@types/product';
import http from '@/utils/http';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface initialType {
  isFilter: boolean;
  filterParams: FilterType;
  productListFilter: ProductType[];
}
const initialState: initialType = {
  isFilter: false,
  filterParams: {
    keySearch: '',
    isFree: undefined,
    subCategoryId: undefined,
    rating: undefined,
    brandId: undefined,
    categoryId: undefined,
    typeSort: undefined
  },
  productListFilter: []
};

// create thunk //_sort=price&_order

export const getFilterProduct = createAsyncThunk('filter/filterProduct', async (body: FilterType, thunkAPI) => {
  const queryParams = [];
  for (const key in body) {
    if (body[key] !== undefined) {
      if (key === 'keySearch') queryParams.push(`q=${body[key]}`);
      if (key === 'typeSort') {
        queryParams.push(`_sort=price&_order=${body[key]}`);
      } else {
        queryParams.push(`${key}=${body[key]}`);
      }
    }
  }
  console.log(queryParams);
  // console.log(queryParams.join('&'));
  const response = await http.get(`/products?${queryParams.join('&')}`, { signal: thunkAPI.signal });
  return [body, response.data];
});
const filterSilce = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    clearFilter: (state) => {
      state.isFilter = false;
      state.filterParams = {
        isFree: undefined,
        subCategoryId: undefined,
        rating: undefined,
        brandId: undefined,
        categoryId: undefined,
        typeSort: undefined
      };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getFilterProduct.fulfilled, (state, action) => {
      state.isFilter = true;
      state.productListFilter = action.payload[1];
      state.filterParams = action.payload[0];
    });
  }
});

export const { clearFilter } = filterSilce.actions;

export default filterSilce.reducer;
