import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import ErrorPage from "./error-page";
import Home, {loader as homeLoader } from "./shopping/home";
import Search, {loader as searchLoader, action as searchAction } from "./shopping/search";
import Product, {loader as productLoader, action as productAction } from "./shopping/product";
import Cart, {loader as cartLoader, action as cartAction } from "./shopping/cart";
import Checkout, {loader as checkoutLoader, action as checkoutAction } from "./shopping/checkout";
import Orders, { loader as ordersLoader } from "./shopping/orders";
import Order, { loader as orderLoader} from "./shopping/order";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <Home/>,
                loader: homeLoader,    
            },            
            {
                path: "search/:SearchString?:CategoryName?",
                element: <Search/>,
                loader: searchLoader,
                action: searchAction,
            },
            {   
                path: "product/:id",
                element: <Product/>,
                loader: productLoader,
                action: productAction,
            },
            {
                path: "cart",
                element: <Cart/>,
                loader: cartLoader,
                action: cartAction,
            },
            {
                path: "checkout",
                element: <Checkout/>,
                loader: checkoutLoader,
                action: checkoutAction,
            },
            { 
                path: "orders",
                element: <Orders/>,
                loader: ordersLoader,
            },
            { 
                path: "order/:id",
                element: <Order/>,
                loader: orderLoader,
            }
        ],
    },
]);