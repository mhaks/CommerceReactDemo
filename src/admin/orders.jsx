import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";
import "../site.js";
import { toLocalDateTime } from "../site";


export async function loader() {
    let orderStates = [];
    
    await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/Admin/Orders/States`)
            .then(response => response.json())
            .then(data => orderStates = data);

    return orderStates;
}


export default function Orders() {
    const orderStates = useLoaderData();
    const [orders, setOrders] = useState([]);

    useEffect(() => { 
        const fetchOrders = async () => {
            fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/Admin/Orders`)
                .then(response => response.json())
                .then(data => setOrders(data))
                .catch(error => console.error('Error:', error));
        };

        fetchOrders();
    }, []);
    

    const nextProcess = [ {id: 3, name: 'Ship'}, 
                            {id: 4, name: 'Deliver'}, 
                            {id: 5, name: 'Return'} ];        

    const ordersTemplate = [];
    orders.forEach(order => {
        const zeroPadding = Math.max(8 - order.orderId.toString().length, 0);
        const orderId = '0'.repeat(zeroPadding) + order.orderId.toString();
        
        const orderDateTime = toLocalDateTime(order.orderDate);
        
        const statusDateTime = toLocalDateTime(order.statusDate);

        const nextStateId = order.statusId + 1;
        const nextState = nextProcess.find(s => s.id === nextStateId);

        ordersTemplate.push(
            <tr key={order.orderId}>
                <td><a href={'../admin/order/' + order.orderId} target="_blank" rel="noopener noreferrer">{orderId}</a></td>
                <td>{order.userName}</td>
                <td>{orderDateTime}</td>
                <td>{order.statusName}</td>
                <td>{statusDateTime}</td>
                <td>
                    {nextState &&
                        <form onSubmit={handleProcess}>
                            <input type="hidden" value={order.orderId} name="orderId" />
                            <input type="hidden" value={nextState.id} name="stateId" />
                            <button type="submit" className="btn btn-outline-dark mt-auto text-center">{nextState.name}</button>
                        </form>
                    }                    
                </td>
            </tr>
        );
    });    

    async function handleFilter(event) {
        event.preventDefault();
        await filterOrders(event.target);  
    }

    async function filterOrders(formFilter)
    {
        const formData = new FormData(formFilter);        
        const orderId = formData.get("orderId");
        const userName = formData.get("userName");
        const statusId = formData.get("statusId");

        const url = new URL(`${import.meta.env.VITE_REACT_APP_API_URL}/Admin/Orders`);
        if (orderId) url.searchParams.append("orderId", orderId);
        if (userName) url.searchParams.append("userName", userName);
        if (statusId) url.searchParams.append("statusId", statusId);

        console.log("order filter: " + url);
        await fetch(url)
                .then(response => response.json())
                .then(data => setOrders(data))
                .catch(error => console.error('Error:', error)); 
    }

    async function handleProcess(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const orderId = formData.get("orderId");
        const stateId = formData.get("stateId");
    
        await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/Admin/Orders/${orderId}/State/${stateId}`, {
            method: 'PUT',
            body: formData
        }).catch(error => console.error('Error:', error));  
        
        const formFilter = document.getElementById("formFilter");
        await filterOrders(formFilter);         
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

                <div className="row mt-4">
                    <form className="form d-flex" onSubmit={handleFilter} id="formFilter">                        
                        <div className="col mx-1">
                            <input type="text" className="form-control" name="orderId" placeholder="order id" />
                        </div>

                        <div className="col mx-1">
                            <input type="text" className="form-control" name="userName" placeholder="customer" />
                        </div>

                        <div className="col mx-1">
                            <select className="form-control" name="statusId">
                                <option value="">ALL</option>
                                {orderStates.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
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
                                <th>Customer</th>
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