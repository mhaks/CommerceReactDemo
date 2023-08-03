import React, { useEffect, useState } from "react";

import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";

import SearchBar from "./searchbar";


const API_URL = process.env.REACT_APP_API_URL;

export async function loader(){
    const url = API_URL + '/shopping/topproducts';

    let products = [];
    await fetch(url)
        .then(response => response.json())
        .then(data => {products = data;})
        .catch(error => console.error(error));

    return products;
}

export default function Home() {
    
    const products = useLoaderData();


    const productsTemplate = products.map((item, index) => (
        <div className="col mb-5">
            <div className="card h-100">
                <div className="badge bg-dark text-white position-absolute"  style={{top: 0.5 + "rem", right: 0.5 + "rem"}}>Top Seller</div>
                
                <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                
                <div className="card-body p-4">
                    <div className="text-center">
                        
                        <h5 className="fw-bolder">{item.title}</h5>
                        <h6 className="fw-bolder">{item.brand}</h6>                        
                        ${item.price}
                    </div>
                </div>
                
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center"><Link className="btn btn-outline-dark mt-auto" to={'./product/' + item.id} >View options</Link></div>
                </div>
            </div>
        </div>
    ));

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

            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        { productsTemplate }
                    </div>
                </div>
            </section>
            
        </>
    );
}