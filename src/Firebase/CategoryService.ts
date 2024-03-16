import { collection, getDocs, setDoc, doc } from 'firebase/firestore'

import Category from "../Models/Category";
import FirebaseService from "./FirebaseService";
import Item from "../Models/Item";


class CategoryService {

  DB_NAME = "category"
  async getCategories() : Promise<Category[]> {
    let firestore = FirebaseService.shared.firestore
    let cls = collection(firestore, this.DB_NAME)
    let snapshot = await getDocs(cls)
    return snapshot.docs.map(doc => {
      return {
        id: doc.id,
        name: doc.data()["name"] as string || ""
      } as Category
    })
  }

  async setCategories(categories: Category[]) {
    let firestore = FirebaseService.shared.firestore
    let cls = collection(firestore, this.DB_NAME)

    for (const category of categories) {
      let ref = doc(firestore, this.DB_NAME, category.id)
      await setDoc(ref, category)
    }
  }
}

export default CategoryService;