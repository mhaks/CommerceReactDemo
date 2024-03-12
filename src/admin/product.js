import React from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

export async function loader({params}) {
    let product = {};
    let categories = [];
    let brands = [];

    await Promise.all([
        fetch(`${API_URL}/admin/product/${params.id}`)
            .then(response => response.json())
            .then(data => { product = data; })
            .catch(error => console.log(error)),
        
        fetch(`${API_URL}/shopping/categories`)
            .then(response => response.json())
            .then(data => { categories = data; })
            .catch(error => console.log(error)),

        fetch(`${API_URL}/shopping/brands`) 
            .then(response => response.json())
            .then(data => { brands = data; })
            .catch(error => console.log(error))    
    ]);

    return  {product, categories, brands};
}

export default function Product() {
    const {product, categories, brands}  = useLoaderData();

    return (
        <>
            <section className="bg-dark py-1">
                <div className="container px-4 px-lg-5">
                    <div className="text-left text-white">
                        <h5 className="fw-bolder">Product</h5>
                    </div>
                </div>
            </section>


            <section className="py-2">
                <div className="container px-4 px-lg-5 mt-5">


                    <div className="row">
                        <div className="col-md-4">
                            <form method="post">
                                    <input type="hidden" asp-for="Id" />
                                    <div className="form-group mt-3">
                                        <label htmlFor="Title" className="control-label" >Title</label>
                                        <input name="Title" id="Title" className="form-control" value={product.title} onChange={ (event) => {product.title = event.target.value}}/>                                       
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="Description" className="control-label">Description</label>
                                        <textarea rows="5" cols="35" name="Description" id="Description" className="form-control" value={product.description} onChange={ (event) => {product.description = event.target.value}}></textarea>                                        
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="Brand" className="control-label">Brand</label>
                                        <input className="form-control" name="Brand" id="Brand"  type="text" list="brandList" onChange={ (event) => {product.brand = event.target.value}}/> 
                                        <datalist id="brandList">
                                        {brands?.map((item) => <option key={item} value={item}></option>)}
                                        </datalist>                            
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="Price" className="control-label">Price</label>
                                        <input name="Price" id="Price" className="form-control" value={product.price} onChange={ (event) => {product.price = event.target.value}}/>                                        
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="ProductCategoryId" className="control-label">Category</label>
                                        <select className="form-control" name="ProductCategoryId" id="ProductCategoryId" value={product.categoryId} onChange={ (event) => {product.categoryId = event.target.value}}>
                                        {categories?.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
                                        </select>
                                        
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="ModelNumber" className="control-label">Model Number</label>
                                        <input name="ModelNumber" id="ModelNumber" className="form-control" value={product.model} onChange={ (event) => {product.model = event.target.value}} />
                                        
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="AvailableQty" className="control-label">Available Quantity</label>
                                        <input name="AvailableQty" id="AvailableQty" className="form-control" value={product.availableQty} onChange={ (event) => {product.availableQty = event.target.value}}/>
                                        
                                    </div>
                                    <div className="form-group mt-3">
                                        <input name="IsActive" id="IsActive" className="form-check-input" type="checkbox" checked={product.isActive} onChange={ (event) => {product.isActive = event.target.value}}/>
                                        <label htmlFor="IsActive" className="form-check-label">&nbsp;Active</label>                                        
                                    </div>
                                    <div className="form-group mt-3 row">
                                        <div className="col">
                                            <input type="submit" value="Save" className="btn btn-outline-dark mt-auto text-center col-6" />
                                        </div>
                                        <div className="col text-end">
                                            <Link to="../admin/products">Back to List</Link>
                                        </div>
                                    </div>
                                </form>
                        </div>
                    </div>
                    
                </div>
            </section>
        </>
    );
}