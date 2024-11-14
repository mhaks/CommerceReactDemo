import  { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {UserContext, CartItemCountContext} from "../contexts";


export default function CartStatus() {
    const { user } = useContext(UserContext);
    const { cartItemCount, setCartItemCount} = useContext(CartItemCountContext);    

    useEffect(() => {
        if (user === null ||  user === undefined || user === "") {
            return;
        }
        const url = `${import.meta.env.VITE_REACT_APP_API_URL}/Shopping/Cart/Products`;
        fetch(url, { method: "GET", credentials: "include", mode: "cors"})
        .then(resp => resp.json())
        .then(data => { setCartItemCount(data.length)})
        .catch(err => { console.error(err)});

    }, [user, setCartItemCount]);

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