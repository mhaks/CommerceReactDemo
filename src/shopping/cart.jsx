import {useContext} from "react";

import { useLoaderData, useActionData, redirect } from "react-router";
import { Link, Form, } from "react-router-dom";
import { UserContext } from './../contexts'; 




export async function loader({ request }) {
    console.log(request);
    const cartUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/Shopping/Cart`;
    let cart = null;
    await fetch(cartUrl)
        .then (response => response.json())
        .then (json => {cart = json;})
        .catch(err => console.error(err));

    return cart;
}

export async function action({ request }) {
 
    const formData = await request.formData();
    const action = formData.get("action");
    const productId = formData.get("productId");

    if (action === 'update') {
        const errors = {};        
        const quantity = formData.get("quantity");
        if(!quantity) {
            errors.quantity = 'Quantity is required';
            errors.productId = productId;
            return errors;
        }

        await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/Shopping/Cart/Products/`, {
            method: "PUT",
            body: formData,
        })    
        .catch(err => console.error(err));
    }
    else if (action === 'remove') {
        await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/Shopping/Cart/Products/${productId}`, {
            method: "DELETE",           
        })    
        .catch(err => console.error(err));
    }
    
    return redirect("/cart/");
}

export default function Cart() {
    
    const cart = useLoaderData();
    const errors = useActionData();

    const itemCount = cart.products?.length;
    const subTotal = cart.products?.reduce((accum, current) => accum + (current.quantity * current.price), 0);

    const productsTemplate = cart.products?.map((item, index) => (                  
        <tr key={item.id}>            
            <td><img className="" src="/product_150x100.jpg" alt={item.title} /></td>
            <td>
                <Link to={'../product/' + item.id} target="_blank">
                    <h5 className="fw-bolder">{item.title}</h5>
                </Link>
                
                <p className="fw-bolder">{item.brand}</p>                                       
                <Form method="put">                   
                    <div className="row">
                        <input type="hidden" name="productId" value={item.id}/>
                        <div className="col-3">
                            <div className="input-group my-3">
                                <span className="input-group-text" id="basic-addon1" >Qty</span>
                                <input type="number" className="form-control" aria-label="Quantity" aria-describedby="basic-addon1" defaultValue={item.quantity} name="quantity" min="1" max="50"/>                                
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
                <div className="fw-bolder">${item.price.toFixed(2)}</div>
            </td>
            <td className="align-middle">
                <Form method="delete">                              
                    <input type="hidden" name="productId" value={item.id}/>                    
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
            

            { cart && cart.products.length > 0 ? (
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