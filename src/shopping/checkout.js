import React from "react";
import { useLoaderData, useActionData, redirect } from "react-router";
import { Link, Form, } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

export async function loader() {
    const cartUrl = `${API_URL}/Shopping/Cart`;
    let order = null;
    await fetch(cartUrl)
        .then (response => response.json())
        .then (json => {order = json;})
        .catch(err => console.error(err));

    return order;
}

export async function action({request}) {
    console.info('action');
    const formData = await request.formData();

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
        console.info('action errors');
        return errors;
    }

    const updateCartUrl = `${API_URL}/Shopping/Cart/Checkout`;
    console.info('url: ' + updateCartUrl);
    await fetch(updateCartUrl, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .catch(err => console.error(err));
    console.info('action complete');

    return redirect('../orders');
}   

function validateForm(formData) {
    
    const errors = {};
    
    const cardName = formData.get('cardName');
    if(!cardName) {
        errors.cardName = 'Name on card is required';
    } else if(cardName.length < 3) {
        errors.cardName = 'Name on card must be at least 3 characters';
    }
    
    const cardNumber = formData.get('cardNumber');
    if(!cardNumber) {
        errors.cardNumber = 'Card number is required';
    } else if(cardNumber.length < 16) {
        errors.cardNumber = 'Card number must be at least 16 characters';
    }

    const cardExpiration = formData.get('cardExpiration');
    if(!cardExpiration) errors.cardExpiration = 'Expiration is required';    

    const cardCCV = formData.get('cardCVV');
    if(!cardCCV) {
        errors.cardCCV = 'CVV is required'; 
    }
    else if(cardCCV.length < 3) {
        errors.cardCCV = 'CVV must be at least 3 characters';
    }
    
    return errors;    
}



export default function Checkout() {

    const order = useLoaderData();
    const errors = useActionData();

    const itemCount = order.orderProducts?.length;
 

    const expirationTemplate = [];
    let currentDate = new Date();
    let month = currentDate.getMonth();
    let year = currentDate.getYear();
    for (let i = 0; i < 48; i++) {
        let exp = `${month + 1}/${year.toString().slice(-2)}`;
        expirationTemplate.push(<option key={exp} value={exp}>{exp}</option>);
        month++;
        if (month === 12) {
            month = 0;
            year++;
        }
    }


    const productsTemplate = order.orderProducts?.map((item, index) => (
        <tr key={item.id}>
            <td><img className="" src="https://dummyimage.com/90x60/dee2e6/6c757d.jpg" alt="{item.product.title}" /></td>
            <td>
            <Link to={'../product/' + item.product.id} target="_blank">
                        <h5 className="fw-bolder">{item.product.title}</h5>
               </Link>
                <p className="fw-bolder">{item.product.brand}</p>
            </td>

            <td className="align-middle text-end">
                <div className="fw-bolder">{item.quantity}</div>
            </td>
            <td className="align-middle text-end">
                <div className="fw-bolder">${item.price.toFixed(2)}</div>
            </td>
        </tr>
    ));
  

    function inputNumberOnly(input, length) {        
        input.value = input.value.replace(/[^0-9]/g, '').slice(0, length);
    }

    function inputNameOnly(input) {
        input.value = input.value.replace(/[^A-Za-z\s'-.]/g, '');
    }

    return (
        <>
             <section className="bg-dark py-1">
                <div className="container px-4 px-lg-5">
                    <div className="text-left text-white">
                        <h5 className="fw-bolder">Checkout</h5>
                    </div>
                </div>
            </section>

            <Form method="post" className="form" >
                <section className="py-2">
                    <div className="container px-4 px-lg-5 mt-5">
                        <div className="row">
                            <hr className="col-12" />
                            <h5 className="col-3">Shipping Address</h5>
                            <div className="col-9">
                                <div>{order.user.fullName}</div>
                                <div>{order.user.address1}</div>
                                {order.user.address2 && <div>{order.user.address2}</div>}
                                
                                <div>{order.user.city}, {order.user.stateLocation.abbreviation} {order.user.postalCode}</div>
                                <div>{order.email}</div>
                                <div>{order.phoneNumber}</div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-2">
                    <div className="container px-4 px-lg-5 mt-5">
                        <div className="row">
                            <hr className="col-12" />
                            <h5 className="col-3">Payment Method</h5>
                            <div className="col-9">
                                <div className="col-6 mt-2">
                                    <label className="form-label" htmlFor="cardName">Name on card</label>
                                    <input id="cardName" name="cardName" placeholder="full name as it appears on card" className="form-control"  onInput={e => inputNameOnly(e.target)} maxLength={100}/>
                                    {errors?.cardName && <p className="text-danger text-sm-start">{errors.cardName}</p>}
                                </div>
                                <div className="col-6 mt-2">
                                    <label htmlFor="cardNumber" className="form-label">Credit card number</label>
                                    <input id="cardNumber" name="cardNumber" placeholder="0000 0000 0000 0000" maxLength={16} onInput={ e => inputNumberOnly(e.target, 16)} className="form-control" />
                                    {errors?.cardNumber && <p className="text-danger text-sm-start">{errors.cardNumber}</p>}
                                </div>
                                <div className="col-6 mt-2"></div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <label htmlFor="cardExpiration" className="form-label">Expiration</label>
                                        <select id="cardExpiration" name="cardExpiration" className="form-control" >
                                            <option value="" >MM/YY</option>
                                            {expirationTemplate}
                                        </select>
                                        {errors?.cardExpiration && <p className="text-danger text-sm-start">{errors.cardExpiration}</p>}
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="cardCCV" className="form-label">CVV</label>
                                        <input id="cardCVV" name="cardCVV" className="form-control" placeholder="000" maxLength={3} onInput={ e => inputNumberOnly(e.target, 3)} />
                                        {errors?.cardCVV && <p className="text-danger text-sm-start">{errors.cardCVV}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-2">
                    <div className="container px-4 px-lg-5 mt-5">
                        <div className="row">
                            <hr className="col-12" />
                            <h5 className="col-3">Items</h5>
                            <div className="col-9">

                                <table className="table gx-2 gx-lg-2 mt-2">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                            <th className="text-end">Qty</th>
                                            <th className="text-end">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productsTemplate }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>    
                </section>

                <section className="py-4 mb-2">
                    <div className="container px-4 px-lg-5 mt-5">
                        <div className="row">
                            <hr className="col-12" />
                            <div className="col-2">
                                <input type="hidden" name="orderId" value={order.id}/>
                                <button type="submit" className="btn btn-warning btn-lg">Place Order</button>                    
                            </div>
                            <div className="col-10">
                                <div className="row">
                                    <h4 className="text-danger col-8">Order Total ${order.totalPrice.toFixed(2)}</h4>
                                    <div className="col-4">
                                        <div className="row row-cols-2">
                                            <div className="col text-end">Items: {itemCount}</div>
                                            <div className="col text-end">${order.subtotal.toFixed(2)}</div>
                                            <div className="col text-end underline">Tax</div>
                                            <div className="col text-end underline">${order.tax.toFixed(2)}</div>
                                            <div className="col text-end">Order Total</div>
                                            <div className="col text-end">${order.totalPrice.toFixed(2)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

            </Form>

        </>
    )
}