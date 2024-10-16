import React, { useState }  from "react";

import { Outlet,  useLoaderData } from "react-router";
import ShoppingHeader from "./shopping/header";
import AdminHeader from "./admin/header";
import Footer from "./footer";
import {AdminContext, ShopperContext} from "./contexts";


export async function loader() {
  console.info(`REACT_APP_API_URL: ${import.meta.env.VITE_REACT_APP_API_URL}`);
  
  let cartItemCount = 0;

  const defaultUser = {email: 'jerry', password: 'password'}; 

  await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/Shopping/Cart/Products`)
      .then(resp => resp.json())
      .then(data => { cartItemCount = data;});

  console.log("app loader: cartItemCount: " + cartItemCount);
  
  return {defaultUser, cartItemCount};
}

export default function App() {  
  
  const {cartItemCount} = useLoaderData();
  const [admin, setAdmin] = useState(false);

  return (
    <AdminContext.Provider value={{admin, setAdmin}}>
    <ShopperContext.Provider value={cartItemCount}>

      {
        admin ? (
          <>
            <AdminHeader />
            {/* <Routes>
              <Route path="*" element={<Admin />} />
            </Routes> */}
          </>
        ) : (
          <>
            <ShoppingHeader />
            
          </>
        )
      }
      
     <main>
      <Outlet/>
     </main>

      <Footer />

        
    </ShopperContext.Provider>
    </AdminContext.Provider>
  );
  
}