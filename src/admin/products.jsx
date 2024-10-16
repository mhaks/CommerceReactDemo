import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";



export async function loader() {
    let categories = [];
    let brands = [];

    await Promise.all([
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/admin/products/categories`)
            .then(response => response.json())
            .then(data => { categories = data; })
            .catch(error => console.log(error)),

        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/admin/products/brands`) 
            .then(response => response.json())
            .then(data => { brands = data; })
            .catch(error => console.log(error))
    ]);
 
    return {categories, brands};
}

export default function Products() {
    const {categories, brands} = useLoaderData();
    const [products, setProducts] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    useEffect(() => {
        async function fetchProducts() {
            await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/admin/products`)
                .then(response => response.json())
                .then(data => setProducts(data))
                .catch(error => console.error('Error:', error));
        }

        fetchProducts();
        
    }, []);

    async function handleFilter(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const search = formData.get('search');
        const isActive = formData.get('isActive');
        const brand = formData.get('brand');
        const categoryId = formData.get('categoryId');

        const url = new URL(`${import.meta.env.VITE_REACT_APP_API_URL}/admin/products?`);
        if (search) url.searchParams.append('search', search);
        if (isActive) url.searchParams.append('isActive', isActive);
        if (brand) url.searchParams.append('brand', brand);
        if (categoryId) url.searchParams.append('categoryId', categoryId);

        console.log("Filter: " + url);

        await fetch(url)
                .then(response => response.json())
                .then(data => setProducts(data))
                .catch(error => console.error('Error:', error));
    }

    const sortProducts = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        const sortedProducts = [...products].sort((a, b) => {
            const aValue = a[key];
            const bValue = b[key];
            
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                const aLower = aValue.toLowerCase();
                const bLower = bValue.toLowerCase();
    
                if (aLower < bLower) {
                    return direction === 'ascending' ? -1 : 1;
                }
                if (aLower > bLower) {
                    return direction === 'ascending' ? 1 : -1;
                }
                return 0;
            } else if (typeof aValue === 'number' && typeof bValue === 'number') {
                return direction === 'ascending' ? aValue - bValue : bValue - aValue;
            } else {
                const aStr = aValue.toString().toLowerCase();
                const bStr = bValue.toString().toLowerCase();

                if (aStr < bStr) {
                    return direction === 'ascending' ? -1 : 1;
                }
                if (aStr > bStr) {
                    return direction === 'ascending' ? 1 : -1;
                }
                return 0;
            }
        });

        setProducts(sortedProducts);
        setSortConfig({ key, direction });
    };

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
                                <form className="d-flex" onSubmit={handleFilter}>                       
                                    <div className="row row-cols-2">
                                        <div className="col">
                                            <label className="form-label" htmlFor="search">Search</label>
                                            <input type="text" className="form-control" name="search" id="search" placeholder="search text" />
                                        </div>
                                        <div className="col">
                                            <label className="form-label" htmlFor="isActive">Active</label>
                                            <select className="form-control" name="isActive" id="isActive">
                                                <option value="">ALL</option>
                                                <option value="true">Active</option>
                                                <option value="false">Inactive</option>
                                            </select>
                                        </div>

                                        <div className="col">
                                            <label className="form-label" htmlFor="brand">Brand</label>
                                            <select className="form-control" name="brand" id="brand">
                                                <option value="">ALL</option>
                                                {brands?.map((item) => <option key={item} value={item}>{item}</option>)}
                                            </select>
                                        </div>
                                        <div className="col">
                                            <label className="form-label" htmlFor="categoryId">Category</label>
                                            <select className="form-control" name="categoryId" id="categoryId">
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
                                <Link to="/admin/product/0" className="btn btn-outline-dark mt-auto text-center">Create New Product</Link>                   
                            </div>
                        </div>

                        <div className="row mt-4">
                            <table className="table">
                            <thead>
                                <tr>
                                    <th>
                                        <button  className="link-button" onClick={() => sortProducts('title')}>
                                            Title
                                        </button>                
                                    </th>
                                    <th>
                                        <button  className="link-button" onClick={() => sortProducts('brand')}>
                                            Brand
                                        </button>
                                    </th>
                                    <th>
                                        <button  className="link-button" onClick={() => sortProducts('model')}>
                                            Model
                                        </button>
                                    </th>
                                    <th>
                                        <button  className="link-button" onClick={() => sortProducts('category')}>
                                            Category
                                        </button>
                                    </th>
                                    <th className="text-end" onClick={() => sortProducts('price')}>
                                        <button  className="link-button">
                                            Price
                                        </button>
                                    </th>
                                    <th className="text-end" onClick={() => sortProducts('availableQty')}>
                                        <button  className="link-button">
                                            Available
                                        </button>
                                    </th>
                                    <th className="text-center">             
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
                                                <input type="checkbox" checked={item.isActive} disabled></input>
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