import React from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";  


export async function loader() {
    let category = {};
    return category;
}

export default function Category () {
    const {category} = useLoaderData();

    return(
        <>
            <section className="bg-dark py-1">
                <div className="container px-4 px-lg-5">
                    <div className="text-left text-white">
                        <h5 className="fw-bolder">Category</h5>
                    </div>
                </div>
            </section>

            <section className="py-2">
                <div className="container px-4 px-lg-5 mt-5">

                    <div className="row">
                        <div className="col-md-4">
                            <form method="post">
                                <input type="hidden" name={category?.id} />                                
                                <div className="form-group mt-3">
                                    <label className="control-label" htmlFor="Title">Title</label>
                                    <input className="form-control" name="Title" id="Title" />                                    
                                </div>           
                                <div className="form-group mt-3 row">
                                    <div className="col">
                                        <input type="submit" value="Save" className="btn btn-outline-dark mt-auto text-center col-6" />
                                    </div>
                                    <div className="col text-end">
                                        <Link to="../admin/categories">Back to List</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                </div>
            </section>
        </>
    );
}