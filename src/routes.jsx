import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import ErrorPage from "./error-page";
import Shopping, {loader as shoppingLoader } from "./shopping/home";
import Search, {loader as searchLoader, action as searchAction } from "./shopping/search";
import Product, {loader as productLoader, action as productAction } from "./shopping/product";
import Cart, {loader as cartLoader, action as cartAction } from "./shopping/cart";
import Checkout, {loader as checkoutLoader, action as checkoutAction } from "./shopping/checkout";
import Orders, { loader as ordersLoader } from "./shopping/orders";
import Order, { loader as orderLoader} from "./shopping/order";

import Admin, {loader as adminLoader} from "./admin/home";
import AdminOrders, {loader as adminOrdersLoader} from "./admin/orders";
import AdminOrder, {loader as adminOrderLoader} from "./admin/order";
import AdminProducts, {loader as adminProductsLoader} from "./admin/products";
import AdminProduct, {loader as adminProductLoader, action as adminProductAction} from "./admin/product";
import AdminCategories, {loader as adminCategoriesLoader} from "./admin/categories";
import AdminCategory, {loader as adminCategoryLoader, action as adminCategoryAction} from "./admin/category";
import AdminCustomers, {loader as adminCustomersLoader} from "./admin/customers";
import AdminCustomer, {loader as adminCustomerLoader, action as adminCustomerAction} from "./admin/customer";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,        
        errorElement: <ErrorPage/>,        
        children: [
            {
                index: true,                
                element: <Shopping/>,
                loader: shoppingLoader,    
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
                path: "cart/",
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
            },
            {
                path: "admin",
                element: <Admin/>,
                loader: adminLoader,
            },
            {
                path: "admin/orders",
                element: <AdminOrders/>,
                loader: adminOrdersLoader,               
            },
            {
                path: "admin/order/:id",
                element: <AdminOrder/>,
                loader: adminOrderLoader,
            },
            {
                path: "admin/products",
                element: <AdminProducts/>,
                loader: adminProductsLoader,
            },
            {
                path: "admin/product/:id",
                element: <AdminProduct/>,
                loader: adminProductLoader,
                action: adminProductAction,
            },
            {
                path: "admin/categories",
                element: <AdminCategories/>,
                loader: adminCategoriesLoader,
            },
            {
                path: "admin/category/:id",
                element: <AdminCategory/>,
                loader: adminCategoryLoader,
                action: adminCategoryAction,
            },
            {
                path: "admin/customers",
                element: <AdminCustomers/>,
                loader: adminCustomersLoader,
            },
            {
                path: "admin/customer/:id",
                element: <AdminCustomer/>,
                loader: adminCustomerLoader,
                action: adminCustomerAction,
            },
        ],
    },
]);