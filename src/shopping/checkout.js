import React from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";

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
    const formData = await request.formData();
    const updateCartUrl = `${API_URL}/Shopping/Checkout`;
    await fetch(updateCartUrl, {
        method: 'POST',
        body: formData,
    });     
    return;
}   

export default function Checkout() {

    const order = useLoaderData();
    const itemCount = order.orderProducts?.length;
    

    const productsTemplate = order.orderProducts?.map((item, index) => (
        <tr key={item.id}>
            <td><img class="" src="https://dummyimage.com/90x60/dee2e6/6c757d.jpg" alt="{item.product.title}" /></td>
            <td>
            <Link to={'../product/' + item.product.id} target="_blank">
                        <h5 class="fw-bolder">{item.product.title}</h5>
               </Link>
                <p class="fw-bolder">{item.product.brand}</p>
            </td>

            <td class="align-middle text-end">
                <div class="fw-bolder">{item.quantity}</div>
            </td>
            <td class="align-middle text-end">
                <div class="fw-bolder">${item.price}</div>
            </td>
        </tr>
    ));

    return (
        <>
             <section className="bg-dark py-1">
                <div className="container px-4 px-lg-5">
                    <div className="text-left text-white">
                        <h5 className="fw-bolder">Checkout</h5>
                    </div>
                </div>
            </section>

            <form method="post" class="form">
                <section class="py-2">
                    <div class="container px-4 px-lg-5 mt-5">
                        <div class="row">
                            <hr class="col-12" />
                            <h5 class="col-3">Shipping Address</h5>
                            <div class="col-9">
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

                <section class="py-2">
                    <div class="container px-4 px-lg-5 mt-5">
                        <div class="row">
                            <hr class="col-12" />
                            <h5 class="col-3">Payment Method</h5>
                            <div class="col-9">
                                <div class="col-6 mt-2">
                                    <label class="form-label" for="cardName">Name on card</label>
                                    <input id="cardName" name="cardName" placeholder="full name as it appears on card" class="form-control" />
                                    
                                </div>
                                <div class="col-6 mt-2">
                                    <label for="cardNumber" class="form-label">Credit card number</label>
                                    <input id="cardNumber" name="cardNumber" placeholder="0000 0000 0000 0000" class="form-control" />
                                   
                                </div>
                                <div class="col-6 mt-2"></div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <label for="cardExpiration" class="form-label">Expiration</label>
                                        <select id="cardExpiration" name="cardExpiration" class="form-control"></select>
                                        
                                    </div>
                                    <div class="col-md-3">
                                        <label for="cardCCV" class="form-label">CVV</label>
                                        <input id="cardCCV" name="cardCCV" class="form-control" placeholder="000" />
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="py-2">
                    <div class="container px-4 px-lg-5 mt-5">
                        <div class="row">
                            <hr class="col-12" />
                            <h5 class="col-3">Items</h5>
                            <div class="col-9">

                                <table class="table gx-2 gx-lg-2 mt-2">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                            <th class="text-end">Qty</th>
                                            <th class="text-end">Price</th>
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

                <section class="py-4 mb-2">
                    <div class="container px-4 px-lg-5 mt-5">
                        <div class="row">
                            <hr class="col-12" />
                            <div class="col-2">
                                <input type="hidden" asp-route-orderId="@Model.Order.Id"/>
                                <button type="submit" class="btn btn-warning btn-lg">Place Order</button>                    
                            </div>
                            <div class="col-10">
                                <div class="row">
                                    <h4 class="text-danger col-8">Order Total ${order.totalPrice}</h4>
                                    <div class="col-4">
                                        <div class="row row-cols-2">
                                            <div class="col text-end">Items: {itemCount}</div>
                                            <div class="col text-end">${order.subtotal.toFixed(2)}</div>
                                            <div class="col text-end underline">Tax</div>
                                            <div class="col text-end underline">${order.tax.toFixed(2)}</div>
                                            <div class="col text-end">Order Total</div>
                                            <div class="col text-end">${order.totalPrice.toFixed(2)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

            </form>

        </>
    )
}