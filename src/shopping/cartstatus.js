import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";



export default function CartStatus() {

    const [count, setCount] = useState(0);

    useEffect(() => {
        const url = `${process.env.REACT_APP_API_URL}/Shopping/Cart/Products`;
        fetch(url)
        .then(resp => resp.json())
        .then(data => { setCount(data.length)})
        .catch(err => { console.error(err)});

    });

    return (
        <div className="d-flex ms-auto">
            <Link className="nav nav-link text-dark" to="./orders">My Orders</Link>
            <Link className="btn btn-outline-dark" to="./cart">
                <i className="bi-cart-fill me-1"></i>
                Cart
                <span className="badge bg-dark text-white ms-1 rounded-pill">{count}</span>
            </Link>
        </div>
    );
}