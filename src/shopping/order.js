import React from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

export async function loader({params}) {
    const url = `${API_URL}/Shopping/Order?id=${params.id}`;
    let order = null;
    await fetch(url)
        .then(response => response.json())
        .then(json => {order = json;})
        .catch(err => console.error(err));

    return order;
}

function toLocalDateTime(utc) {
    const utcDate = new Date(utc);
    const offsetMinutes = new Date().getTimezoneOffset();
    const localDT = new Date(utcDate.getTime() - offsetMinutes * 60000);
    return localDT.toLocaleString();
}

export default function Order() {
    const order = useLoaderData();
    console.log(order.orderHistory);

    const historyTemplate = [];
    for (let idx = 0; idx < order.orderHistory.length; idx++) {
        var item = order.orderHistory[idx];
        let cls = idx === order.orderHistory.length -1 ? "col fw-bolder" : "col fw-lighter";

        historyTemplate.push(
            <>
                <div className={cls}>{toLocalDateTime(item.orderDate)}</div>
                <div className={cls}>{item.orderStatus.name}</div>
            </>            
        );
    }   
  

    return (
        <>
            <section className="bg-dark py-1">
                <div className="container px-4 px-lg-5">
                    <div className="text-left text-white">
                        <h5 className="fw-bolder">Order</h5>
                    </div>
                </div>
            </section>


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
                            <div className="row row-cols-2">
                               { historyTemplate }                    
                            </div>                
                        </div>
                    </div>
                </div>
            </section>
        </>
    );        
}