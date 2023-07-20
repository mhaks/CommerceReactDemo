import React from "react";

import SearchBar from "./searchbar";


export default function Home() {

    return (
        <>
            <section className="bg-dark py-2">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">Shop in style</h1>
                        <p className="lead fw-normal text-white-50 mb-0">Here you can find all the products you need at the best prices!</p>
                    </div>
                </div>
            </section>
            
            <SearchBar/>
        </>
    );
}