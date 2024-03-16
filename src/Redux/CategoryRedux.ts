import {createSlice} from "@reduxjs/toolkit"
import Category from "../Models/Category";
import LocalStorage from "../LocalStorage/LocalStorage";

const slice = createSlice({
  name: 'test',
  initialState: LocalStorage.shared.getItems,
  reducers: {
    setCategories:  (state, action) => state = action.payload,
  },
})

export const { setCategories } = slice.actions;

export default slice.reducer;