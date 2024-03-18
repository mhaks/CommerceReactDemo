import React from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";    



export async function loader() {   
    let categories = [];
    await fetch(`${process.env.REACT_APP_API_URL}/shopping/categories`)
            .then(response => response.json())
            .then(data => { categories = data; })
            .catch(error => console.log(error));

    console.log(categories);
    return categories;
}

export default function Categories() {

    const categories = useLoaderData();
    
    return (
        <>
            <section className="bg-dark py-1">
                <div className="container px-4 px-lg-5">
                    <div className="text-left text-white">
                        <h5 className="fw-bolder">Product Categories</h5>
                    </div>
                </div>
            </section>

            <section className="py-2">
                <div className="container px-4 px-lg-5 mt-5">

                    <div className="row mt-4">
                        <div className="col">
                            <form className="d-flex">
                                <input type="text" className="form-control" asp-for="SearchString" placeholder="search category name" />
                                <button type="submit" className="btn btn-outline-dark mt-auto text-center">Search</button>                           
                            </form>
                        </div>
                        <div className="col text-end">
                            <Link to="../admin/category/0" className="btn btn-outline-dark mt-auto text-center">Create New Category</Link>
                        </div>
                    </div>
                            
                    
                    <div className="row mt-4">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>
                                        <Link>Name</Link>                                        
                                    </th>
                                    <th>
                                        Category ID
                                    </th>
                                    <th style={{textAlign: "right"}}>
                                        Results: {categories?.length}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    categories.map((item, index) => {
                                        return (
                                        <tr key={item.id}>
                                            <td>
                                                {item.title}
                                            </td>
                                            <td>
                                                {item.id}
                                            </td>
                                            <td style={{textAlign: "right"}}>
                                                <Link to={"../admin/category/" + item.id} className="btn btn-outline-dark mt-auto text-center">Edit</Link>
                                            </td>
                                        </tr>
                                        )
                                    })
                                }                                
                            </tbody>
                        </table>
                    </div>

                </div>
            </section>
        </>
    );
}