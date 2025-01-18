import { useState }  from "react";
import { Outlet} from "react-router";
import { setToken } from "./site";


import ShoppingHeader from "./shopping/header";
import AdminHeader from "./admin/header";
import Footer from "./footer";
import {UserContext, AdminContext, CartItemCountContext} from "./contexts";


export default function App() {  
  
  const [cartItemCount, setCartItemCount] = useState(0);
  const [user, setUser] = useState("jerry");
  const [admin, setAdmin] = useState(false);

  return (
    <UserContext.Provider value={{user, setUser}}>
    <AdminContext.Provider value={{admin, setAdmin}}>
    <CartItemCountContext.Provider value={{cartItemCount, setCartItemCount}}>

      {
        admin ? (
          <>
            <AdminHeader />            
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

        
    </CartItemCountContext.Provider>
    </AdminContext.Provider>
    </UserContext.Provider>
  );
  
}