import React from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";
import "../site.js";
import { toLocalDateTime } from "../site";

const API_URL = process.env.REACT_APP_API_URL;

export async function loader() {
    let orderStates = [];
    let orders = [];
    await Promise.all(
        [
            fetch(`${API_URL}/Admin/OrderStates`)
            .then(response => response.json())
            .then(data => orderStates = data),

            fetch(`${API_URL}/Admin/Orders`)
            .then(response => response.json())
            .then(data => orders = data)
        ]   
    )
    return {orders, orderStates};
}

export default function Orders() {
    const {orders, orderStates} = useLoaderData();

    const ordersTemplate = [];

    orders.forEach(order => {
        const zeroPadding = Math.max(8 - order.orderId.toString().length, 0);
        const orderId = '0'.repeat(zeroPadding) + order.orderId.toString();
        
        const orderDateTime = toLocalDateTime(order.orderDate);
        
        const statusDateTime = toLocalDateTime(order.statusDate);

        const nextState = (order.statusId + 1).toString();

        ordersTemplate.push(
            <tr key={order.orderId}>
                <td><Link to={'../admin/order/' + order.orderId} target="_blank" >{orderId}</Link></td>
                <td>{order.userName}</td>
                <td>{orderDateTime}</td>
                <td>{order.statusName}</td>
                <td>{statusDateTime}</td>
                <td>
                    {nextState &&
                        <form method="post">
                            <input type="hidden" value={order.orderId} name="orderId" />
                            <input type="hidden" value={nextState} name="orderStateId" />
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
                                {orderStates.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
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