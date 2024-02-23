import React from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";

export async function loader() {
    let product = {};
    return product;
}

export default function Product() {
    const {product} = useLoaderData();

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
                                        <label htmlFor="Title" className="control-label">Title</label>
                                        <input name="Title" id="Title" className="form-control" />                                       
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="Description" className="control-label">Description</label>
                                        <textarea rows="5" cols="35" name="Description" id="Description" className="form-control"></textarea>                                        
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="Brand" className="control-label">Brand</label>
                                        <input className="form-control" name="Brand" id="Brand" list="brands"/> 
                                        <datalist id="brands">
                                            <option value="TODO 1" />
                                            <option value="TODO2" />
                                        </datalist>                            
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="Price" className="control-label">Price</label>
                                        <input name="Price" id="Price" className="form-control" />                                        
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="ProductCategoryId" className="control-label"></label>
                                        <select className="form-control" name="ProductCategoryId" id="ProductCategoryId" >
                                            <option value="1">TODO 1</option>
                                            <option value="1">TODO 2</option>
                                        </select>
                                        
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="ModelNumber" className="control-label"></label>
                                        <input name="ModelNumber" id="ModelNumber" className="form-control" />
                                        
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="AvailableQty" className="control-label"></label>
                                        <input name="AvailableQty" id="AvailableQty" className="form-control" />
                                        
                                    </div>
                                    <div className="form-group mt-3">
                                        <input name="IsActive" id="IsActive" className="form-check-input" />
                                        <label htmlFor="IsActive" className="form-check-label"></label>                                        
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