import React from "react";

import { useLoaderData, useActionData, redirect } from "react-router";
import { Link, Form, } from "react-router-dom";




export async function loader() {
    const cartUrl = `${process.env.REACT_APP_API_URL}/Shopping/Cart/`;
    let order = null;
    await fetch(cartUrl)
        .then (response => response.json())
        .then (json => {order = json;})
        .catch(err => console.error(err));

    return order;
}

export async function action({ request }) {

    const cartEditUrl = `${process.env.REACT_APP_API_URL}/Shopping/Cart/Edit/`;
    const formData = await request.formData();
    const action = formData.get("action");
    if (action === 'update') {
        const errors = {};
        const orderProductId = formData.get("orderProductId");
        const quantity = formData.get("quantity");
        if(!quantity) {
            errors.quantity = 'Quantity is required';
            errors.orderProductId = orderProductId;
            return errors;
        }
    }
    
    await fetch(cartEditUrl, {
        method: "PUT",
        body: formData,
    })    
    .catch(err => console.error(err));

    return redirect("/cart/");
}

export default function Cart() {

    const order = useLoaderData();
    const errors = useActionData();

    const itemCount = order.orderProducts?.length;
    const subTotal = order.orderProducts?.reduce((accum, current) => accum + (current.quantity * current.product.price), 0);

    const productsTemplate = order.orderProducts?.map((item, index) => (
                  
        <tr key={item.id}>
            
            <td><img className="" src="https://dummyimage.com/150x100/dee2e6/6c757d.jpg" alt={item.product.title} /></td>
            <td>
                <Link to={'../product/' + item.product.id} target="_blank">
                    <h5 className="fw-bolder">{item.product.title}</h5>
                </Link>
                
                <p className="fw-bolder">{item.product.brand}</p>                                       
                <Form method="put">
                    <div className="row">                        
                        <input type="hidden" name="orderId" value={item.orderId}/>
                        <input type="hidden" name="orderProductId" value={item.id}/>
                        <div className="col-3">
                            <div className="input-group my-3">
                                <span className="input-group-text" id="basic-addon1" >Qty</span>
                                <input type="number" className="form-control" aria-label="Quantity" aria-describedby="basic-addon1" defaultValue={item.quantity} name="quantity" min="0" max="50"/>                                
                            </div>
                            
                        </div>
                        <div className="col-3 my-3">
                            <button type="submit" className="btn btn-outline-dark mt-auto" name="action" value="update">Update</button>
                            {errors?.quantity && <p className="text-danger text-sm-start">{errors.quantity}</p>}
                        </div> 

                                           
                    </div>
                </Form>
            </td>

            <td className="align-middle text-end">                                        
                <div className="fw-bolder">${item.product.price.toFixed(2)}</div>
            </td>
            <td className="align-middle">
                <Form method="put">
                    <input type="hidden" name="orderId" value={item.orderId}/>
                    <input type="hidden" name="orderProductId" value={item.id}/>
                    <input type="hidden" name="quantity" value="0"/>
                    <button type="submit" className="btn btn-outline-danger mt-auto" name="action" value="remove">Remove</button>
                </Form>
            </td>
            
        </tr>
        
    ));
       

    return (
        <> 
            <section className="bg-dark py-1">
                <div className="container px-4 px-lg-5">
                    <div className="text-left text-white">
                        <h5 className="fw-bolder">Cart</h5>
                    </div>
                </div>
            </section>
            

            { order && order.orderProducts.length > 0 ? (
                <>
                    <section className="py-2">
                        <div className="container px-4 px-lg-5 mt-5">
                            <div className="row ">

                                <table className="table gx-2 gx-lg-2">
                                    <tbody>
                                        {productsTemplate}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td className="fw-bolder text-end" colSpan="4">{`Subtotal ${itemCount} items: $${subTotal.toFixed(2)}`}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </section>

                    <section className="pt-2 pb-4 mb-10">
                        <div className="container px-4 px-lg-5">
                            <div className="row">
                                <div className="col-6"><Link className="btn  btn-outline-dark mt-auto" to="../search/">Continue shopping</Link></div>
                                <div className="col-6 text-end"><Link className="btn btn-outline-success mt-auto" to={'../checkout/'}>Proceed to Checkout</Link></div>
                            </div>
                        </div>
                    </section>
                </>

            ) : (
                <section className="">
                    <div className="container px-4 px-lg-5 py-4 my-4">
                        <div className="row">
                            <h4 className="text-center"> No items currently in cart</h4>
                            <div className="text-center"><Link className="btn  btn-outline-dark mt-auto" to="../search/">Continue shopping</Link></div> 
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}