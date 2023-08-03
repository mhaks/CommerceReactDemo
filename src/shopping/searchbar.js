import React, {useState, useEffect} from "react";

const API_URL = process.env.REACT_APP_API_URL;

export default function SearchBar() {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const url = API_URL + '/Shopping/ProductCategories';
        fetch(url)
        .then(response => response.json())
        .then(json => setCategories(json))
        .catch(err => { console.error(err)});
    }, []);

    
    const categoryButtons = categories.map((item) => (
        <button className="dropdown-item" type="button" value={item.id} key={item.id} >{item.title}</button>
    ));
   

    function changeCategory(category, id) {
        document.querySelector('#category-toggle').innerHTML = category;
        document.querySelector('#category-input').value = id;        
    }

    return (
        <section className="py-1">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col">
                        <form className="d-flex" action="..\Shopping\Search" method="get">
                            <div className="input-group me-2">
                                <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="category-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">All</button>
                                <div className="dropdown-menu">
                                    <button className="dropdown-item" type="button"  value="">All</button>
                                    {categoryButtons}
                                </div>
                                <input className="form-control flex-grow-1 me-2" type="search" placeholder="Search for products..." aria-label="Search" name="SearchString" value="" />
                                <input type="hidden" id="category-input" name="CategoryId" value="" />
                            </div>
                            <button className="btn btn-outline-dark" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}