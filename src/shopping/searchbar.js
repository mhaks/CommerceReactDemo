import React, {useState, useEffect} from "react";
import { Form } from "react-router-dom";


export default function SearchBar() {

    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState();
    const [categoryName, setCategoryName] = useState('ALL');


    const categoryButtons = categories.map((item) => (
        <button className="dropdown-item" type="button" value={item.id} key={item.id} >{item.title} </button>
    ));

    useEffect(() => {        
        fetch(`${process.env.REACT_APP_API_URL}/Shopping/Products/Categories`)
            .then(response => response.json())
            .then(json => setCategories(json))
            .catch(err => { console.error(err)});
    }, []);


    
    function changeCategory(event) {
        setCategoryName(event.target.textContent);
        setCategoryId(event.target.value);  
    }
        
 

    return (
        <section className="py-1">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col">
                        <Form className="d-flex"  action="/search">
                            <div className="input-group me-2">
                                <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="category-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >{categoryName}</button>
                                <div className="dropdown-menu" onClick={changeCategory}>
                                    <button className="dropdown-item" type="button" value="" >All</button>
                                    {categoryButtons}
                                </div>
                                <input className="form-control flex-grow-1 me-2" type="search" placeholder="Search for products..." aria-label="Search" name="SearchString" defaultValue="" />
                                <input type="hidden" id="category-input" name="CategoryId" value={categoryId} />
                            </div>
                            <button className="btn btn-outline-dark" type="submit">Search</button>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    );
}