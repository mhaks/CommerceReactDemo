import React from "react";

import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";

import SearchBar from "./searchbar";

const API_URL = process.env.REACT_APP_API_URL;


export async function loader(params){
    const url = API_URL + '/Shopping/Search';

    let products = [];
    await fetch(url)
        .then(response => response.json())
        .then(data => {products = data;})
        .catch(error => console.error(error));

    return products;
}



export default function Search() {
    const products = useLoaderData();
    let categoryId = null;
    let searchString = null;



    const resultsTemplate = products.map((product, index) => (
        <tr key={product.id}>
            <td><img className="" src="https://dummyimage.com/225x150/dee2e6/6c757d.jpg" alt={product.title} /></td>
            <td>
                <Link to={'../product/' + product.id}>
                    <h5 className="fw-bolder">{product.title}</h5>
                </Link>
                <p className="fw-bolder">{product.brand}</p>                
                <p>{product.description}</p>

            </td>
            <td className="align-middle text-end">                
                <div className="fw-bolder">${product.price}</div>
            </td>
            <td className="align-middle text-end">
                <form >
                    <input type="hidden" name="id" value={product.id}/>
                    <input type="hidden" name="quantity" value="1" />
                    <button type="submit" className="btn btn-outline-dark mt-auto text-center text-nowrap">Add to cart</button>
                </form>
            </td>
        </tr>
    ));


    return (
        <>
            <section className="bg-dark py-1">
                <div className="container px-4 px-lg-5">
                    <div className="text-left text-white">
                        <h5 className="fw-bolder">Shopping</h5>
                    </div>
                </div>
            </section>

            <SearchBar/>

            <section className="py-2">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row">
                        <h4>Search Results:&nbsp;
                            {(searchString == null && categoryId == null) ? (<>ALL</>) : (<></>)}
                        </h4>
                    </div>

                    <div className="row ">
                        <table className="table">
                            <tbody>
                                { resultsTemplate }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
}