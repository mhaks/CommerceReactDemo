import React from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";
import { toLocalDateTime } from "../site";

export async function loader({params}) {
    const url = `${import.meta.env.VITE_REACT_APP_API_URL}/Shopping/Orders/${params.id}`;
    console.log(url);
    let order = null;
    await fetch(url)
        .then(response => response.json())
        .then(json => {order = json;})
        .catch(err => console.error(err));
    return order;
}


export default function Order() {
    const order = useLoaderData();
    console.log(order);

    const historyTemplate = [];
    for (let idx = 0; idx < order.orderHistory.length; idx++) {
        var item = order.orderHistory[idx];
        let cls = idx === order.orderHistory.length -1 ? "col fw-bolder" : "col fw-lighter";

        historyTemplate.push(
            <div key={item.id} className="row row-cols-2">
                <div className={cls}>{toLocalDateTime(item.orderDate)}</div>
                <div className={cls}>{item.orderStatus.name}</div>
            </div>            
        );
    }   

    const productsTemplate = order.orderProducts?.map((item, index) => (
        <tr key={item.id}>
            <td><img className="" src="https://dummyimage.com/90x60/dee2e6/6c757d.jpg" alt="{item.product.title}" /></td>
            <td>
            <Link to={'../product/' + item.product.id} target="_blank" rel="noreferrer noopener">
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
  

    return (
        <>
            <section className="bg-dark py-1">
                <div className="container px-4 px-lg-5">
                    <div className="text-left text-white">
                        <h5 className="fw-bolder">Order</h5>
                    </div>
                </div>
            </section>


            {/*Status*/}
            <section className="py-2">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row my-2">
                        <div className="col-12 text-end">
                            <Link className="btn  btn-outline-dark mt-auto" to="../orders" >View My Orders</Link>
                        </div>
                    </div>
                    <div className="row">
                        <hr className="col-12" />
                        <h5 className="col-3">Order Status</h5>
                        <div className="col-6">
                            <div className="row">
                               { historyTemplate }                    
                            </div>                
                        </div>
                    </div>
                </div>
            </section>

            {/*shipping*/}
            <section className="py-2">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row">
                        <hr className="col-12" />
                        <h5 className="col-3">Shipping Address</h5>
                        <div className="col-9">
                            <div>{order.user.fullName}</div>
                            <div>{order.user.address1}</div>
                            {order.user?.address2.length > 0 && <div>{order.user.address2}</div>}                           
                            <div>{order.user.city}, {order.user.stateLocation.abbreviation} {order.user.postalCode}")</div>
                            <div>{order.user.email}</div>
                            <div>{order.user.phoneNumber}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/*billing*/}
            <section className="py-4 mb-2">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row">
                        <hr className="col-12" />
                        <div className="col-12">
                            <div className="row">
                                <h4 className="text-danger col-8">Order Total ${order.totalPrice.toFixed(2)}</h4>
                                <div className="col-4">
                                    <div className="row row-cols-2">
                                        <div className="col text-end">Items {order.orderProducts.length}</div>
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

            {/*products*/}
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

        </>
    );        
}