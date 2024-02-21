import React from "react";
import { useLoaderData } from "react-router";

//const API_URL = process.env.REACT_APP_API_URL;

export async function loader() {
    return null;
}


export default function Home() {
    const data = useLoaderData();   
    console.log(data);

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
                                        <div className="col text-end">@Model.SalesOrderCount</div>
                                        <div className="col">Products</div>
                                        <div className="col text-end">@Model.SalesProductCount</div>
                                        <div className="col">Revenue</div>
                                        <div className="col text-end">@Html.DisplayFor(m => m.SalesDollarRevenue)</div>
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
                                        <div className="col text-end">@Model.OrderCartCount</div>
                                        <div className="col">Processing</div>
                                        <div className="col text-end">@Model.OrderProcessingCount</div>
                                        <div className="col">Shipped</div>
                                        <div className="col text-end">@Model.OrderShippedCount</div>
                                    </div>
                                    <hr />
                                    <h6>Past 7 days</h6>
                                    <div className="row row-cols-2 px-4">
                                        <div className="col">Delivered</div>
                                        <div className="col text-end">@Model.OrderDeliveredCount</div>
                                        <div className="col">Returns</div>
                                        <div className="col text-end">@Model.OrderReturnCount</div>
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
                                        <div className="col text-end">@Model.InventoryActiveCount</div>
                                    </div>
                                    <hr />
                                    <h6>Stock</h6>
                                    <div className="row row-cols-2 px-4">
                                        <div className="col">Good</div>
                                        <div className="col text-end">@Model.InventoryStockGoodCount</div>
                                        <div className="col">Low (&lt; 10)</div>
                                        <div className="col text-end">@Model.InventoryStockLowCount</div>
                                        <div className="col">Out</div>
                                        <div className="col text-end">@Model.InventoryStockOutCount</div>
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