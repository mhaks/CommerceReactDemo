import React from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";

export async function loader() {
    let products = [];
 
    return products;
}

export default function Products() {
    const {products} = useLoaderData();

    return (
        <>
            <section class="bg-dark py-1">
                <div class="container px-4 px-lg-5">
                    <div class="text-left text-white">
                        <h5 class="fw-bolder">Products</h5>
                    </div>
                </div>
            </section>

            <section class="py-2">
                <div class="container px-4 px-lg-5 mt-5">
                    <div class="row ">

                        <div class="row mt-4">
                            <div class="col-10">
                                <form class="d-flex">                       
                                    <div class="row row-cols-2">
                                        <div class="col">
                                            <label class="form-label" for="SearchString">Search</label>
                                            <input type="text" class="form-control" name="SearchString" placeholder="search text" />
                                        </div>
                                        <div class="col">
                                            <label class="form-label" for="ActiveFilterId">Active</label>
                                            <select class="form-control" name="ActiveFilterId">
                                                <option value="">ALL</option>
                                            </select>
                                        </div>

                                        <div class="col">
                                            <label class="form-label" for="BrandFilterString">Brand</label>
                                            <select class="form-control" name="BrandFilterString">
                                                <option value="">ALL</option>
                                            </select>
                                        </div>
                                        <div class="col">
                                            <label class="form-label" for="CategoryFilterId">Category</label>
                                            <select class="form-control" name="CategoryFilterId" >
                                                <option value="">ALL</option>
                                            </select>
                                        </div>
                                        
                                        <div class="col"></div>
                                        <div class="col mt-2 text-end">
                                            <input type="submit" class="form-control btn btn-outline-dark mt-auto text-center" value="Filter" />
                                        </div>
                                    </div>                  
                                </form>
                            </div>
                            <div class="col-2 text-end">
                                <Link to="./product" class="btn btn-outline-dark mt-auto text-center">Create New Product</Link>                   
                            </div>
                        </div>

                        <div class="row mt-4">
                            <table class="table">
                            <thead>
                                <tr>
                                    <th>
                                        <Link>
                                            Title
                                        </Link>                
                                    </th>
                                    <th>
                                        <Link>
                                            Brand
                                        </Link>
                                    </th>
                                    <th>
                                        <Link>
                                            Model Number
                                        </Link>
                                    </th>
                                    <th>
                                        <Link>
                                            Category
                                        </Link>
                                    </th>
                                    <th>
                                        <Link>
                                            Price
                                        </Link>
                                    </th>
                                    <th>
                                        <Link>
                                            Available
                                        </Link>
                                    </th>
                                    <th>             
                                            Active                
                                    </th>
                                    <th style={{textAlign: "right"}}>
                                        Results: {products?.length}
                                    </th>            
                                </tr>
                            </thead>
                            <tbody>
                                {products?.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>
                                                {item.oitle}
                                            </td>
                                            <td>
                                                {item.brand}
                                            </td>
                                            <td>
                                                {item.modelNumber}
                                            </td>
                                            <td>
                                                {item.productCategory.title}
                                            </td>
                                            <td class="text-end">
                                                ${item.price.toFixed(2)  }
                                            </td>
                                            <td class="text-end">
                                                {item.availableQty}
                                            </td>
                                            <td class="text-center">
                                                {item.isActive}
                                            </td>           
                                            <td class="text-end">
                                                <Link to={"./product/" + item.Id} class="btn btn-outline-dark mt-auto text-center">Edit</Link>
                                            </td>
                                        </tr>
                                    );
                                })}

                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}