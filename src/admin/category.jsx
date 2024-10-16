import React from "react";
import { useLoaderData, useActionData, redirect } from "react-router";
import { Link, Form } from "react-router-dom";  


export async function loader({params}) {
    
    if (params.id === "0") {
        return {id: 0, title: ""};
    }

    let category = {};

    await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/admin/products/categories/${params.id}`)
        .then(response => response.json())
        .then(data => { category = data; })
        .catch(error => console.log(error));
    return category;
}

export async function action({request}) {
    const formData = await request.formData();
    const id = formData.get("id");
    const title = formData.get("title");

    title.trim();

    console.log(`form title: ${title} id: ${id}`);

    
    console.log(id);
    if(title === "" ) {
        const errors = {};
        errors.title = 'Title is required';        
        return errors;
    }

    await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/admin/products/categories/`, {
        method: 'PUT',
        body: formData
    })
    .catch(err => { 
        console.error(err); 
        return;
    });

    return redirect("../admin/categories/");
}

export default function Category () {
    const category = useLoaderData();
    const errors = useActionData();

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
                            <Form method="put">
                                <input type="hidden" name="id" value={category.id} />                                
                                <div className="form-group mt-3">
                                    <label className="control-label" htmlFor="Title">Title</label>
                                    <input className="form-control" name="title" id="title" defaultValue={category.title}/>                                    
                                    {errors?.title && <p className="text-danger text-sm-start">{errors.title}</p>}
                                </div>           
                                <div className="form-group mt-3 row">
                                    <div className="col">
                                        <input type="submit" value="Save" className="btn btn-outline-dark mt-auto text-center col-6" />
                                    </div>
                                    <div className="col text-end">
                                        <Link to="../admin/categories">Back to List</Link>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                    
                </div>
            </section>
        </>
    );
}