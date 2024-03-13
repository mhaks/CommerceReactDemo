import React from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";

export async function loader({params}) {
    let customer = {};
    let states = [];
    await Promise.all([
        fetch(`${process.env.REACT_APP_API_URL}/admin/states`)
                .then(response => response.json())
                .then(data => { states = data; })
                .catch(error => console.log(error)),

        fetch(`${process.env.REACT_APP_API_URL}/admin/customer/${params.id}`)
                .then(response => response.json())
                .then(data => { customer = data; })
                .catch(error => console.log(error)),
    ]);

    return {customer, states};  
}

export default function Customer() {
    const {customer, states} = useLoaderData();
    
    return (
        <>
            <section className="bg-dark py-1">
                <div className="container px-4 px-lg-5">
                    <div className="text-left text-white">
                        <h5 className="fw-bolder">Customer</h5>
                    </div>
                </div>
            </section>

            <section className="py-2">
                <div className="container px-4 px-lg-5 mt-5">

                    <div className="row">
                            <div className="col-md-4">
                                <form method="post">
                                    <div asp-validation-summary="ModelOnly" className="text-danger"></div>
                                    <input type="hidden" asp-for="CustomerId" />

                                {customer?.userName && customer?.userName.length > 0 ? 
                                    <input type="hidden" asp-for="UserName" />
                                    :
                                    <div className="form-group mt-3">
                                        <label htmlFor="UserName" className="control-label">UserName</label>
                                        <input name="UserName" id="UserName" className="form-control"  />
                                        
                                    </div>
                                }
                

                                    <div className="form-group mt-3">
                                        <label htmlFor="FirstName" className="control-label">First Name</label>
                                        <input name="FirstName" id="FirstName" className="form-control"  value={customer.firstName} onChange={(event) => {customer.firstName = event.target.value;}}/>
                                        
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="LastName" className="control-label">Last Name</label>
                                        <input name="LastName" id="LastName" className="form-control" value={customer.lastName} onChange={(event) => {customer.lastName = event.target.value;}}/>
                                        
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="Address1" className="control-label"> Address 1</label>
                                        <input name="Address1" id="Address1" className="form-control" value={customer.address1} onChange={(event) => {customer.address1 = event.target.value;}}/>
                                        
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="Address2" className="control-label">Address 2</label>
                                        <input name="Address2" id="Address2" className="form-control" value={customer.address2} onChange={(event) => {customer.address2 = event.target.value;}}/>
                                        
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="City" className="control-label">City</label>
                                        <input name="City" id="City" className="form-control" value={customer.city} onChange={(event) => {customer.city = event.target.value;}}/>
                                        
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="StateLocationId" className="control-label">State</label>
                                        <select name="StateLocationId"id="StateLocationId" className="form-control" value={customer.stateLocationId} onChange={(event) => {customer.stateLocationId = event.target.value;}}>
                                            {states?.map((state) => (
                                                <option key={state.id} value={state.id} >{state.name}</option>
                                            ))}
                                        </select>
                                        
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="PostalCode" className="control-label">Zipcode</label>
                                        <input name="PostalCode" id="PostalCode" className="form-control" value={customer.postalCode} onChange={(event) => {customer.postalCode = event.target.value;}} />
                                        
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="PhoneNumber" className="control-label">Phone</label>
                                        <input name="PhoneNumber" id="PhoneNumber" className="form-control" value={customer.phoneNumber} onChange={(event) => {customer.phoneNumber = event.target.value;}} />
                                        
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="EmailAddress" className="control-label">Email</label>
                                        <input name="EmailAddress" id="EmailAddress" className="form-control" value={customer.email} onChange={(event) => {customer.email = event.target.value;}} />
                                        
                                    </div>
                                    
                                    <div className="form-group mt-3 row">
                                        <div className="col">
                                            <input type="submit" value="Save" className="btn btn-outline-dark mt-auto text-center col-6" />
                                        </div>
                                        <div className="col text-end">
                                            <Link to="../admin/customers" >Back to List</Link>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>

                </div>
            </section>
        </>
    );
}