import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

export default function CartStatus() {

    const [count, setCount] = useState(0);

    useEffect(() => {
        const url = API_URL + '/Shopping/CartCount';
        fetch(url)
        .then(resp => resp.json())
        .then(data => { setCount(data)})
        .catch(err => { console.error(err)});

    });

    return (
        <div className="d-flex ms-auto">
            <a className="nav nav-link text-dark" href="\Shopping\Cart?customerId=1">My Orders</a>
            <a className="btn btn-outline-dark" href="\Shopping\Cart?customerId=1">
                <i className="bi-cart-fill me-1"></i>
                Cart
                <span className="badge bg-dark text-white ms-1 rounded-pill">{count}</span>
            </a>
        </div>
    );
}