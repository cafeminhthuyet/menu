import React, {useEffect} from "react";
import {Affix, Image, Menu, Space} from "antd";
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
      label: <span style={{ fontWeight: '550', fontSize: '15px'}}>{ "   " + category.name}</span>,
      key: category.id
      // icon: <Image
      //   src={'/'+ category.id + ".png" } width='24px'
      //   preview={false}
      //   style={{ color: 'black' }}
      // />
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
          setTimeout(() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }, 50)
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
    <Affix offsetTop={0}>
    <Header style={{backgroundColor: "white", padding: '10px' }}>
      <div style={{display: 'flex', alignItems: 'center', justifyItems: 'center', width: '100%', height: '100%'}}>
        <Image
          src='/logo.png'
          preview={false}
          width="120px"/>

        <Menu
          mode="horizontal"
          defaultSelectedKeys={['caphe']}
          items={convertToMenuType(categories)}
          style={{flex: 1, minWidth: 0}}
          onClick={onSelectCategory}
        />

      </div>
    </Header>
    </Affix>
  );
}


export default HeaderView;