import { collection, getDocs, setDoc, doc } from 'firebase/firestore'

import Category from "../Models/Category";
import FirebaseService from "./FirebaseService";
import Item from "../Models/Item";


class ItemService {

  DB_NAME = "item"

  async getItems(category: Category) : Promise<Item[]> {
    let firestore = FirebaseService.shared.firestore
    let cls = collection(firestore, this.DB_NAME, category.id, "data")
    let snapshot = await getDocs(cls)
    return snapshot.docs.map(doc => {
      let data = doc.data()
      return {
        id: doc.id,
        ...data
      } as Item
    })
  }

  async setItems(items: Item[]) {
    let grouped: any = {}
    items.forEach(item => {
      if (!grouped[item.categoryID]) {
        grouped[item.categoryID] = []
      }

      grouped[item.categoryID].push(item)
    })

    let keys = Object.keys(grouped)

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i]
      let items = grouped[key] || []

      let firestore = FirebaseService.shared.firestore

      for (const item of items) {
        if (!item.id || item.id.length === 0 || key.length === 0) { continue }
        let ref = doc(firestore, this.DB_NAME, key, "data", item.id)
        await setDoc(ref, item)
      }
    }
  }

}

export default ItemService;