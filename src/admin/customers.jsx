import React, { useState  } from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";


export async function loader() {
    let customers = [];
    await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/admin/customers`)
            .then(response => response.json())
            .then(data => { customers = data; })
            .catch(error => console.log(error));
    
    return customers;
}

export default function Customers() {
    const [customers, setCustomers] = useState(useLoaderData());
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });


    async function handleFilter(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const search = formData.get('search');

        const url = new URL(`${import.meta.env.VITE_REACT_APP_API_URL}/admin/customers?`);
        if (search) url.searchParams.append('search', search);

        await fetch(url)
                .then(response => response.json())
                .then(data => setCustomers(data))
                .catch(error => console.error('Error:', error));

    }

    function sortCustomers(key) {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        const sortedCustomers = [...customers].sort((a, b) => {
            const aValue = a[key].toLowerCase();
            const bValue = b[key].toLowerCase();
            if (direction === 'ascending') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        setCustomers(sortedCustomers);
        setSortConfig({ key, direction});
    }

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
                            <form className="d-flex" onSubmit={handleFilter}>
                                <input type="text" className="form-control" name="search" placeholder="search customer name" />
                                <button type="submit" className="btn btn-outline-dark mt-auto text-center">Search</button>                           
                            </form>
                        </div>
                        <div className="col text-end">
                            <Link to="/admin/customer/0" className="btn btn-outline-dark mt-auto text-center">Create New Customer</Link>
                        </div>
                    </div>
                        
                    <div className="row mt-4">
                        <table className="table">
                        <thead>
                            <tr>            
                                <th>
                                    <button className="link-button" onClick={() => sortCustomers('fullName')}>Name</button>
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
                                        {customer.fullName}
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
                                        <Link to={`/admin/customer/${customer.id}`} className="btn btn-outline-dark mt-auto text-center">Edit</Link>
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