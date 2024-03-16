import Category from "../Models/Category";
import Item from "../Models/Item";


export default class LocalStorage {
  static shared = new LocalStorage()

  getCategories(): Category[] {
    return JSON.parse(localStorage.getItem("cf_mt_categories") || "[]") as Category[] || []
  }

  setCategories(categories: Category[]) {
    let string = JSON.stringify(categories)
    localStorage.setItem("cf_mt_categories", string)
  }


  getItems(): Item[] {
    return JSON.parse(localStorage.getItem("cf_mt_items") || "[]") as Item[] || []
  }

  setItems(categories: Item[]) {
    let string = JSON.stringify(categories)
    localStorage.setItem("cf_mt_items", string)
  }
}