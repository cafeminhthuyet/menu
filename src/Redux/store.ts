import { configureStore } from '@reduxjs/toolkit';
import Category from "../Models/Category";
import categoryRedux from "./CategoryRedux";
import Item from "../Models/Item";
import item from "../Models/Item";
import itemRedux from "./ItemRedux";


export interface RootState {
  categories: Category[],
  items: Item[],
}
export default configureStore({
  reducer: {
    categories: categoryRedux,
    items: itemRedux
  },
});