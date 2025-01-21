import { useState }  from "react";
import { Outlet} from "react-router";



import ShoppingHeader from "./shopping/header";
import AdminHeader from "./admin/header";
import Footer from "./footer";
import {UserContext, CartItemCountContext} from "./contexts";


export default function App() {  
  
  const [cartItemCount, setCartItemCount] = useState(0);
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{user, setUser}}>    
    <CartItemCountContext.Provider value={{cartItemCount, setCartItemCount}}>

      {
        user && user.isAdministrator ? (
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
    </UserContext.Provider>
  );
  
}