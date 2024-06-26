import React, { useState }  from "react";
import { Outlet,  useLoaderData } from "react-router";
import ShoppingHeader from "./shopping/header";
//import Shopping from "./shopping/home";
import AdminHeader from "./admin/header";
//import Admin from "./admin/home"; // Import the Admin component
import Footer from "./footer";
import {AdminContext, ShopperContext} from "./contexts";




export async function loader() {
  console.info(`REACT_APP_API_URL: ${process.env.REACT_APP_API_URL}`);
  
  let cartItemCount = 0;

  const defaultUser = {email: 'jerry', password: 'password'}; 

  // const jsonUser = JSON.stringify(defaultUser);
  // console.log("app loader: jsonUser: " + jsonUser);
  // await fetch(API_URL + '/login?useCookies=true', 
  //   { 
  //     method: 'POST',
  //     credentials: 'include',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       //'Authorization': 'Basic ' + btoa(inst.user.email + ':' + inst.user.password) 
  //     },   
  //     body: jsonUser,  
  //   })
  //   .then(resp => resp.json())
  //   .then(data => { console.log(data);})
  //   .catch(error => { console.error(error); });



  await fetch(process.env.REACT_APP_API_URL + '/Shopping/Cart/Count')
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