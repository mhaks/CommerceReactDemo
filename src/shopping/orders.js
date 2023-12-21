import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

export async function loader() {
    const urlStatuses = API_URL + "/Shopping/OrderStatuses";
    const urlOrders = API_URL + "/Shopping/Orders";
    let statuses = [];
    let orders = [];
    await Promise.all([
        fetch(urlStatuses)
            .then(request => request.json())
            .then(data => { statuses = data })
            .catch(err => console.error(err)), 
        
        fetch(urlOrders)
            .then(request => request.json())
            .then(data => {orders = data})
            .catch(err => console.error(err))
    ]);

    console.info("Orders: " + orders.length);
    console.info("Statuses: " + statuses.length);
    return [statuses, orders];
}

function toLocalDateTime(utc) {
    const utcDate = new Date(utc);
    const offsetMinutes = new Date().getTimezoneOffset();
    const localDT = new Date(utcDate.getTime() - offsetMinutes * 60000);
    return localDT.toLocaleString();
}


export default function Orders() {

    const [statuses, orders] = useLoaderData();
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [displayOrders, setDisplayOrders] = useState(orders); 

    useEffect(() => {
        if(selectedStatus) {
            setDisplayOrders(orders.filter(o => o.orderHistory[o.orderHistory.length - 1].orderStatusId === Number(selectedStatus)));
        } else {    
            setDisplayOrders(orders);
        }
    }, [selectedStatus, orders]);

    const statusesTemplate = statuses.map((status) => (
        <option value={status.id} key={status.id}>{status.name}</option>
    ));
    
    const ordersTemplate = [];
    
    for (const order of displayOrders) {
        
        const zeroPadding = Math.max(8 - order.id.toString().length, 0);
        const orderId = '0'.repeat(zeroPadding) + order.id.toString();

        const ordered = order.orderHistory.find(h => h.orderStatusId === 2);
        const orderDateTime = toLocalDateTime(ordered.orderDate);

        const current = order.orderHistory[order.orderHistory.length - 1];
        const lastDateTime = toLocalDateTime(current.orderDate);

        ordersTemplate.push(
            <tr key={order.id}>
                <td><Link to={'../order/' + order.id} >{orderId}</Link></td>
                <td>{orderDateTime}</td>
                <td>{current.orderStatus.name}</td>
                <td>{lastDateTime}</td>
                <td>{order.orderProducts.length}</td>
                <td>${Number(order.totalPrice).toFixed(2)}</td>                                
            </tr>
        );
    }
    
        
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
                    <div className="row">
                        <hr className="col-12" />
                        <h5 className="col-3">Order History</h5>
                        <div className="col-9">

                            <form className="form">

                                <div className="row justify-content-end">
                                    <div className="col-3">
                                        <select className="form-control" onChange={e => setSelectedStatus(e.target.value)}>
                                            <option value="">ALL</option>
                                            {statusesTemplate}
                                        </select>
                                    </div>                                    
                                </div>
                            </form>
                                            
                            <table className="table gx-2 gx-lg-2 mt-4">
                                <thead>
                                    <tr>
                                        <th>Order #</th>
                                        <th>Ordered</th>
                                        <th>Status</th>
                                        <th>Updated</th>
                                        <th>Items</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ordersTemplate}
                                </tbody>
                            </table>


                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}