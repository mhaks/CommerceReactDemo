import React from "react";
import { Outlet } from "react-router";


import Header from "./shopping/header";
import Footer from "./footer";



function App() {
  return (
    <>
      <Header/>

      <main>
        <Outlet/>
      </main>
      
      <Footer/>
    </>
  );
}

export default App;
