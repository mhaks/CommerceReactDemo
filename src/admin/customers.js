import React from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

export async function loader() {
    let customers = [];
    await fetch(`${API_URL}/admin/customers`)
            .then(response => response.json())
            .then(data => { customers = data; })
            .catch(error => console.log(error));
    
    return customers;
}

export default function Customers() {
    const customers = useLoaderData();
    return (
        <>
            <section className="bg-dark py-1">
                <div className="container px-4 px-lg-5">
                    <div className="text-left text-white">
                        <h5 className="fw-bolder">Customers</h5>
                    </div>
                </div>
            </section>

            <section className="py-2">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row mt-4">
                        <div className="col">
                            <form className="d-flex">
                                <input type="text" className="form-control" asp-for="SearchString" placeholder="search customer name" />
                                <button type="submit" className="btn btn-outline-dark mt-auto text-center">Search</button>                           
                            </form>
                        </div>
                        <div className="col text-end">
                            <Link to="./customer" className="btn btn-outline-dark mt-auto text-center">Create New Customer</Link>
                        </div>
                    </div>
                        
                    <div className="row mt-4">
                        <table className="table">
                        <thead>
                            <tr>            
                                <th>
                                    <Link>Name</Link>
                                </th>
                                <th>
                                    Address1
                                </th>
                                <th>
                                    Address2
                                </th>
                                <th>
                                    City
                                </th>
                                <th>
                                    State
                                </th>
                                <th>
                                    Zip Code
                                </th>
                                <th>
                                    Phone
                                </th>
                                <th>
                                    Email
                                </th>
                                <th>
                                   Username
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers?.map((customer) => (
                                <tr key={customer.id}>
                                    <td>
                                        <Link to={`../admin/customer/${customer.id}`}>{customer.fullName}</Link>
                                    </td>
                                    <td>
                                        {customer.address1}
                                    </td>
                                    <td>
                                        {customer.address2}
                                    </td>
                                    <td>
                                        {customer.city}
                                    </td>
                                    <td>
                                        {customer.stateLocation.name}
                                    </td>
                                    <td>
                                        {customer.postalCode}
                                    </td>
                                    <td>
                                        {customer.phoneNumber}
                                    </td>
                                    <td>
                                        {customer.email}
                                    </td>
                                    <td>
                                        {customer.userName}
                                    </td>
                                    <td>
                                        <Link to={`/admin/customerEdit/${customer.id}`} className="btn btn-outline-dark mt-auto text-center">Edit</Link>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    </div>
                    
                </div>
            </section>
        </>
    );
}