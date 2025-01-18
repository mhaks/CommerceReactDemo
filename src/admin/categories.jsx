import React, {useState} from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";    
import { getToken } from "../site";


export async function loader() {   
    let categories = [];
    await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/admin/products/categories`,
        {   
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + getToken() }
        })
            .then(response => response.json())
            .then(data => { categories = data; })
            .catch(error => console.log(error));

    console.log(categories);
    return categories;
}

export default function Categories() {

    const items = useLoaderData();
    const [categories, setCategories] = useState(items);
    const[sortConfig, setSortConfig] = useState({key: null, direction: 'ascending'});


    async function handleFilter(event) {
        event.preventDefault();
        
        const url = new URL(`${import.meta.env.VITE_REACT_APP_API_URL}/admin/products/categories?`);

        const data = new FormData(event.target);
        const search = data.get('search'.trim());
        if (search) url.searchParams.append('search', search);
        
        await fetch(url)
            .then(response => response.json())
            .then(data => { setCategories(data); })
            .catch(error => console.log(error));
    }

    function sortCategories(key) {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        const sortedCategories = [...categories].sort((a, b) => {
            const aValue = a[key].toLowerCase();
            const bValue = b[key].toLowerCase();
            if (direction === 'ascending') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }   

        });

        setCategories(sortedCategories);
        setSortConfig({ key, direction });
    }
    
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
                            <form className="d-flex" onSubmit={handleFilter}>
                                <input type="text" className="form-control" name="search" placeholder="search category name" />
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
                                    <th >
                                        <button  className="link-button" onClick={() => sortCategories('title')}>Name</button>                                
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