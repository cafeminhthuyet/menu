import React, {useEffect} from "react";
import {Image, Menu, Space} from "antd";
import {Header} from "antd/es/layout/layout";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../Redux/store";
import Category from "../Models/Category";
import {MenuItemType} from "antd/es/menu/hooks/useItems";
import CategoryService from "../Firebase/CategoryService";
import {setCategories} from "../Redux/CategoryRedux";
import LocalStorage from "../LocalStorage/LocalStorage";

import * as XLSX from 'xlsx'
import Item from "../Models/Item";
import ItemService from "../Firebase/ItemService";
import {setItems} from "../Redux/ItemRedux";
import {CoffeeOutlined} from "@ant-design/icons";

function convertToMenuType(categories: Category[]): MenuItemType[] {
  return categories.map(category => {
    return {
      label: <span style={{ fontWeight: '500'}}>{ "   " + category.name}</span>,
      key: category.id,
      icon: <Image
        src={'/'+ category.id + ".png" } width='24px'
        preview={false}

      />
    }
  })
}

const service = new CategoryService()
const itemService = new ItemService()

function HeaderView() {

  const categories = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch()


  useEffect(() => {

    service.getCategories()
      .then(categories => {
        LocalStorage.shared.setCategories(categories)
        dispatch(setCategories(categories))
        console.log("CALLED")
        setItemForCategory(categories[0])
      })


  }, []);

  function readFile(event: React.ChangeEvent) {
    const file = (event.target as any).files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      let workBook = XLSX.read((event.target as any).result)
      let sheet = workBook.Sheets.Worksheet
      
      var items: Item[] = []
      for (let i = 4; i <= 228; i++) {
        let categoryName = sheet["B"+i.toString()].v
        let id = sheet["C"+i.toString()].v.toString()
        let name = sheet["F"+i.toString()].v
        let image = (sheet["V"+i.toString()] || {v: ""}) .v
        let price = sheet["J"+i.toString()].v
        let categoryID = categories.find(c => c.name.toLowerCase() === categoryName.toLowerCase())?.id || ""

        items.push({
          id: id,
          name: name,
          image: image,
          categoryID: categoryID,
          price: price
        })
      }

      console.log(items)
      itemService.setItems(items)
        .then(e => {

        })
    };

    reader.readAsArrayBuffer(file);
  }

  function onSelectCategory(e: any) {
    let category = categories.find(c => c.id === e.key)
    if (category) {
      itemService.getItems(category)
        .then(items => {
          dispatch(setItems(items))
        })
    }
  }

  function setItemForCategory(category: Category) {
    itemService.getItems(category)
      .then(items => {
        dispatch(setItems(items))
      })
  }

  return (
    <Header style={{backgroundColor: "white", height: '100px', padding: '10px' }}>
      <div style={{display: 'flex', alignItems: 'center', justifyItems: 'center', width: '100%', height: '100%'}}>

        {/*<input type="file"*/}

        {/*       onChange={(event) => {*/}
        {/*         readFile(event)*/}

        {/*       }}/>*/}
        <Image
          src='/logo.png'
          preview={false}
          width="100px"/>

        <Menu
          mode="horizontal"
          defaultSelectedKeys={['caphe']}
          items={convertToMenuType(categories)}
          style={{flex: 1, minWidth: 0}}
          onClick={onSelectCategory}
        />

      </div>
    </Header>
  );
}


export default HeaderView;