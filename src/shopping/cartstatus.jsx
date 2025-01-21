import  { useContext } from "react";
import { Link } from "react-router-dom";
import {UserContext, CartItemCountContext} from "../contexts";


export default function CartStatus() {

    const { user } = useContext(UserContext);
    const { cartItemCount} = useContext(CartItemCountContext);    

    return (
        <div className="d-flex ms-auto">
            {user && (
                <span className="nav nav-link text-dark">
                   <b>Welcome, {user.userName}!</b>
                </span>
            )}
            
            <Link className="nav nav-link text-dark" to="./orders">My Orders</Link>
            <Link className="btn btn-outline-dark" to="./cart">
                <i className="bi-cart-fill me-1"></i>
                Cart
                <span className="badge bg-dark text-white ms-1 rounded-pill">{cartItemCount}</span>
            </Link>
        </div>
    );
}