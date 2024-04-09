import {Layout} from "antd";
import HeaderView from "../Components/HeaderView";
import MenuView from "../Components/MenuView";
import React from "react";


function RouterMenuView() {
  return <Layout>
    <HeaderView/>
    <MenuView/>
  </Layout>
}

export default RouterMenuView;