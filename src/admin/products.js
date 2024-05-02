import React from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";


export async function loader() {
    let products = [];
    let categories = [];
    let brands = [];

    await Promise.all([
        fetch(`${process.env.REACT_APP_API_URL}/admin/products`)
            .then(response => response.json())
            .then(data => { products = data; })
            .catch(error => console.log(error)), 

        fetch(`${process.env.REACT_APP_API_URL}/shopping/categories`)
            .then(response => response.json())
            .then(data => { categories = data; })
            .catch(error => console.log(error)),

        fetch(`${process.env.REACT_APP_API_URL}/shopping/brands`) 
            .then(response => response.json())
            .then(data => { brands = data; })
            .catch(error => console.log(error))
    ]);
 
    return {products, categories, brands};
}

export default function Products() {
    const {products, categories, brands} = useLoaderData();

    return (
        <>
            <section className="bg-dark py-1">
                <div className="container px-4 px-lg-5">
                    <div className="text-left text-white">
                        <h5 className="fw-bolder">Products</h5>
                    </div>
                </div>
            </section>

            <section className="py-2">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row ">

                        <div className="row mt-4">
                            <div className="col-10">
                                <form className="d-flex">                       
                                    <div className="row row-cols-2">
                                        <div className="col">
                                            <label className="form-label" htmlFor="SearchString">Search</label>
                                            <input type="text" className="form-control" name="SearchString" id="SearchString" placeholder="search text" />
                                        </div>
                                        <div className="col">
                                            <label className="form-label" htmlFor="ActiveFilterId">Active</label>
                                            <select className="form-control" name="ActiveFilterId" id="ActiveFilterId">
                                                <option value="">ALL</option>
                                                <option value="1">Active</option>
                                                <option value="0">Inactive</option>
                                            </select>
                                        </div>

                                        <div className="col">
                                            <label className="form-label" htmlFor="BrandFilterString">Brand</label>
                                            <select className="form-control" name="BrandFilterString" id="BrandFilterString">
                                                <option value="">ALL</option>
                                                {brands?.map((item) => <option key={item} value={item}>{item}</option>)}
                                            </select>
                                        </div>
                                        <div className="col">
                                            <label className="form-label" htmlFor="CategoryFilterId">Category</label>
                                            <select className="form-control" name="CategoryFilterId" id="CategoryFilterId">
                                                <option value="">ALL</option>
                                                {categories?.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
                                            </select>
                                        </div>
                                        
                                        <div className="col"></div>
                                        <div className="col mt-2 text-end">
                                            <input type="submit" className="form-control btn btn-outline-dark mt-auto text-center" value="Filter" />
                                        </div>
                                    </div>                  
                                </form>
                            </div>
                            <div className="col-2 text-end">
                                <Link to="./product" className="btn btn-outline-dark mt-auto text-center">Create New Product</Link>                   
                            </div>
                        </div>

                        <div className="row mt-4">
                            <table className="table">
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
                                                {item.title}
                                            </td>
                                            <td>
                                                {item.brand}
                                            </td>
                                            <td>
                                                {item.model}
                                            </td>
                                            <td>
                                                {item.category}
                                            </td>
                                            <td className="text-end">
                                                ${item.price.toFixed(2)  }
                                            </td>
                                            <td className="text-end">
                                                {item.availableQty}
                                            </td>
                                            <td className="text-center">
                                                {item.isActive}
                                            </td>           
                                            <td className="text-end">
                                                <Link to={"../admin/product/" + item.id} className="btn btn-outline-dark mt-auto text-center">Edit</Link>
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