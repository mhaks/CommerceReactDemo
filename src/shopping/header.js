import React from "react";
import { Link } from "react-router-dom";

import CartStatus from "./cartstatus";



export default function Header() {

    return (
        <header className="bg-dark py-2">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
                <Link className="navbar-brand" to="./">Commerce React Demo</Link>
                <CartStatus/>
            </div>
        </nav>
    </header>
    );
}