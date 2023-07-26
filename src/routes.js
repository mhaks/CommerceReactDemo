import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import ErrorPage from "./error-page";
import Home from "./shopping/home";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                errorElement: <ErrorPage/>,
                children: [
                    {
                        index: true,
                        element: <Home/>
                    }

                ],
            },
        ],
    },
]);