import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import ErrorPage from "./error-page";
import Home, {loader as homeLoader } from "./shopping/home";
import Product, {loader as productLoader } from "./shopping/product";

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
                path: "product/:id",
                element: <Product/>,
                loader: productLoader
            }

        ],
    },
]);