import React from "react";



export default function CartStatus() {

    return (
        <div className="d-flex ms-auto">
            <a className="nav nav-link text-dark" asp-area="" asp-page="/Shopping/Orders" >My Orders</a>
            <a className="btn btn-outline-dark" href="\Shopping\Cart?customerId=1">
                <i className="bi-cart-fill me-1"></i>
                Cart
                <span className="badge bg-dark text-white ms-1 rounded-pill">@Model</span>
            </a>
        </div>
    );
}