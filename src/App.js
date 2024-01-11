import React, {useState} from "react";
import { Outlet, useLoaderData } from "react-router";
import Header from "./shopping/header";
import Footer from "./footer";
import {ShopperContext} from "./shoppercontext";


const API_URL = process.env.REACT_APP_API_URL;


export async function loader() {
  const url = API_URL + '/Shopping/Cart/Count'; 
  let cartItemCount = 0;
  await fetch(url)
    .then(resp => resp.json())
    .then(data => { cartItemCount = data;})
    .catch(err => { console.error(err)});

  return cartItemCount
}


export default function App() {  
  const cartItemCount = useLoaderData();

  return (
    <ShopperContext.Provider value={cartItemCount}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </ShopperContext.Provider>
  );
  
}