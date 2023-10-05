import React from "react";
import { useLoaderData, redirect } from "react-router";
import { Link, Form, } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;


export async function loader({params}) {
    const url = API_URL + `/Shopping/Product?id=${params.id}`;
    let product = null;
    await fetch(url)
        .then(response => response.json())
        .then(data  => { product = data; })
        .catch(error => console.error(error));
   
    return product;
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

export default function Product() {

    const product = useLoaderData();

    return (
        <>
            <section className="bg-dark py-1">
                <div className="container px-4 px-lg-5">
                    <div className="text-left text-white">
                        <h5 className="fw-bolder">Product</h5>
                    </div>
                </div>
            </section>


            <section className="py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="row gx-4 gx-lg-5 align-items-center">

                        {product != null ? (
                            <>
                            <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src="https://dummyimage.com/600x700/dee2e6/6c757d.jpg" alt={product.title} /></div>
                            <div className="col-md-6">
                                <div className="small mb-1">{product.modelNumber}</div>
                                <h1 className="display-5 fw-bolder">{product.title}</h1>
                                <div className="small mb-1">{product.brand}</div>
                                <p className="lead">{product.description}</p>
                                <div className="fs-5 mb-5">
                                    <span>${product.price}</span>
                                </div>                
                                <div className="d-flex">
                                    <Form method="post" >
                                        <input type='hidden' name='productId' value={product.id}/>
                                        <input className="form-control text-center me-3" name="quantity" type="number" defaultValue="1" min="1" style={{maxWidth: 3 + "rem"}} />
                                        <button className="btn btn-outline-dark flex-shrink-0" type="submit">
                                            <i className="bi-cart-fill me-1"></i>
                                            Add to cart
                                        </button>
                                    </Form>
                                </div>
                            </div>
                            </>
                        ) : (
                            <h3>Loading</h3>
                        )}                           
                        
                    </div>
                </div>
            </section>
        </>
        
    ); 
}