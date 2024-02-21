import React from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";
import "../site.js";
import { toLocalDateTime } from "../site";

//const API_URL = process.env.REACT_APP_API_URL;

export async function loader() {
    return null;
}

export default function Orders() {
    const {data, orderStates} = useLoaderData();

    const ordersTemplate = [];

    data.orders.forEach(order => {
        const zeroPadding = Math.max(8 - order.id.toString().length, 0);
        const orderId = '0'.repeat(zeroPadding) + order.id.toString();

        const ordered = order.orderHistory.find(h => h.orderStatusId === 2);
        const orderDateTime = toLocalDateTime(ordered.orderDate);

        const current = order.orderHistory[order.orderHistory.length - 1];
        const lastDateTime = toLocalDateTime(current.orderDate);

        const nextState = orderStates.find(s => s.value === (current.orderStatusId + 1).toString());

        ordersTemplate.push(
            <tr key={order.id}>
                <td><Link to={'../order/' + order.id} target="_blank" >{orderId}</Link></td>
                <td>order.user.userName</td>
                <td>{orderDateTime}</td>
                <td>{current.orderStatus.name}</td>
                <td>{lastDateTime}</td>
                <td>
                    {nextState &&
                        <form method="post">
                            <input type="hidden" value={order.id} name="orderId" />
                            <input type="hidden" value={nextState.value} name="orderStateId" />
                            <button type="submit" className="btn btn-outline-dark mt-auto text-center">{nextState.text}</button>
                        </form>
                    }                    
                </td>
            </tr>
        );
    });    


    return (
       <>

        <section className="bg-dark py-1">
            <div className="container px-4 px-lg-5">
                <div className="text-left text-white">
                    <h5 className="fw-bolder">Orders</h5>
                </div>
            </div>
        </section>

        <section className="py-2">
            <div className="container px-4 px-lg-5 mt-5">

                <div className="row mt-4">
                    <form className="form d-flex" method="get">
                        
                        <div className="col mx-1">
                            <input type="text" className="form-control" asp-for="OrderSearchId" placeholder="order id" />
                        </div>

                        <div className="col mx-1">
                            <input type="text" className="form-control" asp-for="CustomerSearchId" placeholder="customer id" />
                        </div>

                        <div className="col mx-1">
                            <select className="form-control" asp-items="@Model.OrderStatusSelect" asp-for="@Model.OrderStatusFilterId">
                                <option value="">ALL</option>
                            </select>
                        </div>

                        <div className="col mx-1">
                            <button type="submit" className="btn btn-outline-dark mt-auto text-center">Search</button>
                        </div>
                    
                    </form>
                </div>

                <div className="row mt-4">
                    <table className="table gx-2 gx-lg-2 mt-4">
                        <thead>
                            <tr>
                                <th>Order #</th>
                                <th>Customer #</th>
                                <th>Ordered</th>
                                <th>Status</th>
                                <th>Updated</th>
                                <th>Process</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersTemplate}
                        </tbody>
                    </table>
                </div>

            </div>
        </section>

       </>
    );
}