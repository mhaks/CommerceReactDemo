import React from "react";
import { Link } from "react-router-dom";


export default function Header() {

    return (
        <header className="bg-dark py-2">
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
            <Link className="navbar-brand" to="./admin">Commerce React Demo</Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link text-dark" to="./admin/orders">Orders</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <button className="nav-link dropdown-toggle"  data-bs-toggle="dropdown" aria-expanded="false">
                                Inventory
                            </button>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="./admin/products">Products</Link></li>
                                <li><Link className="dropdown-item" to="./admin/categories">Categories</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-dark" to="./admin/customers">Customers</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    );
}
