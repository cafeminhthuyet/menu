import {createSlice} from "@reduxjs/toolkit"
import Category from "../Models/Category";
import LocalStorage from "../LocalStorage/LocalStorage";
import Item from "../Models/Item";

const slice = createSlice({
  name: 'item',
  initialState: [] as Item[],
  reducers: {
    setItems:  (state, action) => state = action.payload,
  },
})

export const { setItems } = slice.actions;

export default slice.reducer;
