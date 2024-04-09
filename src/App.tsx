import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {Image, Layout, Menu, Space, Switch} from "antd";
import {Header} from "antd/es/layout/layout";
import {Footer} from "antd/es/modal/shared";
import HeaderView from "./Components/HeaderView";
import MenuView from "./Components/MenuView";
import {createBrowserRouter, Route, Router, RouterProvider} from "react-router-dom";
import RouterMenuView from "./Router/RouterMenuView";
import RouterLoginView from "./Router/RouterLoginView";
import {AuthService} from "./Firebase/AuthService";
import {useDispatch} from "react-redux";
import {setAuth} from "./Redux/AuthRedux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouterMenuView/>
  },
  {
    path: "/login",
    element: <RouterLoginView/>
  }
])

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = AuthService.shared.auth.onAuthStateChanged(user => {
      dispatch(setAuth({ isLogin: user != null }))
      if (user) {
        // Save user to localStorage
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        // Clear user from localStorage
        localStorage.removeItem('user');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <RouterProvider router={router}/>

  );
}

export default App;
