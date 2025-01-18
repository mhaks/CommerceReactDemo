import  { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {UserContext, CartItemCountContext} from "../contexts";
import { getToken } from "../site";


export default function CartStatus() {

    const { cartItemCount} = useContext(CartItemCountContext);    

    return (
        <div className="d-flex ms-auto">
            <Link className="nav nav-link text-dark" to="./orders">My Orders</Link>
            <Link className="btn btn-outline-dark" to="./cart">
                <i className="bi-cart-fill me-1"></i>
                Cart
                <span className="badge bg-dark text-white ms-1 rounded-pill">{cartItemCount}</span>
            </Link>
        </div>
    );
}