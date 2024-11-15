import { useState }  from "react";
import { Outlet} from "react-router";


import ShoppingHeader from "./shopping/header";
import AdminHeader from "./admin/header";
import Footer from "./footer";
import {UserContext, AdminContext, CartItemCountContext} from "./contexts";


export async function loader() {
  console.info(`REACT_APP_API_URL: ${import.meta.env.VITE_REACT_APP_API_URL}`);
  
  return null;
}

export default function App() {  
  
  const [cartItemCount, setCartItemCount] = useState(0);
  const [user, setUser] = useState("");
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