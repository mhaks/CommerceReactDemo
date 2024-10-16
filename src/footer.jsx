import React from "react";

import UserSwitch from "./userswitch";


export default function Footer() {


    return (
        <footer className="footer fixed-bottom mt-auto py-2 bg-dark">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 offset-md-4 text-center">
                        <UserSwitch />
                    </div>
                </div>
                <p className="text-center text-white ">Copyright &copy; Mhaks 2024</p>
            </div>
        </footer>
    );
}