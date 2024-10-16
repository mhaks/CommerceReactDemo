import React from "react";
import { useLoaderData } from "react-router";


export async function loader() {
    let sales = [];
    let carts = [];
    let processing = [];
    let shipped = [];
    let delivered = [];
    let returns = [];
    let inventory = [];

    await Promise.all([
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/admin/summary/sales?days=7`)
        .then(response => response.json())
        .then(data => sales = data)
        .catch(error => console.log(error)),

        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/admin/summary/orders?Status=1`)
            .then(response => response.json())
            .then(data => carts = data)
            .catch(error => console.log(error)),
        
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/admin/summary/orders?Status=2`)
            .then(response => response.json())
            .then(data => processing = data)
            .catch(error => console.log(error)),
        
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/admin/summary/orders?Status=3`)
            .then(response => response.json())
            .then(data => shipped = data)
            .catch(error => console.log(error)),
        
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/admin/summary/orders?Status=4&Days=7`)
            .then(response => response.json())
            .then(data => delivered = data)
            .catch(error => console.log(error)),
        
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/admin/summary/orders?Status=5&Days=7`)
            .then(response => response.json())
            .then(data => returns = data)
            .catch(error => console.log(error)),

        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/admin/summary/inventory?Threshold=10`)
            .then(response => response.json())
            .then(data => inventory = data)
            .catch(error => console.log(error))
    ]);


    return {sales, carts, processing, shipped, delivered, returns, inventory};
}


export default function Home() {
    const {sales, carts, processing, shipped, delivered, returns, inventory} = useLoaderData();   
    console.log(sales);

    return (
        <>
            <section className="bg-dark py-2">
                <div className="container px-4 px-lg-5 my-2">
                    <div className="text-center text-white">
                        <h4 className="display-4 fw-bolder">Administrative Portal</h4>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container px-4 mt-5">
                    <div className="row row-cols-3 gx-4 justify-content-center">
                        
                        <div className="col mb-5">
                            <div className="card h-100">
                                <div className="card-header text-center">
                                    <h4>Sales</h4>                        
                                </div>                    
                                <div className="card-body">
                                    <h6>Past 7 days</h6>
                                    <div className="row row-cols-2 px-4">
                                        <div className="col">Orders</div>
                                        <div className="col text-end">{sales.orderCount}</div>
                                        <div className="col">Products</div>
                                        <div className="col text-end">{sales.productCount}</div>
                                        <div className="col">Revenue</div>
                                        <div className="col text-end">${sales.revenue.toFixed(2)}</div>
                                    </div>
                                </div>
                                <div className="card-footer"></div>
                            </div>
                        </div>
                        
                        <div className="col mb-5">
                            <div className="card h-100">
                                <div className="card-header text-center">
                                    <h4>Orders</h4>
                                </div>
                                <div className="card-body">
                                    <h6>Fulfillment</h6>
                                    <div className="row row-cols-2 px-4">
                                        <div className="col">Cart</div>
                                        <div className="col text-end">{carts.orderCount}</div>
                                        <div className="col">Processing</div>
                                        <div className="col text-end">{processing.orderCount}</div>
                                        <div className="col">Shipped</div>
                                        <div className="col text-end">{shipped.orderCount}</div>
                                    </div>
                                    <hr />
                                    <h6>Past 7 days</h6>
                                    <div className="row row-cols-2 px-4">
                                        <div className="col">Delivered</div>
                                        <div className="col text-end">{delivered.orderCount}</div>
                                        <div className="col">Returns</div>
                                        <div className="col text-end">{returns.orderCount}</div>
                                    </div>
                                </div>
                                <div className="card-footer"></div>
                            </div>
                        </div>

                        <div className="col mb-5">
                            <div className="card h-100">
                                <div className="card-header text-center">
                                    <h4>Inventory</h4>                        
                                </div>
                                <div className="card-body">
                                    <h6>Products</h6>
                                    <div className="row row-cols-2 px-4">
                                        <div className="col">Active</div>
                                        <div className="col text-end">{inventory.active}</div>
                                    </div>
                                    <hr />
                                    <h6>Stock</h6>
                                    <div className="row row-cols-2 px-4">
                                        <div className="col">Good</div>
                                        <div className="col text-end">{inventory.aboveThreshold}</div>
                                        <div className="col">Low (&lt; 10)</div>
                                        <div className="col text-end">{inventory.belowThreshold}</div>
                                        <div className="col">Out</div>
                                        <div className="col text-end">{inventory.outOfStock}</div>
                                    </div>
                                </div>
                                <div className="card-footer"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}