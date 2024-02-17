import React from "react";
import { Link } from "react-router-dom";


export default function Header() {

    return (
        <header className="bg-dark py-2">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
                <Link className="navbar-brand" to="./admin">Commerce React Demo</Link>
                <div>Admin header component</div>
            </div>
        </nav>
    </header>
    );
}
