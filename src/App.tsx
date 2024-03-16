import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {Image, Layout, Menu, Space} from "antd";
import {Header} from "antd/es/layout/layout";
import {Footer} from "antd/es/modal/shared";
import HeaderView from "./Components/HeaderView";
import MenuView from "./Components/MenuView";

function App() {

  return (
    <Layout>
      <HeaderView/>
      <MenuView/>
    </Layout>
);
}

export default App;
