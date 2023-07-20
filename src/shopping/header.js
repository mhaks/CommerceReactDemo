import React from "react";

import CartStatus from "./cartstatus";



export default function Header() {

    return (
        <header className="bg-dark py-2">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand" href="~/">Commerce React Demo</a>
                <CartStatus/>
            </div>
        </nav>
    </header>
    );
}