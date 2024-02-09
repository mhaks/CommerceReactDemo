import React from "react";

import { redirect, useLoaderData } from "react-router";
import { Link, Form, } from "react-router-dom";

import SearchBar from "./searchbar";

const API_URL = process.env.REACT_APP_API_URL;


export async function loader({request}){
    const reqUrl = new URL(request.url);
    const searchUrl = `${API_URL}/Shopping/Search?${reqUrl.searchParams}`;
    const categoriesUrl = `${API_URL}/Shopping/ProductCategories`;
    
    let products = [];
    await fetch(searchUrl)
        .then(response => response.json())
        .then(json => {products = json;})
        .catch(error => console.error(error));

    let categories = [];
    await fetch(categoriesUrl)
        .then(response => response.json())
        .then(json => {categories = json;})
        .catch(err => { console.error(err)});

    const searchString = reqUrl.searchParams.get('SearchString');
    const categoryId = reqUrl.searchParams.get('CategoryId');

    console.log(categories);
    console.log(categoryId);
    return [products, categories, searchString, categoryId];
}


export async function action({request, params}) {
    const formData = await request.formData(); 
    const addCartUrl = `${API_URL}/Shopping/Cart/Add`;
    await fetch(addCartUrl, {
        method: 'PUT',
                body: formData,
    });     
    return redirect('../cart/');
}



export default function Search() {
    const [products, categories, searchString, categoryId] = useLoaderData();

    //const category = categories.find(item => item.id === categoryId);
    //const searchDisplay = (category) ? `${category.title} - ${searchString}` : `${searchString}`;
    const searchDisplay = `${searchString}`;

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
                <Form method="post">
                    <input type="hidden" name="productId" value={product.id}/>
                    <input type="hidden" name="quantity" value="1" />
                    <button type="submit" className="btn btn-outline-dark mt-auto text-center text-nowrap">Add to cart</button>
                </Form>
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
                        <h4>Search Results:&nbsp;{searchDisplay}                           
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