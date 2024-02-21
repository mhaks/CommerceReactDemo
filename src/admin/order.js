import React from "react";
import { useLoaderData } from "react-router";

//const API_URL = process.env.REACT_APP_API_URL;

export async function loader() {
    return null;
}

export default function Order() {
    const {data} = useLoaderData();
    console.log(data);

    return (
        <div>
            <h1>Admin Order</h1>
        </div>
    );
}