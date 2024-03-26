import React from "react";
import { useLoaderData, useActionData, redirect } from "react-router";
import { Link, Form } from "react-router-dom";

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

export async function action({request}) {
    const formData = await request.formData();
  
    // validate
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
        console.info('action errors');
        return errors;
    }

    // put
    await fetch(`${process.env.REACT_APP_API_URL}/Admin/Customer/`, {
        method: 'PUT',
        body: formData
    })
    .catch(err => { 
        console.error(err); 
        return;
    });

    return redirect("../admin/customers/");

}

function validateForm(formData) {
    const errors = {};

    const id = formData.get("id");
    id.trim();
    const userName = formData.get("userName");
    userName.trim();
    if(id === "" && userName === "" ) {
        errors.userName = 'UserName is required';        
    }
    const firstName = formData.get("firstName");
    firstName.trim();
    if(firstName === "" ) {
        errors.firstName = 'First Name is required';        
    }

    const lastName = formData.get("lastName");
    lastName.trim();
    if(lastName === "" ) {
        errors.lastName = 'Last Name is required';        
    }
    
    const address1 = formData.get("address1");
    address1.trim();
    if(address1 === "" ) {
        errors.address1 = 'Address1 is required';        
    }
    
    const city = formData.get("city");
    city.trim();
    if(city === "" ) {
        errors.city = 'City is required';        
    }
    
    const stateLocationId = formData.get("stateLocationId");
    stateLocationId.trim();
    if(stateLocationId === "" ) {
        errors.stateLocationId = 'State is required';        
    }
    
    const postalCode = formData.get("postalCode");
    postalCode.trim();
    if(postalCode === "" ) {
        errors.postalCode = 'Zipcode is required';        
    }
    
    const phoneNumber = formData.get("phoneNumber");
    phoneNumber.trim();
    if(phoneNumber === "" ) {
        errors.phoneNumber = 'Phone is required';        
    }
    if (!validatePhoneNumber(phoneNumber)) {
        errors.phoneNumber = 'Invalid phone number';
    }

    const email = formData.get("email");
    email.trim();
    if(email === "" ) {
        errors.email = 'Email is required';        
    }
    if (!validateEmail(email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
}

function validatePhoneNumber(phoneNumber) {
    const regex = /^(?:\+1|1)?(?:[-.●]?\d{3}){2}[-.●]?\d{4}$/;
    return regex.test(phoneNumber);
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export default function Customer() {
    const {customer, states} = useLoaderData();
    const errors = useActionData();
    
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
                                <Form method="post">
                                   
                                    <input type="hidden" name="id" defaultValue={customer.id} />

                                {customer?.userName && customer?.userName.length > 0 ? 
                                    <input type="hidden" name="userName" defaultValue={customer.userName} />
                                    :
                                    <div className="form-group mt-3">
                                        <label htmlFor="userName" className="control-label">UserName</label>
                                        <input name="userName" id="userName" className="form-control" defaultValue={customer.userName} />
                                        {errors?.userName && <p className="text-danger text-sm-start">{errors.userName}</p>}
                                    </div>
                                }
                
                                    <div className="form-group mt-3">
                                        <label htmlFor="firstName" className="control-label">First Name</label>
                                        <input name="firstName" id="firstName" className="form-control"  defaultValue={customer.firstName}/>
                                        {errors?.firstName && <p className="text-danger text-sm-start">{errors.firstName}</p>}                                        
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="lastName" className="control-label">Last Name</label>
                                        <input name="lastName" id="lastName" className="form-control" defaultValue={customer.lastName} />
                                        {errors?.lastName && <p className="text-danger text-sm-start">{errors.lastName}</p>}
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="address1" className="control-label">Address 1</label>
                                        <input name="address1" id="address1" className="form-control" defaultValue={customer.address1} />
                                        {errors?.address1 && <p className="text-danger text-sm-start">{errors.address1}</p>}
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="address2" className="control-label">Address 2</label>
                                        <input name="address2" id="address2" className="form-control" defaultValue={customer.address2} />                                        
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="city" className="control-label">City</label>
                                        <input name="city" id="city" className="form-control" defaultValue={customer.city} />
                                        {errors?.city && <p className="text-danger text-sm-start">{errors.city}</p>}
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="stateLocationId" className="control-label">State</label>
                                        <select name="stateLocationId" id="stateLocationId" className="form-control" defaultValue={customer.stateLocationId} >
                                            {states?.map((state) => (
                                                <option key={state.id} value={state.id} >{state.name}</option>
                                            ))}
                                        </select>
                                        {errors?.stateLocationId && <p className="text-danger text-sm-start">{errors.stateLocationId}</p>}
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="postalCode" className="control-label">Zipcode</label>
                                        <input name="postalCode" id="postalCode" className="form-control" defaultValue={customer.postalCode}  />
                                        {errors?.postalCode && <p className="text-danger text-sm-start">{errors.postalCode}</p>}
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="phoneNumber" className="control-label">Phone</label>
                                        <input name="phoneNumber" id="phoneNumber" className="form-control" defaultValue={customer.phoneNumber}  />
                                        {errors?.phoneNumber && <p className="text-danger text-sm-start">{errors.phoneNumber}</p>}
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="email" className="control-label">Email</label>
                                        <input name="email" id="email" className="form-control" defaultValue={customer.email} />
                                        {errors?.email && <p className="text-danger text-sm-start">{errors.email}</p>}
                                        
                                    </div>
                                    
                                    <div className="form-group mt-3 row">
                                        <div className="col">
                                            <input type="submit" value="Save" className="btn btn-outline-dark mt-auto text-center col-6" />
                                        </div>
                                        <div className="col text-end">
                                            <Link to="../admin/customers" >Back to List</Link>
                                        </div>
                                    </div>

                                </Form>
                            </div>
                        </div>

                </div>
            </section>
        </>
    );
}