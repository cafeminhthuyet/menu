import { configureStore } from '@reduxjs/toolkit';
import Category from "../Models/Category";
import categoryRedux from "./CategoryRedux";
import Item from "../Models/Item";
import item from "../Models/Item";
import itemRedux from "./ItemRedux";
import {Auth} from "firebase/auth";
import authRedux from "./AuthRedux";
import {AuthState} from "../Models/AuthState";


export interface RootState {
  auth: AuthState,
  categories: Category[],
  items: Item[],
}
export default configureStore({
  reducer: {
    auth: authRedux,
    categories: categoryRedux,
    items: itemRedux
  },
});