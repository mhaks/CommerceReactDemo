import React from "react";
import { useActionData, useLoaderData, redirect } from "react-router";
import { Link, Form } from "react-router-dom";


export async function loader({params}) {
    let product = {};
    let categories = [];
    let brands = [];

    if (params.id === "0") {
        product = {id: "", title: "", description: "", brand: "", price: "", categoryId: "", model: "", availableQty: "", isActive: true};
        
        await Promise.all([           
            fetch(`${process.env.REACT_APP_API_URL}/admin/categories`)
                .then(response => response.json())
                .then(data => { categories = data; })
                .catch(error => console.log(error)),

            fetch(`${process.env.REACT_APP_API_URL}/admin/brands`) 
                .then(response => response.json())
                .then(data => { brands = data; })
                .catch(error => console.log(error))    
        ]);
    }
    else {
        await Promise.all([
            fetch(`${process.env.REACT_APP_API_URL}/admin/products/${params.id}`)
                .then(response => response.json())
                .then(data => { product = data; })
                .catch(error => console.log(error)),
            
            fetch(`${process.env.REACT_APP_API_URL}/admin/categories`)
                .then(response => response.json())
                .then(data => { categories = data; })
                .catch(error => console.log(error)),

            fetch(`${process.env.REACT_APP_API_URL}/admin/brands`) 
                .then(response => response.json())
                .then(data => { brands = data; })
                .catch(error => console.log(error))    
        ]);
    }

    return  {product, categories, brands};
}


export async function action({request})
{
    const formData = await request.formData();
    formData.set("isActive", formData.get("isActive") === "on" ? true : false);

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
        console.info('action errors');
        return errors;
    }



    // put
    await fetch(`${process.env.REACT_APP_API_URL}/admin/products/`, {
        method: 'PUT',
        body: formData
    })
    .then(response => { response.json(); })
    .then(data => { console.log(data); })
    .catch(err => { 
        console.error(err); 
        return;
    });

    return redirect("../admin/products/");
}

function validateForm(formData) {
    
    const errors = {};

    const title = formData.get("title");
    title.trim();
    if(title === "" ) {
        errors.title = 'Title is required';        
    }

    const description = formData.get("description");
    description.trim();
    if(description === "" ) {
        errors.description = 'Description is required';        
    }

    const brand = formData.get("brand");
    brand.trim();
    if(brand === "" ) {
        errors.brand = 'Brand is required';        
    }
    
    const price = formData.get("price");
    price.trim();
    if(price === "" ) {
        errors.price = 'Rrice is required';        
    }

    const categoryId = formData.get("categoryId");
    categoryId.trim();
    if(categoryId === "" ) {
        errors.categoryId = 'Category is required';        
    }


    const model = formData.get("model");
    model.trim();
    if(model === "" ) {
        errors.model = 'Model is required';        
    }
 
    const availableQty = formData.get("availableQty");
    availableQty.trim();
    if(availableQty === "" ) {
        errors.availableQty = 'Available Quantity is required';        
    }

    return errors;
}


export default function Product() {
    const {product, categories, brands}  = useLoaderData();
    const errors = useActionData();

    return (
        <>
            <section className="bg-dark py-1">
                <div className="container px-4 px-lg-5">
                    <div className="text-left text-white">
                        <h5 className="fw-bolder">Product</h5>
                    </div>
                </div>
            </section>


            <section className="py-2">
                <div className="container px-4 px-lg-5 mt-5">

                    <div className="row">
                        <div className="col-md-4">
                            <Form method="post">
                                <input type="hidden" name="id" value={product.id} />
                                <div className="form-group mt-3">
                                    <label htmlFor="title" className="control-label" >Title</label>
                                    <input name="title" id="title" className="form-control" defaultValue={product.title} />                                       
                                    {errors?.title && <p className="text-danger text-sm-start">{errors.title}</p>}
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="description" className="control-label">Description</label>
                                    <textarea rows="5" cols="35" name="description" id="description" className="form-control" defaultValue={product.description} ></textarea>                                        
                                    {errors?.description && <p className="text-danger text-sm-start">{errors.description}</p>}
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="brand" className="control-label">Brand</label>
                                    <input className="form-control" name="brand" id="brand"  type="text" list="brandList" defaultValue={product.brand}/> 
                                    <datalist id="brandList">
                                    {brands?.map((item) => <option key={item} value={item}>{item}</option>)}
                                    </datalist>     
                                    {errors?.brand && <p className="text-danger text-sm-start">{errors.brand}</p>}                       
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="price" className="control-label">Price</label>
                                    <input name="price" id="price" className="form-control" defaultValue={product.price} />   
                                    {errors?.price && <p className="text-danger text-sm-start">{errors.price}</p>}                                     
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="categoryId" className="control-label">Category</label>
                                    <select className="form-control" name="categoryId" id="categoryId" defaultValue={product.categoryId} >
                                    {categories?.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
                                    </select>
                                    {errors?.categoryId && <p className="text-danger text-sm-start">{errors.categoryId}</p>}                                    
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="model" className="control-label">Model Number</label>
                                    <input name="model" id="model" className="form-control" defaultValue={product.model}  />
                                    {errors?.model && <p className="text-danger text-sm-start">{errors.model}</p>}                                    
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="availableQty" className="control-label">Available Quantity</label>
                                    <input name="availableQty" id="availableQty" className="form-control" defaultValue={product.availableQty} />
                                    {errors?.availableQty && <p className="text-danger text-sm-start">{errors.availableQty}</p>}                                    
                                </div>
                                <div className="form-group mt-3">
                                    <input name="isActive" id="isActive" className="form-check-input" type="checkbox" defaultChecked={product.isActive}  />
                                    <label htmlFor="isActive" className="form-check-label">&nbsp;Active</label>                                        
                                </div>
                                <div className="form-group mt-3 row">
                                    <div className="col">
                                        <input type="submit" value="Save" className="btn btn-outline-dark mt-auto text-center col-6" />
                                    </div>
                                    <div className="col text-end">
                                        <Link to="../admin/products">Back to List</Link>
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